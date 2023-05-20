<div class="eb-post-grid-category-filter" data-ebpgTaxonomy="<?php esc_attr_e( $taxonomy ); ?>">
    <ul class="ebpg-category-filter-list">
        <?php
            /**
             * @var array $categories
             */
            array_map(function ( $item ) {
                $activeClass = $item->value === "all" ? "active" : "";
                echo wp_kses( sprintf(
                    '<li class="ebpg-category-filter-list-item %1$s" data-ebpgCategory="%2$s">%3$s</li>',
                    $activeClass,
                    $item->value,
                    $item->label
                ), 'post' );
            }, $categories);
        ?>
    </ul>
</div>
