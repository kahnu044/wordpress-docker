/**
 * Facebook Feed — frontend behaviour.
 *
 * Layout: grid / list / masonry are driven by Isotope (matches the pattern
 * used by Instagram Feed + Image Gallery). Carousel skips Isotope; its
 * runtime lives in essential-blocks-pro.
 *
 * Pagination:
 *   - paginationType="numbered" → server renders ALL posts with data-page;
 *     page-link clicks call iso.arrange({ filter }) to swap visible items.
 *   - paginationType="ajax"     → server renders only the first batch; the
 *     button POSTs to wp_ajax_eb_facebook_feed_load_more, the response HTML
 *     is appended and handed to iso.appended() so masonry re-packs cleanly.
 */
( function () {
	// i18n is read off window.wp.i18n at call time instead of imported
	// from '@wordpress/i18n' — the import causes webpack to split the
	// `@babel/runtime` helpers into a `vendors/js/bundle.babel.js` chunk
	// that the block-level enqueue pipeline doesn't ship. Frontend.js
	// would then sit waiting for that chunk forever and the
	// `.is-isotope-ready` gate would never open. Falls back to plain
	// English when wp.i18n isn't present.
	function localizeMore( count ) {
		const i18n = window.wp && window.wp.i18n;
		if ( i18n && i18n._n && i18n.sprintf ) {
			return i18n.sprintf(
				i18n._n(
					'%d more post loaded',
					'%d more posts loaded',
					count,
					'essential-blocks'
				),
				count
			);
		}
		return (
			count + ( count === 1 ? ' more post loaded' : ' more posts loaded' )
		);
	}

	// One polite live region per feed so newly revealed posts are announced
	// to assistive tech (WCAG 4.1.3 Status Messages).
	function getLiveRegion( wrapper ) {
		let region = wrapper.querySelector( '.eb-fb-feed__sr-status' );
		if ( ! region ) {
			region = document.createElement( 'div' );
			region.className = 'eb-fb-feed__sr-only eb-fb-feed__sr-status';
			region.setAttribute( 'role', 'status' );
			region.setAttribute( 'aria-live', 'polite' );
			wrapper.appendChild( region );
		}
		return region;
	}

	function announce( wrapper, message ) {
		const region = getLiveRegion( wrapper );
		region.textContent = '';
		window.requestAnimationFrame( function () {
			region.textContent = message;
		} );
	}

	// Move focus to the start of freshly revealed content so keyboard users
	// are not stranded on a button that just disappeared (WCAG 2.4.3).
	function focusFirst( cards ) {
		const first = cards[ 0 ];
		if ( ! first ) {
			return;
		}
		first.setAttribute( 'tabindex', '-1' );
		first.focus( { preventScroll: true } );
	}

	// Inlining each return rather than using `{ ...base, ... }` is
	// deliberate: object spread compiles to a @babel/runtime helper
	// (`defineProperty`) that webpack splits into a vendors chunk, which
	// the block-level enqueue pipeline doesn't ship — leaving the bundle
	// stuck waiting for a chunk that never loads. Plain object literals
	// keep this file self-contained.
	function isoOptionsFor( layout ) {
		if ( layout === 'list' ) {
			return {
				itemSelector: '.eb-fb-feed__col',
				percentPosition: true,
				layoutMode: 'vertical',
			};
		}
		if ( layout === 'masonry' ) {
			return {
				itemSelector: '.eb-fb-feed__col',
				percentPosition: true,
				layoutMode: 'masonry',
				masonry: { columnWidth: '.eb-fb-feed__col' },
			};
		}
		// grid (default)
		return {
			itemSelector: '.eb-fb-feed__col',
			percentPosition: true,
			layoutMode: 'fitRows',
		};
	}

	// ---- Equal-height rows for grid layout ----
	//
	// Isotope's `fitRows` mode aligns items by their TOP and lets each
	// card keep its natural height — so within a row of mixed content
	// lengths, cards end at different bottoms and the grid looks ragged.
	// This helper groups visible cols by their Isotope-assigned Y coord,
	// sets each row's cards to the row's max height, then calls
	// `iso.layout()` so Isotope's row positions reflect the new uniform
	// heights. Idempotent: the second pass (fired by iso's own
	// layoutComplete event from our iso.layout() call) finds heights
	// already at target → `changed` stays false → no further iso.layout.
	//
	// Paired with `.eb-fb-feed--grid > .eb-fb-feed__col > .eb-fb-feed__post
	// { height: 100% }` in style.scss so the post card actually fills the
	// equalized col height instead of sitting at content height with
	// empty space beneath.
	function equalizeGridRows( inner, iso ) {
		if ( ! iso ) {
			return;
		}
		// Visible cols only — Isotope hides filtered-out items via
		// `display: none`, and we don't want hidden heights skewing the row max.
		const cols = Array.prototype.slice
			.call( inner.querySelectorAll( '.eb-fb-feed__col' ) )
			.filter( function ( c ) {
				return c.offsetParent !== null;
			} );

		if ( cols.length === 0 ) {
			return;
		}

		// Clear any previous min/explicit heights so we measure naturally.
		cols.forEach( function ( c ) {
			c.style.height = '';
		} );
		// Force a synchronous reflow so the cleared heights apply before
		// we read offsetHeight below. Reading any layout property does it.
		// eslint-disable-next-line no-unused-expressions
		inner.offsetHeight;

		// Group cols by their Isotope-assigned Y coordinate. Isotope writes
		// `transform: translate3d(Xpx, Ypx, 0)` (or `translate(...)`) — parse
		// the Y from the inline style. Fall back to offsetTop if no transform
		// (shouldn't happen post-Isotope but is the safe read).
		const rows = {};
		cols.forEach( function ( col ) {
			const t = col.style.transform || '';
			const match = t.match(
				/translate(?:3d)?\(\s*-?[\d.]+px\s*,\s*(-?[\d.]+)px/
			);
			const y = match
				? Math.round( parseFloat( match[ 1 ] ) )
				: Math.round( col.offsetTop );
			if ( ! rows[ y ] ) {
				rows[ y ] = [];
			}
			rows[ y ].push( col );
		} );

		// Set each row's cols to the row's max height. Track whether we
		// actually changed anything — if not, skip the iso.layout() that
		// would otherwise loop us via Isotope's layoutComplete hook.
		let changed = false;
		Object.keys( rows ).forEach( function ( key ) {
			const row = rows[ key ];
			let max = 0;
			row.forEach( function ( c ) {
				const h = c.offsetHeight;
				if ( h > max ) {
					max = h;
				}
			} );
			const target = max + 'px';
			row.forEach( function ( c ) {
				if ( c.style.height !== target ) {
					c.style.height = target;
					changed = true;
				}
			} );
		} );

		// Apply the new heights via a re-layout, but guard against recursion.
		// `iso.layout()` fires Isotope's `layoutComplete`, which our handler
		// uses to re-equalize — without this flag, that re-equalize would
		// call `iso.layout()` again. The `changed` check alone is NOT enough
		// inside a flex container: each layout reflows the wrapper, text
		// re-wraps to different line counts, natural heights differ every
		// pass, so `changed` never settles → synchronous layoutComplete
		// recursion → "Maximum call stack size exceeded". The per-instance
		// flag makes the layoutComplete we trigger here a no-op (it survives
		// both synchronous and asynchronous layoutComplete dispatch).
		if ( changed && iso.layout ) {
			iso._ebSuppressEqualize = true;
			iso.layout();
		}
	}

	function initIsotope( inner, layout, initialFilter, onReady ) {
		if ( ! window.Isotope || ! window.imagesLoaded ) {
			// Vendor scripts didn't load — bail and leave the static layout
			// (visibility is gated behind .is-isotope-ready, so we must
			// remove the gate to keep the feed visible).
			inner.classList.add( 'is-isotope-ready' );
			return;
		}

		// Server may emit `hidden` on data-page > 1 cards in numbered mode
		// as a no-JS fallback. Isotope can't size hidden items, so clear
		// the attribute before init — Isotope's filter will then own visibility.
		inner
			.querySelectorAll( '.eb-fb-feed__col[hidden]' )
			.forEach( function ( el ) {
				el.removeAttribute( 'hidden' );
			} );

		window.imagesLoaded( inner, function () {
			const opts = isoOptionsFor( layout );
			if ( initialFilter ) {
				opts.filter = initialFilter;
			}
			const iso = new window.Isotope( inner, opts );
			inner.classList.add( 'is-isotope-ready' );

			// Grid layout only — list is a single column (no rows to equalize)
			// and masonry is intentionally staggered. Hook to layoutComplete
			// so pagination filter changes, AJAX-appended items, and window-
			// resize-driven re-arrangements all trigger re-equalization. The
			// `changed` guard inside equalizeGridRows breaks the feedback loop.
			if ( layout === 'grid' ) {
				iso.on( 'layoutComplete', function () {
					// Skip the layoutComplete that equalizeGridRows itself
					// triggered via iso.layout() — re-entrancy guard against
					// the layout→layoutComplete→layout recursion that blows
					// the stack inside flex containers. External layouts
					// (resize, filter, AJAX append) leave the flag false.
					if ( iso._ebSuppressEqualize ) {
						iso._ebSuppressEqualize = false;
						return;
					}
					equalizeGridRows( inner, iso );
				} );
				// Initial pass — layoutComplete may or may not have fired
				// synchronously from `new Isotope()`, so call once explicitly.
				equalizeGridRows( inner, iso );
			}

			// Native `loading="lazy"` images below the fold are NOT loaded
			// when imagesLoaded resolved above — imagesLoaded only waits for
			// images the browser has actually started fetching. On scroll
			// each deferred <img> fires its own `load` and grows the card, so
			// Isotope's already-locked positions (and grid's equalized
			// heights) must be recomputed or the image overflows / overlaps
			// its neighbour. `load` doesn't bubble, so listen in the capture
			// phase on the container to catch every descendant image — initial
			// AND AJAX-appended — with a single handler. rAF-debounce so a
			// scroll burst that reveals several images coalesces into one
			// re-layout instead of thrashing. Images that were already loaded
			// before this listener was attached (above-fold / cached) fired
			// their `load` earlier, so they never trigger an unnecessary pass.
			let relayoutScheduled = false;
			function scheduleRelayout() {
				if ( relayoutScheduled ) {
					return;
				}
				relayoutScheduled = true;
				window.requestAnimationFrame( function () {
					relayoutScheduled = false;
					if ( ! iso.layout ) {
						return;
					}
					// Reset the equalize guard (not set it) so the grid
					// layoutComplete handler re-equalizes with the now-correct
					// heights — same handshake initAjaxLoadMore's finalizeAppend
					// uses. The `changed`/flag guards inside equalizeGridRows
					// still prevent the layout→layoutComplete→layout recursion.
					iso._ebSuppressEqualize = false;
					iso.layout();
				} );
			}
			inner.addEventListener(
				'load',
				function ( e ) {
					if ( e.target && e.target.tagName === 'IMG' ) {
						scheduleRelayout();
					}
				},
				true
			);
			inner.addEventListener(
				'error',
				function ( e ) {
					if ( e.target && e.target.tagName === 'IMG' ) {
						scheduleRelayout();
					}
				},
				true
			);
			// Parity with image-gallery: lazysizes-style optimization plugins
			// swap native lazy for their own loader and fire a document-level
			// `lazyloaded` event instead of a per-<img> `load`. Route it
			// through the same debounced re-layout.
			document.addEventListener( 'lazyloaded', scheduleRelayout );

			if ( onReady ) {
				onReady( iso );
			}
		} );
	}

	// Apply a 1-2-3-…-N "window" around the active page so the nav stays
	// tidy when there are many pages. Modelled on post-grid's
	// `eb_paginationNumberHandler`. Always shows page 1, the last page,
	// and one page either side of the current. Inserts `…` separators
	// only where they actually skip pages.
	function refreshNumberedWindow( wrapper ) {
		const nav = wrapper.querySelector( '.eb-fb-feed__pagination' );
		if ( ! nav ) {
			return;
		}
		const links = Array.prototype.slice.call(
			nav.querySelectorAll( '.eb-fb-feed__page-link' )
		);
		if ( ! links.length ) {
			return;
		}
		const total = links.length;
		const active = nav.querySelector( '.eb-fb-feed__page-link.is-current' );
		const activePage = active
			? parseInt( active.getAttribute( 'data-page' ), 10 ) || 1
			: 1;

		// Clear any existing separators before recomputing.
		nav.querySelectorAll( '.eb-fb-feed__page-separator' ).forEach(
			function ( s ) {
				s.remove();
			}
		);

		// Decide visibility per link. Use an inline `style.display`
		// (and matching aria-hidden) rather than the HTML `hidden`
		// attribute or a CSS class — the plugin's per-page StyleHandler
		// cache strips rules that target selectors not present in the
		// saved markup, so any `.eb-fb-feed__page-link[hidden]` or
		// `.eb-fb-feed__page-link.is-hidden` rule wouldn't survive into
		// the emitted page CSS. Inline style sidesteps the cache entirely.
		links.forEach( function ( link ) {
			const page = parseInt( link.getAttribute( 'data-page' ), 10 ) || 1;
			const isEdge = page === 1 || page === total;
			const isNeighbour = Math.abs( page - activePage ) <= 1;
			if ( isEdge || isNeighbour ) {
				link.style.display = '';
				link.removeAttribute( 'aria-hidden' );
			} else {
				link.style.display = 'none';
				link.setAttribute( 'aria-hidden', 'true' );
			}
		} );

		// Inject `…` separators wherever consecutive visible page numbers
		// skip at least one hidden page.
		const visible = links.filter( function ( l ) {
			return l.style.display !== 'none';
		} );
		for ( let i = 0; i < visible.length - 1; i++ ) {
			const a = parseInt( visible[ i ].getAttribute( 'data-page' ), 10 );
			const b = parseInt(
				visible[ i + 1 ].getAttribute( 'data-page' ),
				10
			);
			if ( b - a > 1 ) {
				const sep = document.createElement( 'span' );
				sep.className = 'eb-fb-feed__page-separator';
				sep.setAttribute( 'aria-hidden', 'true' );
				sep.textContent = '…';
				visible[ i ].insertAdjacentElement( 'afterend', sep );
			}
		}

		// Toggle prev/next disabled at boundaries.
		const prev = nav.querySelector( '.eb-fb-feed__page-prev' );
		const next = nav.querySelector( '.eb-fb-feed__page-next' );
		if ( prev ) {
			prev.disabled = activePage <= 1;
		}
		if ( next ) {
			next.disabled = activePage >= total;
		}
	}

	function gotoPage( wrapper, isoRef, targetPage ) {
		const link = wrapper.querySelector(
			'.eb-fb-feed__page-link[data-page="' + targetPage + '"]'
		);
		if ( ! link ) {
			return;
		}

		if ( isoRef.value ) {
			// Isotope's `_filter` uses jQuery's `.is(fn)` under the hood, and
			// jQuery calls `fn(index, element)` — so the first positional arg
			// would be the integer index (0,1,2…), not the DOM node. The DOM
			// element is bound as `this`. Use `this.getAttribute(...)` rather
			// than a positional `el` parameter (which previously crashed with
			// "TypeError: e.getAttribute is not a function" on every page click).
			isoRef.value.arrange( {
				filter: function () {
					return (
						this.getAttribute( 'data-page' ) ===
						String( targetPage )
					);
				},
			} );
		}

		wrapper
			.querySelectorAll( '.eb-fb-feed__page-link' )
			.forEach( function ( l ) {
				l.classList.remove( 'is-current' );
				l.removeAttribute( 'aria-current' );
			} );
		link.classList.add( 'is-current' );
		link.setAttribute( 'aria-current', 'page' );

		refreshNumberedWindow( wrapper );
	}

	function initNumbered( wrapper, isoRef ) {
		const nav = wrapper.querySelector( '.eb-fb-feed__pagination' );
		if ( ! nav ) {
			return;
		}
		const links = nav.querySelectorAll( '.eb-fb-feed__page-link' );
		if ( ! links.length ) {
			return;
		}

		// Initial window paint — items are server-rendered with all numbers
		// visible, this collapses them to the tidy default.
		refreshNumberedWindow( wrapper );

		links.forEach( function ( link ) {
			link.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				const targetPage =
					parseInt( link.getAttribute( 'data-page' ), 10 ) || 1;
				gotoPage( wrapper, isoRef, targetPage );
			} );
		} );

		const prev = nav.querySelector( '.eb-fb-feed__page-prev' );
		if ( prev ) {
			prev.addEventListener( 'click', function () {
				const active = nav.querySelector(
					'.eb-fb-feed__page-link.is-current'
				);
				const activePage = active
					? parseInt( active.getAttribute( 'data-page' ), 10 ) || 1
					: 1;
				if ( activePage > 1 ) {
					gotoPage( wrapper, isoRef, activePage - 1 );
				}
			} );
		}

		const next = nav.querySelector( '.eb-fb-feed__page-next' );
		if ( next ) {
			next.addEventListener( 'click', function () {
				const active = nav.querySelector(
					'.eb-fb-feed__page-link.is-current'
				);
				const activePage = active
					? parseInt( active.getAttribute( 'data-page' ), 10 ) || 1
					: 1;
				const total = links.length;
				if ( activePage < total ) {
					gotoPage( wrapper, isoRef, activePage + 1 );
				}
			} );
		}
	}

	function initAjaxLoadMore( wrapper, isoRef ) {
		const inner = wrapper.querySelector( '[data-ajax="1"]' );
		if ( ! inner ) {
			return;
		}

		const button = wrapper.querySelector( '.eb-fb-feed__load-more' );
		if ( ! button ) {
			return;
		}

		const ajaxUrl = inner.dataset.ajaxUrl;
		const action = inner.dataset.ajaxAction;
		const nonce = inner.dataset.ajaxNonce;
		let attrs;
		try {
			attrs = JSON.parse( inner.dataset.ajaxAttrs || '{}' );
		} catch ( e ) {
			attrs = {};
		}

		let currentPage = 1;
		let pending = false;
		const originalLabel = button.textContent;

		button.addEventListener( 'click', function () {
			if ( pending ) {
				return;
			}
			pending = true;
			button.disabled = true;
			// Keep the user's label and append an ellipsis as the loading
			// hint (e.g. "Load More …") rather than replacing it with a bare
			// "…". `finally` restores the original label after the request.
			button.textContent = originalLabel + ' …';

			const body = new FormData();
			body.append( 'action', action );
			body.append( 'nonce', nonce );
			body.append( 'page', currentPage + 1 );
			body.append( 'attrs', JSON.stringify( attrs ) );

			fetch( ajaxUrl, {
				method: 'POST',
				body,
				credentials: 'same-origin',
			} )
				.then( function ( res ) {
					return res.json();
				} )
				.then( function ( json ) {
					if ( ! json || ! json.success || ! json.data ) {
						return;
					}
					const beforeCount =
						inner.querySelectorAll( '.eb-fb-feed__col' ).length;
					if ( json.data.html ) {
						inner.insertAdjacentHTML( 'beforeend', json.data.html );
					}
					const allCards =
						inner.querySelectorAll( '.eb-fb-feed__col' );
					const added = allCards.length - beforeCount;
					currentPage = json.data.page || currentPage + 1;

					// Hand the freshly appended nodes to Isotope so masonry
					// re-packs and grid/list reflow. Image dimensions arrive
					// async — wait for them before the final layout pass.
					if ( isoRef.value && added > 0 ) {
						const newCards = Array.prototype.slice.call(
							allCards,
							beforeCount
						);
						isoRef.value.appended( newCards );

						// Re-layout once AFTER every image (including the
						// appended cards') has settled — NOT per-image via
						// `.on('progress')`. The progress-driven version fired
						// many overlapping `iso.layout()` calls; each emits a
						// `layoutComplete`, and with several in flight they
						// raced the single `_ebSuppressEqualize` boolean, so
						// the grid equalize ran on partial (pre-image) heights
						// or got wrongly suppressed — leaving appended cards
						// unequal or overlapping. One layout after images load
						// keeps the layout→equalize→layout flag handshake
						// deterministic; the grid `layoutComplete` handler then
						// re-equalizes with final heights. Reset the flag first
						// so a leftover `true` from an earlier pass can't eat
						// this equalize.
						const finalizeAppend = function () {
							if ( ! isoRef.value ) {
								return;
							}
							isoRef.value._ebSuppressEqualize = false;
							isoRef.value.layout();
						};
						if ( window.imagesLoaded ) {
							window.imagesLoaded( inner, finalizeAppend );
						} else {
							finalizeAppend();
						}
					}

					if ( added > 0 ) {
						announce( wrapper, localizeMore( added ) );
					}
					if ( ! json.data.has_more ) {
						button.setAttribute( 'hidden', '' );
						// Focus the first new post so focus is not lost
						// on the now-hidden button (WCAG 2.4.3).
						focusFirst( [ allCards[ beforeCount ] ] );
					}
				} )
				.catch( function () {
					// Network error — leave button visible so user can retry.
				} )
				.finally( function () {
					pending = false;
					button.disabled = false;
					button.textContent = originalLabel;
				} );
		} );
	}

	function initFeed( wrapper ) {
		const inner = wrapper.querySelector( '[data-layout]' );
		if ( ! inner ) {
			return;
		}

		const layout = inner.getAttribute( 'data-layout' ) || 'grid';
		const mode = inner.getAttribute( 'data-pagination' ) || 'none';

		// Numbered mode: initial Isotope view shows page 1 only. AJAX mode:
		// no filter — all rendered cards are visible. Carousel: skip Isotope.
		const initialFilter =
			mode === 'numbered' ? '[data-page="1"]' : undefined;

		// Shared mutable ref so the pagination handlers — wired up
		// synchronously below — see the Isotope instance the moment it
		// finishes mounting (imagesLoaded is async).
		const isoRef = { value: null };

		if ( layout !== 'carousel' ) {
			initIsotope( inner, layout, initialFilter, function ( iso ) {
				isoRef.value = iso;
			} );
		}

		if ( mode === 'numbered' ) {
			initNumbered( wrapper, isoRef );
		} else if ( mode === 'ajax' ) {
			initAjaxLoadMore( wrapper, isoRef );
		}
	}

	function init() {
		document
			.querySelectorAll( '.eb-facebook-feed-wrapper' )
			.forEach( initFeed );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
