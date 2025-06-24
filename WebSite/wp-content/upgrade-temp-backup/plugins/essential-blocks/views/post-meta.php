<?php
$allowed_html = array(
    'span' => array(
        'class' => array(),
    ),
    'i' => array(
        'class' => array(),
    ),
);

$wrapper_attributes = get_block_wrapper_attributes(
    [
        'class' => 'root-' . $blockId,
    ]
);

$author_name = isset($meta_data['author']) ? $meta_data['author'] : "";
$date = isset($meta_data['date']) ? $meta_data['date'] : "";
$product_sku = isset($meta_data['product_sku']) ? $meta_data['product_sku'] : "";

$show_meta_icon = isset($meta_data['show_meta_icon']) ? $meta_data['show_meta_icon'] : "";
$author_icon = isset($meta_data['author_icon']) ? $meta_data['author_icon'] : "";
$date_icon = isset($meta_data['date_icon']) ? $meta_data['date_icon'] : "";
$sku_icon = isset($meta_data['sku_icon']) ? $meta_data['sku_icon'] : "";
?>

<div <?php echo wp_kses_data($wrapper_attributes); ?>>
    <div class="eb-parent-wrapper eb-parent-<?php echo esc_attr($blockId); ?><?php echo esc_attr($classHook); ?>">
        <div class="<?php echo esc_attr($blockId); ?> eb-post-meta-wrapper"
            data-id="<?php echo esc_attr($blockId); ?>">
            <div class="eb-post-metadata eb-post-meta-<?php echo esc_attr($metaDisplay); ?>">
                <?php if ($showAuthor) { ?>
                    <div class="eb-post-metadata-item eb-post-metadata-author">
                        <?php if ($show_meta_icon && $author_icon) {
                            echo wp_kses($author_icon, $allowed_html);
                        } ?>

                        <?php if (!empty($authorLabel)) { ?>
                            <span class="eb-post-metadata-label"><?php echo esc_html($authorLabel); ?></span>
                        <?php } ?>
                        <span class="eb-post-metadata-value"><?php echo esc_html($author_name); ?></span>
                    </div>
                <?php } ?>

                <?php if ($showDate) { ?>
                    <div class="eb-post-metadata-item eb-post-metadata-date">
                        <?php if ($show_meta_icon && $date_icon) {
                            echo wp_kses($date_icon, $allowed_html);
                        } ?>
                        <?php if (!empty($dateLabel)) { ?>
                            <span class="eb-post-metadata-label"><?php echo esc_html($dateLabel); ?></span>
                        <?php } ?>
                        <span class="eb-post-metadata-value"><?php echo esc_html($date); ?></span>
                    </div>
                <?php } ?>

                <?php if ('product' ===  $type && $showProductSku) { ?>
                    <div class="eb-post-metadata-item eb-post-metadata-product_sku">
                        <?php if ($show_meta_icon && $sku_icon) {
                            echo wp_kses($sku_icon, $allowed_html);
                        } ?>
                        <?php if (!empty($productSkuLabel)) { ?>
                            <span class="eb-post-metadata-label"><?php echo esc_html($productSkuLabel); ?></span>
                        <?php } ?>
                        <span class="eb-post-metadata-value"><?php echo esc_html($product_sku); ?></span>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</div>