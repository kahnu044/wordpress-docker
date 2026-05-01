<?php

namespace CarouselSliderBlock\Patterns;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers plugin block patterns for the v2 carousel.
 */
class Patterns {
	/**
	 * Boot the pattern registrar.
	 */
	public static function init() {
		\add_action( 'init', [ self::class, 'register' ] );
	}

	/**
	 * Register pattern category and plugin patterns.
	 */
	public static function register() {
		if ( ! \function_exists( 'register_block_pattern' ) ) {
			return;
		}

		if ( \function_exists( 'register_block_pattern_category' ) ) {
			\register_block_pattern_category(
				'carousel-slider-block',
				[
					'label' => __( 'Carousel Slider', 'cb' ),
				]
			);
		}

		self::register_pattern(
			'hero-slider',
			[
				'title'         => __( 'Full Width Hero Slider', 'cb' ),
				'description'   => __( 'A full-width hero slider with cover backgrounds, headings, copy, and call-to-action buttons.', 'cb' ),
				'categories'    => [ 'carousel-slider-block' ],
				'keywords'      => [ 'hero', 'cover', 'cta', 'slider' ],
				'viewportWidth' => 1440,
				'blockTypes'    => [ 'cb/carousel-v2' ],
			]
		);

		self::register_pattern(
			'testimonials-slider',
			[
				'title'         => __( 'Testimonials Slider', 'cb' ),
				'description'   => __( 'A testimonial slider with quote cards, reviewer names, and roles.', 'cb' ),
				'categories'    => [ 'carousel-slider-block' ],
				'keywords'      => [ 'testimonial', 'quote', 'review', 'slider' ],
				'viewportWidth' => 1200,
				'blockTypes'    => [ 'cb/carousel-v2' ],
			]
		);

		self::register_pattern(
			'logos-carousel',
			[
				'title'         => __( 'Logos Carousel', 'cb' ),
				'description'   => __( 'A looping sponsor and partner logo carousel.', 'cb' ),
				'categories'    => [ 'carousel-slider-block' ],
				'keywords'      => [ 'logos', 'sponsors', 'partners', 'brands' ],
				'viewportWidth' => 1280,
				'blockTypes'    => [ 'cb/carousel-v2' ],
			]
		);
	}

	/**
	 * Register a single pattern from a local template file.
	 *
	 * @param string $slug       Pattern slug without namespace.
	 * @param array  $properties Pattern properties.
	 */
	private static function register_pattern( $slug, $properties ) {
		$file_path = CB_PLUGIN_DIR . '/patterns/' . $slug . '.php';

		if ( ! file_exists( $file_path ) ) {
			return;
		}

		ob_start();
		include $file_path;
		$content = trim( ob_get_clean() );

		if ( '' === $content ) {
			return;
		}

		\register_block_pattern(
			'carousel-slider-block/' . $slug,
			array_merge(
				[
					'source'  => 'plugin',
					'content' => $content,
				],
				$properties
			)
		);
	}
}
