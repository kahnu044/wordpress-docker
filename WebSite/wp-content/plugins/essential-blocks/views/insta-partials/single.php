<?php

$_item_wrapper_classes = [
    ($layout === "card") ? "instagram__gallery__item--" . $cardStyle : "instagram__gallery__item--" . $overlayStyle,
    isset( $hasEqualImages ) ? 'has__equal__height' : ''
];

?>

<div class="instagram__gallery__col">
    <div class="instagram__gallery__item <?php esc_attr_e(implode(' ', $_item_wrapper_classes)); ?>">
        <?php
            if( 'card' === $layout && ( $showProfileName || $showProfileImg ) ) {
                $helper::views('insta-partials/author', [
                    'showProfileName' => $showProfileName,
                    'showProfileImg'  => $showProfileImg,
                    'profileImg'      => $profileImg,
                    'profileName'     => $profileName,
                    'username'        => $username,
                ]);
            }
        ?>

        <?php if( $enableLink ) : ?>
            <a href="<?php esc_attr_e( esc_url( $permalink )); ?>" target="<?php esc_attr_e($target); ?>">
        <?php endif; ?>
            <div class="instagram__gallery__thumb">
                <div class="thumb__wrap">
                    <img src="<?php esc_attr_e( esc_url( $image_url )); ?>" alt="<?php esc_attr_e($image_alt); ?>" />
                </div>
                <?php
                    if( $showCaptions && ! empty( $caption ) ) {
                        $helper::views('insta-partials/caption', [
                            'caption' => $caption,
                        ]);
                    }
                ?>
            </div>
        <?php if( $enableLink ): ?>
            </a>
        <?php endif; ?>

        <?php
            if( $showMeta ) {
                $helper::views('insta-partials/meta', [
                    'timestamp' => $timestamp
                ]);
            }
        ?>
    </div>
</div>
