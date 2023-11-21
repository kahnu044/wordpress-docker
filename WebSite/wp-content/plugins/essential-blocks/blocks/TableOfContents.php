<?php

namespace EssentialBlocks\blocks;

use EssentialBlocks\Core\Block;

class TableOfContents extends Block {
    protected $frontend_scripts = ['essential-blocks-table-of-contents-block-frontend'];
    /**
     * headings that are used, prevent duplicates.
     *
     * @var null
     */
    public static $the_headings = null;

    /**
     * Post content.
     *
     * @var string
     */
    public static $output_content = '';
/**
 * Default attributes
 *
 * @var array
 */
    protected $default_attributes = [
        'title'              => "Table of Contents",
        "collapsible"        => false,
        "initialCollapse"    => false,
        "displayTitle"       => true,
        "isSmooth"           => true,
        "seperator"          => false,
        "isSticky"           => false,
        "contentAlign"       => 'left',
        "scrollTarget"       => "scroll_to_toc",
        "stickyPosition"     => 'left',
        "enableCopyLink"     => false,
        "showListSeparator"  => false,
        "scrollToTop"        => false,
        "scrollToTopIcon"    => "fas fa-angle-up",
        "stickyHideOnMobile" => false,
        "hideOnDesktop"      => false,
        "hideOnTab"          => false,
        "hideOnMobile"       => false,
        "topOffset"          => '',
        "listStyle"          => "ul"
    ];

    /**
     * Unique name of the block.
     * @return string
     */
    public function get_name() {
        return 'table-of-contents';
    }

    /**
     * Register all other scripts
     * @return void
     */
    public function register_scripts() {
        $this->assets_manager->register(
            'table-of-contents-block-frontend',
            $this->path() . '/frontend/index.js',
            ['clipboard']
        );
    }

    /**
     * Get Editor Type
     *
     * @return string
     */
    public function get_editor_type() {
        global $pagenow;
        $editor_type = "";
        if ( $pagenow == 'post-new.php' || $pagenow == 'post.php' ) {
            $editor_type = 'edit-post';
        } elseif ( $pagenow == 'site-editor.php' || ( $pagenow == 'themes.php' && isset( $_GET['page'] ) && $_GET['page'] == 'gutenberg-edit-site' ) ) {
            $editor_type = 'edit-site';
        } elseif ( $pagenow == 'widgets.php' ) {
            $editor_type = 'edit-widgets';
        }
        return $editor_type;
    }

    /**
     * Check if a array all values are false
     *
     * @return boolean
     */
    public function areAllFalse( $array ) {
        return array_reduce( $array, function ( $carry, $item ) {
            return $carry && ( $item === false );
        }, true );
    }

    /**
     * Generate TOC
     *
     * @param array $data
     */
    public function generate_toc( $data, $listStyle ) {
        $toc   = "<$listStyle class='eb-toc__list'>";
        $stack = [];

        for ( $i = 0; $i < count( $data ); $i++ ) {
            $level   = $data[$i]['level'];
            $content = $data[$i]['content'];
            $link    = $data[$i]['link'];

            while ( count( $stack ) > 0 && $stack[count( $stack ) - 1]['level'] >= $level ) {
                array_pop( $stack );
                $toc .= "</li></$listStyle>";
            }

            $toc .= "<li><a href=\"#$link\">$content</a>";

            if ( $i < count( $data ) - 1 && $data[$i + 1]['level'] > $level ) {
                $toc .= "<$listStyle class='eb-toc__list'>";
                array_push( $stack, ['level' => $level, 'content' => $content, 'link' => $link] );
            }
        }
        while ( count( $stack ) > 0 ) {
            array_pop( $stack );
            $toc .= "</li></$listStyle>";
        }

        $toc .= "</$listStyle>";

        return $toc;
    }

    /**
     * Generate headers from content
     */
    public function getHeadersFromContent( $visibleHeaders, $postContent, $content ) {

        $wp_charset = get_bloginfo( 'charset' );
        $doc        = new \DOMDocument( '1.0', $wp_charset );
        libxml_use_internal_errors( true );
        $tempPostContentDOM = mb_convert_encoding( $postContent, 'HTML-ENTITIES', 'UTF-8' );
        $doc->loadHTML(
            // loadHTML expects ISO-8859-1, so we need to convert the post content to
            // that format. We use htmlentities to encode Unicode characters not
            // supported by ISO-8859-1 as HTML entities. However, this function also
            // converts all special characters like <pre or > to HTML entities, so we use
            // htmlspecialchars_decode to decode them.
            htmlspecialchars_decode(
                utf8_decode(
                    htmlentities(
                        '<!DOCTYPE html><html><head><title>:D</title><body>' .
                        htmlspecialchars( $tempPostContentDOM ) .
                        '</body></html>',
                        ENT_COMPAT,
                        'UTF-8',
                        false
                    )
                ),
                ENT_COMPAT
            )
        );
        libxml_use_internal_errors( false );

        $queryArray = ["h1", "h2", "h3", "h4", "h5", "h6"];
        if ( isset( $visibleHeaders ) ) {
            $queryArray = [];
            if ( $visibleHeaders[0] ) {
                $queryArray[] = "self::h1";
            }
            if ( $visibleHeaders[1] ) {
                $queryArray[] = "self::h2";
            }
            if ( $visibleHeaders[2] ) {
                $queryArray[] = "self::h3";
            }
            if ( $visibleHeaders[3] ) {
                $queryArray[] = "self::h4";
            }
            if ( $visibleHeaders[4] ) {
                $queryArray[] = "self::h5";
            }
            if ( $visibleHeaders[5] ) {
                $queryArray[] = "self::h6";
            }
        }

        $queryString = implode( ' or ', $queryArray );
        $queryString = '//*[' . $queryString . ']';

        if ( ! $this->areAllFalse( $visibleHeaders ) ) {
            $xpath           = new \DOMXPath( $doc );
            $headingElements = iterator_to_array( $xpath->query( $queryString ) );
            return $this->getHeadingsFromHeadingElements( $headingElements );
        }

        return [];
    }

    /**
     * generate heading from headings elements
     */
    public function getHeadingsFromHeadingElements( $headingElements ) {
        $headings = [];
        foreach ( $headingElements as $index => $heading ) {
            $level = null;
            switch ( $heading->tagName ) {
            case "h1":
                $level = 1;
                break;
            case "h2":
                $level = 2;
                break;
            case "h3":
                $level = 3;
                break;
            case "h4":
                $level = 4;
                break;
            case "h5":
                $level = 5;
                break;
            case "h6":
                $level = 6;
                break;
            }

            $value          = apply_filters( 'eb_dynamic_tag_value', $heading->textContent, '', true );
            $value          = empty( $value ) ? $heading->textContent : $value;
            $heading_string = $this->parseTocSlug( wp_strip_all_tags( $value ) );

            $headings[] = [
                "level"   => $level,
                "content" => $value,
                "text"    => $value,
                "link"    => preg_match( '/^[A-Za-z0-9\-]+$/', $heading_string ) === 1 ? $heading_string : "eb-table-content-$index"
            ];
        }

        return $headings;
    }

    /**
     * parse slug
     */
    public function parseTocSlug( $slug ) {
        if ( ! $slug ) {
            return $slug;
        }
        // TODO: have to remove accent function
        $parsedSlug = strtolower( $slug );
        $parsedSlug = preg_replace( '/&(amp;)/', '', $parsedSlug ); // Remove &
        $parsedSlug = preg_replace( '/&(mdash;)/', '', $parsedSlug ); // Remove long dash
        $parsedSlug = preg_replace( '/[\x{2013}\x{2014}]/u', '', $parsedSlug ); // Remove long dash
        $parsedSlug = preg_replace( '/[&]nbsp[;]/i', '-', $parsedSlug ); // Replace inseccable spaces
        $parsedSlug = preg_replace( '/\s+/', '-', $parsedSlug ); // Replace spaces with -
        $parsedSlug = preg_replace( '/[&\/\\#,^!+()$~%.\'":*?<>{}@‘’”“]/', '', $parsedSlug ); // Remove special chars
        $parsedSlug = preg_replace( '/\-+/', '-', $parsedSlug ); // Replace multiple - with single -
        $parsedSlug = preg_replace( '/^-+/', '', $parsedSlug ); // Trim - from start of text
        $parsedSlug = preg_replace( '/-+$/', '', $parsedSlug ); // Trim - from end of text

        return urldecode( rawurlencode( $parsedSlug ) );
    }

    /**
     * Render Table of Contents Block
     *
     * @param array $attributes the blocks attribtues.
     */
    public function render_callback( $attributes, $content ) {
        $the_post = get_post();

        if ( ! $the_post ) {
            return;
        }

        $attributes         = wp_parse_args( $attributes, $this->default_attributes );
        $scrollToTop        = $attributes['scrollToTop'] ? 'true' : 'false';
        $scrollToTopIcon    = $attributes['scrollToTopIcon'];
        $listStyle          = $attributes['listStyle'];
        $collapsible        = $attributes['collapsible'] ? 'true' : 'false';
        $initialCollapse    = $attributes['initialCollapse'] ? 'true' : 'false';
        $stickyHideOnMobile = $attributes['stickyHideOnMobile'] ? 'true' : 'false';
        $isSticky           = $attributes['isSticky'] ? 'true' : 'false';
        $stickyPosition     = $attributes['stickyPosition'];
        $scrollTarget       = $attributes['scrollTarget'];
        $enableCopyLink     = $attributes['enableCopyLink'] ? 'true' : 'false';
        $displayTitle       = $attributes['displayTitle'] ? 'true' : 'false';
        $title              = $attributes['title'];
        $isSmooth           = $attributes['isSmooth'] ? 'true' : 'false';
        $topOffset          = $attributes['topOffset'];
        $hideOnDesktop      = $attributes['hideOnDesktop'] ? 'true' : 'false';
        $hideOnTab          = $attributes['hideOnTab'] ? 'true' : 'false';
        $hideOnMobile       = $attributes['hideOnMobile'] ? 'true' : 'false';
        $visibleHeaders     = isset( $attributes['visibleHeaders'] ) ? $attributes['visibleHeaders'] : array_fill( 0, 6, true );
        $headers            = $this->getHeadersFromContent( $visibleHeaders, $the_post->post_content, $content );
        $deleteHeaderList   = isset( $attributes['deleteHeaderList'] ) ? $attributes['deleteHeaderList'] : [];
        $classHook          = isset( $attributes['classHook'] ) ? $attributes['classHook'] : '';

        $container_class   = [];
        $container_class[] = 'eb-toc-container ' . $attributes['blockId'];
        $container_class[] = $isSticky == 'true' ? 'eb-toc-sticky-' . $stickyPosition : '';
        $container_class[] = $isSticky == 'true' ? 'eb-toc-is-sticky' : 'eb-toc-is-not-sticky';
        $container_class[] = $collapsible == 'true' ? 'eb-toc-collapsible' : 'eb-toc-not-collapsible';
        $container_class[] = $initialCollapse == 'true' ? 'eb-toc-initially-collapsed' : 'eb-toc-initially-not-collapsed';
        $container_class[] = $scrollToTop ? 'eb-toc-scrollToTop' : 'eb-toc-not-scrollToTop';

        $wrapper_class   = [];
        $wrapper_class[] = $collapsible == 'true' && $initialCollapse == 'true' && $isSticky == 'false' ? 'hide-content' : '';
        $output          = "";
        $output .= '<div ' . wp_kses_data( get_block_wrapper_attributes() ) . '>';
        $output .= '<div class="eb-parent-wrapper eb-parent-' . $attributes['blockId'] . ' ' . $classHook . '">';
        $output .= '<div class="' . implode( " ", $container_class ) . '"
                data-scroll-top="' . $scrollToTop . '"
                data-scroll-top-icon="' . $scrollToTopIcon . '"
                data-collapsible="' . $collapsible . '"
                data-sticky-hide-mobile="' . $stickyHideOnMobile . '"
                data-sticky="' . $isSticky . '"
                data-scroll-target="' . $scrollTarget . '"
                data-copy-link="' . $enableCopyLink . '"
                data-editor-type="' . $this->get_editor_type() . '"
                data-hide-desktop="' . $hideOnDesktop . '"
                data-hide-tab="' . $hideOnTab . '"
                data-hide-mobile="' . $hideOnMobile . '"
                >';
        $output .= '<div class="eb-toc-header">';
        if ( $isSticky == 'true' ) {
            $output .= '<span class="eb-toc-close eb-toc-sticky-' . $stickyPosition . '">';
            $output .= '</span>';
        }
        if ( $displayTitle == 'true' ) {
            $output .= '<div class="eb-toc-title">' . $title . '</div>';
        }
        $output .= '</div>'; // header
        $output .= '<div class="eb-toc-wrapper ' . implode( " ", $wrapper_class ) . '"
        data-headers="' . htmlspecialchars( json_encode( $headers ), ENT_QUOTES, 'UTF-8' ) . '"
        data-visible="' . json_encode( $visibleHeaders ) . '"
        data-delete-headers="' . htmlspecialchars( json_encode( $deleteHeaderList ), ENT_QUOTES, 'UTF-8' ) . '"
        data-smooth="' . $isSmooth . '"
        data-top-offset="' . $topOffset . '"
        >';

        if ( $visibleHeaders && count( $headers ) > 0 && count( array_filter( $headers, function ( $header ) use ( $visibleHeaders ) {
            return isset( $visibleHeaders[$header['level'] - 1] );
        } ) ) > 0 ) {
            $newHeaders = [];
            foreach ( $headers as $index => $item ) {
                if (
                    isset( $deleteHeaderList ) &&
                    is_array( $deleteHeaderList ) &&
                    count( $deleteHeaderList ) > 0 &&
                    isset( $deleteHeaderList[$index] ) &&
                    isset( $deleteHeaderList[$index]["isDelete"] ) &&
                    $deleteHeaderList[$index]["isDelete"] === false
                ) {
                    $newHeaders[] = $headers[$index];
                }
            }

            $output .= '<div class="eb-toc__list-wrap">';
            $output .= count( $newHeaders ) > 0 ? $this->generate_toc( $newHeaders, $listStyle ) : $this->generate_toc( $headers, $listStyle );
            $output .= '</div>';
        }

        $output .= '</div>'; // wrapper
        $stickyPositionClass = $isSticky ? " eb-toc-button-$stickyPosition" : '';
        if ( 'false' !== $isSticky ) {
            $output .= '<button class="eb-toc-button ' . $stickyPositionClass . '">';
            if ( $displayTitle ) {
                $output .= '<div>' . $title . '</div>';
            }
            $output .= '</button>';
        }
        $output .= '</div>'; // container
        $output .= '</div>'; // parent wrapper
        $output .= "</div>"; // block

        return $output;
    }
}
