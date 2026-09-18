<?php
/**
 * Facebook Feed — timestamp partial.
 *
 * Variables: $created_time (ISO 8601 from Graph API).
 */
$timestamp = strtotime( $created_time );
$absolute  = gmdate( 'd M Y', $timestamp );
$iso       = gmdate( 'c', $timestamp );
?>
<time class="eb-fb-feed__time" datetime="<?php echo esc_attr( $iso ); ?>">
	<?php echo esc_html( $absolute ); ?>
</time>
