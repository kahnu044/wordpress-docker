<div class="eb-woo-product-rating-wrapper">
    <?php
        if ( ! isset( $ratingStyle ) ) {
            $ratingStyle = 'star';
        }

        if ( 'star' === $ratingStyle ) {
            for ( $i = 1; $i <= 5; $i++ ) {
                if ( $i <= $product->get_average_rating() ) {
                    echo wp_kses_post( '<span class="eb-woo-product-rating filled"><i class="' . esc_attr($starsVariation) . '"></i></span>' );
                } else {
                    echo wp_kses_post( '<span class="eb-woo-product-rating"><i class="' . esc_attr($starsVariation) . '"></i></span>' );
                }
            }
        } else if ( 'number' === $ratingStyle ) {
            echo sprintf( '<span class="eb-woo-product-rating filled"><i class="fas fa-star"></i> %1$s</span>',
                esc_html( $product->get_average_rating() )
            );
        }
    ?>
</div>

<?php
if(isset( $showReviewCount ) ? $showReviewCount : false){
    if ( comments_open() ) {
        $count   = $product->get_rating_count();

        echo sprintf(
            '<a href="%1$s#reviews" class="woocommerce-review-link eb-product-rating-count" rel="nofollow">%2$s %3$s %4$s</a>',
            esc_url( get_permalink() ),
            $beforeCaption,
            $count > 0 ?
            sprintf(
                _n(
                    '%s '. $singluarCaption,
                    '%s '. $pluralCaption,
                    $count,
                    'essential-blocks'
                ),
                '<span class="count">' . esc_html( $count ) . '</span>'
            ) :
            sprintf(
                '<span class="count">%1$s</span>%2$s',
                esc_html( $count ),
                $emptyCaption
            ),
            $afterCaption,
        );
    }
}
?>