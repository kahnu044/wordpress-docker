<?php
namespace EssentialBlocks\Utils;

class QueryHelper
{
    /**
     * orderby values accepted from query data. WP_Query validates orderby again;
     * this list only keeps arrays and arbitrary strings away from it.
     */
    const ALLOWED_ORDERBY = [ 'none', 'ID', 'author', 'title', 'name', 'type', 'date', 'modified', 'parent', 'rand', 'comment_count', 'relevance', 'menu_order', 'post__in' ];

    const DEFAULT_PER_PAGE = 10;

    /**
     * Get Query Results From Post Grid/Post Grid Search Block
     *
     * @param mixed $queryData Saved or request query data; normalized here.
     * @param bool  $isAjax    True when the query data came from a REST/AJAX request.
     * @param array $context   Optional. `exclude_ids` (int[]): extra posts to exclude.
     *
     * @return \WP_Query
     */
    public static function get_posts( $queryData, $isAjax = false, $context = [  ] )
    {
        $query = self::normalize_query_data( $queryData, $isAjax );

        $args = [
            'post_status'      => 'publish',
            'post_type'        => $query[ 'source' ],
            'posts_per_page'   => $query[ 'per_page' ],
            'order'            => $query[ 'order' ],
            'orderby'          => $query[ 'orderby' ],
            'offset'           => $query[ 'offset' ],
            'suppress_filters' => false
         ];

        $tax_query = self::build_tax_query( $query[ 'taxonomies' ] );
        if ( count( $tax_query ) > 0 ) {
            $args[ 'tax_query' ] = $tax_query;
        }

        if ( count( $query[ 'author' ] ) > 0 ) {
            $args[ 'author__in' ] = $query[ 'author' ];
        }

        $extra_exclude_ids = is_array( $context ) && isset( $context[ 'exclude_ids' ] ) && is_array( $context[ 'exclude_ids' ] )
            ? $context[ 'exclude_ids' ]
            : [  ];
        $args = array_merge( $args, self::build_id_constraints( $query, $isAjax, $extra_exclude_ids ) );

        if ( $query[ 's' ] ) {
            $args[ 's' ] = $query[ 's' ];
        }

        $args[ 'has_password' ] = $query[ 'exclude_password_protected' ] ? false : null;

        $posts = new \WP_Query( $args );

        // WP_Query prepends sticky posts outside the normal pagination, which can
        // push the result count above posts_per_page. Trim back so frontend count
        // matches the editor preview.
        $per_page = self::effective_per_page( $args[ 'posts_per_page' ] );
        if ( $per_page > 0 && \count( $posts->posts ) > $per_page ) {
            $posts->posts      = \array_slice( $posts->posts, 0, $per_page );
            $posts->post_count = $per_page;
        }

        return $posts;
    }

    /**
     * Normalize saved or request query data into one predictable shape.
     *
     * Every value is type-checked, so arrays/objects sent where strings are
     * expected never reach strlen()/json_decode()/foreach (PHP 8 TypeErrors).
     * ID lists accept the JSON (`[{"value":1,"label":"…"}]`), array and CSV
     * formats found in saved content. Taxonomies become
     * `[ slug => [ 'value' => int[], 'exclude' => int[] ] ]`, and the pre-3.9.0
     * `categories` / `tags` strings are migrated into that shape.
     *
     * Safe to call again on its own output.
     *
     * @param mixed $raw        Query data.
     * @param bool  $is_request True for REST/AJAX input: applies the request bounds.
     *
     * @return array
     */
    public static function normalize_query_data( $raw, $is_request = false )
    {
        if ( is_object( $raw ) ) {
            $raw = get_object_vars( $raw );
        }
        $raw = is_array( $raw ) ? $raw : [  ];

        $source = self::to_string( $raw[ 'source' ] ?? '' );
        if ( 'posts' === $source ) {
            $source = 'post';
        }
        // Only allow publicly viewable post types so the unauth `queries`
        // endpoint can't read non-public CPTs. Ref: FluentBoards #83051.
        if ( '' === $source || ! is_post_type_viewable( $source ) ) {
            $source = 'post';
        }

        $orderby = self::to_string( $raw[ 'orderby' ] ?? '' );
        if ( 'id' === $orderby ) {
            $orderby = 'ID';
        }
        if ( ! in_array( $orderby, self::ALLOWED_ORDERBY, true ) ) {
            $orderby = 'date';
        }

        $order = strtolower( self::to_string( $raw[ 'order' ] ?? '' ) );

        // WP_Query applies absint() to numeric offsets and ignores anything else.
        $offset = $raw[ 'offset' ] ?? 0;
        $offset = is_scalar( $offset ) && is_numeric( $offset ) ? absint( $offset ) : 0;
        if ( $is_request ) {
            $offset = min( $offset, self::max_offset() );
        }

        $raw_taxonomies = $raw[ 'taxonomies' ] ?? null;
        $taxonomies     = self::normalize_taxonomies( $raw_taxonomies, $is_request );

        // Old query data (before 3.9.0) stored `categories` / `tags` and was only
        // read when `taxonomies` was missing or empty. category__in never included
        // child terms, so the migrated clause keeps include_children off.
        if ( ! ( is_array( $raw_taxonomies ) && count( $raw_taxonomies ) > 0 ) ) {
            $legacy = [
                'category' => self::parse_id_list( $raw[ 'categories' ] ?? [  ], $is_request ),
                'post_tag' => self::parse_id_list( $raw[ 'tags' ] ?? [  ], $is_request )
             ];
            foreach ( $legacy as $taxonomy => $term_ids ) {
                if ( count( $term_ids ) > 0 ) {
                    $taxonomies[ $taxonomy ] = [
                        'value'            => $term_ids,
                        'exclude'          => [  ],
                        'include_children' => false
                     ];
                }
            }
        }

        $exclude_current = $raw[ 'exclude_current' ] ?? false;
        $ignore_sticky   = $raw[ 'ignore_sticky_posts' ] ?? false;

        return [
            'source'                     => $source,
            'per_page'                   => self::normalize_per_page( $raw[ 'per_page' ] ?? null, $is_request ),
            'offset'                     => $offset,
            'orderby'                    => $orderby,
            'order'                      => in_array( $order, [ 'asc', 'desc' ], true ) ? $order : 'desc',
            'author'                     => self::parse_id_list( $raw[ 'author' ] ?? [  ], $is_request ),
            'include'                    => self::parse_id_list( $raw[ 'include' ] ?? [  ], $is_request ),
            'exclude'                    => self::parse_id_list( $raw[ 'exclude' ] ?? [  ], $is_request ),
            'taxonomies'                 => $taxonomies,
            'exclude_current'            => is_scalar( $exclude_current ) && (bool) $exclude_current,
            'ignore_sticky_posts'        => is_scalar( $ignore_sticky ) && (bool) $ignore_sticky,
            'exclude_password_protected' => true === ( $raw[ 'exclude_password_protected' ] ?? false ),
            's'                          => self::to_string( $raw[ 's' ] ?? '' )
         ];
    }

    /**
     * Parse a post/term/user ID list from any stored format into unique positive ints.
     *
     * Accepts a JSON string (`[{"value":1}]` or `[1,2]`), a CSV string (`"1,2"`),
     * an array of IDs or of `{value}` items, or a single ID.
     *
     * @param mixed $value
     * @param bool  $is_request True for REST/AJAX input: caps the list length.
     *
     * @return int[]
     */
    public static function parse_id_list( $value, $is_request = false )
    {
        if ( is_string( $value ) ) {
            $value = trim( $value );
            if ( '' === $value ) {
                return [  ];
            }

            $decoded = json_decode( $value, true );
            if ( JSON_ERROR_NONE === json_last_error() ) {
                $value = $decoded;
            } elseif ( preg_match( '/^\d+(\s*,\s*\d+)*$/', $value ) ) {
                $value = explode( ',', $value );
            } else {
                return [  ];
            }
        }

        if ( is_object( $value ) ) {
            $value = get_object_vars( $value );
        }
        if ( is_scalar( $value ) ) {
            $value = [ $value ];
        }
        if ( ! is_array( $value ) ) {
            return [  ];
        }

        $ids = [  ];
        foreach ( $value as $item ) {
            if ( is_object( $item ) ) {
                $item = get_object_vars( $item );
            }
            if ( is_array( $item ) ) {
                $item = $item[ 'value' ] ?? null;
            }
            if ( ! is_bool( $item ) && is_scalar( $item ) && is_numeric( $item ) && absint( $item ) > 0 ) {
                $ids[  ] = absint( $item );
            }
        }

        $ids = array_values( array_unique( $ids ) );

        return $is_request ? array_slice( $ids, 0, self::max_id_list() ) : $ids;
    }

    /**
     * Replace one taxonomy's included terms with a single term (taxonomy filter
     * tab, default filter, search within a tab). The taxonomy's excluded terms
     * and every other taxonomy constraint are kept.
     *
     * @param array  $query    Output of normalize_query_data().
     * @param string $taxonomy Taxonomy slug.
     * @param int    $term_id  Term ID.
     *
     * @return array
     */
    public static function merge_taxonomy_filter( $query, $taxonomy, $term_id )
    {
        $term_id = absint( $term_id );
        if ( ! is_array( $query ) || ! is_string( $taxonomy ) || '' === $taxonomy || ! $term_id ) {
            return $query;
        }

        $taxonomies = isset( $query[ 'taxonomies' ] ) && is_array( $query[ 'taxonomies' ] ) ? $query[ 'taxonomies' ] : [  ];
        $current    = isset( $taxonomies[ $taxonomy ] ) && is_array( $taxonomies[ $taxonomy ] ) ? $taxonomies[ $taxonomy ] : [  ];

        $taxonomies[ $taxonomy ] = [
            'value'   => [ $term_id ],
            'exclude' => isset( $current[ 'exclude' ] ) && is_array( $current[ 'exclude' ] ) ? $current[ 'exclude' ] : [  ]
         ];

        $query[ 'taxonomies' ] = $taxonomies;

        return $query;
    }

    /**
     * Build post__in / post__not_in from every include and exclude source.
     *
     * Exclusions are merged, never overwritten. WP_Query ignores post__not_in
     * whenever post__in is set, so with an include list the exclusions are
     * subtracted from it instead.
     *
     * @param array $query             Output of normalize_query_data().
     * @param bool  $is_request        True for REST/AJAX (current post comes from the referer).
     * @param int[] $extra_exclude_ids More posts to exclude.
     *
     * @return array WP_Query args.
     */
    public static function build_id_constraints( $query, $is_request = false, $extra_exclude_ids = [  ] )
    {
        $args    = [  ];
        $exclude = isset( $query[ 'exclude' ] ) && is_array( $query[ 'exclude' ] ) ? $query[ 'exclude' ] : [  ];

        if ( ! empty( $query[ 'exclude_current' ] ) ) {
            $current_post_id = $is_request ? url_to_postid( (string) wp_get_referer() ) : get_the_ID();
            if ( $current_post_id ) {
                $exclude[  ] = $current_post_id;
            }
        }

        if ( ! empty( $query[ 'ignore_sticky_posts' ] ) ) {
            $args[ 'ignore_sticky_posts' ] = true;

            // TODO(decision): Q2 — does "Disable Sticky Post" mean exclude sticky posts, or only stop
            // pinning them to the top? As shipped it does both, so both are kept (the exclusion is now
            // merged instead of wiping the other exclusions). If Q2 resolves to "don't pin only",
            // remove this merge and keep ignore_sticky_posts.
            $sticky_posts = get_option( 'sticky_posts' );
            if ( is_array( $sticky_posts ) ) {
                $exclude = array_merge( $exclude, $sticky_posts );
            }
        }

        if ( is_array( $extra_exclude_ids ) ) {
            $exclude = array_merge( $exclude, $extra_exclude_ids );
        }

        $exclude = array_values( array_unique( array_filter( array_map( 'absint', $exclude ) ) ) );
        $include = isset( $query[ 'include' ] ) && is_array( $query[ 'include' ] ) ? $query[ 'include' ] : [  ];

        if ( count( $include ) > 0 ) {
            $include = array_values( array_diff( $include, $exclude ) );
            // Every included post is also excluded: [0] matches nothing, while an
            // empty post__in would silently remove the include filter.
            $args[ 'post__in' ] = count( $include ) > 0 ? $include : [ 0 ];
        } elseif ( count( $exclude ) > 0 ) {
            $args[ 'post__not_in' ] = $exclude;
        }

        return $args;
    }

    /**
     * Page size as WP_Query applies per_page: an empty value (0, "") uses the
     * "Blog pages show at most" setting, -1 turns paging off and any other
     * negative value is made positive.
     *
     * @param mixed $per_page
     *
     * @return int Posts per page, or 0 when every post is on one page (-1).
     */
    public static function effective_per_page( $per_page )
    {
        $per_page = is_scalar( $per_page ) ? (int) $per_page : 0;

        if ( -1 === $per_page ) {
            return 0;
        }
        if ( 0 === $per_page ) {
            return max( 1, (int) get_option( 'posts_per_page' ) );
        }

        return (int) abs( $per_page );
    }

    /**
     * Largest per_page accepted from REST/AJAX requests. Matches the WP REST API
     * collection limit, which the editor preview of these blocks already uses.
     *
     * @return int
     */
    public static function max_per_page()
    {
        return max( 1, (int) apply_filters( 'eb_query_max_per_page', 100 ) );
    }

    /**
     * Largest page number / page-button count accepted from REST/AJAX requests.
     *
     * @return int
     */
    public static function max_pages()
    {
        return max( 1, (int) apply_filters( 'eb_pagination_max_pages', 500 ) );
    }

    /**
     * Largest offset accepted from REST/AJAX requests.
     *
     * @return int
     */
    public static function max_offset()
    {
        return max( 0, (int) apply_filters( 'eb_query_max_offset', self::max_pages() * self::max_per_page() ) );
    }

    /**
     * Longest ID list (include, exclude, author, taxonomy terms) accepted from REST/AJAX requests.
     *
     * @return int
     */
    public static function max_id_list()
    {
        return max( 1, (int) apply_filters( 'eb_query_max_id_list', 500 ) );
    }

    /**
     * @param mixed $value
     * @param bool  $is_request
     *
     * @return int
     */
    private static function normalize_per_page( $value, $is_request )
    {
        if ( null === $value ) {
            return self::DEFAULT_PER_PAGE;
        }

        // Saved values are numeric strings ("6"). "" and "0" stay 0, which WP_Query replaces
        // with the "Blog pages show at most" setting (see effective_per_page()).
        $per_page = is_scalar( $value ) ? (int) $value : self::DEFAULT_PER_PAGE;

        if ( ! $is_request ) {
            return $per_page;
        }

        if ( -1 === $per_page ) {
            // per_page -1 ("show all") is capped for request input: the endpoint is public, so a
            // request can't ask for every post. Saved "show all" blocks still render every post on
            // page load; their filter, search and load-more requests get eb_query_max_per_page
            // posts. Return true from this filter to keep -1 unbounded.
            return apply_filters( 'eb_query_allow_unbounded_per_page', false ) ? -1 : self::max_per_page();
        }

        // WP_Query reads any other negative value as its absolute value.
        return (int) min( abs( $per_page ), self::max_per_page() );
    }

    /**
     * @param mixed $raw
     * @param bool  $is_request
     *
     * @return array
     */
    private static function normalize_taxonomies( $raw, $is_request )
    {
        if ( is_object( $raw ) ) {
            $raw = get_object_vars( $raw );
        }
        if ( ! is_array( $raw ) ) {
            return [  ];
        }

        $taxonomies = [  ];
        foreach ( $raw as $taxonomy => $entry ) {
            if ( ! is_string( $taxonomy ) || '' === $taxonomy ) {
                continue;
            }
            if ( is_object( $entry ) ) {
                $entry = get_object_vars( $entry );
            }
            if ( ! is_array( $entry ) ) {
                continue;
            }

            $value   = self::parse_id_list( $entry[ 'value' ] ?? [  ], $is_request );
            $exclude = self::parse_id_list( $entry[ 'exclude' ] ?? [  ], $is_request );
            if ( count( $value ) === 0 && count( $exclude ) === 0 ) {
                continue;
            }

            $normalized = [
                'value'   => $value,
                'exclude' => $exclude
             ];
            if ( isset( $entry[ 'include_children' ] ) && false === $entry[ 'include_children' ] ) {
                $normalized[ 'include_children' ] = false;
            }

            $taxonomies[ $taxonomy ] = $normalized;
        }

        return $taxonomies;
    }

    /**
     * @param array $taxonomies Normalized taxonomies.
     *
     * @return array
     */
    private static function build_tax_query( $taxonomies )
    {
        $tax_query = [  ];

        foreach ( $taxonomies as $taxonomy => $entry ) {
            $include_children = ! ( isset( $entry[ 'include_children' ] ) && false === $entry[ 'include_children' ] );

            if ( count( $entry[ 'value' ] ) > 0 ) {
                $clause = [
                    'taxonomy' => $taxonomy,
                    'field'    => 'id',
                    'terms'    => $entry[ 'value' ]
                 ];
                if ( ! $include_children ) {
                    $clause[ 'include_children' ] = false;
                }
                $tax_query[  ] = $clause;
            }

            if ( count( $entry[ 'exclude' ] ) > 0 ) {
                $clause = [
                    'taxonomy' => $taxonomy,
                    'field'    => 'id',
                    'terms'    => $entry[ 'exclude' ],
                    'operator' => 'NOT IN'
                 ];
                if ( ! $include_children ) {
                    $clause[ 'include_children' ] = false;
                }
                $tax_query[  ] = $clause;
            }
        }

        return $tax_query;
    }

    /**
     * @param mixed $value
     *
     * @return string '' for anything that isn't a string or number.
     */
    private static function to_string( $value )
    {
        return is_scalar( $value ) && ! is_bool( $value ) ? (string) $value : '';
    }
}
