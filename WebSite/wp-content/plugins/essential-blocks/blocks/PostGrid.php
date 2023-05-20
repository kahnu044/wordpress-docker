<?php
namespace EssentialBlocks\blocks;

use EssentialBlocks\Utils\Helper;

class PostGrid extends PostBlock {
    protected $frontend_scripts = ['essential-blocks-post-grid-frontend'];
    protected $frontend_styles  = ['essential-blocks-frontend-style'];

    protected static $default_attributes = [
        'thumbnailSize'      => '',
        'loadMoreOptions'    => false,
        'showTaxonomyFilter' => false,
    ];

    public function get_default_attributes(){
        return array_merge(parent::$default_attributes, self::$default_attributes);
    }

	/**
     * Unique name of the block.
	 * @return string
	 */
    public function get_name(){
        return 'post-grid';
    }

    /**
     * Register all other scripts
     * @return void
     */
    public function register_scripts(){
        $this->assets_manager->register(
            'post-grid-frontend',
            $this->path() . '/frontend/index.js'
        );
    }

    /**
     * Block render callback.
     *
     * @param mixed $attributes
     * @param mixed $content
     * @return mixed
     */
	public function render_callback($attributes, $content) {
        if( is_admin() ) {
            return;
        }

        $queryData = $attributes["queryData"];

        //Query Result
        $query = apply_filters('eb_post_grid_query_results', $this->get_posts( $queryData ));

        $attributes = wp_parse_args( $attributes, $this->get_default_attributes() );

        $className = isset($attributes["className"]) ? $attributes["className"] : "";
        $classHook = isset($attributes['classHook']) ? $attributes['classHook'] : '';

        $_default_attributes = array_keys( parent::$default_attributes );
        $_essential_attrs = [
            'thumbnailSize' => $attributes["thumbnailSize"]
        ];
        array_walk($_default_attributes, function ($key) use ($attributes, &$_essential_attrs) {
            $_essential_attrs[$key] = $attributes[$key];
        });

        ob_start();
        Helper::views('post-grid', array_merge( $attributes, [
            'essentialAttr' => $_essential_attrs,
            'className'     => $className,
            'classHook'     => $classHook,
            'posts'         => $query,
            'block_object'  => $this
        ]));

        return ob_get_clean();
	}
}
