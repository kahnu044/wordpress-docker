<?php
    // wrapper classes
    $_parent_classes = [
        'eb-parent-wrapper',
        'eb-parent-' . $blockId,
        'root-' . $blockId,
        $classHook
     ];

    $_wrapper_classes = [
        'eb-taxonomies-wrapper',
        $blockId,
        $className,
        $displayStyle
     ];
?>

<div class="<?php echo esc_attr( implode( ' ', $_parent_classes ) ); ?>">
    <div class="<?php echo esc_attr( implode( ' ', $_wrapper_classes ) ); ?>"
        data-id="<?php echo esc_attr( $blockId ); ?>">
        <?php echo $prefix_markup . $categories . $suffix_markup; ?>
    </div>
</div>