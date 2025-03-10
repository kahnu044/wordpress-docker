
<?php
$category_ids = $product->get_category_ids();

if (empty($category_ids)) {
    return;
}

$categories = [];
foreach ($category_ids as $cat_id) {
    $category = get_term($cat_id, 'product_cat');
    if ($category && !is_wp_error($category)) {
        $category_link = get_term_link($category);
        if (!is_wp_error($category_link)) {
            $categories[] = '<a href="' . esc_url($category_link) . '">' . esc_html($category->name) . '</a>';
        }
    }
}
if (!empty($categories)) {
    echo '<div class="eb-woo-product-category">';
    echo '<ul class="eb-woo-product-category-list">';

    // Display categories as list items with commas (except last item)
    foreach ($categories as $index => $category_html) {
        echo '<li>' . $category_html;
        if ($index !== count($categories) - 1) {
            echo ', ';
        }
        echo '</li>';
    }

    echo '</ul>';
    echo '</div>';
}
