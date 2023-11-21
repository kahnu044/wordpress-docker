<?php

/**
 * @var string $presetClass
 */
$presetClass = ( 'grid' === $layout ) ? $gridPreset : $listPreset;

?>
<div class="eb-parent-wrapper eb-parent-<?php echo esc_attr( $blockId ); ?> <?php echo esc_attr( $classHook ); ?>">
	<div
		class="eb-woo-products-wrapper <?php echo esc_attr( $blockId ); ?>"
		data-id="<?php echo esc_attr( $blockId ); ?>"
		data-querydata='<?php echo esc_attr( json_encode( $queryData ) ); ?>'
		data-attributes='<?php echo esc_attr( json_encode( $essentialAttr ) ); ?>'>
		<div class="eb-woo-products-gallery <?php echo esc_attr( $presetClass ); ?>">
			<?php

			if ( $query->have_posts() ) {
				while ( $query->have_posts() ) {
					$query->the_post();
					$product = wc_get_product( get_the_ID() );

					$helper::views(
						'woocommerce/single-product',
						array(
							'product'           => $product,
							'showRating'        => $showRating,
							'showPrice'         => $showPrice,
							'layout'            => $layout,
							'showSaleBadge'     => $showSaleBadge,
							'gridPreset'        => $gridPreset,
							'saleBadgeAlign'    => $saleBadgeAlign,
							'saleText'          => $saleText,
							'productDescLength' => $productDescLength,
						)
					);
				}
			}

			if ( ! $query->have_posts() ) {
				$helper::views(
					'common/no-content',
					array(
						'content' => __( 'No Product Found', 'essential-blocks' ),
					)
				);
			}
			?>
		</div>
		<?php
			/**
			 * Pagination Markup
			 */
		if ( $query->have_posts() ) {
			$helper::views(
				'common/pagination',
				array_merge(
					$loadMoreOptions,
					$queryData,
                    [
                        'parent_class' => 'ebproductgrid-pagination'
                    ]
				)
			);
		}
		?>
	</div>
</div>
