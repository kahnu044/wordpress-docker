<?php

namespace EssentialBlocks\Integrations;

use EssentialBlocks\Utils\Helper;
use EssentialBlocks\Utils\QueryHelper;

class Pagination extends ThirdPartyIntegration {
    public function __construct() {
        $this->add_ajax( [
            'post_grid_block_pagination' => [
                'callback' => 'post_grid_block_pagination_callback',
                'public'   => true
            ]
        ] );
    }

    /**
     * Get Post Grid Pagination
     *
     * Rebuilds the pagination buttons after a taxonomy filter click (free) or a
     * post grid search (Pro). The action is public and its nonce is printed on
     * every page, so every request value is type-checked, and the page count is
     * capped because totalPosts is client-supplied.
     */
    public function post_grid_block_pagination_callback() {
        $nonce = isset( $_POST['post_grid_pagination_nonce'] ) && is_string( $_POST['post_grid_pagination_nonce'] ) ? sanitize_key( $_POST['post_grid_pagination_nonce'] ) : '';
        if ( ! wp_verify_nonce( $nonce, 'eb-pagination-nonce' ) ) {
            die( esc_html__( 'Nonce did not match', 'essential-blocks' ) );
        }

        $query           = self::decode_request_json( 'querydata' );
        $attributes      = self::decode_request_json( 'attributes' );
        $loadMoreOptions = isset( $attributes['loadMoreOptions'] ) && ( is_object( $attributes['loadMoreOptions'] ) || is_array( $attributes['loadMoreOptions'] ) ) ? (array) $attributes['loadMoreOptions'] : [];

        $totalPosts = isset( $_POST['totalPosts'] ) && is_scalar( $_POST['totalPosts'] ) ? sanitize_text_field( $_POST['totalPosts'] ) : 0;
        $per_page   = isset( $query['per_page'] ) ? $query['per_page'] : 0;

        $prevTxt = isset( $loadMoreOptions['prevTxt'] ) && is_scalar( $loadMoreOptions['prevTxt'] ) && ! empty( $loadMoreOptions['prevTxt'] ) ? $loadMoreOptions['prevTxt'] : "<";
        $nextTxt = isset( $loadMoreOptions['nextTxt'] ) && is_scalar( $loadMoreOptions['nextTxt'] ) && ! empty( $loadMoreOptions['nextTxt'] ) ? $loadMoreOptions['nextTxt'] : ">";

        $html = Helper::pagination_markup(
            $totalPosts,
            $per_page,
            [
                'enableMorePosts'   => $loadMoreOptions['enableMorePosts'] ?? false,
                'loadMoreType'      => $loadMoreOptions['loadMoreType'] ?? '1',
                'loadMoreButtonTxt' => $loadMoreOptions['loadMoreButtonTxt'] ?? "Load More",
                'prevTxt'           => $prevTxt,
                'nextTxt'           => $nextTxt,
                'max_pages'         => QueryHelper::max_pages()
            ]
        );

        echo wp_kses_post( $html );
        wp_die();
    }

    /**
     * Decode a POST field holding a JSON object into a (top-level) array.
     *
     * @param string $key
     * @return array
     */
    private static function decode_request_json( $key ) {
        if ( ! isset( $_POST[ $key ] ) || ! is_string( $_POST[ $key ] ) ) {
            return [];
        }

        $decoded = json_decode( wp_unslash( wp_kses_post( $_POST[ $key ] ) ) );

        return ( is_object( $decoded ) || is_array( $decoded ) ) ? (array) $decoded : [];
    }
}
