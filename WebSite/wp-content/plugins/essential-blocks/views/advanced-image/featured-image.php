<?php
    // wrapper classes
    $_parent_classes = [
        'eb-parent-wrapper',
        'eb-parent-' . $blockId,
        $classHook
     ];

    $_wrapper_classes = [
        'eb-advanced-image-wrapper',
        $blockId,
        'img-style-' . $stylePreset,
        $hoverEffect,
        $className
     ];

    $post_ID   = $imagePostId;
    $is_link   = isset( $enableLink ) && $enableLink;
    $target    = isset( $openInNewTab ) && $openInNewTab;
    $size_slug = isset( $imageSize ) ? $imageSize : 'post-thumbnail';

    $featured_image = '';
    if ( has_post_thumbnail() ) {
        $featured_image = get_the_post_thumbnail( get_the_ID(), $size_slug );
    }

    if ( ! $featured_image ) {
        return '';
    }

    if ( $is_link ) {
        $rel         = ! empty( $attributes[ 'rel' ] ) ? 'rel="' . esc_attr( $attributes[ 'rel' ] ) . '"' : '';
        $link_target = $target ? '_blank' : '_self';

        $featured_image = sprintf(
            '<a href="%1$s" target="%2$s" %3$s >%4$s</a>',
            get_the_permalink( $post_ID ),
            esc_attr( $link_target ),
            $rel,
            $featured_image,
        );
    }

?>

<div class="<?php echo esc_attr( implode( ' ', $_parent_classes ) ); ?>">
    <figure class="<?php echo esc_attr( implode( ' ', $_wrapper_classes ) ); ?>"
        data-id="<?php echo esc_attr( $blockId ); ?>">
        <div class="image-wrapper">
            <?php echo wp_kses_post( $featured_image ); ?>
        </div>
    </figure>
</div>
