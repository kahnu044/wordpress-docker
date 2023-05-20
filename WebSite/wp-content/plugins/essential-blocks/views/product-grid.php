<?php

/**
 * @var string $presetClass
 */
$presetClass = ("grid" === $layout) ? $gridPreset : $listPreset;

?>
<div class="eb-parent-wrapper eb-parent-<?php esc_attr_e($blockId); ?> <?php esc_attr_e($classHook); ?>">
    <div
        class="eb-woo-products-wrapper <?php esc_attr_e($blockId); ?>"
        data-id="<?php esc_attr_e($blockId); ?>"
        data-querydata='<?php esc_attr_e(serialize($queryData)); ?>'
        data-attributes='<?php esc_attr_e(serialize($essentialAttr)); ?>'>
        <div class="eb-woo-products-gallery <?php esc_attr_e($presetClass); ?>">
            <?php

                if ($query->have_posts()) {
                    while ($query->have_posts()) {
                        $query->the_post();
                        $product = wc_get_product(get_the_ID());

                        $helper::views('woocommerce/single-product', [
                            'product'           => $product,
                            'showRating'        => $showRating,
                            'showPrice'         => $showPrice,
                            'layout'            => $layout,
                            'showSaleBadge'     => $showSaleBadge,
                            'gridPreset'        => $gridPreset,
                            'saleBadgeAlign'    => $saleBadgeAlign,
                            'saleText'          => $saleText,
                            'productDescLength' => $productDescLength
                        ]);
                    }

                }

                if( ! $query->have_posts() ) {
                    $helper::views('common/no-content', [
                        'content' => __('No Product Found', 'essential-blocks')
                    ]);
                }
            ?>
        </div>
        <?php
            /**
             * Pagination Markup
             */
            if ( $query->have_posts() ) {
                $helper::views('common/pagination', array_merge(
                    $loadMoreOptions, $queryData
                ));
            }
        ?>
    </div>
</div>
