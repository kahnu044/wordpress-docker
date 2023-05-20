<div class="eb-woo-product-rating-wrapper">
    <?php
        for ($i = 1; $i <= 5; $i++) {
            if ($i <= $product->get_average_rating()) {
                echo wp_kses_post('<span class="eb-woo-product-rating filled"><i class="fas fa-star"></i></span>');
            } else {
                echo wp_kses_post('<span class="eb-woo-product-rating"><i class="far fa-star"></i></span>');
            }
        }
    ?>
</div>
