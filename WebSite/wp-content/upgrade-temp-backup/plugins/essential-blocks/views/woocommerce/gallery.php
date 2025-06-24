<?php
use EssentialBlocks\Utils\Helper;
?>

<div class="eb-product-image_slider eb-product-image-gallery eb-product-gallery-<?php echo esc_attr($gallery_position); ?>">
    <div class="eb-product-image_slider-body">
    <div class="eb-product-image_slider-body-item"><?php echo wp_kses(Helper::get_product_gallery_image_html($thumbnail_id, true), 'post'); ?></div>
    <?php
        if ( $attachment_ids && $thumbnail_id ) {
            foreach ( $attachment_ids as $attachment_id ) { ?>
                <div class="eb-product-image_slider-body-item"><?php echo wp_kses(Helper::get_product_gallery_image_html($attachment_id, true), 'post'); ?></div>
                <?php
            }
        }
    ?>
    </div>
    <div class="eb-product-image_slider-footer">
        <div class="eb-product-image_slider-footer-item"><?php echo wp_kses(Helper::get_product_gallery_image_html($thumbnail_id),'post'); ?></div>
        <?php 
            if ( $attachment_ids && $thumbnail_id ) {
                foreach ( $attachment_ids as $attachment_id ) {
                    ?><div class="eb-product-image_slider-footer-item"><?php
                    echo wp_kses(Helper::get_product_gallery_image_html($attachment_id),'post');
                    ?></div><?php
                }
            }
        ?>
    </div>
</div>
