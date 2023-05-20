<div class="author__info">
    <?php if( $showProfileImg && ! empty( $profileImg ) ) : ?>
        <div class="author__thumb">
            <a href="//www.instagram.com/<?php esc_attr_e($username); ?>" target="_blank">
                <img src="<?php esc_attr_e($profileImg); ?>" alt="<?php esc_attr_e($username); ?>" />
            </a>
        </div>
    <?php endif; ?>

    <?php
        $author_name = !empty($profileName) ? esc_html($profileName) : $username;
        if( $showProfileName ) : ?>
        <h5 class="author__name">
            <a href="//www.instagram.com/<?php esc_attr_e($username); ?>" target="_blank">
                <?php echo $author_name; ?>
            </a>
        </h5>
    <?php endif; ?>
</div>
