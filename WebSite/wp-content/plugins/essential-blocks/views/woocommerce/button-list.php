<div class="eb-woo-product-button-list">
    <?php woocommerce_template_loop_add_to_cart(); ?>

    <?php if(isset($showDetailBtn) && $showDetailBtn){ ?>
    <a href="<?php echo esc_attr( esc_url( get_permalink() ) ); ?>" class="eb-woo-product-detail button">
        <?php echo esc_html($detailBtnText); ?>
    </a>
    <?php } ?>
</div>