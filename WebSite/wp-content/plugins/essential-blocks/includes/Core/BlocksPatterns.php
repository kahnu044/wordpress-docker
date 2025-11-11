<?php
namespace EssentialBlocks\Core;

use EssentialBlocks\Traits\HasSingletone;

class BlocksPatterns
{
    use HasSingletone;

    /**
     * Patterns category
     *
     * @var string
     */
    private $category = 'essential-blocks';

    /**
     * EssentialBlocksPatterns constructor.
     */
    public function __construct()
    {
        if ( ! EB_PATTERN ) {
            return;
        }

        add_action( 'admin_init', [ $this, 'init' ] );
    }

    /**
     * init all actions
     *
     * @return void
     */
    public function init()
    {
        if ( current_user_can( 'edit_posts' ) ) {
            // Check if patterns are enabled in settings
            $eb_settings    = get_option( 'eb_settings', [  ] );
            $enablePatterns = ! empty( $eb_settings[ 'enablePatterns' ] ) ? $eb_settings[ 'enablePatterns' ] : 'true';

            if ( 'false' !== $enablePatterns ) {
                $this->register_category();
                $this->register_local_patterns();

                /**
                 * Register patterns from Templately
                 * @note: Disable for Now as we have our own patterns
                 */
                // $this->register_templately_patterns();
            }
        }
    }

    /**
     * Register category
     *
     * @return void
     */
    public function register_category()
    {
        register_block_pattern_category(
            $this->category,
            [ 'label' => __( 'Essential blocks', 'essential-blocks' ) ]
        );

        // Register block pattern categories for each block
        $pattern_files = $this->get_all_pattern_files();
        foreach ( $pattern_files as $block_name => $file_path ) {
            register_block_pattern_category(
                $this->get_block_category( $block_name ),
                [ 'label' => $this->get_block_name( $block_name ) ]
            );
        }
    }

    /**
     * Register local patterns from JSON files
     *
     * @return void
     */
    public function register_local_patterns()
    {
        // Get all pattern files from the patterns directories
        $pattern_files = $this->get_all_pattern_files();

        foreach ( $pattern_files as $block_name => $file_path ) {
            $patterns = $this->get_patterns_from_file( $file_path );

            if ( ! empty( $patterns ) ) {
                foreach ( $patterns as $index => $pattern ) {
                    $name = $this->get_block_name( $block_name );
                    if ( ! empty( $pattern[ 'content' ] ) ) {
                        register_block_pattern(
                            $this->category . '/' . $block_name . '-' . sanitize_title( $pattern[ 'title' ] ),
                            [
                                'title'       => $name . ' - ' . $pattern[ 'title' ],
                                'categories'  => [ $this->category, $this->get_block_category( $block_name ) ],
                                'description' => sprintf( __( '%s template for %s block', 'essential-blocks' ), $pattern[ 'title' ], $block_name ),
                                'content'     => $pattern[ 'content' ],
                                'keywords'    => [ $name, $pattern[ 'title' ], 'essential-blocks', 'template', 'pattern' ]
                             ]
                        );
                    }
                }
            }
        }
    }

    /**
     * Get block name from block slug
     *
     * @param string $name
     * @return string
     */
    private function get_block_name( $name )
    {
        $name = str_replace( '-', ' ', $name );
        $name = str_replace( 'pro', '', $name );
        $name = trim( ucwords( $name ) );
        return $name;
    }

    /**
     * Get block category from block slug
     *
     * @param string $name
     * @return string
     */
    private function get_block_category( $name )
    {
        $name = str_replace( '-pro', '', $name );
        return $this->category . '-' . $name;
    }

    /**
     * Summary of get_all_pattern_files
     * @return array
     */
    private function get_all_pattern_files()
    {
        $pattern_files = $this->get_pattern_files();
        if ( ESSENTIAL_BLOCKS_IS_PRO_ACTIVE === true && defined( 'ESSENTIAL_BLOCKS_PRO_DIR_PATH' ) ) {
            $pro_pattern_files = $this->get_pattern_files( true );
            $pattern_files     = array_merge( $pattern_files, $pro_pattern_files );
        }

        return $pattern_files;
    }

    /**
     * Get all pattern files from the patterns directory
     *
     * @return array Array of block_name => file_path pairs
     */
    private function get_pattern_files( $pro_patterns = false )
    {
        $patterns_dir = ESSENTIAL_BLOCKS_DIR_PATH . 'patterns/';
        if ( $pro_patterns ) {
            $patterns_dir = ESSENTIAL_BLOCKS_PRO_DIR_PATH . 'patterns/';
        }
        $pattern_files = [  ];

        if ( ! is_dir( $patterns_dir ) ) {
            return $pattern_files;
        }

        $files = scandir( $patterns_dir );
        if ( ! $files ) {
            return $pattern_files;
        }

        foreach ( $files as $file ) {
            if ( pathinfo( $file, PATHINFO_EXTENSION ) === 'json' ) {
                $block_name                   = pathinfo( $file, PATHINFO_FILENAME );
                $pattern_files[ $block_name ] = $patterns_dir . $file;
            }
        }

        return $pattern_files;
    }

    /**
     * Get patterns from a specific JSON file
     *
     * @param string $file_path Path to the JSON file
     * @return array
     */
    private function get_patterns_from_file( $file_path )
    {
        if ( ! file_exists( $file_path ) ) {
            return [  ];
        }

        $content = file_get_contents( $file_path );
        if ( ! $content ) {
            return [  ];
        }

        $patterns = json_decode( $content, true );

        return is_array( $patterns ) ? $patterns : [  ];
    }

    /**
     * Register patterns
     *
     * @return void
     */
    // public function register_templately_patterns()
    // {
    //     $templately_patterns = TemplatelyPatterns::get_instance();
    //     $templately_patterns->init();
    //     $patterns = $templately_patterns->get_patterns();
    //     if ( ! empty( $patterns ) ) {
    //         foreach ( $patterns as $pattern ) {
    //             if ( ! empty( $pattern->json ) ) {
    //                 register_block_pattern(
    //                     $this->category . '/' . $pattern->slug,
    //                     [
    //                         'title'       => $pattern->name,
    //                         'categories'  => [ $this->category ],
    //                         'description' => $pattern->description,
    //                         'content'     => $templately_patterns->get_pattern_content( $pattern->json ),
    //                         'keywords'    => $pattern->tags
    //                      ]
    //                 );
    //             }
    //         }
    //     }
    // }
}
