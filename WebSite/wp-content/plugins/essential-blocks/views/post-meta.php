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
$author_avatar_url = isset($meta_data['author_avatar_url']) ? $meta_data['author_avatar_url'] : "";
$author_url = isset($meta_data['author_url']) ? $meta_data['author_url'] : "";
$date = isset($meta_data['date']) ? $meta_data['date'] : "";
$product_sku = isset($meta_data['product_sku']) ? $meta_data['product_sku'] : "";

$show_meta_icon = isset($meta_data['show_meta_icon']) ? $meta_data['show_meta_icon'] : "";
$author_icon = isset($meta_data['author_icon']) ? $meta_data['author_icon'] : "";
$date_icon = isset($meta_data['date_icon']) ? $meta_data['date_icon'] : "";
$sku_icon = isset($meta_data['sku_icon']) ? $meta_data['sku_icon'] : "";

// Function to check if content is enabled
if (!function_exists('eb_post_meta_is_content_enabled')) {
    function eb_post_meta_is_content_enabled($content_name, $enable_contents)
    {
        return in_array($content_name, $enable_contents);
    }
}

// Function to render individual meta items based on type
if (!function_exists('eb_post_meta_render_meta_item')) {
    function eb_post_meta_render_meta_item($content_type, $attributes, $meta_data, $allowed_html)
    {
        $author_name = $meta_data['author'];
        $author_avatar_url = $meta_data['author_avatar_url'];
        $author_url = $meta_data['author_url'];
        $date = $meta_data['date'];
        $product_sku = $meta_data['product_sku'];
        $show_meta_icon = $meta_data['show_meta_icon'];
        $author_icon = $meta_data['author_icon'];
        $date_icon = $meta_data['date_icon'];
        $sku_icon = $meta_data['sku_icon'];

        $showAuthor = $attributes['showAuthor'];
        $showDate = $attributes['showDate'];
        $showProductSku = $attributes['showProductSku'];
        $authorLabel = $attributes['authorLabel'];
        $dateLabel = $attributes['dateLabel'];
        $productSkuLabel = $attributes['productSkuLabel'];
        $metaDisplay = $attributes['metaDisplay'];
        $showAuthorPicture = $attributes['showAuthorPicture'];
        $authorPictureLink = $attributes['authorPictureLink'];
        $type = $attributes['type'];

        ob_start();

        switch ($content_type) {
            case 'author':
                if (!eb_post_meta_is_content_enabled('author', $attributes['enableContents']) || !$showAuthor) {
                    break;
                }

                if ($metaDisplay === 'stacked') {
                    // For stacked layout, return the author content part only
?>
                    <div class="eb-author-info">
                        <?php if ($show_meta_icon && $author_icon) {
                            echo wp_kses($author_icon, $allowed_html);
                        } ?>
                        <?php if (!empty($authorLabel)) { ?>
                            <span class="eb-post-metadata-label"><?php echo esc_html($authorLabel); ?></span>
                        <?php } ?>
                        <a href="<?php echo esc_url($author_url); ?>"><span class="eb-post-metadata-value"><?php echo esc_html($author_name); ?></span></a>
                    </div>
                <?php
                } else {
                    // For inline layout, return complete author item with picture
                ?>
                    <div class="eb-post-metadata-item eb-post-metadata-author eb-author-inline-layout">
                        <?php if ($show_meta_icon && $author_icon) {
                            echo wp_kses($author_icon, $allowed_html);
                        } ?>
                        <?php if ($showAuthorPicture && $author_avatar_url) { ?>
                            <div class="eb-author-picture">
                                <?php if ($authorPictureLink) { ?>
                                    <a href="<?php echo esc_url($author_url); ?>">
                                        <img
                                            src="<?php echo esc_url($author_avatar_url); ?>"
                                            alt="<?php echo esc_attr($author_name); ?>"
                                            class="eb-author-avatar" />
                                    </a>
                                <?php } else { ?>
                                    <img
                                        src="<?php echo esc_url($author_avatar_url); ?>"
                                        alt="<?php echo esc_attr($author_name); ?>"
                                        class="eb-author-avatar" />
                                <?php } ?>
                            </div>
                        <?php } ?>
                        <?php if (!empty($authorLabel)) { ?>
                            <span class="eb-post-metadata-label"><?php echo esc_html($authorLabel); ?></span>
                        <?php } ?>
                        <a href="<?php echo esc_url($author_url); ?>"><span class="eb-post-metadata-value"><?php echo esc_html($author_name); ?></span></a>
                    </div>
                <?php
                }
                break;

            case 'date':
                if (!eb_post_meta_is_content_enabled('date', $attributes['enableContents']) || !$showDate) {
                    break;
                }

                if ($metaDisplay === 'stacked') {
                    // For stacked layout, return the date content part only
                ?>
                    <div class="eb-date-info">
                        <?php if ($show_meta_icon && $date_icon) {
                            echo wp_kses($date_icon, $allowed_html);
                        } ?>
                        <?php if (!empty($dateLabel)) { ?>
                            <span class="eb-post-metadata-label"><?php echo esc_html($dateLabel); ?></span>
                        <?php } ?>
                        <span class="eb-post-metadata-value"><?php echo esc_html($date); ?></span>
                    </div>
                <?php
                } else {
                    // For inline layout, return complete date item
                ?>
                    <div class="eb-post-metadata-item eb-post-metadata-date">
                        <?php if ($show_meta_icon && $date_icon) {
                            echo wp_kses($date_icon, $allowed_html);
                        } ?>
                        <?php if (!empty($dateLabel)) { ?>
                            <span class="eb-post-metadata-label"><?php echo esc_html($dateLabel); ?></span>
                        <?php } ?>
                        <span class="eb-post-metadata-value"><?php echo esc_html($date); ?></span>
                    </div>
                <?php
                }
                break;

            case 'product_sku':
                if (!eb_post_meta_is_content_enabled('product_sku', $attributes['enableContents']) || !$showProductSku || $type !== 'product') {
                    break;
                }
                ?>
                <div class="eb-post-metadata-item eb-post-metadata-product_sku">
                    <?php if ($show_meta_icon && $sku_icon) {
                        echo wp_kses($sku_icon, $allowed_html);
                    } ?>
                    <?php if (!empty($productSkuLabel)) { ?>
                        <span class="eb-post-metadata-label"><?php echo esc_html($productSkuLabel); ?></span>
                    <?php } ?>
                    <span class="eb-post-metadata-value"><?php echo esc_html($product_sku); ?></span>
                </div>
<?php
                break;
        }

        return ob_get_clean();
    }
}

// Check if we have author and date for stacked layout
$has_author_for_stacked = eb_post_meta_is_content_enabled('author', $enableContents) && $showAuthor;
$has_date_for_stacked = eb_post_meta_is_content_enabled('date', $enableContents) && $showDate;
$should_show_stacked_layout = $metaDisplay === 'stacked' && ($has_author_for_stacked || $has_date_for_stacked);
?>

<div <?php echo wp_kses_data($wrapper_attributes); ?>>
    <div class="eb-parent-wrapper eb-parent-<?php echo esc_attr($blockId); ?><?php echo esc_attr($classHook); ?>">
        <div class="<?php echo esc_attr($blockId); ?> eb-post-meta-wrapper"
            data-id="<?php echo esc_attr($blockId); ?>">
            <div class="eb-post-metadata eb-post-meta-<?php echo esc_attr($metaDisplay); ?>">
                <?php if ($should_show_stacked_layout) { ?>
                    <!-- Stacked layout: Picture on left, author name and date stacked on right -->
                    <div class="eb-post-metadata-item eb-post-metadata-author eb-author-stacked-layout">
                        <?php if ($has_author_for_stacked && $showAuthorPicture && $author_avatar_url) { ?>
                            <div class="eb-author-picture">
                                <?php if ($authorPictureLink) { ?>
                                    <a href="<?php echo esc_url($author_url); ?>">
                                        <img
                                            src="<?php echo esc_url($author_avatar_url); ?>"
                                            alt="<?php echo esc_attr($author_name); ?>"
                                            class="eb-author-avatar" />
                                    </a>
                                <?php } else { ?>
                                    <img
                                        src="<?php echo esc_url($author_avatar_url); ?>"
                                        alt="<?php echo esc_attr($author_name); ?>"
                                        class="eb-author-avatar" />
                                <?php } ?>
                            </div>
                        <?php } ?>
                        <div class="eb-author-meta-content">
                            <?php
                            // Render items in sorted order for stacked layout
                            foreach ($enableContents as $content_type) {
                                echo eb_post_meta_render_meta_item($content_type, get_defined_vars(), $meta_data, $allowed_html);
                            }
                            ?>
                        </div>
                    </div>
                <?php } else { ?>
                    <!-- Inline layout: Render items in sorted order -->
                    <?php
                    foreach ($enableContents as $content_type) {
                        echo eb_post_meta_render_meta_item($content_type, get_defined_vars(), $meta_data, $allowed_html);
                    }
                    ?>
                <?php } ?>
            </div>
        </div>
    </div>
</div>