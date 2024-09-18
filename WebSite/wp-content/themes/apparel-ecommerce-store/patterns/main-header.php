<?php
 /**
  * Title: Main Header
  * Slug: apparel-ecommerce-store/main-header
  */
?>

<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}}},"className":"lower-header "} -->
<div class="wp-block-columns are-vertically-aligned-center lower-header" style="padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40)"><!-- wp:column {"verticalAlignment":"center","width":"20%","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"}}},"className":"header-logo"} -->
<div class="wp-block-column is-vertically-aligned-center header-logo" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;flex-basis:20%"><!-- wp:site-title {"style":{"typography":{"textTransform":"capitalize","fontSize":"22px"}},"textColor":"foreground"} /--></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"50%","className":"header-nav"} -->
<div class="wp-block-column is-vertically-aligned-center header-nav" style="flex-basis:50%"><!-- wp:navigation {"textColor":"foreground","overlayBackgroundColor":"background","overlayTextColor":"foreground","className":"head-menu","layout":{"type":"flex","justifyContent":"left"}} -->
<!-- wp:navigation-link {"label":"Home","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->

<!-- wp:navigation-link {"label":"About us","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->

<!-- wp:navigation-link {"label":"Services","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->

<!-- wp:navigation-link {"label":"Projects","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->

<!-- wp:navigation-link {"label":"Media","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->

<!-- wp:navigation-link {"label":"Blogs","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->

<!-- wp:navigation-link {"label":"Contact us","type":"","url":"#","kind":"custom","isTopLevelLink":true} /-->
<!-- /wp:navigation --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"15%","className":"header-info"} -->
<div class="wp-block-column is-vertically-aligned-center header-info" style="flex-basis:15%"><!-- wp:paragraph {"textColor":"foreground","className":"head-phone"} -->
<p class="head-phone has-foreground-color has-text-color"><?php esc_html_e('00-123-456-789','apparel-ecommerce-store'); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"15%","className":"header-cart"} -->
<div class="wp-block-column is-vertically-aligned-center header-cart" style="flex-basis:15%"><!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"align":"center","textColor":"foreground"} -->
<p class="has-text-align-center has-foreground-color has-text-color"><?php esc_html_e('Login','apparel-ecommerce-store'); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","className":"head-cart"} -->
<div class="wp-block-column is-vertically-aligned-center head-cart"><!-- wp:image {"id":12,"width":"30px","height":"undefinedpx","sizeSlug":"full","linkDestination":"custom"} -->
<figure class="wp-block-image size-full is-resized"><a href="#"><img src="<?php echo get_parent_theme_file_uri( '/assets/images/headercart.png' ); ?>" alt="" class="wp-image-12" style="width:30px;height:undefinedpx"/></a></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->