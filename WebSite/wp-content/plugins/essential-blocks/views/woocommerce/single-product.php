<?php
    /**
     * @var int $productDescLength
     * @var bool $showRating
     * @var bool $showPrice
     */
    $_grid_sequence = [
        'rating' => function () use ( $helper, $product, $showRating ) {
            if ( $showRating ) {
                $helper::views( 'woocommerce/rating', [
                    'product' => $product
                ] );
            }
        },
        'title'  => function () use ( $helper ) {
            $helper::views( 'woocommerce/title' );
        },
        'price'  => function () use ( $helper, $product, $showPrice ) {
            if ( $showPrice ) {
                $helper::views( 'woocommerce/price', [
                    'product' => $product
                ] );
            }
        }
    ];

    $_list_sequence = [
        'title'       => function () use ( $helper ) {
            $helper::views( 'woocommerce/title' );
        },
        'price'       => function () use ( $helper, $product, $showPrice ) {
            if ( $showPrice ) {
                $helper::views( 'woocommerce/price', [
                    'product' => $product
                ] );
            }
        },
        'rating'      => function () use ( $helper, $product, $showRating ) {
            if ( $showRating ) {
                $helper::views( 'woocommerce/rating', [
                    'product' => $product
                ] );
            }
        },
        'details'     => function () use ( $helper, $productDescLength ) {
            $helper::views( 'woocommerce/details', [
                'productDescLength' => $productDescLength
            ] );
        },
        'button-list' => function () use ( $helper ) {
            $helper::views( 'woocommerce/button-list' );
        }
    ];

?>

<div class="eb-woo-products-col">
    <div class="eb-woo-product">
        <?php if ( "grid" === $layout && 'grid-preset-3' === $gridPreset ): ?>
            <a class="grid-preset-anchor" href="<?php esc_attr_e( esc_url( get_permalink() ) );?>"></a>
        <?php endif;?>

        <div class="eb-woo-product-image-wrapper">
            <div class="eb-woo-product-image">
                <?php if ( "list" === $layout ): ?>
                    <a href="<?php esc_attr_e( esc_url( get_permalink() ) );?>">
                <?php
                    endif;

                    echo wp_kses_post( $product->get_image( 'woocommerce_thumbnail' ) );

                    if ( $showSaleBadge && $product->is_on_sale() ) {
                        echo wp_kses_post( '<span class="eb-woo-product-ribbon ' . $saleBadgeAlign . '">' . $saleText . '</span>' );
                    }

                    if ( "list" === $layout ) {
                        echo wp_kses_post( '</a>' );
                    }
                ?>
            </div>

            <?php if ( 'grid' === $layout ): ?>
                <div class="eb-woo-product-overlay">
                    <?php $helper::views( 'woocommerce/button-list' );?>
                </div>
            <?php endif;?>
        </div>
        <div class="eb-woo-product-content-wrapper">
            <div class="eb-woo-product-content">
                <?php
                    $_sequence = ( 'list' === $layout ) ? $_list_sequence : $_grid_sequence;
                    foreach ( $_sequence as $_sq_function ) {
                        $_sq_function();
                    }
                ?>
            </div>
        </div>
    </div>
</div>
