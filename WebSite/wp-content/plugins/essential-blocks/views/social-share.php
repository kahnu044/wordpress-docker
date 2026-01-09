<?php

use EssentialBlocks\Utils\Helper;

global $post; ?>
<div
    <?php
    echo wp_kses_post($wrapper_attributes); ?>>
    <div class="eb-parent-wrapper eb-parent-<?php echo esc_attr($blockId); ?><?php echo esc_attr($classHook); ?>">
        <div
            class="<?php echo esc_attr($blockId); ?> eb-social-share-wrapper<?php echo $isFloating ? esc_attr(' eb-social-share-floating') : ''; ?><?php echo $isFloating && 'circular' == $iconShape ? esc_attr(' eb-social-share-circular') : ''; ?>">
            <ul class="eb-social-shares">
                <?php
                foreach ($profilesOnly as $profile) {
                    // Check for FontAwesome icons (fa-icon-name)
                    preg_match('/fa-([\w\-]+)/', $profile['icon'], $fa_matches);
                    // Check for Dashicons (dashicons-icon-name)
                    preg_match('/dashicons-([\w\-]+)/', $profile['icon'], $dash_matches);

                    $iconClass = '';
                    if (is_array($fa_matches) && !empty($fa_matches[1])) {
                        $iconClass = $fa_matches[1] . '-original';
                    } elseif (is_array($dash_matches) && !empty($dash_matches[1])) {
                        $iconClass = $dash_matches[1] . '-original';
                    }

                    $social_url = $block_object::eb_social_share_name_link($post->ID, $profile['icon']);
                    if (empty($social_url)) {
                        continue;
                    }
                ?>
                    <li>
                        <a class="<?php echo esc_attr($iconClass); ?><?php echo ' ' . esc_attr($icnEffect); ?>"
                            href=<?php echo esc_url_raw($social_url); ?>
                            target="_blank" rel="nofollow noopener noreferrer">
                            <?php
                            echo Helper::eb_render_icon(Helper::eb_get_icon_type(esc_attr($profile['icon'])), 'hvr-icon eb-social-share-icon', esc_attr($profile['icon']));
                            ?>
                            <?php
                            if (!empty($showTitle && !empty($profile['iconText']))) {
                            ?>
                                <span class="eb-social-share-text"><?php echo esc_html($profile['iconText']); ?></span>
                            <?php
                            } ?>
                        </a>
                    </li>
                <?php
                } ?>
            </ul>
        </div>
    </div>
</div>