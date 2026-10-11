<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Utils\QueryHelper;

class PostGrid extends PostBlock
{
    protected $frontend_scripts = [ 'essential-blocks-post-grid-frontend' ];

    protected $frontend_styles = [

        'essential-blocks-fontawesome',
        'essential-blocks-common-style'
     ];

    protected static $default_attributes = [
        'thumbnailSize'       => '',
        'loadMoreOptions'     => false,
        'showTaxonomyFilter'  => false,
        'showSearch'          => false,
        'enableAjaxSearch'    => false,
        'addIcon'             => false,
        'iconPosition'        => 'left',
        'icon'                => 'fas fa-chevron-right',
        'preset'              => 'style-1',
        'enableThumbnailSort' => true,
        'defaultFilter'       => 'all',
        'version'             => "",
        'showFallbackImg'     => false,
        'fallbackImgUrl'      => ''
     ];

    public function get_default_attributes()
    {
        return array_merge( parent::$default_attributes, self::$default_attributes );
    }

    /**
     * Unique name of the block.
     * @return string
     */
    public function get_name()
    {
        return 'post-grid';
    }

    /**
     * Register all other scripts
     * @return void
     */
    public function register_scripts()
    {
        $this->assets_manager->register(
            'post-grid-frontend',
            $this->path() . '/frontend.js'
        );
    }

    /**
     * Block render callback.
     *
     * @param mixed $attributes
     * @param mixed $content
     * @return mixed
     */
    public function render_callback( $attributes, $content )
    {
        if ( is_admin() ) {
            return;
        }

        $queryData = isset( $attributes[ "queryData" ] ) ? $attributes[ "queryData" ] : [  ];

        // Saved content: every value is type-checked; request bounds don't apply.
        $customQueryData = QueryHelper::normalize_query_data( $queryData ); //Update with filter data

        if ( isset( $attributes[ 'showTaxonomyFilter' ] ) && $attributes[ 'showTaxonomyFilter' ] ) {
            $defaultFilter = isset( $attributes[ "defaultFilter" ] ) && is_string( $attributes[ "defaultFilter" ] ) ? $attributes[ "defaultFilter" ] : "all";
            if ( $defaultFilter !== "all" && $defaultFilter !== "" ) {
                $taxonomy      = isset( $attributes[ 'selectedTaxonomy' ] ) && is_string( $attributes[ 'selectedTaxonomy' ] ) ? json_decode( $attributes[ 'selectedTaxonomy' ] ) : null;
                $taxonomy_slug = is_object( $taxonomy ) && isset( $taxonomy->value ) && is_string( $taxonomy->value ) ? sanitize_text_field( $taxonomy->value ) : '';
                $category      = '' !== $taxonomy_slug ? get_term_by( 'slug', sanitize_text_field( $defaultFilter ), $taxonomy_slug ) : false;

                // Deleted term or unknown taxonomy: fall back to the unfiltered query.
                if ( $category instanceof \WP_Term ) {
                    $customQueryData = QueryHelper::merge_taxonomy_filter( $customQueryData, $taxonomy_slug, $category->term_id );
                }
            }
        }

        $attributes = wp_parse_args( $attributes, $this->get_default_attributes() );

        //Set enableThumbnailSort to false if preset is 4/5
        if ( isset( $attributes[ 'enableThumbnailSort' ] ) && ! in_array( $attributes[ "preset" ], [ 'style-1', 'style-2', 'style-3' ] ) ) {
            $attributes[ 'enableThumbnailSort' ] = false;
        }

        $classHook = isset( $attributes[ 'classHook' ] ) ? $attributes[ 'classHook' ] : '';

        $_default_attributes = array_keys( parent::$default_attributes );
        $_essential_attrs    = [
            'thumbnailSize'      => $attributes[ "thumbnailSize" ],
            'loadMoreOptions'    => $attributes[ 'loadMoreOptions' ],
            'showSearch'         => $attributes[ 'showSearch' ],
            'showTaxonomyFilter' => $attributes[ 'showTaxonomyFilter' ],
            'enableAjaxSearch'   => $attributes[ 'enableAjaxSearch' ],
            'addIcon'            => $attributes[ 'addIcon' ],
            'iconPosition'       => $attributes[ 'iconPosition' ],
            'icon'               => $attributes[ 'icon' ],
            'preset'             => $attributes[ 'preset' ],
            'defaultFilter'      => $attributes[ 'defaultFilter' ],
            'version'            => isset( $attributes[ 'version' ] ) ? $attributes[ 'version' ] : '',
            'showBlockContent'   => $attributes[ 'showBlockContent' ],
            'showFallbackImg'    => isset( $attributes[ 'showFallbackImg' ] ) ? $attributes[ 'showFallbackImg' ] : false,
            'fallbackImgUrl'     => isset( $attributes[ 'fallbackImgUrl' ] ) ? $attributes[ 'fallbackImgUrl' ] : ''
         ];

        if ( isset( $_essential_attrs[ 'showBlockContent' ] ) && $_essential_attrs[ 'showBlockContent' ] === false ) {
            return '';
        }

        //Query Result
        $result = $this->get_posts( $customQueryData );
        $query  = [  ];
        if ( isset( $result->posts ) && is_array( $result->posts ) && count( $result->posts ) > 0 ) {
            $query = apply_filters( 'eb_post_grid_query_results', $result->posts );
        }

        //set total posts
        if ( isset( $result->found_posts ) ) {
            if ( isset( $attributes[ 'loadMoreOptions' ][ 'totalPosts' ] ) ) {
                $attributes[ 'loadMoreOptions' ][ 'totalPosts' ] = $result->found_posts;
            }
            if ( isset( $_essential_attrs[ 'loadMoreOptions' ][ 'totalPosts' ] ) ) {
                $_essential_attrs[ 'loadMoreOptions' ][ 'totalPosts' ] = $result->found_posts;
            }
        }

        array_walk( $_default_attributes, function ( $key ) use ( $attributes, &$_essential_attrs ) {
            $_essential_attrs[ $key ] = $attributes[ $key ];
        } );

        ob_start();
        Helper::views( 'post-grid', array_merge( $attributes, [
            'essentialAttr' => $_essential_attrs,
            'classHook'     => $classHook,
            'queryData'     => $queryData,
            'posts'         => $query,
            'block_object'  => $this
         ] ) );

        return ob_get_clean();
    }

    /**
     * Resolve the featured post to render, or null.
     *
     * featuredPostId is saved in block markup (any author can hand-edit it), so the
     * post must be published, of a publicly viewable post type and not password
     * protected. While previewing, a user who can read a non-published post may see it.
     *
     * @param mixed $show_featured_post showFeaturedPost attribute.
     * @param mixed $featured_post_id   featuredPostId attribute: JSON `{"value":ID,"label":"…"}`.
     * @return \WP_Post|null
     */
    public function get_featured_post( $show_featured_post, $featured_post_id )
    {
        if ( empty( $show_featured_post ) || ! is_string( $featured_post_id ) || '' === $featured_post_id ) {
            return null;
        }

        $featured_post_data = json_decode( $featured_post_id, true );
        $post_id            = is_array( $featured_post_data ) && isset( $featured_post_data[ 'value' ] ) && is_numeric( $featured_post_data[ 'value' ] )
            ? absint( $featured_post_data[ 'value' ] )
            : 0;
        $post = $post_id ? get_post( $post_id ) : null;

        if ( ! $post instanceof \WP_Post ) {
            return null;
        }

        // TODO(decision): Q7 — should the featured post be restricted to the query's post type
        // (queryData.source)? Not enforced: any publicly viewable post type is accepted.
        if ( ! is_post_type_viewable( $post->post_type ) || post_password_required( $post ) ) {
            return null;
        }

        if ( 'publish' === $post->post_status ) {
            return $post;
        }

        // TODO(decision): Q7 — should draft/private posts be previewable as the featured post by users
        // with permission? Allowed while previewing only (never on a live page view); remove this
        // branch to always require a published post.
        if ( is_preview() && current_user_can( 'read_post', $post->ID ) ) {
            return $post;
        }

        return null;
    }
}
