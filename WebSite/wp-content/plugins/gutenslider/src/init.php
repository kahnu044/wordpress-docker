<?php

// Exit if accessed directly.
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

if ( !function_exists( 'eedee_gutenslider_activation' ) ) {
    /**
     * Check if free / pro version is active on activation and deactivate in case
     */
    function eedee_gutenslider_activation()
    {
        if ( is_plugin_active( 'gutenslider/eedee-gutenslider.php' ) ) {
            deactivate_plugins( 'gutenslider/eedee-gutenslider.php' );
        }
        if ( is_plugin_active( 'gutenslider-premium/eedee-gutenslider.php' ) ) {
            deactivate_plugins( 'gutenslider-premium/eedee-gutenslider.php' );
        }
    }
    
    register_activation_hook( __FILE__, 'eedee_gutenslider_activation' );
}

if ( !function_exists( 'eedee_gutenslider_block_init' ) ) {
    function eedee_gutenslider_block_init()
    {
        include_once 'blocks/gutenslider/block-front.php';
        include_once 'blocks/gutenslider/attributes.php';
        include_once 'blocks/gutenslide/block-front.php';
        include_once 'blocks/gutenslide/attributes.php';
        $dir = dirname( dirname( __FILE__ ) );
        $eedee_gutenslider_block_variables = array(
            'siteUrl'             => get_site_url(),
            'arrows'              => $eedee_gutenslider_arrows,
            'gutensliderDividers' => $eedee_gutenslider_dividers,
            'pluginsUrl'          => plugin_dir_url( __DIR__ ),
        );
        $editor_css = 'build/gutenslider-editor.css';
        wp_register_style(
            'eedee-gutenslider-block-editor-style',
            plugins_url( $editor_css, dirname( __FILE__ ) ),
            array(),
            filemtime( "{$dir}/{$editor_css}" )
        );
        wp_register_style(
            'eedee-gutenslider-init',
            plugins_url( 'build/gutenslider-init.css', dirname( __FILE__ ) ),
            array(),
            filemtime( "{$dir}/build/gutenslider-init.css" )
        );
        $script_asset_path = "{$dir}/build/gutenslider.asset.php";
        $index_js = 'build/gutenslider.js';
        $script_asset = (include $script_asset_path);
        wp_register_script(
            'eedee-gutenslider-block-editor',
            plugins_url( $index_js, dirname( __FILE__ ) ),
            $script_asset['dependencies'],
            $script_asset['version']
        );
        wp_localize_script( 'eedee-gutenslider-block-editor', 'eedeeGutenslider', $eedee_gutenslider_block_variables );
        $script_front_asset_path = "{$dir}/build/gutenslider-front.asset.php";
        $front_js = 'build/gutenslider-front.js';
        $script_front_asset = (include $script_front_asset_path);
        wp_register_script(
            'eedee-gutenslider-front',
            plugins_url( $front_js, dirname( __FILE__ ) ),
            $script_front_asset['dependencies'],
            $script_front_asset['version']
        );
        wp_localize_script( 'eedee-gutenslider-front', 'eedeeGutenslider', $eedee_gutenslider_block_variables );
        $editor_script = 'eedee-gutenslider-block-editor';
        // register blocks
        register_block_type( 'eedee/block-gutenslider', array(
            'api_version'     => 2,
            'attributes'      => apply_filters( 'gutenslider_attributes', $gutenslider_attributes ),
            'style'           => 'eedee-gutenslider-init',
            'editor_script'   => $editor_script,
            'editor_style'    => 'eedee-gutenslider-block-editor-style',
            'render_callback' => 'eedee_gutenslider_dynamic_render_callback',
        ) );
        register_block_type( 'eedee/block-gutenslide', array(
            'api_version'     => 2,
            'attributes'      => apply_filters( 'gutenslide_attributes', $gutenslide_attributes ),
            'render_callback' => 'eedee_gutenslide_dynamic_render_callback',
        ) );
    }

}
add_action( 'init', 'eedee_gutenslider_block_init' );
if ( !function_exists( 'eedee_plugin_row_meta' ) ) {
    function eedee_plugin_row_meta( $plugin_meta, $plugin_file )
    {
        
        if ( 'gutenslider/eedee-gutenslider.php' === plugin_basename( $plugin_file ) ) {
            $row_meta = [
                'review' => '<a href="' . esc_url( 'https://wordpress.org/support/plugin/gutenslider/reviews/?filter=5' ) . '" aria-label="' . esc_attr( __( 'Review Gutenslider on WordPress.org', 'gutenslider' ) ) . '" target="_blank">' . __( 'Rate Gutenslider&nbsp;★★★★★', 'gutenslider' ) . '</a>',
            ];
            $plugin_meta = array_merge( $plugin_meta, $row_meta );
        }
        
        return $plugin_meta;
    }

}
add_filter(
    'plugin_row_meta',
    'eedee_plugin_row_meta',
    10,
    2
);
if ( !function_exists( 'gutenslider_register_block_pattern_categories' ) ) {
    function gutenslider_register_block_pattern_categories()
    {
        register_block_pattern_category( 'gutenslider', array(
            'label' => __( 'Gutenslider', 'gutenslider' ),
        ) );
    }

}
add_action( 'init', 'gutenslider_register_block_pattern_categories' );
if ( !function_exists( 'gutenslider_register_block_patterns' ) ) {
    function gutenslider_register_block_patterns()
    {
        register_block_pattern( 'gutenslider/pattern-testimonial-slider', array(
            'title'       => __( 'Testimonial Slider', 'gutenslider' ),
            'categories'  => array( 'gutenslider' ),
            'keywords'    => array(
            'slider',
            'rating',
            'quote',
            'testimonial'
        ),
            'description' => _x( 'Slider block that can be used for user reviews that rated your service or product or company.', 'Block pattern description', 'gutenslider' ),
            'content'     => "<!-- wp:eedee/block-gutenslider {\"align\":\"full\",\"slidesToShow\":3,\"slidesToShowMd\":2,\"sliderHeight\":\"20vh\",\"paddingX\":\"50px\",\"paddingXMd\":\"50px\",\"paddingXSm\":\"50px\",\"paddingY\":\"0px\",\"paddingYMd\":\"0px\",\"paddingYSm\":\"0px\",\"dotYOffset\":-59,\"dotYOffsetMd\":-62,\"dotYOffsetSm\":-66} --><!-- wp:eedee/block-gutenslide {\"background\":{\"backgroundType\":\"none\",\"backgroundOverlayImage\":\"\",\"backgroundOverlayVideo\":\"\",\"backgroundOverlayOpacity\":50,\"backgroundGradient\":{},\"backgroundImage\":{},\"backgroundPosition\":\"center center\",\"backgroundRepeat\":\"no-repeat\",\"backgroundImageSize\":\"cover\",\"backgroundVideoSize\":\"cover\",\"customBackgroundColor\":\"\",\"hasParallax\":false,\"backgroundFocalPoint\":{\"x\":0.5,\"y\":0.5},\"backgroundVideoFocalPoint\":{\"x\":0.5,\"y\":0.5},\"backgroundVideo\":{},\"backgroundVideoMuted\":true,\"backgroundVideoLoop\":true,\"backgroundVideoAutoplay\":true,\"openPopover\":true},\"contentPosition\":\"top center\",\"minWidth\":\"50%\"} --><!-- wp:image {\"align\":\"center\",\"width\":128,\"height\":128,\"sizeSlug\":\"large\",\"linkDestination\":\"none\",\"className\":\"is-style-rounded\"} --><div class=\"wp-block-image is-style-rounded\"><figure class=\"aligncenter size-large is-resized\"><img src=\"https://gutenslider.org/wp-content/uploads/2021/05/portrait2.jpg\" alt=\"\" width=\"128\" height=\"128\"><figcaption>Roberta Rocky</figcaption></figure></div><!-- /wp:image --><!-- wp:paragraph {\"align\":\"center\"} --><p class=\"has-text-align-center\"><strong>Awesome Product</strong></p><!-- /wp:paragraph --><!-- wp:paragraph {\"align\":\"center\"} --><p class=\"has-text-align-center\">Easy for anyone to use, I can totally recommend it to anyone who is looking for some unique user experience. Never want to work with anything else again.</p><!-- /wp:paragraph --><!-- wp:paragraph {\"align\":\"center\",\"placeholder\":\"Add slide content here…\",\"className\":\"gutenslider-content-initial\",\"fontSize\":\"normal\"} --><p class=\"has-text-align-center gutenslider-content-initial has-normal-font-size\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"></p><!-- /wp:paragraph --><!-- /wp:eedee/block-gutenslide --><!-- wp:eedee/block-gutenslide {\"background\":{\"backgroundType\":\"none\",\"backgroundOverlayImage\":\"\",\"backgroundOverlayVideo\":\"\",\"backgroundOverlayOpacity\":50,\"backgroundGradient\":{},\"backgroundImage\":{},\"backgroundPosition\":\"center center\",\"backgroundRepeat\":\"no-repeat\",\"backgroundImageSize\":\"cover\",\"backgroundVideoSize\":\"cover\",\"customBackgroundColor\":\"\",\"hasParallax\":false,\"backgroundFocalPoint\":{\"x\":0.5,\"y\":0.5},\"backgroundVideoFocalPoint\":{\"x\":0.5,\"y\":0.5},\"backgroundVideo\":{},\"backgroundVideoMuted\":true,\"backgroundVideoLoop\":true,\"backgroundVideoAutoplay\":true,\"openPopover\":true},\"contentPosition\":\"top center\",\"minWidth\":\"50%\"} --><!-- wp:image {\"align\":\"center\",\"width\":128,\"height\":128,\"sizeSlug\":\"large\",\"linkDestination\":\"none\",\"className\":\"is-style-rounded\"} --><div class=\"wp-block-image is-style-rounded\"><figure class=\"aligncenter size-large is-resized\"><img src=\"https://gutenslider.org/wp-content/uploads/2021/05/portrait4.jpg\" alt=\"\" width=\"128\" height=\"128\"><figcaption>Annalena Apple</figcaption></figure></div><!-- /wp:image --><!-- wp:paragraph {\"align\":\"center\"} --><p class=\"has-text-align-center\"><strong>Simple and easy to use</strong></p><!-- /wp:paragraph --><!-- wp:paragraph {\"align\":\"center\"} --><p class=\"has-text-align-center\">Never had such an outstanding experience. Everything works like magic. Try it out.</p><!-- /wp:paragraph --><!-- wp:paragraph {\"align\":\"center\",\"placeholder\":\"Add slide content here…\",\"className\":\"gutenslider-content-initial\",\"fontSize\":\"normal\"} --><p class=\"has-text-align-center gutenslider-content-initial has-normal-font-size\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"></p><!-- /wp:paragraph --><!-- /wp:eedee/block-gutenslide --><!-- wp:eedee/block-gutenslide {\"background\":{\"backgroundType\":\"none\",\"backgroundOverlayImage\":\"\",\"backgroundOverlayVideo\":\"\",\"backgroundOverlayOpacity\":50,\"backgroundGradient\":{},\"backgroundImage\":{},\"backgroundPosition\":\"center center\",\"backgroundRepeat\":\"no-repeat\",\"backgroundImageSize\":\"cover\",\"backgroundVideoSize\":\"cover\",\"customBackgroundColor\":\"\",\"hasParallax\":false,\"backgroundFocalPoint\":{\"x\":0.5,\"y\":0.5},\"backgroundVideoFocalPoint\":{\"x\":0.5,\"y\":0.5},\"backgroundVideo\":{},\"backgroundVideoMuted\":true,\"backgroundVideoLoop\":true,\"backgroundVideoAutoplay\":true,\"openPopover\":true},\"contentPosition\":\"top center\",\"minWidth\":\"50%\"} --><!-- wp:image {\"align\":\"center\",\"width\":128,\"height\":128,\"sizeSlug\":\"large\",\"linkDestination\":\"none\",\"className\":\"is-style-rounded\"} --><div class=\"wp-block-image is-style-rounded\"><figure class=\"aligncenter size-large is-resized\"><img src=\"https://gutenslider.org/wp-content/uploads/2021/05/portrait3.jpg\" alt=\"\" width=\"128\" height=\"128\"><figcaption>@christinaleans</figcaption></figure></div><!-- /wp:image --><!-- wp:paragraph {\"align\":\"center\"} --><p class=\"has-text-align-center\"><strong>Perfect clean and simple slider for Gutenberg</strong></p><!-- /wp:paragraph --><!-- wp:paragraph {\"align\":\"center\"} --><p class=\"has-text-align-center\">Easy for anyone to use, you can just build whatever you want and it works perfectly.</p><!-- /wp:paragraph --><!-- wp:paragraph {\"align\":\"center\",\"placeholder\":\"Add slide content here…\",\"className\":\"gutenslider-content-initial\",\"fontSize\":\"normal\"} --><p class=\"has-text-align-center gutenslider-content-initial has-normal-font-size\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"><img draggable=\"false\" role=\"img\" class=\"emoji\" alt=\"⭐\" src=\"https://s.w.org/images/core/emoji/13.0.1/svg/2b50.svg\"></p><!-- /wp:paragraph --><!-- /wp:eedee/block-gutenslide --><!-- /wp:eedee/block-gutenslider -->",
        ) );
    }

}
add_action( 'init', 'gutenslider_register_block_patterns' );
if ( !function_exists( 'gutenslider_block_i18n' ) ) {
    function gutenslider_block_i18n()
    {
        
        if ( function_exists( 'wp_set_script_translations' ) ) {
            wp_set_script_translations( 'eedee-gutenslider-block-editor-pro', 'gutenslider' );
            wp_set_script_translations( 'eedee-gutenslider-block-editor', 'gutenslider' );
        }
    
    }

}
add_action( 'init', 'gutenslider_block_i18n' );
add_image_size( 'gs-tiny', 50, 9999 );
add_image_size( 'xl', 1600, 9999 );
add_image_size( 'xxl', 2200, 9999 );
add_image_size( 'xxxl', 2800, 9999 );
add_image_size( 'xxxxl', 3400, 9999 );
add_image_size( 'xxxxxl', 4000, 9999 );
if ( !function_exists( 'include_index_class_to_gs_slide_child_blocks' ) ) {
    /**
     * add the slide index to the classes of gutenslide slides
     */
    function include_index_class_to_gs_slide_child_blocks( $block_content, $block )
    {
        
        if ( $block['blockName'] === 'eedee/block-gutenslider' ) {
            
            if ( isset( $block['attrs']['firstNotLazy'] ) ) {
                if ( !function_exists( 'gs_rep_count' ) ) {
                    function gs_rep_count( $matches )
                    {
                        static  $count = 0 ;
                        return sprintf(
                            'class="%1$swp-block-eedee-block-gutenslide%2$s gs-slide-%3$s"%4$sclass="eedee-background-div%5$simg class="%6$s gs-slide-img-%3$s"',
                            $matches[1],
                            $matches[2],
                            $count++,
                            $matches[3],
                            $matches[4],
                            $matches[5]
                        );
                    }
                
                }
                return preg_replace_callback( '/class="(.*?)wp-block-eedee-block-gutenslide(.*?)"(.*?)class="eedee-background-div(.*?)img class="(.*?)"/i', 'gs_rep_count', $block_content );
            } else {
                return $block_content;
            }
        
        } else {
            return $block_content;
        }
    
    }

}
add_filter(
    'render_block',
    'include_index_class_to_gs_slide_child_blocks',
    10,
    2
);
add_filter(
    'wp_img_tag_add_loading_attr',
    function ( $value, $image, $context ) {
    if ( false !== strpos( $image, 'gs-slide-img-0' ) ) {
        return false;
    }
    return true;
},
    9,
    3
);