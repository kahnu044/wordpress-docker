<?php

/**
 * Normalize against full defaults so the view is safe regardless of caller.
 * Helper::views() injects variables via extract( $data, EXTR_SKIP ), so any key
 * missing from $data is never defined. On PHP 8.0+ reading an undefined variable
 * raises an E_WARNING (the REST/load-more path in API/Product.php passes raw
 * attributes without a defaults merge). These guards prevent those warnings.
 */
$showSoldCount     = $showSoldCount     ?? false;
$showSoldCountBar  = $showSoldCountBar  ?? false;
$soldCountPrefix   = $soldCountPrefix   ?? __( 'Sold ', 'essential-blocks' );
$soldCountSuffix   = $soldCountSuffix   ?? '+';
$stockPercent      = $stockPercent      ?? 50;
$showRating        = $showRating        ?? true;
$ratingStyle       = $ratingStyle       ?? 'star';
$showCategory      = $showCategory      ?? false;
$showPrice         = $showPrice         ?? true;
$showSaleBadge     = $showSaleBadge     ?? true;
$saleBadgeAlign    = $saleBadgeAlign    ?? 'align-left';
$saleText          = $saleText          ?? 'sale';
$layout            = $layout            ?? 'grid';
$gridPreset        = $gridPreset        ?? 'grid-preset-1';
$titleTag          = $titleTag          ?? 'h3';
$productDescLength = $productDescLength ?? 5;
$showDetailBtn     = $showDetailBtn     ?? true;
$detailBtnText     = $detailBtnText     ?? __( 'Visit Product', 'essential-blocks' );
$imageSize         = !empty($imageSize) ? $imageSize : 'woocommerce_thumbnail';

$otherArgs = ['showSoldCount' => $showSoldCount, 'showSoldCountBar' => $showSoldCountBar, 'soldCountPrefix' => $soldCountPrefix, 'soldCountSuffix' => $soldCountSuffix, 'stockPercent' => $stockPercent];

$grid_sequence = [
    'rating' => function () use ($helper, $product, $showRating, $ratingStyle) {
        if ($showRating) {
            $helper::views(
                'woocommerce/rating',
                [
                    'product'     => $product,
                    'ratingStyle' => $ratingStyle
                ]
            );
        }
    },
    'category' => function () use ($helper, $product, $showCategory) {
        if ($showCategory) {
            $helper::views('woocommerce/category', [
                'product' => $product
            ]);
        }
    },
    'title'  => function () use ($helper, $titleTag) {
        $helper::views('woocommerce/title', [
            'titleTag' => $titleTag
        ]);
    },
    'price'  => function () use ($helper, $product, $showPrice) {
        if ($showPrice) {
            $helper::views(
                'woocommerce/price',
                [
                    'product' => $product
                ]
            );
        }
    }
];

$_grid_sequence = apply_filters('eb_woo_product_grid_grid_sequence', $grid_sequence, $helper, $product, $otherArgs);

$list_sequence = [
    'category' => function () use ($helper, $product, $showCategory) {
        if ($showCategory) {
            $helper::views('woocommerce/category', [
                'product' => $product
            ]);
        }
    },
    'title'       => function () use ($helper, $titleTag) {
        $helper::views('woocommerce/title', [
            'titleTag' => $titleTag
        ]);
    },
    'price'       => function () use ($helper, $product, $showPrice) {
        if ($showPrice) {
            $helper::views(
                'woocommerce/price',
                [
                    'product' => $product
                ]
            );
        }
    },
    'rating'      => function () use ($helper, $product, $showRating, $ratingStyle) {
        if ($showRating) {
            $helper::views(
                'woocommerce/rating',
                [
                    'product'     => $product,
                    'ratingStyle' => $ratingStyle
                ]
            );
        }
    },
    'details'     => function () use ($helper, $productDescLength) {
        $helper::views(
            'woocommerce/details',
            [
                'productDescLength' => $productDescLength
            ]
        );
    },
    'button-list' => function () use ($helper, $showDetailBtn, $detailBtnText) {
        $helper::views('woocommerce/button-list', [
            'showDetailBtn' => $showDetailBtn,
            'detailBtnText' => $detailBtnText
        ]);
    }
];

$_list_sequence = apply_filters('eb_woo_product_grid_list_sequence', $list_sequence, $helper, $product, $otherArgs);

?>

<div class="eb-woo-products-col">
    <div class="eb-woo-product">
        <?php if ('grid' === $layout && 'grid-preset-3' === $gridPreset): ?>
            <a class="grid-preset-anchor" href="<?php echo esc_attr(esc_url(get_permalink())); ?>"></a>
        <?php endif; ?>

        <div class="eb-woo-product-image-wrapper">
            <?php if ('grid' === $layout && 'grid-preset-3' !== $gridPreset): ?>
                <a class="grid-preset-anchor" href="<?php echo esc_attr(esc_url(get_permalink())); ?>"></a>
            <?php endif; ?>
            <div class="eb-woo-product-image">
                <?php if ('list' === $layout): ?>
                    <a href="<?php echo esc_attr(esc_url(get_permalink())); ?>">
                    <?php
                endif;

                echo wp_kses_post($product->get_image($imageSize));

                if ($showSaleBadge && $product->is_on_sale()) {
                    echo wp_kses_post('<span class="eb-woo-product-ribbon ' . $saleBadgeAlign . '">' . $saleText . '</span>');
                }

                if ('list' === $layout) {
                    echo wp_kses_post('</a>');
                }
                    ?>
            </div>

            <?php if ('grid' === $layout): ?>
                <div class="eb-woo-product-overlay">
                    <?php $helper::views('woocommerce/button-list', [
                        'showDetailBtn' => $showDetailBtn,
                        'detailBtnText' => $detailBtnText
                    ]); ?>
                </div>
            <?php endif; ?>
        </div>
        <div class="eb-woo-product-content-wrapper">
            <div class="eb-woo-product-content">
                <?php
                $_sequence = ('list' === $layout) ? $_list_sequence : $_grid_sequence;
                foreach ($_sequence as $_sq_function) {
                    $_sq_function();
                }
                ?>
            </div>
        </div>
    </div>
</div>