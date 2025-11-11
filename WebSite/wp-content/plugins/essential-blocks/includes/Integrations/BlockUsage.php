<?php

namespace EssentialBlocks\Integrations;

use EssentialBlocks\Traits\HasSingletone;

class BlockUsage {
    use HasSingletone;

    public function __construct() {
        add_action( 'save_post', [ $this, 'get_blocks_count'], 10, 3 );
    }

	/**
	 * Get blocks count on page save action
	 */
    public function get_blocks_count($post_id, $post, $update) {
        //If This page is draft, return
		if ( isset( $post->post_status ) && 'auto-draft' == $post->post_status ) {
			return;
		}

		// Autosave, do nothing
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		// Return if it's a post revision
		if ( false !== wp_is_post_revision( $post_id ) ) {
			return;
		}

        $post_type = get_post_type( $post_id );

        if ( $post_type === 'wp_template_part' || $post_type === 'wp_template' ) {
			$post = get_post( $post_id );
		}

		$parsed_content = parse_blocks( $post->post_content );
		$block_list = $this->get_block_list($parsed_content);
        // update block list in post meta
		$this->update_block_list($post_id, $block_list);
    }

	/**
	 * Get block list from post content
	 * 
	 * @return array
	 */
	public function get_block_list ($parsed_content) {
		$result = [];

		foreach ($parsed_content as $item) {
			if (isset($item['blockName']) && strpos($item['blockName'], 'essential-blocks/') === 0) {
				$blockType = explode('/', $item['blockName'])[1];
				if (isset($result[$blockType])) {
					$result[$blockType]++;
				} else {
					$result[$blockType] = 1;
				}
			}
		}
		return $result;
	}

	/**
	 * Update block count list on page meta
	 * 
	 * @param int $post_id
	 * @param array $block_list
	 * 
	 * @return boolean
	 */
	private function update_block_list($post_id, $block_list = []) {

		if( empty($block_list) ) {
			return false;
		}

		if ( md5( implode( '', (array) $block_list ) ) == md5( implode( '', (array) get_post_meta( $post_id, '_eb_block_lists', true ) ) ) ) {
			return false;
		}

		try {
			update_post_meta( $post_id, '_eb_block_lists', $block_list );
			return true;
		} catch ( \Exception $e ) {
			return false;
		}
	}

	/**
	 * Get total used blocks count
	 * 
	 * @return array
	 */
	public static function get_used_blocks_count() {
		global $wpdb;

		$sql = "SELECT `meta_value`
		FROM $wpdb->postmeta
		WHERE `meta_key` = '_eb_block_lists'";
		$meta_values      = $wpdb->get_col( $sql );

		$used_blocks = [];

		foreach ($meta_values as $meta_value) {

			$eb_blocks = maybe_unserialize($meta_value);
	
			if (empty($eb_blocks) || !is_array($eb_blocks)) {
				continue;
			}
	
			
			foreach ($eb_blocks as $key => $block_count) {
				if (!is_numeric($block_count)) {
					continue;
				}
	
				if (isset($used_blocks[$key])) {
					$used_blocks[$key] += $block_count;
				} else {
					$used_blocks[$key] = $block_count;
				}
			}
		}

		return $used_blocks;
	}
}