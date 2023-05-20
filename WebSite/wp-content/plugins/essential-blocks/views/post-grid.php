<?php
    $_wrapper_classes = [
        $blockId,
        $preset,
        $className
    ];
?>

<div class="eb-parent-wrapper eb-parent-<?php esc_attr_e( $blockId ); ?> <?php esc_attr_e( $classHook ); ?>">
    <div
        class="eb-post-grid-wrapper <?php esc_attr_e( implode( ' ', $_wrapper_classes ) ); ?>"
        data-id="<?php esc_attr_e( $blockId ); ?>"
        data-querydata="<?php esc_attr_e( serialize($queryData) ); ?>"
        data-attributes="<?php esc_attr_e( serialize($essentialAttr) ); ?>">

        <?php
            /**
             * Category Filter Views
             */
            if( $showTaxonomyFilter &&  ! empty($selectedTaxonomy) && ! empty($selectedTaxonomyItems) ) {
                $selectedTaxonomy = json_decode($selectedTaxonomy);
                $categories       = json_decode($selectedTaxonomyItems);
                $helper::views('post-partials/category-filter', [
                    'taxonomy'   => $selectedTaxonomy->value,
                    'categories' => $categories
                ]);
            }

            /**
             * Post Grid Markup
             */

            if ( ! empty($posts) ) {
                $helper::views('post-partials/grid-markup', [
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

            /**
             * Pagination Markup
             */
            if ( ! empty( $posts ) && is_array($loadMoreOptions) && is_array($queryData)) {
                $helper::views('common/pagination', array_merge(
                    $loadMoreOptions, $queryData, [
                        'posts' => $posts
                    ]
                ));
            }
        ?>
    </div>
</div>
