<?php
use EssentialBlocks\Utils\Helper;
?>

<div class="eb-product-image_slider">
    <div class="eb-product-image_slider-body">
        <?php  echo wp_kses_post(Helper::get_product_gallery_image_html($thumbnail_id, true)); ?>
    </div>
</div>
