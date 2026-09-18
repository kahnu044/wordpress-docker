<?php
namespace EssentialBlocks\Blocks;

use EssentialBlocks\Core\Block;

class Row extends Block
{
    /**
     * Declared so Core\Block wires a render_callback for this block — that is
     * the only path that calls load_scripts(), which fires
     * `eb_frontend_scripts/row`. Pro's Background Video extension listens on
     * that filter to enqueue its playback runtime; without a non-empty value
     * here the filter never fires and the runtime never loads.
     *
     * Same handle Wrapper, FlexContainer and ShapeDivider already use.
     *
     * @var array<string>
     */
    protected $frontend_styles = ['essential-blocks-block-common'];

    /**
     * Unique name of the block.
     *
     * @return string
     */
    public function get_name()
    {
        return 'row';
    }

    /**
     * Initialize the InnerBlocks for Accordion
     *
     * @return array<Block>
     */
    public function inner_blocks()
    {
        return [
            Column::get_instance()
        ];
    }
}
