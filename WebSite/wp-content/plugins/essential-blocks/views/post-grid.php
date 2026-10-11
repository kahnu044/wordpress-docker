<?php
    /**
     * Featured post, resolved once: published, publicly viewable and not
     * password protected. See PostGrid::get_featured_post().
     */
    $featured_post = $block_object->get_featured_post(
        isset( $showFeaturedPost ) ? $showFeaturedPost : false,
        isset( $featuredPostId ) ? $featuredPostId : ''
    );

    // Only the v2 markup renders the featured post. Older blocks (no version) would otherwise drop
    // it from the grid and never show it, so they keep it as a regular post.
    if ( ! isset( $version ) || 'v2' !== $version ) {
        $featured_post = null;
    }

    $_parent_classes = [
        'eb-parent-wrapper',
        'eb-parent-' . $blockId,
        $classHook
     ];
    $_wrapper_classes = [
        $blockId,
        $preset,
        $featured_post ? 'has-featured-post' : ''
     ];

    $wrapper_attributes = get_block_wrapper_attributes(
		[
			'class' => 'root-' . $blockId,
		]
	);

?>
<div <?php echo wp_kses_data( $wrapper_attributes); ?>>
    <div class="<?php echo esc_attr( implode( ' ', $_parent_classes ) ); ?>">
        <div class="<?php echo esc_attr( implode( ' ', $_wrapper_classes ) ); ?> eb-post-grid-wrapper"
            data-id="<?php echo esc_attr( $blockId ); ?>"
            data-querydata="<?php echo esc_attr( wp_json_encode( $queryData ) ); ?>"
            data-attributes="<?php echo esc_attr( wp_json_encode( $essentialAttr ) ); ?>">

            <?php
                /**
                 * Category Filter Views
                 */
                if ( $showTaxonomyFilter && ! empty( $selectedTaxonomy ) && ! empty( $selectedTaxonomyItems ) ) {
                    $_selected_taxonomy = is_string( $selectedTaxonomy ) ? json_decode( $selectedTaxonomy ) : null;
                    $_categories        = is_string( $selectedTaxonomyItems ) ? json_decode( $selectedTaxonomyItems ) : null;

                    // Invalid saved JSON would otherwise reach array_map()/->value in the partial.
                    if ( is_object( $_selected_taxonomy ) && isset( $_selected_taxonomy->value ) && is_scalar( $_selected_taxonomy->value ) && is_array( $_categories ) ) {
                        $_categories = array_values( array_filter( $_categories, function ( $item ) {
                            return is_object( $item ) && isset( $item->value, $item->label ) && is_scalar( $item->value ) && is_scalar( $item->label );
                        } ) );

                        $helper::views(
                            'post-partials/category-filter',
                            [
                                'taxonomy'      => (string) $_selected_taxonomy->value,
                                'categories'    => $_categories,
                                'essentialAttr' => $essentialAttr,
                                'showSearch'    => $showSearch
                            ]
                        );
                    }
                }
            ?>


            <?php
        if ( ! $showTaxonomyFilter ) {
            /**
             * Add search form
             */
            do_action( 'eb_post_grid_search_form', $essentialAttr );
        }

        /**
         * Post Grid Markup
         */

        if ( ! empty( $posts ) ) {
            $_defined_vars = get_defined_vars();
            $_params       = isset( $_defined_vars['data'] ) ? $_defined_vars['data'] : [];

            $_params = array_merge(
                $_params,
                [
                    'posts'             => $posts,
                    'queryData'         => isset( $queryData ) ? $queryData : [],
                    'source'            => isset( $queryData['source'] ) ? $queryData['source'] : 'post',
                    'headerMeta'        => ! empty( $headerMeta ) && is_string( $headerMeta ) ? json_decode( $headerMeta ) : [],
                    'footerMeta'        => ! empty( $footerMeta ) && is_string( $footerMeta ) ? json_decode( $footerMeta ) : [],
                    // The meta partials json_decode() this.
                    'featuredMetaItems' => isset( $featuredMetaItems ) && is_string( $featuredMetaItems ) ? $featuredMetaItems : '{}'
                ]
            );

            /**
             * Featured Post Rendering
             */
            $filtered_posts = $posts;

            if ( $featured_post ) {
                $featured_post_id = $featured_post->ID;

                // Filter out the featured post from regular posts to avoid duplication
                $filtered_posts = array_filter( $posts, function( $post ) use ( $featured_post_id ) {
                    return $post->ID !== $featured_post_id;
                } );
            }

            // Update $_params with filtered posts
            $_params['posts'] = $filtered_posts;

            // When featured post is shown separately in v2, limit regular posts so
            // total displayed stays equal to per_page (not per_page + 1).
            if ( $version === 'v2' && $featured_post ) {
                $per_page = isset( $queryData['per_page'] ) && is_scalar( $queryData['per_page'] ) ? max( 0, (int) $queryData['per_page'] - 1 ) : count( $filtered_posts );
                $_params['posts'] = array_slice( array_values( $filtered_posts ), 0, $per_page );
            }

            if ( $version === 'v2' ) {
                // Display featured post before the regular posts wrapper
                if ( $featured_post ) {
                    echo '<div class="ebpg-featured-post-wrapper">';

                    // Create params for featured post with single post array
                    $_featured_params = $_params;
                    $_featured_params['posts'] = [ $featured_post ];
                    $_featured_params['_is_featured'] = true;

                    // Render the featured post with the grid-markup partial
                    $helper::views( 'post-partials/grid-markup', $_featured_params );

                    echo '</div>';
                }

                echo '<div class="eb-post-grid-posts-wrapper">';
            }

            $helper::views( 'post-partials/grid-markup', $_params );

            if ( $version === 'v2' ) {
                echo '</div>';
            }
        }

        /**
         * No Post Markup
         */
        if ( empty( $posts ) ) {
            $helper::views(
                'common/no-content',
                [
                    'content' => __( 'No Posts Found', 'essential-blocks' )
                ]
            );
        }

        /**
         * No post after load more pagination
         */
        if(isset($loadMoreOptions['enableMorePosts']) && $loadMoreOptions['enableMorePosts']) {
            echo '<p class="eb-no-posts eb-loadmore-no-post" style="display: none;">'.__( 'No more posts', 'essential-blocks' ).'</p>';
        }

        /**
         * Pagination Markup
         */
        if ( ! empty( $posts ) && is_array( $loadMoreOptions ) && is_array( $queryData ) ) {
            $helper::views( 'common/pagination', array_merge(
                $loadMoreOptions, $queryData, [
                    'posts'        => $posts,
                    'parent_class' => 'ebpostgrid-pagination',
                    // Same page cap as the queries endpoint, which serves no page past it.
                    'max_pages'    => \EssentialBlocks\Utils\QueryHelper::max_pages()
                ]
            ) );
        }
    ?>
        </div>
    </div>
</div>
