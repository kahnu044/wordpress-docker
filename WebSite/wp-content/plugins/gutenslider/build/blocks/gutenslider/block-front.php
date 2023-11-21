<?php
/**
 * Gutenslider Dynamic Render Callback *
 *
 * @since   3.0.0
 * @package Gutenslider
 */

if ( ! function_exists( 'eedee_gutenslider_dynamic_render_callback' ) ) {
	/**
	 * Register Gutenberg block template that is rendered on server side
	 *
	 * @param Array  $attr are the attributes from the block.
	 * @param String $inner_content the content of gutensliders innerBlocks.
	 * @link  https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @uses  {save} the content returned from the save function of Gutenslider block.
	 * @since 1.16.0
	 */
	function eedee_gutenslider_dynamic_render_callback( $attr, $inner_content ) {

		if (! is_admin()) {
			wp_enqueue_script('eedee-gutenslider-front');
			wp_enqueue_style('eedee-gutenslider-block-editor');
		}

		include 'attributes.php';

		$POSITION_CLASSNAMES = array(
			'top left' => 'is-position-top-left',
			'top center' => 'is-position-top-center',
			'top right' => 'is-position-top-right',
			'center left' => 'is-position-center-left',
			'center center' => 'is-position-center-center',
			'center' => 'is-position-center-center',
			'center right' => 'is-position-center-right',
			'bottom left' => 'is-position-bottom-left',
			'bottom center' => 'is-position-bottom-center',
			'bottom right' => 'is-position-bottom-right',
		);

		$gap = _wp_array_get( $attr, array( 'style', 'spacing', 'blockGap' ) );
		// Skip if gap value contains unsupported characters.
		// Regex for CSS value borrowed from `safecss_filter_attr`, and used here
		// because we only want to match against the value, not the CSS attribute.
		if ( is_array( $gap ) ) {
			foreach ( $gap as $key => $value ) {
				// Make sure $value is a string to avoid PHP 8.1 deprecation error in preg_match() when the value is null.
				$value = is_string( $value ) ? $value : '';
				$value = $value && preg_match( '%[\\\(&=}]|/\*%', $value ) ? null : $value;
	
				// Get spacing CSS variable from preset value if provided.
				if ( is_string( $value ) && str_contains( $value, 'var:preset|spacing|' ) ) {
					$index_to_splice = strrpos( $value, '|' ) + 1;
					$slug            = _wp_to_kebab_case( substr( $value, $index_to_splice ) );
					$value           = "var(--wp--preset--spacing--$slug)";
				}
	
				$gap[ $key ] = $value;
			}
		} else {
			// Make sure $gap is a string to avoid PHP 8.1 deprecation error in preg_match() when the value is null.
			$gap = is_string( $gap ) ? $gap : '';
			$gap = $gap && preg_match( '%[\\\(&=}]|/\*%', $gap ) ? null : $gap;
	
			// Get spacing CSS variable from preset value if provided.
			if ( is_string( $gap ) && str_contains( $gap, 'var:preset|spacing|' ) ) {
				$index_to_splice = strrpos( $gap, '|' ) + 1;
				$slug            = _wp_to_kebab_case( substr( $gap, $index_to_splice ) );
				$gap             = "var(--wp--preset--spacing--$slug)";
			}
		}

		$fallback_gap = 'var( --wp--style--gallery-gap-default, var( --gallery-block--gutter-size, var( --wp--style--block-gap, 0.5em ) ) )';
		$gap_value    = $gap ? $gap : $fallback_gap;
		$gap_horizontal   = $gap_value;
		$gap_vertical = $gap_value;
	
		if ( is_array( $gap_value ) ) {
			$gap_vertical    = isset( $gap_value['top'] ) ? $gap_value['top'] : $fallback_gap;
			$gap_horizontal = isset( $gap_value['left'] ) ? $gap_value['left'] : $fallback_gap;
			$gap_value  = $gap_vertical === $gap_horizontal ? $gap_vertical : $gap_vertical . ' ' . $gap_horizontal;
		}
	
		// The unstable gallery gap calculation requires a real value (such as `0px`) and not `0`.
		if ( '0' === $gap_horizontal ) {
			$gap_horizontal = '0px';
		}

		$id = '';

		$getSlidesPerView = function ( $slidesBreakpoint ) use (&$attr) {
			if ( $attr['animation'] === 'fade' ||
				$attr['animation'] === 'cube' ||
				$attr['animation'] === 'cards' ||
				$attr['animation'] === 'flip' ) {
				return 1;
			}
			if ( $slidesBreakpoint === 0 ) {
				return 'auto';
			}
			return floatval( $slidesBreakpoint );
		};

		if ( isset( $attr['gsBlockId'] ) ) {
			$id = sprintf(
				'gutenslider-%1$s',
				esc_attr( $attr[ 'gsBlockId' ] )
			);
		} else {
			$attr['gsBlockId'] = '';
		}

		$class = sprintf(
			'wp-block-eedee-block-gutenslider gs-frontend content-%1$s',
			esc_attr( $attr['contentMode'] )
		);
		if ( isset( $attr['align'] ) ) {
			$class .= ' align' . esc_attr( $attr['align'] );
		}
		if ( isset( $attr['adaptiveHeight'] ) && $attr['adaptiveHeight'] ) {
						$class .= ' adaptive-height';
		}
		if ( isset( $attr['adaptiveHeightMd'] ) && $attr['adaptiveHeightMd'] ) {
					$class .= ' adaptive-height-md';
		}
		if ( isset( $attr['adaptiveHeightSm'] ) && $attr['adaptiveHeightSm'] ) {
					$class .= ' adaptive-height-sm';
		}
		if ( isset( $attr['isFullScreen'] ) && $attr['isFullScreen'] ) {
			$class .= ' is-full';
		}
		if ( isset( $attr['isFullScreen'] )
			&& ! $attr['isFullScreen']
			&& isset( $attr['parallax'] )
			&& $attr['parallax'] ) {
				$class .= ' is-full';
		}
		if ( isset( $attr['hasParallax'] ) && $attr['hasParallax'] ) {
			$class .= ' has-parallax';
		}
		if ( isset( $attr['arrowStyle'] ) && $attr['arrowStyle'] ) {
			$class .= ' ' . esc_attr( $attr['arrowStyle'] );
		}
		if ( isset( $attr['arrowPosition'] ) ) {
			$class .= ' ' . esc_attr( $attr['arrowPosition'] );
		}
		if ( isset( $attr['arrowMixBlendMode'] ) ) {
			$class .= ' arrow-mb-' . esc_attr( $attr['arrowMixBlendMode'] );
		}
		if ( isset( $attr['arrows'] ) && $attr['arrows']) {
			$class .= ' arrows-lg';
		} else {
			$class .= ' arrows-lg-none';
		}
		if ( isset( $attr['arrowsMd'] ) && $attr['arrowsMd']) {
			$class .= ' arrows-md';
		} else {
			$class .= ' arrows-md-none';
		}
		if ( isset( $attr['arrowsSm'] ) && $attr['arrowsSm']) {
			$class .= ' arrows-sm';
		} else {
			$class .= ' arrows-sm-none';
		}
		if ( isset( $attr['dotStyle'] ) && $attr['dotStyle'] ) {
			$class .= ' ' . esc_attr( $attr['dotStyle'] );
		}
		if ( isset( $attr['dots'] ) && $attr['dots']) {
			$class .= ' dots-lg';
		} else {
			$class .= ' dots-lg-none';
		}
		if ( isset( $attr['dotsMd'] ) && $attr['dotsMd']) {
			$class .= ' dots-md';
		} else {
			$class .= ' dots-md-none';
		}
		if ( isset( $attr['dotsSm'] ) && $attr['dotsSm']) {
			$class .= ' dots-sm';
		} else {
			$class .= ' dots-sm-none';
		}
		if ( isset( $attr['dotPosition'] ) ) {
			$class .= ' ' . esc_attr( $attr['dotPosition'] );
		}
		if ( isset( $attr['className'] ) ) {
			$class .= ' ' . esc_attr( $attr['className'] );
		}
		if ( isset( $attr['contentPosition'] ) && $attr['contentPosition'] !== '' ) {
			$class .= sprintf( ' %1$s', $POSITION_CLASSNAMES[ $attr['contentPosition'] ] );
		}
		if ( isset( $attr['visibleOnDesktop'] ) && ! $attr['visibleOnDesktop'] ) {
			$class .= ' ed-desktop-hidden';
		}
		if ( isset( $attr['visibleOnTablet'] ) && ! $attr['visibleOnTablet'] ) {
			$class .= ' ed-tablet-hidden';
		}
		if ( isset( $attr['visibleOnMobile'] ) && ! $attr['visibleOnMobile'] ) {
			$class .= ' ed-mobile-hidden';
		}
		if ( isset( $attr['mixBlendMode'] ) ) {
			$class .= ' mb-' . esc_attr( $attr['mixBlendMode'] );
		}
		if ( isset( $attr['hasLg'] ) && $attr['hasLg'] && isset( $attr['lgZoomIcon'] ) && $attr['lgZoomIcon'] ) {
			$class .= ' lg-zoom-icon';
		}

		if ( isset( $attr['firstNotLazy'] ) && $attr['firstNotLazy'] ) {
			$class .= ' gs-first-not-lazy';
		}

		if ( isset( $attr['wrapAutoHeight'] ) && $attr['wrapAutoHeight'] ) {
			$class .= ' wrap-auto-height';
		}



		$bg_image = '';
		// if ( isset( $attr['bgImageId'] ) ) {
		// 	if ( is_numeric($attr['bgImageId']) ) {
		// 		if ( wp_get_attachment_image_src( $attr['bgImageId'] ) ) {
		// 			$bg_image = sprintf(
		// 				'<img src="%1$s" alt="gutenslider-loading-image" />',
		// 				wp_get_attachment_image_src( $attr['bgImageId'], 'medium' )[0]
		// 			);
		// 		}
		// 	} else {
		// 		$bg_image = sprintf(
		// 			'<div style="width: 100%%; height: 100%%; background: %1$s;"></div>', $attr['bgImageId']
		// 		);
		// 	}
		// }
		// var_dump( $attr['bgImageId'] );

		$effect = esc_attr( $attr['animation'] );

		$arrow_bg_color = isset( $attr['arrowBgColor'] ) ? esc_attr( $attr['arrowBgColor'] ) : 'transparent';
		$arrow_bg_hover_color = isset( $attr['arrowBgColor'] ) ? esc_attr( $attr['arrowBgColor'] ) : 'transparent';

		$component_style = sprintf(
			'--gutenslider-min-height: %1$s;'
			. '--gutenslider-arrow-size: %2$spx;'
			. '--gutenslider-dot-size: %3$spx;'
			. '--gutenslider-arrow-color: %4$s;'
			. '--gutenslider-dot-color: %5$s;'
			. '--gutenslider-padding-y-mobile: %6$s%12$s;'
			. '--gutenslider-padding-x-mobile: %7$s%13$s;'
			. '--gutenslider-padding-y-tablet: %8$s%12$s;'
			. '--gutenslider-padding-x-tablet: %9$s%13$s;'
			. '--gutenslider-padding-y-desktop: %10$s%12$s;'
			. '--gutenslider-padding-x-desktop: %11$s%13$s;'
			. '--gutenslider-bg-image: url(%14$s);'
			. '--gutenslider-min-height-md: %15$s;'
			. '--gutenslider-min-height-sm: %16$s;'
			. '--gutenslider-padding-x: %17$s;'
			. '--gutenslider-padding-x-md: %18$s;'
			. '--gutenslider-padding-x-sm: %19$s;'
			. '--gutenslider-padding-y: %20$s;'
			. '--gutenslider-padding-y-md: %21$s;'
			. '--gutenslider-padding-y-sm: %22$s;'
			. '--gutenslider-arrow-size-md: %23$spx;'
			. '--gutenslider-arrow-size-sm: %24$spx;'
			. '--gutenslider-dot-size-md: %25$spx;'
			. '--gutenslider-dot-size-sm: %26$spx;'
			. '--gutenslider-arrow-bg-color: %27$s;'
			. '--gutenslider-arrow-hover-color: %28$s;'
			. '--gutenslider-arrow-bg-hover-color: %29$s;'
			. '--gutenslider-arrow-x-offset: %30$spx;'
			. '--gutenslider-arrow-x-offset-md: %31$spx;'
			. '--gutenslider-arrow-x-offset-sm: %32$spx;'
			. '--gutenslider-arrow-y-offset: %33$spx;'
			. '--gutenslider-arrow-y-offset-md: %34$spx;'
			. '--gutenslider-arrow-y-offset-sm: %35$spx;'
			. '--gutenslider-arrow-x-spacing: %36$spx;'
			. '--gutenslider-dot-y-offset: %37$spx;'
			. '--gutenslider-dot-y-offset-md: %38$spx;'
			. '--gutenslider-dot-y-offset-sm: %39$spx;'
			. '--gutenslider-margin-x: %40$s;'
			. '--gutenslider-margin-x-md: %41$s;'
			. '--gutenslider-margin-x-sm: %42$s;'
			. '--gutenslider-margin-y: %43$s;'
			. '--gutenslider-margin-y-md: %44$s;'
			. '--gutenslider-margin-y-sm: %45$s;'
			. '--gutenslider-divider-top: %46$spx;'
			. '--gutenslider-divider-bottom: %47$spx;'
			. '--gutenslider-lightgallery-bg: %48$s;'
			. '--gutenslider-lightgallery-font: %49$s;'
			. '--gs-first-pos: %50$s;'
			. '--gs-gap-vertical: %51$s;'
			. '--gs-gap-horizontal: %52$s;',
			$attr['sliderHeight'],
			$attr['arrowSize'],
			$attr['dotSize'],
			$attr['arrowColor'],
			$attr['dotColor'],
			$attr['spacingYMobile'],
			$attr['spacingXMobile'],
			$attr['spacingYTablet'],
			$attr['spacingXTablet'],
			$attr['spacingYDesktop'],
			$attr['spacingXDesktop'],
			$attr['spacingYUnit'],
			$attr['spacingXUnit'],
			'',
			$attr['sliderHeightMd'],
			$attr['sliderHeightSm'],
			$attr['paddingX'],
			$attr['paddingXMd'],
			$attr['paddingXSm'],
			$attr['paddingY'],
			$attr['paddingYMd'],
			$attr['paddingYSm'],
			$attr['arrowSizeMd'],
			$attr['arrowSizeSm'],
			$attr['dotSizeMd'],
			$attr['dotSizeSm'],
			$attr['arrowBgColor'],
			$attr['arrowHoverColor'],
			$attr['arrowBgHoverColor'],
			$attr['arrowXOffset'],
			$attr['arrowXOffsetMd'],
			$attr['arrowXOffsetSm'],
			$attr['arrowYOffset'],
			$attr['arrowYOffsetMd'],
			$attr['arrowYOffsetSm'],
			$attr['arrowXSpacing'],
			$attr['dotYOffset'],
			$attr['dotYOffsetMd'],
			$attr['dotYOffsetSm'],
			$attr['marginX'],
			$attr['marginXMd'],
			$attr['marginXSm'],
			$attr['marginY'],
			$attr['marginYMd'],
			$attr['marginYSm'],
			$attr['dividers']['top']['height'],
			$attr['dividers']['bottom']['height'],
			$attr['lgBgColor'],
			$attr['lgFontColor'],
			$attr['bgImagePos'],
			$gap_vertical,
			$gap_horizontal
		);

		$overlay_style = '';
		if ( isset( $attr['rgbaBackground'] ) && $attr['rgbaBackground'] ) {
			$overlay_style .= 'background: ' . esc_attr( $attr['rgbaBackground'] ) . ';';
		}

		$content_classes = sprintf(
			'wp-block-eedee-gutenslider__content co-%2$s',
			esc_attr( $attr['mixBlendMode'] ),
			floatval( $attr['contentOpacity'] )
		);

		$arr_key = array_search( $attr['arrowStyle'], array_column( $eedee_gutenslider_arrows, 'value' ) );
		$prev_arrow = $eedee_gutenslider_arrows[ $arr_key ][ 'prev' ];
		$next_arrow = $eedee_gutenslider_arrows[ $arr_key ][ 'next' ];

		$slider_settings = array(
			'autoplay'         => boolval( $attr['autoplay'] ) ? array(
				'delay' => intval( $attr['duration']) * 1000,
				'pauseOnMouseEnter' => boolval( $attr['pauseOnHover'] ),
				'disableOnInteraction' => ! boolval( $attr['pauseOnHover'] )
			) : false,
			'speed'            => floatval( $attr['fadeSpeed'] ) * 1000,
			'direction'        => 'horizontal',
			'autoHeight'       => isset( $attr['adaptiveHeightSm'] ) ? esc_attr( $attr['adaptiveHeightSm'] ) : false,
			'loop'             => $getSlidesPerView( $attr['slidesToShowSm'] ) !== 'auto' ? $attr['loop'] : false,
			// 'rewind'		   => $getSlidesPerView( $attr['slidesToShowSm'] ) === 'auto' && $attr['loop'],
			// 'loopedSlides'     => 5,
			'centeredSlides'   => $attr['centeredSlides'] || esc_attr($attr['animation']) === 'coverflow',
			'spaceBetween'     => $attr['animation'] === 'cube' ? 0 : intval($attr['spaceBetweenSm']),
			'slidesPerView'    => $getSlidesPerView( $attr['slidesToShowSm'] ),
			'slidesPerGroup'   => intval($attr['slidesToScrollSm']),
			'effect'           => $effect,
			'coverflowEffect'  => array(
				'rotate'       => 30,
				'slideShadows' => false,
				'depth'        => 100,
				'stretch'      => 50,
				'modifier'     => 1,
			),
			'fadeEffect'       => array(
				'crossFade' => true,
			),
			'zoom'             => esc_attr( $attr['zoom'] ),
			'navigation'       => array(
				'nextEl' => '#gutenslider-' . esc_attr( $attr['gsBlockId'] ) . ' .eedee-gutenslider-next',
				'prevEl' => '#gutenslider-' . esc_attr( $attr['gsBlockId'] ) . ' .eedee-gutenslider-prev',
			),
			'pagination'       => array(
				'type'           => $attr['dotType'] === 'dynamic' ? 'bullets' : esc_attr( $attr['dotType'] ),
				'clickable'      => true,
				'dynamicBullets' => $attr['dotType'] === 'dynamic',
				'el' => '#gutenslider-' . esc_attr( $attr['gsBlockId'] ) . ' .eedee-gutenslider-pagination',
			),
			// 'breakpoints'      => $swiper_breakpoints,
			'pauseOnHover'     => esc_attr( $attr[ 'pauseOnHover' ] ),
			'watchSlidesProgress' => true,
			'watchSlidesVisibility' => true,

			//responsive settings ( not real swiper settings, js frontend will take care)
			'settingsMd' => array(
				'autoHeight'   => isset( $attr['adaptiveHeightMd'] ) ? esc_attr( $attr['adaptiveHeightMd'] ) : false,
				'slidesPerView' => $getSlidesPerView( $attr['slidesToShowMd'] ),
				'slidesPerGroup' => intval( $attr['slidesToScrollMd'] ),
				'spaceBetween' => $attr['animation'] === 'cube' ? 0 : intval( $attr['spaceBetweenMd'] ),
				'loop'             => $getSlidesPerView( $attr['slidesToShowMd'] ) !== 'auto' ? $attr['loop'] : false,
				// 'rewind'		   => $getSlidesPerView( $attr['slidesToShowMd'] ) === 'auto' && $attr['loop'],
			),
			'settingsLg' => array(
				'autoHeight'   => isset( $attr['adaptiveHeight'] ) ? esc_attr( $attr['adaptiveHeight'] ) : false,
				'slidesPerView' => $getSlidesPerView( $attr['slidesToShow'] ),
				'slidesPerGroup' => intval( $attr['slidesToScroll'] ),
				'spaceBetween' => $attr['animation'] === 'cube' ? 0 : intval( $attr['spaceBetween'] ),
				'loop'             => $getSlidesPerView( $attr['slidesToShow'] ) !== 'auto' ? $attr['loop'] : false,
				// 'rewind'		   => $getSlidesPerView( $attr['slidesToShow'] ) === 'auto' && $attr['loop'],
			),
			'hasLg' => $attr[ 'hasLg' ],
			'hasLgCounter' => $attr[ 'hasLgCounter' ],
			'isFullScreen' => $attr[ 'isFullScreen' ],
			'arrowsFollowMouse' => $attr[ 'arrowPosition' ] === 'arrow-follow-mouse',
			'lgTitle' => isset( $attr[ 'lgTitle' ] ) ? esc_attr( $attr[ 'lgTitle' ] ) : '',
			'lgCaption' => isset( $attr[ 'lgCaption' ] ) ? esc_attr( $attr[ 'lgCaption' ] ) : '',
			'lgThumbnails' => boolval($attr[ 'lgThumbnails' ]),
			'lgZoomEnabled' => boolval($attr[ 'lgZoomEnabled' ]),
			'keyboard' => boolval( $attr[ 'keyboardNavigation' ] ) ?
				array('keyboard' => array(
					'enabled' => true,
					'onlyInViewport' => true,
				)) : false,
			'hashNavigation' => boolval( $attr[ 'hashNavigation' ] ) ? array(
				'replaceState' => true,
				'watchState' => true,
			) : false,
			'dividers' => isset( $attr['dividers'] ) &&
				isset( $attr['dividers']['top'] ) &&
				isset( $attr['dividers']['top']['value'] ) &&
				$attr['dividers']['top']['value'] !== 'none' ||
				isset( $attr['dividers'] ) &&
				isset( $attr['dividers']['bottom'] ) &&
				isset( $attr['dividers']['bottom']['value'] ) &&
				$attr['dividers']['bottom']['value'] !== 'none',
		);

		$slider_settings = json_encode( $slider_settings );

		$additional_attributes = '';
		if ( isset( $attr['parallaxDirection'] ) ) {
			$additional_attributes .= sprintf(
				'data-parallax-direction="%1$s"',
				esc_attr( $attr['parallaxDirection'] )
			);
		}
		if ( isset( $attr['parallaxAmount'] ) ) {
			$additional_attributes .= sprintf(
				' data-parallax-amount="%1$s"',
				floatval( $attr['parallaxAmount'] )
			);
		}
		if ( isset( $attr['lgTransition'] ) ) {
			$additional_attributes .= sprintf(
				' data-lg-transition="%1$s"',
				esc_attr( $attr['lgTransition'] )
			);
		}

		$divider_top = '';
		$divider_bottom = '';

		if (
			isset( $attr['dividers'] )
			&& $attr['animation'] !== 'flip'
			&& $attr['animation'] !== 'cube'
			&& $attr['animation'] !== 'cards'
		) {
			if ( isset( $attr['dividers']['top'] ) ) {
				if (
					array_key_exists( 'value', $attr['dividers']['top'] )
					&& array_key_exists( $attr['dividers']['top']['value'], $eedee_gutenslider_dividers )
					&& array_key_exists( 'svg', $eedee_gutenslider_dividers[ $attr['dividers']['top']['value'] ] )
				) {
					$divider_top_color = $attr['dividers']['top']['color'];
					$divider_top_height = $attr['dividers']['top']['height'];
					$divider_top_svg = $eedee_gutenslider_dividers[ $attr['dividers']['top']['value'] ]['svg'];
					$divider_top_svg_inverted = false;
					$divider_top_additional_classes = '';
					if (
						$attr['dividers']['top']['inverted'] &&
						array_key_exists( 'svg-inverted', $eedee_gutenslider_dividers[ $attr['dividers']['top']['value'] ])
					) {
						$divider_top_svg_inverted = $eedee_gutenslider_dividers[ $attr['dividers']['top']['value'] ]['svg-inverted'];
						$divider_top_additional_classes .= ' inverted';
					}
					if ( $attr['dividers']['top']['flipY'] ) {
						$divider_top_additional_classes .= ' flip-y';
					}

					$divider_top = sprintf(
						'<div class="gutenslider-divider-top%4$s" style="color:%1$s;">%3$s</div>',
						$divider_top_color,
						$divider_top_height,
						$divider_top_svg_inverted && $attr['dividers']['top']['inverted'] ? $divider_top_svg_inverted : $divider_top_svg,
						$divider_top_additional_classes
					);
				}
			}

			if ( isset( $attr['dividers']['bottom'] ) ) {
				if (
					array_key_exists( 'value', $attr['dividers']['bottom'] )
					&& array_key_exists( $attr['dividers']['bottom']['value'], $eedee_gutenslider_dividers )
					&& array_key_exists( 'svg', $eedee_gutenslider_dividers[ $attr['dividers']['bottom']['value'] ] )
				) {
					$divider_bottom_color = $attr['dividers']['bottom']['color'];
					$divider_bottom_height = $attr['dividers']['bottom']['height'];
					$divider_bottom_svg = $eedee_gutenslider_dividers[ $attr['dividers']['bottom']['value'] ]['svg'];
					$divider_bottom_svg_inverted = false;
					$divider_bottom_additional_classes = ' ';
					if (
						$attr['dividers']['bottom']['inverted'] &&
						array_key_exists( 'svg-inverted', $eedee_gutenslider_dividers[ $attr['dividers']['bottom']['value'] ])
					) {
						$divider_bottom_svg_inverted = $eedee_gutenslider_dividers[ $attr['dividers']['bottom']['value'] ]['svg-inverted'];
						$divider_bottom_additional_classes .= ' inverted';
					}
					if ( $attr['dividers']['bottom']['flipY'] ) {
						$divider_bottom_additional_classes .= ' flip-y';
					}

					$divider_bottom = sprintf(
						'<div class="gutenslider-divider-bottom%4$s" style="color:%1$s;">%3$s</div>',
						$divider_bottom_color,
						$divider_bottom_height,
						$divider_bottom_svg_inverted && $attr['dividers']['bottom']['inverted'] ? $divider_bottom_svg_inverted : $divider_bottom_svg,
						$divider_bottom_additional_classes
					);
				}
			}
		}

		$hash = '';
		if (isset($attr['hashId']) && $attr['hashId'] !== '') {
			$hash = esc_attr( $attr['hashId'] );
		}

		// if the content mode is fixed, we need to print the content twice
		// and hide it in css, that is because wp gutenberg does not allow multiple
		// inner blocks by the time of writing
		// @fix @todo there will be another way soon.
		if ( 'fixed' === $attr['contentMode'] ) {
			return sprintf(
				'<div id="%6$s" class="%1$s" style="%2$s" %5$s data-hash="%13$s">'
				. '<div class="eedee-swiper-outer">'
				. '%11$s'
				. '<div class="swiper" data-settings=\'%4$s\'><div class="swiper-wrapper">%3$s</div>'
				. '</div>'
				. '<div class="%9$s">%10$s</div>'
				. '<button class="eedee-gutenslider-nav eedee-gutenslider-prev">%7$s</button>'
				. '<button class="eedee-gutenslider-nav eedee-gutenslider-next">%8$s</button>'
				. '<div class="eedee-gutenslider-pagination"></div>'
				. '</div>%12$s</div>',
				esc_attr( $class ),
				$component_style,
				$inner_content,
				$slider_settings,
				$additional_attributes,
				esc_attr( $id ),
				$prev_arrow,
				$next_arrow,
				$content_classes,
				$inner_content,
				$divider_top,
				$divider_bottom,
				$hash,
				$bg_image
			);
		}
		//<!-- Slider main container -->
		$wrapper_attributes = get_block_wrapper_attributes();
		// var_dump( 'wrapper', $wrapper_attributes );

		return sprintf(
			'<div id="%6$s" class="%1$s" %5$s data-hash="%11$s" %12$s>'
			. '<div class="eedee-swiper-outer" style="%2$s">'
			. '%9$s'
			. '<div class="swiper" data-settings=\'%4$s\'><div class="swiper-wrapper">%3$s</div>'
			. '</div>'
			. '<button class="eedee-gutenslider-nav eedee-gutenslider-prev">%7$s</button>'
			. '<button class="eedee-gutenslider-nav eedee-gutenslider-next">%8$s</button>'
			. '<div class="eedee-gutenslider-pagination"></div>'
			. '%10$s</div></div>',
			esc_attr( $class ),
			$component_style,
			$inner_content,
			$slider_settings,
			$additional_attributes,
			esc_attr( $id ),
			$prev_arrow,
			$next_arrow,
			$divider_top,
			$divider_bottom,
			$hash,
			$bg_image
		);
	}
}
