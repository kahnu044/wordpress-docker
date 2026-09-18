/**
 * Internal dependencies
 */
import {
	NUMBER_OF_COLUMNS,
	ITEM_GAP,
	IMAGE_BORDER,
	LOAD_MORE_BORDER,
	PAGINATION_BORDER,
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
	WRAPPER_BG,
	WRAPPER_BORDER,
} from './constants';
import {
	typoPrefix_message,
	typoPrefix_meta,
	typoPrefix_header,
	typoPrefix_loadMore,
	typoPrefix_pagination,
} from './constants/typographyPrefixConstants';
/**
 * External dependencies
 */
import {
	softMinifyCssStrings,
	generateDimensionsControlStyles,
	generateBorderShadowStyles,
	generateBackgroundControlStyles,
	generateTypographyStyles,
	generateResponsiveRangeStyles,
	StyleComponent,
} from '@essential-blocks/controls';

// Item Gap is a single number; we apply half on each side of every item so
// the gap between two adjacent items lands on the user-set value (matches
// CSS Grid `gap` semantics). Falls back to 20/16/12 if the attr is unset
// to mirror the responsive defaults declared in attributes.js.
function parsePxOrFallback( raw, fallback ) {
	const n = parseInt( ( raw || '' ).replace( /[^0-9]/g, '' ), 10 );
	return Number.isFinite( n ) ? n : fallback;
}

export default function Style( props ) {
	const { attributes, setAttributes, name } = props;
	const {
		blockId,
		headerColor,
		messageColor,
		metaColor,
		actionsBorderColor,
		cardBgColor,
		loadMoreColor,
		loadMoreBgColor,
		loadMoreHoverColor,
		loadMoreHoverBgColor,
		paginationColor,
		paginationBgColor,
		paginationHoverColor,
		paginationHoverBgColor,
		paginationActiveColor,
		paginationActiveBgColor,
	} = attributes;

	// columns
	//
	// Each col width is `calc((100% / N) - 1px)`. The trailing `- 1px` is a
	// sub-pixel safety margin for Isotope's fitRows: with a bare `100% / N`
	// the N columns are an exact mathematical fit, but Firefox returns
	// un-rounded fractional getComputedStyle widths, so N items sum to a
	// hair over 100% and the last one wraps (the "2-per-row when columns=3
	// in Firefox" bug). Shaving 1px per column keeps N items strictly under
	// the container in every browser; the 1px is absorbed by the gap.
	//
	// NOTE: keep this rationale as a JS comment — do NOT inline it as a CSS
	// `/* */` comment inside the rule template below. The StyleHandler minify
	// pipeline mangles in-rule-body comments (the tail leaks in front of the
	// next declaration and invalidates it), which silently drops the width.
	const {
		rangeStylesDesktop: columnsDesktop,
		rangeStylesTab: columnsTab,
		rangeStylesMobile: columnsMobile,
	} = generateResponsiveRangeStyles( {
		controlName: NUMBER_OF_COLUMNS,
		property: '',
		attributes,
		customUnit: '',
	} );

	// item gap — single px value emitted as half-padding on each item.
	const {
		rangeStylesDesktop: gapDesktopRaw,
		rangeStylesTab: gapTabRaw,
		rangeStylesMobile: gapMobileRaw,
	} = generateResponsiveRangeStyles( {
		controlName: ITEM_GAP,
		property: '',
		attributes,
		customUnit: '',
	} );
	const gapDesktop = parsePxOrFallback( gapDesktopRaw, 20 );
	const gapTab = parsePxOrFallback( gapTabRaw, 16 );
	const gapMobile = parsePxOrFallback( gapMobileRaw, 12 );

	// post card border + shadow
	const {
		styesDesktop: cardBdShadowDesktop,
		styesTab: cardBdShadowTab,
		styesMobile: cardBdShadowMobile,
		stylesHoverDesktop: cardBdShadowHoverDesktop,
		stylesHoverTab: cardBdShadowHoverTab,
		stylesHoverMobile: cardBdShadowHoverMobile,
		transitionStyle: cardBdShadowTransition,
	} = generateBorderShadowStyles( {
		controlName: IMAGE_BORDER,
		attributes,
	} );

	// Load More button border + shadow (separate prefix so it has its own
	// normal + hover state, independent of the post card).
	const {
		styesDesktop: loadMoreBdShadowDesktop,
		styesTab: loadMoreBdShadowTab,
		styesMobile: loadMoreBdShadowMobile,
		stylesHoverDesktop: loadMoreBdShadowHoverDesktop,
		stylesHoverTab: loadMoreBdShadowHoverTab,
		stylesHoverMobile: loadMoreBdShadowHoverMobile,
		transitionStyle: loadMoreBdShadowTransition,
	} = generateBorderShadowStyles( {
		controlName: LOAD_MORE_BORDER,
		attributes,
	} );

	// Pagination chip border + shadow — applies to page-link, prev, next
	// chips uniformly; hover variant doubles up for the .is-current chip
	// in the dynamic rules below.
	const {
		styesDesktop: paginationBdShadowDesktop,
		styesTab: paginationBdShadowTab,
		styesMobile: paginationBdShadowMobile,
		stylesHoverDesktop: paginationBdShadowHoverDesktop,
		stylesHoverTab: paginationBdShadowHoverTab,
		stylesHoverMobile: paginationBdShadowHoverMobile,
		transitionStyle: paginationBdShadowTransition,
	} = generateBorderShadowStyles( {
		controlName: PAGINATION_BORDER,
		attributes,
	} );

	// typography
	const {
		typoStylesDesktop: headerTypoDesktop,
		typoStylesTab: headerTypoTab,
		typoStylesMobile: headerTypoMobile,
	} = generateTypographyStyles( {
		attributes,
		prefixConstant: typoPrefix_header,
	} );

	const {
		typoStylesDesktop: messageTypoDesktop,
		typoStylesTab: messageTypoTab,
		typoStylesMobile: messageTypoMobile,
	} = generateTypographyStyles( {
		attributes,
		prefixConstant: typoPrefix_message,
	} );

	const {
		typoStylesDesktop: metaTypoDesktop,
		typoStylesTab: metaTypoTab,
		typoStylesMobile: metaTypoMobile,
	} = generateTypographyStyles( {
		attributes,
		prefixConstant: typoPrefix_meta,
	} );

	const {
		typoStylesDesktop: loadMoreTypoDesktop,
		typoStylesTab: loadMoreTypoTab,
		typoStylesMobile: loadMoreTypoMobile,
	} = generateTypographyStyles( {
		attributes,
		prefixConstant: typoPrefix_loadMore,
	} );

	const {
		typoStylesDesktop: paginationTypoDesktop,
		typoStylesTab: paginationTypoTab,
		typoStylesMobile: paginationTypoMobile,
	} = generateTypographyStyles( {
		attributes,
		prefixConstant: typoPrefix_pagination,
	} );

	// wrapper margin
	const {
		dimensionStylesDesktop: wrpMarginDesktop,
		dimensionStylesTab: wrpMarginTab,
		dimensionStylesMobile: wrpMarginMobile,
	} = generateDimensionsControlStyles( {
		controlName: WRAPPER_MARGIN,
		styleFor: 'margin',
		attributes,
	} );

	// wrapper padding
	const {
		dimensionStylesDesktop: wrpPaddingDesktop,
		dimensionStylesTab: wrpPaddingTab,
		dimensionStylesMobile: wrpPaddingMobile,
	} = generateDimensionsControlStyles( {
		controlName: WRAPPER_PADDING,
		styleFor: 'padding',
		attributes,
	} );

	// wrapper border + shadow (Advanced tab) — normal + hover, per device.
	const {
		styesDesktop: wrpBdShadowDesktop,
		styesTab: wrpBdShadowTab,
		styesMobile: wrpBdShadowMobile,
		stylesHoverDesktop: wrpBdShadowHoverDesktop,
		stylesHoverTab: wrpBdShadowHoverTab,
		stylesHoverMobile: wrpBdShadowHoverMobile,
		transitionStyle: wrpBdShadowTransition,
	} = generateBorderShadowStyles( {
		controlName: WRAPPER_BORDER,
		attributes,
	} );

	// wrapper background (Advanced tab) — fill / gradient / image + overlay.
	const {
		backgroundStylesDesktop: wrpBgDesktop,
		hoverBackgroundStylesDesktop: wrpBgHoverDesktop,
		backgroundStylesTab: wrpBgTab,
		hoverBackgroundStylesTab: wrpBgHoverTab,
		backgroundStylesMobile: wrpBgMobile,
		hoverBackgroundStylesMobile: wrpBgHoverMobile,
		overlayStylesDesktop: wrpOverlayDesktop,
		hoverOverlayStylesDesktop: wrpOverlayHoverDesktop,
		overlayStylesTab: wrpOverlayTab,
		hoverOverlayStylesTab: wrpOverlayHoverTab,
		overlayStylesMobile: wrpOverlayMobile,
		hoverOverlayStylesMobile: wrpOverlayHoverMobile,
		bgTransitionStyle: wrpBgTransition,
		ovlTransitionStyle: wrpOvlTransition,
	} = generateBackgroundControlStyles( {
		attributes,
		controlName: WRAPPER_BG,
	} );

	const desktopStyles = `
        .eb-facebook-feed-wrapper.${ blockId } {
            position: relative;
            ${ wrpMarginDesktop }
            ${ wrpPaddingDesktop }
            ${ wrpBgDesktop }
            ${ wrpBdShadowDesktop }
            transition: ${ wrpBgTransition }, ${ wrpBdShadowTransition };
        }

        .eb-facebook-feed-wrapper.${ blockId }:hover {
            ${ wrpBgHoverDesktop }
            ${ wrpBdShadowHoverDesktop }
        }

        .eb-facebook-feed-wrapper.${ blockId }::before {
            ${ wrpOverlayDesktop }
            transition: ${ wrpOvlTransition };
        }

        .eb-facebook-feed-wrapper.${ blockId }:hover::before {
            ${ wrpOverlayHoverDesktop }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__col {
            width: calc((100% / ${
				columnsDesktop.replace( /[^0-9]/g, '' ) || 3
			}) - 1px );
        }

        /* Item Gap — half-padding on items + negative margin on the
           grid/masonry container so the container outer edge sits flush
           (matches CSS Grid gap semantics). List uses a plain bottom
           margin since it is a single column. */
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--grid,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--masonry {
            margin: -${ gapDesktop / 2 }px;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--grid > .eb-fb-feed__col,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--masonry > .eb-fb-feed__col {
            padding: ${ gapDesktop / 2 }px;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--list > .eb-fb-feed__col {
            margin-bottom: ${ gapDesktop }px;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--list > .eb-fb-feed__col:last-child {
            margin-bottom: 0;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__post {
            ${ cardBdShadowDesktop }
            background: ${ cardBgColor || '#ffffff' };
            overflow: hidden;
            transition: ${ cardBdShadowTransition };
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__post:hover {
            ${ cardBdShadowHoverDesktop }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__name {
            ${ headerTypoDesktop }
            ${ headerColor ? `color: ${ headerColor };` : '' }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__message {
            ${ messageTypoDesktop }
            ${ messageColor ? `color: ${ messageColor };` : '' }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__meta,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__actions {
            ${ metaTypoDesktop }
            ${ metaColor ? `color: ${ metaColor };` : '' }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__actions {
            ${ actionsBorderColor ? `border-top-color: ${ actionsBorderColor };` : '' }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__load-more {
            ${ loadMoreTypoDesktop }
            ${ loadMoreBdShadowDesktop }
            color: ${ loadMoreColor || '#ffffff' };
            background: ${ loadMoreBgColor || 'var(--eb-global-primary-color, #1877F2)' };
            transition: ${ loadMoreBdShadowTransition }, color 0.2s ease, background 0.2s ease;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__load-more:hover {
            ${ loadMoreBdShadowHoverDesktop }
            color: ${ loadMoreHoverColor || '#ffffff' };
            background: ${ loadMoreHoverBgColor || '#0d6efd' };
        }

        /* Pagination chips — page-link / prev / next share the chip look,
           so the normal-state rules apply to all three; the .is-current
           override carries the Active colour pair. */
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-link,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-prev,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-next {
            ${ paginationTypoDesktop }
            ${ paginationBdShadowDesktop }
            color: ${ paginationColor || 'var(--eb-global-text-color, #4a463f)' };
            background: ${ paginationBgColor || 'var(--eb-global-background-color, #f5f6fa)' };
            transition: ${ paginationBdShadowTransition }, color 0.2s ease, background 0.2s ease;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-link:hover,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-prev:hover:not(:disabled),
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-next:hover:not(:disabled) {
            ${ paginationBdShadowHoverDesktop }
            color: ${ paginationHoverColor || '#ffffff' };
            background: ${ paginationHoverBgColor || 'var(--eb-global-primary-color, #1877F2)' };
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-link.is-current {
            color: ${ paginationActiveColor || '#ffffff' };
            background: ${ paginationActiveBgColor || 'var(--eb-global-primary-color, #1877F2)' };
            border-color: transparent;
        }
    `;

	const tabStyles = `
        .eb-facebook-feed-wrapper.${ blockId } {
            ${ wrpMarginTab }
            ${ wrpPaddingTab }
            ${ wrpBgTab }
            ${ wrpBdShadowTab }
        }

        .eb-facebook-feed-wrapper.${ blockId }:hover {
            ${ wrpBgHoverTab }
            ${ wrpBdShadowHoverTab }
        }

        .eb-facebook-feed-wrapper.${ blockId }::before {
            ${ wrpOverlayTab }
        }

        .eb-facebook-feed-wrapper.${ blockId }:hover::before {
            ${ wrpOverlayHoverTab }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__col {
            ${
				columnsTab === ''
					? `width: calc((100% / 2) - 1px);`
					: `width: calc((100% / ${
							columnsTab.replace( /[^0-9]/g, '' ) || 2
					  }) - 1px );`
			}
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--grid,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--masonry {
            margin: -${ gapTab / 2 }px;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--grid > .eb-fb-feed__col,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--masonry > .eb-fb-feed__col {
            padding: ${ gapTab / 2 }px;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--list > .eb-fb-feed__col {
            margin-bottom: ${ gapTab }px;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__post {
            ${ cardBdShadowTab }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__post:hover {
            ${ cardBdShadowHoverTab }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__name {
            ${ headerTypoTab }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__message {
            ${ messageTypoTab }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__meta,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__actions {
            ${ metaTypoTab }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__load-more {
            ${ loadMoreTypoTab }
            ${ loadMoreBdShadowTab }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__load-more:hover {
            ${ loadMoreBdShadowHoverTab }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-link,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-prev,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-next {
            ${ paginationTypoTab }
            ${ paginationBdShadowTab }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-link:hover,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-prev:hover:not(:disabled),
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-next:hover:not(:disabled) {
            ${ paginationBdShadowHoverTab }
        }
    `;

	const mobileStyles = `
        .eb-facebook-feed-wrapper.${ blockId } {
            ${ wrpMarginMobile }
            ${ wrpPaddingMobile }
            ${ wrpBgMobile }
            ${ wrpBdShadowMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId }:hover {
            ${ wrpBgHoverMobile }
            ${ wrpBdShadowHoverMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId }::before {
            ${ wrpOverlayMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId }:hover::before {
            ${ wrpOverlayHoverMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__col {
            ${
				columnsMobile === ''
					? `width: calc((100% / 1) - 1px);`
					: `width: calc((100% / ${
							columnsMobile.replace( /[^0-9]/g, '' ) || 1
					  }) - 1px );`
			}
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--grid,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--masonry {
            margin: -${ gapMobile / 2 }px;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--grid > .eb-fb-feed__col,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--masonry > .eb-fb-feed__col {
            padding: ${ gapMobile / 2 }px;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed--list > .eb-fb-feed__col {
            margin-bottom: ${ gapMobile }px;
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__post {
            ${ cardBdShadowMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__post:hover {
            ${ cardBdShadowHoverMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__name {
            ${ headerTypoMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__message {
            ${ messageTypoMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__meta,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__actions {
            ${ metaTypoMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__load-more {
            ${ loadMoreTypoMobile }
            ${ loadMoreBdShadowMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__load-more:hover {
            ${ loadMoreBdShadowHoverMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-link,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-prev,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-next {
            ${ paginationTypoMobile }
            ${ paginationBdShadowMobile }
        }

        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-link:hover,
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-prev:hover:not(:disabled),
        .eb-facebook-feed-wrapper.${ blockId } .eb-fb-feed__page-next:hover:not(:disabled) {
            ${ paginationBdShadowHoverMobile }
        }
    `;

	const desktopAllStyles = softMinifyCssStrings( desktopStyles );
	const tabAllStyles = softMinifyCssStrings( tabStyles );
	const mobileAllStyles = softMinifyCssStrings( mobileStyles );

	return (
		<StyleComponent
			attributes={ attributes }
			setAttributes={ setAttributes }
			desktopAllStyles={ desktopAllStyles }
			tabAllStyles={ tabAllStyles }
			mobileAllStyles={ mobileAllStyles }
			blockName={ name }
		/>
	);
}
