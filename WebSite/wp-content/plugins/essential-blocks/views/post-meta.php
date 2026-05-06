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
$effective_items = isset($meta_data['effective_items']) && is_array($meta_data['effective_items']) ? $meta_data['effective_items'] : [];
$custom_meta_html = isset($meta_data['custom_meta_html']) && is_array($meta_data['custom_meta_html']) ? $meta_data['custom_meta_html'] : [];
$custom_icon_html = isset($meta_data['custom_icon_html']) && is_array($meta_data['custom_icon_html']) ? $meta_data['custom_icon_html'] : [];
$builtin_keys = ['author', 'date', 'product_sku'];

$custom_field_allowed_html = [
    'span' => [ 'class' => [] ],
    'a'    => [ 'href' => [], 'class' => [], 'target' => [], 'rel' => [] ],
    'i'    => [ 'class' => [] ],
    'img'  => [ 'src' => [], 'alt' => [], 'class' => [], 'width' => [], 'height' => [] ],
    'div'  => [ 'class' => [] ],
    'p'    => [ 'class' => [] ],
    'br'   => [],
    'strong' => [],
    'em'   => [],
];

// Force rel="noopener noreferrer" on any <a target="_blank"> in untrusted ACF
// HTML to prevent reverse-tabnabbing if the field URL was supplied by an
// untrusted editor / external content.
if (!function_exists('eb_post_meta_force_noopener')) {
    function eb_post_meta_force_noopener($html)
    {
        if (!is_string($html) || stripos($html, 'target=') === false) {
            return $html;
        }
        return preg_replace_callback(
            '/<a\b([^>]*?)\btarget=(["\'])_blank\2([^>]*)>/i',
            function ($m) {
                $combined = $m[1] . $m[3];
                if (stripos($combined, 'rel=') !== false) {
                    return $m[0];
                }
                return '<a' . $m[1] . 'target="_blank"' . $m[3] . ' rel="noopener noreferrer">';
            },
            $html
        );
    }
}

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

        $authorLabel = $attributes['authorLabel'];
        $dateLabel = $attributes['dateLabel'];
        $productSkuLabel = $attributes['productSkuLabel'];
        $metaDisplay = $attributes['metaDisplay'];
        $showAuthorPicture = $attributes['showAuthorPicture'];
        $authorPictureLink = $attributes['authorPictureLink'];
        // Prefer the live post type (Loop Builder iteration) over the saved
        // `type` attribute so product_sku gates correctly in mixed-type loops.
        $type = $meta_data['post_type'] ?? ($attributes['type'] ?? '');

        ob_start();

        switch ($content_type) {
            case 'author':
                // Gating handled upstream via $effective_items; render unconditionally here.

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
                // Gating handled upstream via $effective_items; render unconditionally here.

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
                if ($type !== 'product') {
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

// Helper to render a single effective item (builtin or ACF/custom).
if (!function_exists('eb_post_meta_render_effective_item')) {
    function eb_post_meta_render_effective_item($item, $attributes, $meta_data, $allowed_html, $custom_meta_html, $custom_icon_html, $custom_field_allowed_html, $builtin_keys)
    {
        if (empty($item['value'])) {
            return '';
        }
        $value = $item['value'];
        if (in_array($value, $builtin_keys, true)) {
            return eb_post_meta_render_meta_item($value, $attributes, $meta_data, $allowed_html);
        }
        if (!isset($custom_meta_html[$value])) {
            return '';
        }
        $custom_label = $item['customLabel'] ?? '';
        $show_meta_icon = !empty($attributes['showMetaIcon']);
        $icon_html = $show_meta_icon && !empty($custom_icon_html[$value]) ? $custom_icon_html[$value] : '';
        ob_start();
        ?>
        <div class="eb-post-metadata-item eb-post-metadata-custom">
            <?php if (!empty($icon_html)) {
                echo wp_kses($icon_html, $allowed_html);
            } ?>
            <?php if (!empty($custom_label)) { ?>
                <span class="eb-post-metadata-label"><?php echo esc_html($custom_label); ?> </span>
            <?php } ?>
            <?php echo wp_kses(eb_post_meta_force_noopener($custom_meta_html[$value]), $custom_field_allowed_html); ?>
        </div>
        <?php
        return ob_get_clean();
    }
}

// Check if we have author and date for stacked layout (from effective items).
$effective_values = array_map(fn($item) => $item['value'] ?? null, $effective_items);
$has_author_for_stacked = in_array('author', $effective_values, true);
// Stacked layout triggers whenever the user picked stacked AND there's at least
// one item to render — works for builtin (author/date) and ACF items alike.
$should_show_stacked_layout = $metaDisplay === 'stacked' && count($effective_items) > 0;
$stacked_wrapper_class = 'eb-post-metadata-item eb-author-stacked-layout' . ($has_author_for_stacked ? ' eb-post-metadata-author' : '');
?>

<div <?php echo wp_kses_data($wrapper_attributes); ?>>
    <div class="eb-parent-wrapper eb-parent-<?php echo esc_attr($blockId); ?><?php echo esc_attr($classHook); ?>">
        <div class="<?php echo esc_attr($blockId); ?> eb-post-meta-wrapper"
            data-id="<?php echo esc_attr($blockId); ?>">
            <div class="eb-post-metadata eb-post-meta-<?php echo esc_attr($metaDisplay); ?>">
                <?php if ($should_show_stacked_layout) { ?>
                    <!-- Stacked layout: Picture on left, items stacked on right (works for builtin + custom). -->
                    <div class="<?php echo esc_attr($stacked_wrapper_class); ?>">
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
                            // Render effective items in selection order for stacked layout.
                            foreach ($effective_items as $item) {
                                echo eb_post_meta_render_effective_item(
                                    $item,
                                    get_defined_vars(),
                                    $meta_data,
                                    $allowed_html,
                                    $custom_meta_html,
                                    $custom_icon_html,
                                    $custom_field_allowed_html,
                                    $builtin_keys
                                );
                            }
                            ?>
                        </div>
                    </div>
                <?php } else { ?>
                    <!-- Inline layout: Render effective items in selection order -->
                    <?php
                    foreach ($effective_items as $item) {
                        echo eb_post_meta_render_effective_item(
                            $item,
                            get_defined_vars(),
                            $meta_data,
                            $allowed_html,
                            $custom_meta_html,
                            $custom_icon_html,
                            $custom_field_allowed_html,
                            $builtin_keys
                        );
                    }
                    ?>
                <?php } ?>
            </div>
        </div>
    </div>
</div>