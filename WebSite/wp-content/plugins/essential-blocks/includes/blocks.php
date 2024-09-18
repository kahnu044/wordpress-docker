<?php
use EssentialBlocks\Blocks\Row;
use EssentialBlocks\Blocks\Icon;
use EssentialBlocks\Blocks\Form;
use EssentialBlocks\Blocks\Text;
use EssentialBlocks\Blocks\PopUp;
use EssentialBlocks\Blocks\Button;
use EssentialBlocks\Blocks\Notice;
use EssentialBlocks\Blocks\Slider;
use EssentialBlocks\Blocks\Social;
use EssentialBlocks\Blocks\FlipBox;
use EssentialBlocks\Blocks\InfoBox;
use EssentialBlocks\Blocks\WPForms;
use EssentialBlocks\Blocks\PostGrid;
use EssentialBlocks\Blocks\Wrapper;
use EssentialBlocks\Blocks\PostMeta;
use EssentialBlocks\Blocks\Taxonomy;
use EssentialBlocks\Blocks\Accordion;
use EssentialBlocks\Blocks\AddToCart;
use EssentialBlocks\Blocks\CountDown;
use EssentialBlocks\Blocks\GoogleMap;
use EssentialBlocks\Blocks\Openverse;
use EssentialBlocks\Blocks\Breadcrumbs;
use EssentialBlocks\Blocks\DualButton;
use EssentialBlocks\Blocks\NftGallery;
use EssentialBlocks\Blocks\TeamMember;
use EssentialBlocks\Blocks\TypingText;
use EssentialBlocks\Blocks\FeatureList;
use EssentialBlocks\Blocks\FluentForms;
use EssentialBlocks\Blocks\ProgressBar;
use EssentialBlocks\Blocks\SocialShare;
use EssentialBlocks\Blocks\Testimonial;
use EssentialBlocks\Blocks\AdvancedTabs;
use EssentialBlocks\Blocks\CallToAction;
use EssentialBlocks\Blocks\ImageGallery;
use EssentialBlocks\Blocks\PostCarousel;
use EssentialBlocks\Blocks\PricingTable;
use EssentialBlocks\Blocks\ProductPrice;
use EssentialBlocks\Blocks\ShapeDivider;
use EssentialBlocks\Blocks\AdvancedImage;
use EssentialBlocks\Blocks\AdvancedVideo;
use EssentialBlocks\Blocks\InstagramFeed;
use EssentialBlocks\Blocks\NumberCounter;
use EssentialBlocks\Blocks\ProductImages;
use EssentialBlocks\Blocks\ProductRating;
use EssentialBlocks\Blocks\ToggleContent;
use EssentialBlocks\Blocks\ParallaxSlider;
use EssentialBlocks\Blocks\ProductDetails;
use EssentialBlocks\Blocks\WooProductGrid;
use EssentialBlocks\Blocks\AdvancedHeading;
use EssentialBlocks\Blocks\ImageComparison;
use EssentialBlocks\Blocks\TableOfContents;
use EssentialBlocks\Blocks\InteractivePromo;
use EssentialBlocks\Blocks\AdvancedNavigation;

$testArr = [  ];

$free_blocks = [
    'accordion'           => [
        'label'      => __( 'Accordion', 'essential-blocks' ),
        'value'      => 'accordion',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'content',
        'object'     => Accordion::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/accordion/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/accordion/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/accordion/icon.svg'
     ],
    'button'              => [
        'label'      => __( 'Button', 'essential-blocks' ),
        'value'      => 'button',
        'visibility' => 'true',
        'category'   => 'content',
        'object'     => Button::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/button/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/button/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/button/icon.svg'
     ],
    'call_to_action'      => [
        'label'      => __( 'Call To Action', 'essential-blocks' ),
        'value'      => 'call_to_action',
        'visibility' => 'true',
        'category'   => 'marketing',
        'object'     => CallToAction::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/call-to-action/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/call-to-action/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/call-to-action/icon.svg'
     ],
    'countdown'           => [
        'label'      => __( 'Countdown', 'essential-blocks' ),
        'value'      => 'countdown',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => CountDown::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/countdown/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/countdown/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/countdown/icon.svg'
     ],
    'dual_button'         => [
        'label'      => __( 'Dual Button', 'essential-blocks' ),
        'value'      => 'dual_button',
        'visibility' => 'true',
        'category'   => 'content',
        'object'     => DualButton::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/dual-button/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/dual-button/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/dual-button/icon.svg'
     ],
    'flipbox'             => [
        'label'      => __( 'Flipbox', 'essential-blocks' ),
        'value'      => 'flipbox',
        'visibility' => 'true',
        'category'   => 'content',
        'object'     => FlipBox::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/flipbox/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/flipbox/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/flipbox/icon.svg'
     ],
    'advanced_heading'    => [
        'label'      => __( 'Advanced Heading', 'essential-blocks' ),
        'value'      => 'advanced_heading',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'content',
        'object'     => AdvancedHeading::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/advanced-heading/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/heading/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/advanced-heading/icon.svg'
     ],
    'image_comparison'    => [
        'label'      => __( 'Image Comparison', 'essential-blocks' ),
        'value'      => 'image_comparison',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => ImageComparison::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/image-comparison/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/image-comparison/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/image-comparison/icon.svg'
     ],
    'image_gallery'       => [
        'label'      => __( 'Image Gallery', 'essential-blocks' ),
        'value'      => 'image_gallery',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'creative',
        'object'     => ImageGallery::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/image-gallery/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-image-gallery/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/image-gallery/icon.svg'
     ],
    'infobox'             => [
        'label'      => __( 'Infobox', 'essential-blocks' ),
        'value'      => 'infobox',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'content',
        'object'     => InfoBox::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/infobox/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/infobox/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/infobox/icon.svg'
     ],
    'instagram_feed'      => [
        'label'      => __( 'Instagram Feed', 'essential-blocks' ),
        'value'      => 'instagram_feed',
        'visibility' => 'true',
        'category'   => 'social',
        'object'     => InstagramFeed::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/instagram-feed/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/instagram-feed/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/instagram-feed/icon.svg'
     ],
    'interactive_promo'   => [
        'label'      => __( 'Interactive Promo', 'essential-blocks' ),
        'value'      => 'interactive_promo',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => InteractivePromo::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/interactive-promo/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/interactive-promo/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/interactive-promo/icon.svg'
     ],
    'notice'              => [
        'label'      => __( 'Notice', 'essential-blocks' ),
        'value'      => 'notice',
        'visibility' => 'true',
        'category'   => 'marketing',
        'object'     => Notice::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/notice/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/notice/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/notice/icon.svg'
     ],
    'parallax_slider'     => [
        'label'      => __( 'Parallax Slider', 'essential-blocks' ),
        'value'      => 'parallax_slider',
        'visibility' => 'true',
        'category'   => 'content',
        'object'     => ParallaxSlider::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/parallax-slider/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/parallax-slider/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/parallax-slider/icon.svg'
     ],
    'pricing_table'       => [
        'label'      => __( 'Pricing Table', 'essential-blocks' ),
        'value'      => 'pricing_table',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'marketing',
        'object'     => PricingTable::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/pricing-table/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/pricing-table/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/pricing-table/icon.svg'
     ],
    'progress_bar'        => [
        'label'      => __( 'Progress Bar', 'essential-blocks' ),
        'value'      => 'progress_bar',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => ProgressBar::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/progress-bar/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/progress-bar/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/progress-bar/icon.svg'

     ],
    'slider'              => [
        'label'      => __( 'Slider', 'essential-blocks' ),
        'value'      => 'slider',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'content',
        'object'     => Slider::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/slider/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/slider/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/slider/icon.svg'
     ],
    'social'              => [
        'label'      => __( 'Social Icons', 'essential-blocks' ),
        'value'      => 'social',
        'visibility' => 'true',
        'category'   => 'social',
        'object'     => Social::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/social/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/social/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/social/icon.svg'
     ],
    'social_share'        => [
        'label'      => __( 'Social Share', 'essential-blocks' ),
        'value'      => 'social_share',
        'visibility' => 'true',
        'category'   => 'social',
        'object'     => SocialShare::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/social-share/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-social-share/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/social-share/icon.svg'
     ],
    'team_member'         => [
        'label'      => __( 'Team Member', 'essential-blocks' ),
        'value'      => 'team_member',
        'visibility' => 'true',
        'category'   => 'content',
        'object'     => TeamMember::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/team-member/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/team-member/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/team-member/icon.svg'
     ],
    'testimonial'         => [
        'label'      => __( 'Testimonial', 'essential-blocks' ),
        'value'      => 'testimonial',
        'visibility' => 'true',
        'category'   => 'content',
        'object'     => Testimonial::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/testimonial/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/testimonial/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/testimonial/icon.svg'
     ],
    'toggle_content'      => [
        'label'      => __( 'Toggle Content', 'essential-blocks' ),
        'value'      => 'toggle_content',
        'visibility' => 'true',
        'category'   => 'content',
        'object'     => ToggleContent::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/toggle-content/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-toggle-content/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/toggle-content/icon.svg'
     ],
    'typing_text'         => [
        'label'      => __( 'Typing Text', 'essential-blocks' ),
        'value'      => 'typing_text',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => TypingText::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/typing-text/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/typing-text/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/typing-text/icon.svg'
     ],
    'wrapper'             => [
        'label'      => __( 'Wrapper', 'essential-blocks' ),
        'value'      => 'wrapper',
        'visibility' => 'true',
        'category'   => 'layout',
        'object'     => Wrapper::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/wrapper/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/block-wrapper/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/wrapper/icon.svg'
     ],
    'number_counter'      => [
        'label'      => __( 'Number Counter', 'essential-blocks' ),
        'value'      => 'number_counter',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => NumberCounter::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/number-counter/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-number-counter/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/number-counter/icon.svg'
     ],
    'post_grid'           => [
        'label'      => __( 'Post Grid', 'essential-blocks' ),
        'value'      => 'post_grid',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'dynamic',
        'object'     => PostGrid::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/post-grid/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-post-grid/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/post-grid/icon.svg'
     ],
    'feature_list'        => [
        'label'      => __( 'Feature List', 'essential-blocks' ),
        'value'      => 'feature_list',
        'visibility' => 'true',
        'category'   => 'content',
        'object'     => FeatureList::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/feature-list/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-feature-list/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/feature-list/icon.svg'
     ],
    'row'                 => [
        'label'      => __( 'Row', 'essential-blocks' ),
        'value'      => 'row',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'layout',
        'object'     => Row::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/row/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-row/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/row/icon.svg'
     ],
    'table_of_contents'   => [
        'label'      => __( 'Table Of Contents', 'essential-blocks' ),
        'value'      => 'table_of_contents',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'content',
        'object'     => TableOfContents::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/table-of-contents/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-table-of-contents/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/table-of-contents/icon.svg'
     ],
    'fluent_forms'        => [
        'label'      => __( 'Fluent Forms', 'essential-blocks' ),
        'value'      => 'fluent_forms',
        'visibility' => 'true',
        'category'   => 'form',
        'object'     => FluentForms::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/fluent-forms-2/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-fluent-forms/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/fluent-forms/icon.svg'
     ],
    'advanced_tabs'       => [
        'label'      => __( 'Advanced Tabs', 'essential-blocks' ),
        'value'      => 'advanced_tabs',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'content',
        'object'     => AdvancedTabs::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/advanced-tab/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-advanced-tabs/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/advanced-tabs/icon.svg'
     ],
    'advanced_navigation' => [
        'label'      => __( 'Advanced Navigation', 'essential-blocks' ),
        'value'      => 'advanced_navigation',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => AdvancedNavigation::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/advanced-navigation/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-advanced-navigation/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/advanced-navigation/icon.svg'
     ],
    'woo_product_grid'    => [
        'label'      => __( 'Woo Product Grid', 'essential-blocks' ),
        'value'      => 'woo_product_grid',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'woocommerce',
        'object'     => WooProductGrid::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/woo-product-grid/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/woo-product-grid/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/woo-product-grid/icon.svg'
     ],
    'advanced_image'      => [
        'label'      => __( 'Advanced Image', 'essential-blocks' ),
        'value'      => 'advanced_image',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => AdvancedImage::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/advanced-image/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-advanced-image/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/advanced-image/icon.svg'
     ],
    'wpforms'             => [
        'label'      => __( 'WPForms', 'essential-blocks' ),
        'value'      => 'wpforms',
        'visibility' => 'true',
        'category'   => 'form',
        'object'     => WPForms::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/wpforms/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-wpforms/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/wpforms/icon.svg'
     ],
    'post_carousel'       => [
        'label'      => __( 'Post Carousel', 'essential-blocks' ),
        'value'      => 'post_carousel',
        'visibility' => 'true',
        'category'   => 'dynamic',
        'object'     => PostCarousel::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/post-carousel/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-post-carousel/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/post-carousel/icon.svg'
     ],
    'advanced_video'      => [
        'label'      => __( 'Advanced Video', 'essential-blocks' ),
        'value'      => 'advanced_video',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => AdvancedVideo::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/advanced-video/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-advanced-video/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/advanced-video/icon.svg'
     ],
    'popup'               => [
        'label'      => __( 'Popup', 'essential-blocks' ),
        'value'      => 'popup',
        'visibility' => 'true',
        'category'   => 'marketing',
        'object'     => PopUp::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/popup/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-popup/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/popup/icon.svg'
     ],
    'openverse'           => [
        'label'      => __( 'Openverse', 'essential-blocks' ),
        'value'      => 'openverse',
        'visibility' => 'true',
        'category'   => 'dynamic',
        'object'     => Openverse::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/openverse/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/openverse/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/openverse/icon.svg'
     ],
    'nft_gallery'         => [
        'label'      => __( 'NFT Gallery', 'essential-blocks' ),
        'value'      => 'nft_gallery',
        'visibility' => 'true',
        'category'   => 'dynamic',
        'status'     => 'updated',
        'object'     => NftGallery::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/nft-gallery/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-nft-gallery/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/nft-gallery/icon.svg'
     ],
    'google_map'          => [
        'label'      => __( 'Google Maps', 'essential-blocks' ),
        'value'      => 'google_map',
        'visibility' => 'true',
        'category'   => 'dynamic',
        'object'     => GoogleMap::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/google-maps/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-google-maps/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/google-map/icon.svg'
     ],
    'shape_divider'       => [
        'label'      => __( 'Shape Divider', 'essential-blocks' ),
        'value'      => 'shape_divider',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => ShapeDivider::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/shape-divider/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-shape-divider',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/shape-divider/icon.svg'
     ],
    'form'                => [
        'label'      => __( 'Form', 'essential-blocks' ),
        'value'      => 'form',
        'visibility' => 'true',
        'status'     => 'popular',
        'category'   => 'form',
        'object'     => Form::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/form-block/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-form-block',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/form/icon.svg'
     ],
    'icon'                => [
        'label'      => __( 'Icon Picker', 'essential-blocks' ),
        'value'      => 'icon',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => Icon::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/icon-picker/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-icon-picker',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/icon/icon.svg'
     ]
 ];

$new_blocks = [
    'text'            => [
        'label'      => __( 'Text', 'essential-blocks' ),
        'value'      => 'text',
        'visibility' => 'true',
        'category'   => 'content',
        'status'     => 'new',
        'object'     => Text::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/text-block/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-text/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/text/icon.svg'
     ],
    'taxonomy'        => [
        'label'      => __( 'Taxonomy', 'essential-blocks' ),
        'value'      => 'taxonomy',
        'visibility' => 'true',
        'status'     => 'new',
        'category'   => 'dynamic',
        'object'     => Taxonomy::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/taxonomy/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-taxonomy/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/taxonomy/icon.svg'
     ],
    'product_price'   => [
        'label'      => __( 'Product Price', 'essential-blocks' ),
        'value'      => 'product_price',
        'visibility' => 'true',
        'status'     => 'new',
        'category'   => 'woocommerce',
        'object'     => ProductPrice::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/woo-product-price/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-woo-product-price/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/product-price/icon.svg'
     ],
    'post_meta'       => [
        'label'      => __( 'Post Meta', 'essential-blocks' ),
        'value'      => 'post_meta',
        'visibility' => 'true',
        'category'   => 'creative',
        'object'     => PostMeta::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/post-meta/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-post-meta/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/post-meta/icon.svg'
     ],
    'product_rating'  => [
        'label'      => __( 'Product Rating', 'essential-blocks' ),
        'value'      => 'product_rating',
        'visibility' => 'true',
        'status'     => 'new',
        'category'   => 'woocommerce',
        'object'     => ProductRating::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/woo-product-rating/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-product-rating/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/product-rating/icon.svg'
     ],
    'product_details' => [
        'label'      => __( 'Product Details', 'essential-blocks' ),
        'value'      => 'product_details',
        'visibility' => 'true',
        'status'     => 'new',
        'category'   => 'woocommerce',
        'object'     => ProductDetails::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/woo-product-details/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-woo-product-details/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/product-details/icon.svg'
     ],
    'add_to_cart'     => [
        'label'      => __( 'Add To Cart', 'essential-blocks' ),
        'value'      => 'add_to_cart',
        'visibility' => 'true',
        'status'     => 'new',
        'category'   => 'woocommerce',
        'object'     => AddToCart::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/woo-add-to-cart/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/woo-add-to-cart/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/add-to-cart/icon.svg'
     ],
    'product_images'  => [
        'label'      => __( 'Product Images', 'essential-blocks' ),
        'value'      => 'product_images',
        'visibility' => 'true',
        'status'     => 'new',
        'category'   => 'woocommerce',
        'object'     => ProductImages::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/woo-product-image/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-woo-product-image/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/product-images/icon.svg'
     ],
    'breadcrumbs'     => [
        'label'      => __( 'Breadcrumbs', 'essential-blocks' ),
        'value'      => 'breadcrumbs',
        'visibility' => 'true',
        'status'     => 'new',
        'category'   => 'dynamic',
        'object'     => Breadcrumbs::get_instance(),
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/breadcrumbs/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-breadcrumbs/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/blocks/breadcrumb/icon.svg'
     ]
 ];

$pro_blocks = [
    'advanced_search'           => [
        'label'      => __( 'Advanced Search', 'essential-blocks' ),
        'value'      => 'advanced_search',
        'visibility' => 'true',
        'status'     => 'updated',
        'is_pro'     => true,
        'category'   => 'content',
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/advanced-search',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-advanced-search',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/blocks-icon/adv-search.svg'
     ],
    'data_table'                => [
        'label'      => __( 'Data Table', 'essential-blocks' ),
        'value'      => 'data_table',
        'visibility' => 'true',
        'status'     => 'updated',
        'category'   => 'dynamic',
        'is_pro'     => true,
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/data-table/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-data-table',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/blocks-icon/data-table.svg'
     ],
    'timeline_slider'           => [
        'label'      => __( 'Timeline Slider', 'essential-blocks' ),
        'value'      => 'timeline_slider',
        'visibility' => 'true',
        'category'   => 'dynamic',
        'is_pro'     => true,
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/timeline-slider',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-timeline-slider',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/blocks-icon/timeline-slider.svg'
     ],
    'news_ticker'               => [
        'label'      => __( 'News Ticker', 'essential-blocks' ),
        'value'      => 'news_ticker',
        'visibility' => 'true',
        'category'   => 'dynamic',
        'is_pro'     => true,
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/news-ticker',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-news-ticker',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/blocks-icon/news-ticker.svg'
     ],
    'woo_product_carousel'      => [
        'label'      => __( 'Woo Product Carousel', 'essential-blocks' ),
        'value'      => 'woo_product_carousel',
        'visibility' => 'true',
        'category'   => 'woocommerce',
        'is_pro'     => true,
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/woo-product-carousel/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-woo-product-carousel',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/blocks-icon/product-carousel.svg'
     ],
    'multicolumn_pricing_table' => [
        'label'      => __( 'Multicolumn Pricing Table', 'essential-blocks' ),
        'value'      => 'multicolumn_pricing_table',
        'visibility' => 'true',
        'status'     => 'updated',
        'category'   => 'marketing',
        'is_pro'     => true,
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/multicolumn-pricing-table',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-multicolumn-pricing-table',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/blocks-icon/multicolumn-pricing-table.svg'
     ],
    'fancy_chart'               => [
        'label'      => __( 'Fancy Chart', 'essential-blocks' ),
        'value'      => 'fancy_chart',
        'visibility' => 'true',
        'status'     => 'updated',
        'category'   => 'dynamic',
        'is_pro'     => true,
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/fancy-chart',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-fancy-chart',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/blocks-icon/fancy-chart.svg'
     ],
    'stacked_cards'             => [
        'label'      => __( 'Stacked Cards', 'essential-blocks' ),
        'value'      => 'stacked_cards',
        'visibility' => 'true',
        'category'   => 'creative',
        'is_pro'     => true,
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/stacked-cards',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-stacked-cards',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/blocks-icon/stacked-cards.svg'
     ],
    'testimonial_slider'        => [
        'label'      => __( 'Testimonial Slider', 'essential-blocks' ),
        'value'      => 'testimonial_slider',
        'visibility' => 'true',
        'category'   => 'content',
        'is_pro'     => true,
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/testimonial-slider/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-testimonial-slider',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/blocks-icon/testimonial-slider.svg'
     ],
    'off_canvas'                => [
        'label'      => __( 'Offcanvas', 'essential-blocks' ),
        'value'      => 'off_canvas',
        'visibility' => 'true',
        'category'   => 'content',
        'is_pro'     => true,
        'demo'       => ESSENTIAL_BLOCKS_SITE_URL . 'demo/offcanvas/',
        'doc'        => ESSENTIAL_BLOCKS_SITE_URL . 'docs/eb-offcanvas/',
        'icon'       => ESSENTIAL_BLOCKS_ADMIN_URL . 'assets/images/blocks-icon/offcanvas.svg'
     ]
 ];

return array_merge( $free_blocks, $new_blocks, $pro_blocks );
