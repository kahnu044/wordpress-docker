<?php

namespace EssentialBlocks\API;

use EssentialBlocks\Utils\Helper;
use EssentialBlocks\blocks\PostGrid as PostGridBlock;
use EssentialBlocks\blocks\PostCarousel as PostCarouselBlock;
use WP_Query;
use WP_REST_Server;

class PostBlock extends Base {
	/**
	 * Register REST Routes
	 * @return void
	 */
	public function register() {
        $this->get('queries', [
            'callback' => [$this, 'get_posts'],
        ]);
	}

    public function get_posts( $request ){

        $block_type = $request->has_param('block_type') ? $request->get_param('block_type') : 'post-grid';

        $query      = unserialize($request['query_data']);
        $attributes = unserialize($request['attributes']);
        $pageNumber = isset($request['pageNumber']) ? (int)$request['pageNumber'] - 1 : 1;

        //Check if param is empty
        if (!is_array($query) || !is_array($attributes)) {
            wp_send_json_error("Invalid request param");
        }

        if (isset($query['per_page']) && isset($query['offset'])) {
			$query['offset'] = (int)$query['offset'] + ((int)$query['per_page'] * (int)$pageNumber);
		}

        $_template_name = 'carousel-markup';
        $block_object   = PostCarouselBlock::get_instance();
        if( $block_type === 'post-grid' ) {
            if (isset($request["taxonomy"]) && isset($request["category"])) {
                $category = get_term_by('slug', $request["category"], $request["taxonomy"]);
                $catString = json_encode(array(array(
                    "label" => $category->name,
                    "value" => $category->term_id,
                )));
                $filterQuery = array(
                    $request["taxonomy"] => array(
                        "name"  => $request["category"],
                        "slug"  => $request["category"],
                        "value" => $catString
                    )
                );
                $query["taxonomies"] = $filterQuery;
            }

            if (isset($request["query_type"]) && $request["query_type"] === "filter") {
                $query['offset'] = 0;
            }
            $_template_name = 'grid-markup';
            $block_object   = PostGridBlock::get_instance();
        }

        $posts = $block_object->get_posts( $query, true );

        if( empty( $posts ) ) {
            return false;
        }

        ob_start();
        Helper::views('post-partials/' . $_template_name, array_merge( $attributes, [
            'posts'        => $posts,
            'block_object' => $block_object,
            'source'       => isset( $query['source'] ) ? $query['source'] : 'post',
            'headerMeta'   => ! empty( $attributes['headerMeta'] ) ? json_decode( $attributes['headerMeta'] ) : [],
            'footerMeta'   => ! empty( $attributes['footerMeta'] ) ? json_decode( $attributes['footerMeta'] ) : [],
        ]));

        return ob_get_clean();
    }
}
