<?php
/**
 * Dynamic tag security utilities.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class Dynamic_Tag_Security
 */
class GenerateBlocks_Dynamic_Tag_Security extends GenerateBlocks_Singleton {
	const DISALLOWED_KEYS = [
		'post_password',
		'password',
		'user_pass',
		'user_activation_key',
	];

	/**
	 * Initialize all hooks.
	 *
	 * @return void
	 */
	public function init() {
		add_filter( 'wp_insert_post_data', [ $this, 'validate_content_before_save' ], 10, 2 );
		add_action( 'init', [ $this, 'register_rest_validation_for_post_types' ], 999 );
		add_filter( 'rest_pre_dispatch', [ $this, 'validate_autosave_rest_request' ], 10, 3 );
	}

	/**
	 * Validate dynamic tag usage in post content at save time.
	 *
	 * Prevents restricted meta keys from being saved inside GenerateBlocks dynamic tags.
	 *
	 * @since 2.2.0
	 *
	 * @param string $content The post content to validate.
	 * @return true|WP_Error True if valid, WP_Error if validation fails.
	 */
	public static function validate_content( $content ) {
		return self::validate_content_with_existing_signatures( $content );
	}

	/**
	 * Validate content while allowing previously existing violations.
	 *
	 * @since 2.2.0
	 *
	 * @param string $content              The post content to validate.
	 * @param array  $existing_signatures  List of violation signatures already stored for this post.
	 * @return true|WP_Error
	 */
	public static function validate_content_with_existing_signatures( $content, $existing_signatures = [] ) {
		return self::validate_content_internal( $content, $existing_signatures );
	}

	/**
	 * Retrieve restricted reference signatures present in content.
	 *
	 * @since 2.2.0
	 *
	 * @param string $content Serialized post content.
	 * @return array<int, string>
	 */
	public static function get_restricted_reference_signatures( $content ) {
		$violations = self::get_violation_errors( $content );
		$signatures = [];

		foreach ( $violations as $signature => $details ) {
			$signatures[ $signature ] = (int) ( $details['count'] ?? 0 );
		}

		return $signatures;
	}

	/**
	 * Determine if a given piece of content should be scanned for dynamic tag usage.
	 *
	 * @since 2.2.0
	 *
	 * @param string $content The post content to evaluate.
	 * @return bool True when validation should proceed.
	 */
	public static function should_validate_content( $content ) {
		$content = self::normalize_serialized_content( $content );

		if ( '' === $content ) {
			return false;
		}

		$has_dynamic_tag_syntax = false !== strpos( $content, '{{' );
		$has_dynamic_attributes = false;

		if ( class_exists( 'GenerateBlocks_Dynamic_Content' ) && method_exists( 'GenerateBlocks_Dynamic_Content', 'content_has_dynamic_attribute_markers' ) ) {
			$has_dynamic_attributes = (bool) GenerateBlocks_Dynamic_Content::content_has_dynamic_attribute_markers( $content );
		}

		if ( ! $has_dynamic_tag_syntax ) {
			if ( $has_dynamic_attributes ) {
				return true;
			}

			return (bool) apply_filters( 'generateblocks_force_validate_content', false, $content );
		}

		$block_names = self::get_dynamic_tag_enabled_blocks();

		if ( empty( $block_names ) ) {
			return false;
		}

		foreach ( $block_names as $block_name ) {
			if ( function_exists( 'has_block' ) && has_block( $block_name, $content ) ) {
				return true;
			}
		}

		return (bool) apply_filters( 'generateblocks_force_validate_content', false, $content );
	}

	/**
	 * Extract violation errors keyed by signature.
	 *
	 * @since 2.2.0
	 *
	 * @param string $content Serialized post content.
	 * @return array<string, array{error:WP_Error,count:int}>
	 */
	protected static function get_violation_errors( $content ) {
		$content = self::normalize_serialized_content( $content );

		if ( '' === $content ) {
			return [];
		}

		return self::scan_content_for_violations( $content );
	}

	/**
	 * Validate content while considering existing violations.
	 *
	 * @param string $content             Content to validate.
	 * @param array  $existing_signatures Previously stored violation signatures.
	 * @return true|WP_Error
	 */
	protected static function validate_content_internal( $content, $existing_signatures = [] ) {
		$content    = self::normalize_serialized_content( $content );
		$violations = self::get_violation_errors( $content );

		if ( empty( $violations ) ) {
			return true;
		}

		if ( ! empty( $existing_signatures ) ) {
			$existing_counts = self::normalize_signature_counts( $existing_signatures );

			foreach ( $violations as $signature => $details ) {
				$count     = (int) ( $details['count'] ?? 0 );
				$allowance = isset( $existing_counts[ $signature ] ) ? (int) $existing_counts[ $signature ] : 0;

				if ( $count > $allowance ) {
					return $details['error'];
				}
			}

			return true;
		}

		$first_violation = reset( $violations );

		return $first_violation['error'];
	}

	/**
	 * Format a violation signature for comparison.
	 *
	 * @param string $type       Type of violation (user_meta/post_meta/term_meta).
	 * @param string $field_name Field name involved.
	 * @return string
	 */
	protected static function format_violation_signature( $type, $field_name ) {
		$type       = is_string( $type ) ? strtolower( trim( $type ) ) : '';
		$field_name = is_string( $field_name ) ? strtolower( trim( $field_name ) ) : '';

		if ( '' === $type || '' === $field_name ) {
			return '';
		}

		return "{$type}:{$field_name}";
	}

	/**
	 * Normalize stored signature data into signature => count pairs.
	 *
	 * @param array $signatures Raw signature data.
	 * @return array<string,int>
	 */
	protected static function normalize_signature_counts( $signatures ) {
		if ( empty( $signatures ) || ! is_array( $signatures ) ) {
			return [];
		}

		$normalized = [];

		foreach ( $signatures as $key => $value ) {
			if ( is_string( $key ) && is_numeric( $value ) ) {
				$normalized[ $key ] = max( 0, (int) $value );
			} elseif ( is_string( $value ) ) {
				$normalized[ $value ] = isset( $normalized[ $value ] ) ? $normalized[ $value ] + 1 : 1;
			}
		}

		return $normalized;
	}

	/**
	 * Store or increment a violation entry.
	 *
	 * @param array    $violations Reference to violations array.
	 * @param string   $signature  Signature key.
	 * @param WP_Error $error      Violation error.
	 * @param int      $increment  Optional increment amount.
	 * @return void
	 */
	protected static function add_violation_entry( array &$violations, $signature, $error, $increment = 1 ) {
		if ( ! isset( $violations[ $signature ] ) ) {
			$violations[ $signature ] = [
				'error' => $error,
				'count' => 0,
			];
		}

		$violations[ $signature ]['count'] += max( 1, (int) $increment );
	}

	/**
	 * Scan content and collect violation errors.
	 *
	 * @param string $content Serialized block content.
	 * @return array<string, array{error:WP_Error,count:int}>
	 */
	protected static function scan_content_for_violations( $content ) {
		$content    = self::normalize_serialized_content( $content );
		$violations = [];
		$rules      = self::get_dynamic_tag_validation_rules();

		foreach ( $rules as $rule_key => $rule ) {
			if ( ! self::should_enforce_rule( $rule ) ) {
				continue;
			}

			if ( ! empty( $rule['pattern'] ) && preg_match_all( $rule['pattern'], $content, $matches ) ) {
				$field_matches = ! empty( $matches[1] ) ? $matches[1] : ( $matches[0] ?? [] );

				foreach ( $field_matches as $field_name ) {
					if ( isset( $rule['fixed_field'] ) ) {
						$field_name = $rule['fixed_field'];
					}

					$result = call_user_func( $rule['validator'], $field_name );

					if ( is_wp_error( $result ) ) {
						$signature = self::format_violation_signature( $rule_key, $field_name );

						if ( $signature ) {
							self::add_violation_entry( $violations, $signature, $result );
						}
					}
				}
			}

			if ( ! empty( $rule['link_tokens'] ) ) {
				$link_violations = self::collect_meta_link_target_violations(
					$content,
					$rule_key,
					array_fill_keys( $rule['link_tokens'], $rule['validator'] )
				);

				foreach ( $link_violations as $signature => $details ) {
					self::add_violation_entry(
						$violations,
						$signature,
						$details['error'],
						$details['count'] ?? 1
					);
				}
			}
		}

		if (
			class_exists( 'GenerateBlocks_Dynamic_Content' ) &&
			method_exists( 'GenerateBlocks_Dynamic_Content', 'get_dynamic_attribute_violation_items' )
		) {
			$attribute_violations = GenerateBlocks_Dynamic_Content::get_dynamic_attribute_violation_items( $content );

			foreach ( $attribute_violations as $violation ) {
				$type       = $violation['type'] ?? '';
				$field_name = $violation['field'] ?? '';
				$error      = $violation['error'] ?? null;

				if ( ! $error instanceof WP_Error ) {
					continue;
				}

				$signature = self::format_violation_signature( $type, $field_name );

				if ( $signature ) {
					self::add_violation_entry( $violations, $signature, $error );
				}
			}
		}

		return $violations;
	}

	/**
	 * Retrieve dynamic tag validation rules.
	 *
	 * @return array
	 */
	protected static function get_dynamic_tag_validation_rules() {
		$rules = [
			'user_meta' => [
				'pattern'     => '/\{\{(?:user_meta|author_meta)(?:\s+|\|)+[^}]*key:([^|}]+)[^}]*}}/i',
				'validator'   => [ self::class, 'validate_user_meta_field_name' ],
				'link_tokens' => [ 'author_meta', 'author_email' ],
				'bypass_cap'  => 'list_users',
			],
			'post_meta' => [
				'pattern'     => '/\{\{post_meta(?:\s+|\|)+[^}]*key:([^|}]+)[^}]*}}/i',
				'validator'   => [ self::class, 'validate_post_meta_field_name' ],
				'link_tokens' => [ 'post_meta' ],
			],
			'term_meta' => [
				'pattern'     => '/\{\{term_meta(?:\s+|\|)+[^}]*key:([^|}]+)[^}]*}}/i',
				'validator'   => [ self::class, 'validate_term_meta_field_name' ],
				'link_tokens' => [ 'term_meta' ],
			],
		];

		return apply_filters( 'generateblocks_dynamic_tag_validation_rules', $rules );
	}

	/**
	 * Determine if current user should validate user meta fields.
	 *
	 * @since 2.2.0
	 *
	 * @return bool
	 */
	public static function should_validate_user_meta_fields() {
		$rules = self::get_dynamic_tag_validation_rules();
		$rule  = $rules['user_meta'] ?? null;

		if ( ! $rule ) {
			return true;
		}

		return self::should_enforce_rule( $rule );
	}

	/**
	 * Determine whether the current user should be subject to a validation rule.
	 *
	 * @param array $rule Rule definition.
	 * @return bool
	 */
	protected static function should_enforce_rule( $rule ) {
		if ( empty( $rule['bypass_cap'] ) ) {
			return true;
		}

		return ! current_user_can( $rule['bypass_cap'] );
	}

	/**
	 * Validate a single user meta field name against safe/disallowed lists.
	 *
	 * @since 2.2.0
	 *
	 * @param string $field_name The meta key to validate.
	 * @return true|WP_Error True if valid, WP_Error on violation.
	 */
	public static function validate_user_meta_field_name( $field_name ) {
		$field_name = is_string( $field_name ) ? trim( $field_name ) : '';

		if ( '' === $field_name ) {
			return true;
		}

		if ( is_protected_meta( $field_name, 'user' ) ) {
			return new WP_Error(
				'restricted_user_meta',
				sprintf(
					/* translators: %s: The restricted field name */
					__( 'You do not have permission to use the field "%s" in dynamic tags. Fields starting with underscore are protected.', 'generateblocks' ),
					esc_html( $field_name )
				),
				[ 'status' => 403 ]
			);
		}

		if ( in_array( $field_name, self::DISALLOWED_KEYS, true ) ) {
			return new WP_Error(
				'restricted_user_meta',
				sprintf(
					/* translators: %s: The restricted field name */
					__( 'You do not have permission to use the field "%s" in dynamic tags. This field is restricted for security reasons.', 'generateblocks' ),
					esc_html( $field_name )
				),
				[ 'status' => 403 ]
			);
		}

		if ( ! in_array( $field_name, self::get_safe_user_meta_keys(), true ) ) {
			return new WP_Error(
				'restricted_user_meta',
				sprintf(
					/* translators: %s: The restricted field name */
					__( 'You do not have permission to use the field "%s" in dynamic tags. Only administrators can use custom user fields.', 'generateblocks' ),
					esc_html( $field_name )
				),
				[ 'status' => 403 ]
			);
		}

		return true;
	}

	/**
	 * Validate a post meta key (blocks underscore-prefixed fields).
	 *
	 * @since 2.2.0
	 *
	 * @param string $field_name Meta key to validate.
	 * @return true|WP_Error True if valid key, WP_Error if restricted.
	 */
	public static function validate_post_meta_field_name( $field_name ) {
		$field_name = is_string( $field_name ) ? trim( $field_name ) : '';

		if ( '' === $field_name ) {
			return true;
		}

		if ( is_protected_meta( $field_name, 'post' ) ) {
			return new WP_Error(
				'restricted_post_meta',
				sprintf(
					/* translators: %s: The restricted field name */
					__( 'You do not have permission to use the post meta field "%s" in dynamic tags. Fields starting with underscore are protected.', 'generateblocks' ),
					esc_html( $field_name )
				),
				[ 'status' => 403 ]
			);
		}

		return true;
	}

	/**
	 * Validate a term meta key (blocks underscore-prefixed fields).
	 *
	 * @since 2.2.0
	 *
	 * @param string $field_name Meta key to validate.
	 * @return true|WP_Error True if valid key, WP_Error if restricted.
	 */
	public static function validate_term_meta_field_name( $field_name ) {
		$field_name = is_string( $field_name ) ? trim( $field_name ) : '';

		if ( '' === $field_name ) {
			return true;
		}

		if ( is_protected_meta( $field_name, 'term' ) ) {
			return new WP_Error(
				'restricted_term_meta',
				sprintf(
					/* translators: %s: The restricted field name */
					__( 'You do not have permission to use the term meta field "%s" in dynamic tags. Fields starting with underscore are protected.', 'generateblocks' ),
					esc_html( $field_name )
				),
				[ 'status' => 403 ]
			);
		}

		return true;
	}

	/**
	 * Collect link target violations for dynamic tags.
	 *
	 * @since 2.2.0
	 *
	 * @param string     $content    Serialized post content.
	 * @param string     $rule_key   The base rule key (user_meta/post_meta/term_meta).
	 * @param callable[] $validators Validators keyed by link token.
	 * @return array<string, array{error:WP_Error,count:int}>
	 */
	protected static function collect_meta_link_target_violations( $content, $rule_key, $validators ) {
		$content    = self::normalize_serialized_content( $content );
		$violations = [];

		if ( '' === $content ) {
			return $violations;
		}

		if ( empty( $validators ) || ! is_array( $validators ) ) {
			return $violations;
		}

		if ( ! preg_match_all( '/\{\{([^}]+)\}\}/', $content, $tag_matches ) ) {
			return $violations;
		}

		foreach ( $tag_matches[1] as $tag_body ) {
			$parts = preg_split( '/(?:\s+|\|)+/', $tag_body, 2 );

			if ( count( $parts ) < 2 ) {
				continue;
			}

			$options_string = $parts[1];

			if ( false === stripos( $options_string, 'link:' ) ) {
				continue;
			}

			foreach ( explode( '|', $options_string ) as $option ) {
				$option = trim( $option );

				if ( '' === $option || stripos( $option, 'link:' ) !== 0 ) {
					continue;
				}

				$link_value = trim( substr( $option, 5 ) );

				if ( '' === $link_value ) {
					continue;
				}

				$link_parts = array_map( 'trim', explode( ',', $link_value ) );
				$target     = strtolower( $link_parts[0] ?? '' );
				$field_name = $link_parts[1] ?? '';

				if ( 'author_email' === $target ) {
					$field_name = 'user_email';
				}

				if ( ! isset( $validators[ $target ] ) || ! is_callable( $validators[ $target ] ) ) {
					continue;
				}

				$result = call_user_func( $validators[ $target ], $field_name );

				if ( is_wp_error( $result ) ) {
					$signature = self::format_violation_signature( $rule_key, $field_name );

					if ( $signature ) {
						self::add_violation_entry( $violations, $signature, $result );
					}
				}
			}
		}

		return $violations;
	}

	/**
	 * Get safe user meta keys accessible without list_users capability.
	 *
	 * @since 2.1.4
	 *
	 * @return array<string>
	 */
	public static function get_safe_user_meta_keys() {
		$safe_keys = [
			'description',
			'first_name',
			'last_name',
			'nickname',
			'display_name',
			'user_nicename',
			'user_url',
			'locale',
			'show_admin_bar_front',
		];

		$safe_keys = apply_filters( 'generateblocks_safe_user_meta_keys', $safe_keys );

		return array_values( array_unique( array_filter( $safe_keys, 'is_string' ) ) );
	}

	/**
	 * Get the list of blocks that support GenerateBlocks dynamic tags.
	 *
	 * Mirrors the filter used when replacing tags so integrations stay in sync.
	 *
	 * @since 2.2.0
	 *
	 * @return array<int, string>
	 */
	protected static function get_dynamic_tag_enabled_blocks() {
		$blocks = [];

		if ( class_exists( 'GenerateBlocks_Dynamic_Tags' ) ) {
			$dynamic_tags = GenerateBlocks_Dynamic_Tags::get_instance();

			if ( method_exists( $dynamic_tags, 'get_allowed_blocks' ) ) {
				$blocks = $dynamic_tags->get_allowed_blocks();
			}
		}

		if ( ! is_array( $blocks ) ) {
			return [];
		}

		return array_values(
			array_filter(
				$blocks,
				function( $block_name ) {
					return is_string( $block_name ) && '' !== $block_name;
				}
			)
		);
	}

	/**
	 * Fetch violation signatures from an existing post.
	 *
	 * @param int $post_id Post ID.
	 * @return array
	 */
	protected static function get_existing_content_signatures( $post_id ) {
		if ( ! $post_id ) {
			return [];
		}

		$post = get_post( $post_id );

		if ( ! $post || is_wp_error( $post ) ) {
			return [];
		}

		return self::get_restricted_reference_signatures( $post->post_content );
	}

	/**
	 * Validate post content before database insert.
	 *
	 * This filter runs BEFORE the post is saved to the database, allowing us to
	 * prevent the save by triggering an error. Handles classic editor, quick edit,
	 * and other non-REST saves.
	 *
	 * @since 2.2.0
	 *
	 * @param array $data    An array of slashed, sanitized, and processed post data.
	 * @param array $postarr An array of sanitized (and slashed) but otherwise unmodified post data.
	 * @return array The post data array (unmodified if validation passes).
	 */
	public function validate_content_before_save( $data, $postarr ) {
		// Admins already have unfiltered_html, so skip enforcement.
		if ( current_user_can( 'manage_options' ) ) {
			return $data;
		}

		// REST requests are validated via rest_pre_insert hooks.
		if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			return $data;
		}

		// Skip if no content.
		if ( empty( $data['post_content'] ) ) {
			return $data;
		}

		// Skip classic revisions but continue validating autosaves.
		if ( ! empty( $postarr['ID'] ) ) {
			$is_revision = wp_is_post_revision( $postarr['ID'] );
			$is_autosave = wp_is_post_autosave( $postarr['ID'] );

			if ( $is_revision && ! $is_autosave ) {
				return $data;
			}
		}

		if ( ! self::should_validate_content( $data['post_content'] ) ) {
			return $data;
		}

		$existing_signatures = [];

		if ( ! empty( $postarr['ID'] ) ) {
			$existing_signatures = self::get_existing_content_signatures( (int) $postarr['ID'] );
		}

		// Validate the content.
		$result = self::validate_content_with_existing_signatures( $data['post_content'], $existing_signatures );

		if ( is_wp_error( $result ) ) {
			// Block the save with a clear error message.
			wp_die(
				esc_html( $result->get_error_message() ),
				esc_html( __( 'Content Validation Failed', 'generateblocks' ) ),
				array(
					'response'  => 403,
					'back_link' => true,
				)
			);
		}

		return $data;
	}

	/**
	 * Validate post content before REST API insert/update.
	 *
	 * This handles Gutenberg saves and autosaves via REST API.
	 *
	 * @since 2.2.0
	 *
	 * @param stdClass        $prepared_post An object representing a single post prepared for inserting or updating the database.
	 * @param WP_REST_Request $request       Request object.
	 * @return stdClass|WP_Error The prepared post object or WP_Error on validation failure.
	 */
	public function validate_content_rest( $prepared_post, $request ) {
		// Admins already have unfiltered_html, so skip enforcement.
		if ( current_user_can( 'manage_options' ) ) {
			return $prepared_post;
		}

		// Skip if no content.
		$content = $prepared_post->post_content ?? '';
		if ( empty( $content ) ) {
			return $prepared_post;
		}

		if ( ! self::should_validate_content( $content ) ) {
			return $prepared_post;
		}

		$post_id = 0;

		if ( ! empty( $prepared_post->ID ) ) {
			$post_id = (int) $prepared_post->ID;
		} elseif ( $request instanceof WP_REST_Request && $request->get_param( 'id' ) ) {
			$post_id = (int) $request->get_param( 'id' );
		}

		$existing_signatures = self::get_existing_content_signatures( $post_id );

		// Validate the content.
		$result = self::validate_content_with_existing_signatures( $content, $existing_signatures );

		if ( is_wp_error( $result ) ) {
			// Return the error - Gutenberg will display it in the editor.
			return $result;
		}

		return $prepared_post;
	}

	/**
	 * Register REST API validation hooks for all public post types.
	 *
	 * This ensures validation runs for posts, pages, and custom post types that support the block editor.
	 *
	 * @since 2.2.0
	 * @return void
	 */
	public function register_rest_validation_for_post_types() {
		$post_types = get_post_types(
			array(
				'show_in_rest' => true,
			),
			'names'
		);

		foreach ( $post_types as $post_type ) {
			add_filter( "rest_pre_insert_{$post_type}", [ $this, 'validate_content_rest' ], 10, 2 );
		}
	}

	/**
	 * Intercept Gutenberg autosave REST requests and validate their content.
	 *
	 * Autosaves use the /wp/v2/{post-type}/{id}/autosaves endpoint, which bypasses
	 * the regular rest_pre_insert_{post_type} filters. Hooking rest_pre_dispatch allows
	 * us to run the same validation logic and return a proper WP_Error response so
	 * the editor surfaces the issue immediately.
	 *
	 * @since 2.2.0
	 *
	 * @param mixed           $response Response to replace the requested version with. Default false.
	 * @param WP_REST_Server  $server   Server instance.
	 * @param WP_REST_Request $request  Request used to generate the response.
	 * @return mixed Either the original response or a WP_Error to halt dispatch.
	 */
	public function validate_autosave_rest_request( $response, $server, $request ) {
		if ( $response ) {
			return $response;
		}

		if ( 'POST' !== $request->get_method() ) {
			return $response;
		}

		if ( current_user_can( 'manage_options' ) ) {
			return $response;
		}

		$route = $request->get_route();

		// Only run on wp/v2 autosave endpoints.
		if ( ! is_string( $route ) || ! preg_match( '#^/wp/v2/([a-z0-9_-]+)/(\d+)/autosaves/?$#', $route, $route_matches ) ) {
			return $response;
		}

		$content_param = $request->get_param( 'content' );
		$content       = '';

		if ( is_array( $content_param ) ) {
			$content = isset( $content_param['raw'] ) ? (string) $content_param['raw'] : '';
		} elseif ( is_string( $content_param ) ) {
			$content = $content_param;
		}

		if ( '' === $content ) {
			return $response;
		}

		if ( ! self::should_validate_content( $content ) ) {
			return $response;
		}

		$post_id = (int) ( $route_matches[2] ?? 0 );
		$existing_signatures = self::get_existing_content_signatures( $post_id );

		$result = self::validate_content_with_existing_signatures( $content, $existing_signatures );

		if ( is_wp_error( $result ) ) {
			if ( ! $result->get_error_data() ) {
				$result->add_data( array( 'status' => rest_authorization_required_code() ) );
			}

			return $result;
		}

		return $response;
	}

	/**
	 * Normalize serialized block content so validation sees unslashed values.
	 *
	 * @since 2.2.0
	 *
	 * @param mixed $content Possibly slashed content string.
	 * @return string Normalized content string.
	 */
	public static function normalize_serialized_content( $content ) {
		if ( ! is_string( $content ) ) {
			return '';
		}

		$normalized = function_exists( 'wp_unslash' ) ? wp_unslash( $content ) : stripslashes( $content );

		return trim( (string) $normalized );
	}
}

GenerateBlocks_Dynamic_Tag_Security::get_instance()->init();
