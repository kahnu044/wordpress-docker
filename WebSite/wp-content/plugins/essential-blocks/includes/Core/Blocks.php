<?php

namespace EssentialBlocks\Core;

use EssentialBlocks\Utils\Settings;
use EssentialBlocks\Traits\HasSingletone;

class Blocks
{
    use HasSingletone;

    private $enabled_blocks = [];
    private $settings       = null;
    private $dir            = '';

    public function __construct($settings)
    {
        $this->settings       = $settings;
        // $this->enabled_blocks = $this->enabled();

        $this->dir = ESSENTIAL_BLOCKS_BLOCK_DIR;
    }

    public function is_enabled($key = null)
    {
        if (empty($key)) {
            return true;
        }

        return isset($this->enabled_blocks[$key]);
    }

    public static function all()
    {
        $all_blocks = Settings::get('essential_all_blocks', []);
        $_defaults  = self::defaults();

        if (empty($all_blocks)) {
            return $_defaults;
        }

        return array_replace_recursive($_defaults, $all_blocks);
    }

    public function enabled()
    {
        $blocks         = $this->all();
        $enabled_blocks = array_filter(
            $blocks,
            function ($a) {
                return isset($a['visibility']) && $a['visibility'] === 'true' ? $a : false;
            }
        );

        $this->enabled_blocks = $enabled_blocks;

        return $enabled_blocks;
    }

    public static function defaults($no_object = true, $no_static_data = true)
    {
        $_blocks = require ESSENTIAL_BLOCKS_DIR_PATH . 'includes/blocks.php';
        $_blocks = apply_filters('essential_blocks_block_lists', $_blocks);
        $_blocks = array_map(
            function ($block) use ($no_object, $no_static_data) {
                if ($no_object) {
                    unset($block['object']);
                }
                if ($no_static_data) {
                    unset($block['demo']);
                    unset($block['doc']);
                    unset($block['icon']);
                    unset($block['status']);
                }

                return $block;
            },
            $_blocks
        );

        return $_blocks;
    }

    public function register_blocks($assets_manager)
    {
        $blocks = $this->enabled();
        if (empty($blocks)) {
            return;
        }

        $_defaults = $this->defaults(false);

        foreach ($blocks as $block_name => $block) {
            if (isset($_defaults[$block_name]['object'])) {
                $block_object = $_defaults[$block_name]['object'];

                if (! $block_object->can_enable()) {
                    continue;
                }

                if (method_exists($block_object, 'load_dependencies')) {
                    $block_object->load_dependencies();
                }

                if (method_exists($block_object, 'inner_blocks')) {
                    $_inner_blocks = $block_object->inner_blocks();
                    foreach ($_inner_blocks as $block_name => $block) {
                        if (method_exists($block, 'load_dependencies')) {
                            $block->load_dependencies();
                        }

                        $block->register($assets_manager);
                    }
                }

                $block_object->register($assets_manager);
            }
        }

        // Only apply special handling for pro blocks when pro plugin is not active
        if (!defined('ESSENTIAL_BLOCKS_IS_PRO_ACTIVE') || !ESSENTIAL_BLOCKS_IS_PRO_ACTIVE) {
            // These blocks will be filtered out in the frontend by the render_block filter
            foreach($_defaults as $block) {
                if (isset($block['is_pro']) && $block['is_pro'] && isset($block['name'])) {
                    register_block_type("essential-blocks/" . $block['name'], [
                        'render_callback' => function($attributes, $content) {
                            // Return empty content in frontend when pro plugin is not active
                            if (!is_admin() && !(defined('REST_REQUEST') && REST_REQUEST)) {
                                return '';
                            }
                            return $content;
                        }
                    ]);
                }
            }
        }
    }

    public static function quick_toolbar_blocks()
    {
        $all_blocks = Settings::get('eb_quick_toolbar_allowed_blocks', []);

        $_defaults  = array(
            'essential-blocks/wrapper',
            'essential-blocks/text',
            'essential-blocks/advanced-heading',
            'essential-blocks/infobox',
            'essential-blocks/button',
            'essential-blocks/advanced-image',
            'essential-blocks/feature-list'
        );

        if (empty($all_blocks)) {
            return $_defaults;
        }

        return $all_blocks;
    }
}