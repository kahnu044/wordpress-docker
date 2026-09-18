<?php
/**
 * Facebook Feed — post message / caption partial.
 *
 * Variables: $message (raw text from Graph API), $messageLimit (word count).
 */

$trimmed = $messageLimit > 0
	? wp_trim_words( $message, (int) $messageLimit, '…' )
	: $message;
?>
<p class="eb-fb-feed__message"><?php echo esc_html( $trimmed ); ?></p>
