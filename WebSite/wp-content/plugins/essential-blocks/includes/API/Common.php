<?php

namespace EssentialBlocks\API;

class Common extends Base
{
    /**
     * Register REST Routes
     *
     * @return void
     */
    public function register()
    {
        $this->get('roles', [
            'callback' => [$this, 'get_roles'],
            'permission_callback' => [$this, 'check_edit_page_permission']
        ]);
    }

    /**
     * Check if user has permission to edit pages
     *
     * @return bool
     */
    public function check_edit_page_permission()
    {
        return current_user_can('edit_posts');
    }

    public function get_roles()
    {
        global $wp_roles;
        return rest_ensure_response($wp_roles->roles);
    }
}
