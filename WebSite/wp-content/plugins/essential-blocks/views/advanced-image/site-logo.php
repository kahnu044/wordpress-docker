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
$hoverEffect,
$className
];

$custom_logo = get_custom_logo();

if ( empty( $custom_logo ) ) {
    return ''; // Return early if no custom logo is set, avoiding extraneous wrapper div.
}

if ( ! $enableLink ) {
    // Remove the link.
    $custom_logo = preg_replace( '#<a.*?>(.*?)</a>#i', '\1', $custom_logo );
}

$linkTarget = $openInNewTab ? '_blank' : '';

if ( $enableLink && '_blank' === $linkTarget ) {
// Add the link target after the rel="home".
// Add an aria-label for informing that the page opens in a new tab.
$processor = new WP_HTML_Tag_Processor( $custom_logo );
$processor->next_tag( 'a' );
if ( 'home' === $processor->get_attribute( 'rel' ) ) {
$processor->set_attribute( 'aria-label', __( '(Home link, opens in a new tab)' ) );
$processor->set_attribute( 'target', $linkTarget );
}
$custom_logo = $processor->get_updated_html();
}

?>

<div class="<?php echo esc_attr( implode( ' ', $_parent_classes ) ); ?>">
    <figure class="<?php echo esc_attr( implode( ' ', $_wrapper_classes ) ); ?>"
        data-id="<?php echo esc_attr( $blockId ); ?>">
        <div class="image-wrapper">
            <?php echo $custom_logo; ?>
        </div>
    </figure>
</div>
