<?php
/**
* Gutenslide Dynamic Render Callback *
*
* @since   3.0.0
* @package Gutenslider
*/

if ( ! function_exists( 'eedee_gutenslide_dynamic_render_callback' ) ) {
    /**
    * Register Gutenberg block template that is rendered on server side
    *
    * @param Array  $attr are the attributes from the block.
    * @param String $inner_content the content of gutensliders innerBlocks.
    * @link  https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
    * @uses  {save} the content returned from the save function of Gutenslider block.
    * @since 1.16.0
    */
    function eedee_gutenslide_dynamic_render_callback( $attr, $inner_content ){
        $video_width = 0;
        $video_height = 0;
		$image_width = 0;
		$image_height = 0;

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

        $class = 'swiper-slide wp-block-eedee-block-gutenslide';
        if ( isset( $attr['className'] ) ) {
            $class .= ' ' . esc_attr( $attr['className'] );
        }

        if (isset($attr['contentPosition']) && $attr['contentPosition'] !== '') {
            $class .= sprintf(' %1$s', $POSITION_CLASSNAMES[ $attr['contentPosition'] ]);
        }

        if (isset($attr['background'])) {
            $bg = $attr['background'];
        } else {
            $bg = array();
        }

        if ('image' === $bg['backgroundType']) {
            $class .= ' ed-bg-image';
        } else if ('none' === $bg['backgroundType']) {
            $class .= ' ed-bg-none';
        } else if ('video' === $bg['backgroundType']) {
            $class .= ' ed-bg-video';
            if (array_key_exists( 'embed', $bg['backgroundVideo'] ) && $bg['backgroundVideo']['embed'] === true ) {
                $class .= ' ed-bg-video-embed';
            }
        } else if ('gradient' === $bg['backgroundType']) {
            $class .= ' ed-bg-gradient';
        } else if ('color' === $bg['backgroundType']) {
            $class .= ' ed-bg-color';
        }

        // set default values.
        $bg['backgroundColor']           = isset($bg['backgroundColor']) ? esc_attr( $bg['backgroundColor'] ): '#fffa';
        $bg['backgroundGradient']        = isset($bg['backgroundGradient']) ? $bg['backgroundGradient']: '';
        $bg['backgroundType']            = isset($bg['backgroundType']) ? esc_attr( $bg['backgroundType'] ): 'color';
        $bg['backgroundImage']           = isset($bg['backgroundImage']) ? $bg['backgroundImage']: array( 'id' => null );
        $bg['backgroundFocalPoint']      = isset($bg['backgroundFocalPoint']) ? $bg['backgroundFocalPoint' ]:
        array(
            'x' => 0.5,
            'y' => 0.5,
        );

        $bg['backgroundVideoFocalPoint'] = isset($bg['backgroundVideoFocalPoint']) ? $bg['backgroundVideoFocalPoint']:
        array(
            'x' => 0.5,
            'y' => 0.5,
        );
        $bg['backgroundImageSize']       = isset($bg['backgroundImageSize']) ? esc_attr( $bg['backgroundImageSize'] ): 'cover';
        $bg['backgroundVideoSize']       = isset($bg['backgroundVideoSize']) ? esc_attr( $bg['backgroundVideoSize'] ): 'cover';
        $bg['backgroundVideo']           = isset($bg['backgroundVideo']) ? $bg['backgroundVideo']: array();
        $bg['backgroundVideoLoop']       = isset($bg['backgroundVideoLoop']) ? esc_attr( $bg['backgroundVideoLoop'] ): true;
        $bg['backgroundVideoPauseWhenInactive']       = isset($bg['backgroundVideoPauseWhenInactive']) ? esc_attr( $bg['backgroundVideoPauseWhenInactive'] ): true;
        $bg['backgroundVideoMuted']      = isset($bg['backgroundVideoMuted']) ? esc_attr( $bg['backgroundVideoMuted'] ): true;
        $bg['backgroundOverlayImage']    = isset($bg['backgroundOverlayImage']) ? esc_attr( $bg['backgroundOverlayImage'] ): '';
        $bg['backgroundOverlayVideo']    = isset($bg['backgroundOverlayVideo']) ? esc_attr( $bg['backgroundOverlayVideo'] ): '';
        $bg['backgroundOverlayOpacity']  = isset($bg['backgroundOverlayOpacity']) ? esc_attr( $bg['backgroundOverlayOpacity'] ): 50;

        if (!isset($bg['backgroundImage']['id'])) {
            $bg['backgroundImage']['id'] = null;
        }
        if (!isset($bg['backgroundImage']['alt'])) {
            $bg['backgroundImage']['alt'] = '';
        }

        // construct background style.
        if ('color' === $bg['backgroundOverlayImage']
            || 'gradient' === $bg['backgroundOverlayImage']
            || 'color' === $bg['backgroundOverlayVideo']
            || 'gradient' === $bg['backgroundOverlayVideo']
        ) {
            $bg_opacity = esc_attr( $bg['backgroundOverlayOpacity'] ) / 100;
        } else {
            $bg_opacity = 1;
        }

        $background_style = '';

        if ('color' === $bg['backgroundType']
            || 'gradient' === $bg['backgroundType']
            || 'none' === $bg['backgroundType']
        ) {
            if (isset($attr['minWidth'])) {
                $background_style = sprintf('--slide-min-width:%1$s;', esc_attr( $attr['minWidth'] ) );
            }
        }

        if ( 'video' === $bg['backgroundType'] ){
            if ( array_key_exists('width', $bg['backgroundVideo'])) {
                $video_width = $bg['backgroundVideo']['width'];
            }
            if ( array_key_exists('height', $bg['backgroundVideo'])) {
                $video_height = $bg['backgroundVideo']['height'];
            }
            $background_style .= sprintf(
                '--ed-vw: %1$s; --ed-vh: %2$s;',
                $video_width,
                $video_height
            );
        }

        $bg_overlay_style = null;

        if ('color' === $bg['backgroundType']
            || 'color' === $bg['backgroundOverlayImage']
            || 'color' === $bg['backgroundOverlayVideo']
        ) {
            $bg_overlay_style = esc_attr( $bg['backgroundColor'] );
        } elseif ('gradient' === $bg['backgroundType']
            || 'gradient' === $bg['backgroundOverlayImage']
            || 'gradient' === $bg['backgroundOverlayVideo']
        ) {
            $bg_overlay_style = esc_attr( $bg['backgroundGradient'] );
        }

        if (null !== $bg_overlay_style && ! empty($bg_overlay_style)) {
            $bg_overlay_style = 'background:' . $bg_overlay_style . ';';
        } else {
            $bg_overlay_style = '';
        }

        $background_overlay_style = sprintf(
            'opacity:%1$s;%2$s',
            esc_attr($bg_opacity),
            esc_attr($bg_overlay_style)
        );

        $background_content = '';

        $has_media_background = 'video' === $bg['backgroundType'] || 'image' === $bg['backgroundType'];

        $background_classes = sprintf(
            'eedee-background-div%1$s',
            $has_media_background ? '' : ' no-media-background'
        );

        if ((('image' === $bg['backgroundType'] )
            || ( 'color' === $bg['backgroundType'] && 'color' === $bg['backgroundOverlayImage'] )
            || ( 'gradient' === $bg['backgroundType'] && 'gradient' === $bg['backgroundOverlayImage'] ))
            && isset($bg['backgroundImage']['url'])
        ) {

            $background_classes .= ' bg-image';
            $image_style = sprintf(
                'object-fit: %1$s; object-position: %2$s;',
                esc_attr($bg['backgroundImageSize']),
                esc_attr(
                    $bg['backgroundFocalPoint']['x'] * 100 . '% '
                    . $bg['backgroundFocalPoint']['y'] * 100 . '%'
                )
            );

            $image_class = sprintf(
                'wp-image-%1$s',
                esc_attr($bg['backgroundImage']['id'])
            );

			$image_srcset_type = isset( $attr['fetchPriority'] ) && $attr['fetchPriority'] ? 'srcset' : 'srcset';
            $image_srcset = sprintf(
				' %1$s="%2$s"',
				$image_srcset_type,
				wp_get_attachment_image_srcset(
					$bg['backgroundImage']['id']
				)
			);




            $image_sizes  = wp_get_attachment_image_sizes(
                $bg['backgroundImage']['id'], false
            );
            $medium_src = wp_get_attachment_image_src(
                $bg['backgroundImage']['id'],
                'medium'
            );

			$fetch_priority = '';
			if (isset($attr['fetchPriority']) && $attr['fetchPriority']) {
				$fetch_priority = 'fetchpriority="high" ';
			}

			$image_small_source = '';

			if ( isset( $medium_src ) ) {
				$image_width = $medium_src[1];
				$image_height = $medium_src[2];
				$thumb_src = wp_get_attachment_image_src(
					$bg['backgroundImage']['id'],
					'medium'
				);
				if ( is_array($thumb_src) && array_key_exists( 3, $thumb_src ) && ! $thumb_src[3] ) {
					$thumb_src = wp_get_attachment_image_src(
						$bg['backgroundImage']['id'],
						'thumbnail'
					);
				}
				$image_small_source = sprintf(' src="%1$s"', $thumb_src[0]);
			}

			$background_style .= sprintf(
				'--ed-vw:%1$s;--ed-vh:%2$s;',
				$image_width,
				$image_height
			);

            $img_add_attr = '';
            $img_attachment = get_post( $bg['backgroundImage']['id'] );
            $img_meta = array(
                'caption' => $img_attachment->post_excerpt,
                'description' => $img_attachment->post_content,
                'title' => $img_attachment->post_title
            );
            if ( $img_meta['caption'] ) {
                $img_add_attr .= sprintf(' data-caption="%1$s"', esc_html( $img_meta['caption'] ) );
            }
            if ( $img_meta['title'] ) {
                $img_add_attr .= sprintf(' data-title="%1$s"', esc_html( $img_meta['title'] ) );
            }
            if ( $img_meta['description'] ) {
                $img_add_attr .= sprintf(' data-description="%1$s"', esc_html( $img_meta['description'] ) );
            }

            // when the image gets the wp-image-xxx class srcset sizes width
            // height are added automatically but swiper lazy loading expects
            // data-... attributes so we construct them manually ...
            //
            $background_content = sprintf(
                '<img class="%1$s" src="%2$s" alt="%3$s" decoding="async" style="%4$s" %5$s />',
                $image_class,
                esc_url($bg['backgroundImage']['url']),
                esc_attr($bg['backgroundImage']['alt']),
                $image_style,
                $img_add_attr
            );

            // $background_content = sprintf(
            //     '<img class="%1$s" alt="%2$s" style="%3$s"' .
            //     ' %4$s' .
			// 	'%8$s' .
			// 	'%9$s' .
            //     ' />',
            //     $image_class,
            //     esc_attr($bg['backgroundImage']['alt']),
            //     $image_style,
            //     $image_srcset,
            //     $image_sizes,
            //     $medium_src[1],
            //     $medium_src[2],
			// 	$image_small_source,
			// 	$fetch_priority
            // );
        } elseif ((( 'video' === $bg['backgroundType'] )
            || ( 'color' === $bg['backgroundType'] && 'color' === $bg['backgroundOverlayVideo'] )
            || ( 'gradient' === $bg['backgroundType'] && 'gradient' === $bg['backgroundOverlayVideo'] ))
            && isset($bg['backgroundVideo']['url'])
        ) {
            $video_classes="";
            $background_classes .= ' bg-video';

            if (isset($bg['backgroundVideoPauseWhenInactive']) && $bg['backgroundVideoPauseWhenInactive']) {
                $video_classes .= 'bg-video-autopause';
            }

            $poster = '';
            if (isset($bg['backgroundImage']) && isset($bg['backgroundImage']['url'])) {
                $poster = esc_url($bg['backgroundImage']['url']);
            }

            if (array_key_exists('width', $bg['backgroundVideo'])) {
                $video_width = $bg['backgroundVideo']['width'];
            }
            if (array_key_exists('height', $bg['backgroundVideo'])) {
                $video_height = $bg['backgroundVideo']['height'];
            }
            $video_type = isset($bg['backgroundVideo']['mime']) ? $bg['backgroundVideo']['mime'] : 'video/mp4';

            $video_style = sprintf(
                'object-fit: %1$s; object-position: %2$s; --ed-vw: %3$spx; --ed-vh: %4$spx;',
                esc_attr($bg['backgroundVideoSize']),
                esc_attr($bg['backgroundVideoFocalPoint']['x'] * 100 . '%% ' . $bg['backgroundVideoFocalPoint']['y'] * 100 . '%%'),
                $video_width,
                $video_height
            );

            $video_type = $bg['backgroundVideo']['mime'] ?? 'video/mp4';

            $background_content = sprintf(
                '<video src="%1$s" type="%6$s" autoplay playsinline %2$s %3$s'
                . ' poster="%4$s" style="%5$s" width="%7$s" height="%8$s" class="%9$s"></video>',
                esc_url($bg['backgroundVideo']['url']),
                esc_attr($bg['backgroundVideoLoop']) ? 'loop' : '',
                esc_attr($bg['backgroundVideoMuted']) ? 'muted' : '',
                $poster,
                $video_style,
                $video_type,
                $video_width,
                $video_height,
                $video_classes
            );
        }

        $background_div = sprintf(
            '<div class="%2$s">'
            . '%3$s'
            . '<div class="eedee-background-div__overlay" style="%1$s"></div>'
            . '</div>',
            $background_overlay_style,
            $background_classes,
			$background_content
        );

        $slide_link = '';

        $additional_link_attributes = '';
        if ( $attr['opensInNewTab'] ) {
            $additional_link_attributes = ' target="_blank" rel="noreferrer noopener"';
        }

        if (isset($attr['linkUrl']) && $attr['linkUrl'] !== '') {
            $slide_link = sprintf(
                '<a class="slide-link" href="%1$s"%2$s></a>',
                esc_url($attr['linkUrl']),
                $additional_link_attributes
            );
        }

        $hash = '';
        if (isset($attr['hashId']) && $attr['hashId'] !== '') {
            $hash = esc_attr($attr['hashId']);
        }

		if (isset($attr['isHidden']) && true === $attr['isHidden']  ) {
			return;
		}

        return sprintf(
            '<div class="%1$s" style="%2$s" data-hash="%6$s">'
            . '%3$s'
            . '<div class="slide-content">'
            . '%4$s'
            . '</div>'
            . '%5$s'
            . '</div>',
            $class,
            $background_style,
            $background_div,
            $inner_content,
            $slide_link,
            $hash
        );
    }
}
