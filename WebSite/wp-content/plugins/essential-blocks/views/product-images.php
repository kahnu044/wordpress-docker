<?php
    defined( 'ABSPATH' ) || exit;

    global $product;

    if(! $product ) return;

    $wrapper_attributes = get_block_wrapper_attributes(
		[
			'class' => 'root-' . $blockId,
		]
	);

    $post_thumbnail_id = $product->get_image_id();
    $attachment_ids = $product->get_gallery_image_ids();  

    $wrapper_classes = [
        $blockId,
        is_array($attachment_ids) && count($attachment_ids) <= 4 ? 'eb-product-images-disable-nav' : ''
    ];

?>


<div <?php echo wp_kses_data( $wrapper_attributes); ?>>
    <div class="eb-parent-wrapper eb-parent-<?php echo esc_attr( $blockId ); ?> <?php echo esc_attr( $classHook ); ?>">
        <div
            class="<?php echo esc_attr( implode(" ",$wrapper_classes )); ?> eb-product-images-wrapper"
            data-id="<?php echo esc_attr( $blockId ); ?>"
            data-settings="<?php echo esc_attr(json_encode($settings)); ?>"
            data-nav-settings="<?php echo esc_attr(json_encode($nav_settings)); ?>"
        >

            <?php 
                if( $post_thumbnail_id && is_array($attachment_ids) && ! empty($attachment_ids)) {
                    $helper::views(
                        'woocommerce/gallery', 
                        [
                            'thumbnail_id'     => $post_thumbnail_id,
                            'attachment_ids'   => $attachment_ids,
                            'gallery_position' => $galleryPosition
                        ]
                    );
                } else if ($post_thumbnail_id) {
                    $helper::views(
                        'woocommerce/image',
                        [
                            'thumbnail_id'     => $post_thumbnail_id,
                        ]
                    );
                } else { ?>
                    <div class="woocommerce-product-gallery__image--placeholder">
                        <?php 
                            echo sprintf( '<img src="%s" alt="%s" class="wp-post-image" />', esc_url( wc_placeholder_img_src( 'woocommerce_single' ) ), esc_html__( 'Awaiting product image', 'essential-blocks' ) );
                        ?>
                    </div>
                <?php }
            ?>
        </div>
    </div>
</div>