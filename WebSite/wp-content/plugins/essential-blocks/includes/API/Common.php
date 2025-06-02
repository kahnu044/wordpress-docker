<?php

namespace EssentialBlocks\API;

use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Blocks\PostGrid as PostGridBlock;
use EssentialBlocks\Blocks\PostCarousel as PostCarouselBlock;

class Common extends Base
{
    /**
     * Register REST Routes
     * @return void
     */
    public function register()
    {
        $this->get('roles', [
            'callback' => [$this, 'get_roles']
        ]);
    }

    public function get_roles()
    {
        global $wp_roles;
        return rest_ensure_response($wp_roles->roles);
    }
}
