<div class="eb-post-grid-category-filter<?php if ( $showSearch ) {echo esc_attr( ' eb-show-search' );}?>" data-ebpgTaxonomy="<?php echo esc_attr( $taxonomy ); ?>">
	<ul class="ebpg-category-filter-list">
		<?php
            /**
             * @var array $categories
             */
            array_map(
                function ( $item ) use ($essentialAttr){
                    $activeClass = $item->value === $essentialAttr['defaultFilter'] ? 'active' : '';
                    // WPML Workaround
                    if ($item->label == "All" && class_exists('Sitepress') ) {
                        $textdomain = ' essential-blocks';
                        $string_name = 'Essential Blocks string';

                        if ( apply_filters('wpml_default_language', NULL ) == apply_filters( 'wpml_current_language', NULL )) {
                            do_action( 'wpml_register_single_string', $textdomain, $string_name, $item->label );
                        }   
                        // Apply the translation to the string
                        $item->label = apply_filters('wpml_translate_single_string', $item->label , $textdomain, $string_name);
                    }
                    echo wp_kses(
                        sprintf(
                            '<li class="ebpg-category-filter-list-item %1$s" data-ebpgCategory="%2$s">%3$s</li>',
                            $activeClass,
                            $item->value,
                            $item->label
                        ),
                        'post'
                    );
                },
                $categories
            );
        ?>
	</ul>
    <?php
        /**
         * Add search form
         */
        do_action( 'eb_post_grid_search_form', $essentialAttr );

    ?>
</div>
