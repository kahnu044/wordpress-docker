<?php
    $_wrapper_classes = [
        $blockId,
        $preset,
        $className,
        $arrows == 1 ? 'slick-arrows' : 'arrow-none',
        $adaptiveHeight == 1 ? 'equal-height' : 'arrow-none',
        $dotPreset,
    ];
?>

<div class="eb-parent-wrapper eb-parent-<?php esc_attr_e( $blockId ); ?> <?php esc_attr_e( $classHook ); ?>">
    <div
        class="eb-post-carousel-wrapper <?php esc_attr_e( implode( ' ', $_wrapper_classes ) ); ?>"
        data-id="<?php esc_attr_e( $blockId ); ?>"
        data-querydata="<?php esc_attr_e( serialize($queryData) ); ?>"
        data-slidersettings="<?php esc_attr_e( json_encode($sliderSettings) ); ?>"
        data-attributes="<?php esc_attr_e( serialize($essentialAttr) ); ?>">

        <?php
            /**
             * Post Grid Markup
             */

            if ( ! empty($posts) ) {
                $helper::views('post-partials/carousel-markup', [
                    'posts'              => $posts,
                    'queryData'          => isset( $queryData ) ? $queryData : [],
                    'source'             => isset( $queryData['source'] ) ? $queryData['source'] : 'post',
                    'headerMeta'         => ! empty( $headerMeta ) ? json_decode( $headerMeta ) : [],
                    'footerMeta'         => ! empty( $footerMeta ) ? json_decode( $footerMeta ) : [],
                    'showMeta'           => $showMeta,
                    'preset'             => $preset,
                    'showTitle'          => $showTitle,
                    'titleTag'           => $titleTag,
                    'titleLength'        => $titleLength,
                    'showThumbnail'      => $showThumbnail,
                    'thumbnailSize'      => $thumbnailSize,
                    'showContent'        => $showContent,
                    'contentLength'      => $contentLength,
                    'expansionIndicator' => $expansionIndicator,
                    'showReadMore'       => $showReadMore,
                    'readmoreText'       => $readmoreText,
                    'block_object'       => $block_object
                ]);
            }

            /**
             * No Post Markup
             */
            if ( empty( $posts )) {
                $helper::views('common/no-content', [
                    'content' => __('No Posts Found', 'essential-blocks')
                ]);
            }
        ?>
    </div>
</div>
