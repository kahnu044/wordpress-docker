<?php

namespace EssentialBlocks\Integrations\AI;

/**
 * OpenAI API Integration for Essential Blocks
 *
 * This class handles the integration with OpenAI API for content generation
 */
class OpenAI
{
    /**
     * API Key for OpenAI
     *
     * @var string
     */
    private $api_key;

    /**
     * Maximum number of tokens to generate
     *
     * @var int
     */
    private $max_tokens = 1500;

    /**
     * API Endpoint for OpenAI Chat Completions
     *
     * @var string
     */
    private $api_endpoint = 'https://api.openai.com/v1/chat/completions';

    /**
     * API Endpoint for OpenAI Image Generation (DALL-E)
     *
     * @var string
     */
    private $image_api_endpoint = 'https://api.openai.com/v1/images/generations';

    /**
     * Model to use for OpenAI text generation
     * This will be set dynamically from settings
     *
     * @var string
     */
    private $model = 'gpt-4.1-nano';

    /**
     * Model to use for OpenAI image generation
     *
     * @var string
     */
    private $image_model = 'dall-e-3';

    /**
     * Default image size for DALL-E
     *
     * @var string
     */
    private $image_size = '1024x1024';

    /**
     * Default image quality for DALL-E
     *
     * @var string
     */
    private $image_quality = 'standard';

    /**
     * Constructor
     */
    public function __construct()
    {
        // Get API key from options
        $eb_write_with_ai = (array) get_option( 'eb_write_with_ai', [  ] );
        if ( ! empty( $eb_write_with_ai[ 'apiKey' ] ) ) {
            $this->set_api_key( $eb_write_with_ai[ 'apiKey' ] );
        }

        if ( isset( $eb_write_with_ai[ 'maxTokens' ] ) && intval( $eb_write_with_ai[ 'maxTokens' ] ) > 0 ) {
            $this->max_tokens = intval( $eb_write_with_ai[ 'maxTokens' ] );
        }

        // Set content generation model from settings
        if ( isset( $eb_write_with_ai[ 'contentModel' ] ) && ! empty( $eb_write_with_ai[ 'contentModel' ] ) ) {
            $this->set_content_model( $eb_write_with_ai[ 'contentModel' ] );
        }
    }

    /**
     * Set API Key
     *
     * @param string $api_key
     * @return void
     */
    public function set_api_key( $api_key )
    {
        $this->api_key = $api_key;
    }

    /**
     * Set Max Tokens
     *
     * @param int $max_tokens
     * @return void
     */
    public function set_max_tokens( $max_tokens )
    {
        $this->max_tokens = intval( $max_tokens );
    }

    /**
     * Set Content Generation Model
     *
     * @param string $model
     * @return void
     */
    public function set_content_model( $model )
    {
        // Validate the model against supported models
        $valid_models = [ 'gpt-4.1-nano', 'gpt-4o', 'gpt-4-turbo', 'gpt-4o-mini', 'gpt-3.5-turbo' ];
        if ( in_array( $model, $valid_models ) ) {
            $this->model = $model;
        } else {
            // Fallback to default if invalid model is provided
            $this->model = 'gpt-4.1-nano';
        }
    }

    /**
     * Validate API Key
     *
     * Makes a simple request to the OpenAI API to validate the API key
     *
     * @param string $api_key The API key to validate
     * @return array Response with status and message
     */
    public function validate_api_key( $api_key )
    {
        if ( empty( $api_key ) ) {
            return [
                'success' => false,
                'message' => __( 'API key is required.', 'essential-blocks' )
             ];
        }

        // Make a simple request to the OpenAI API to validate the key
        $response = wp_remote_post(
            'https://api.openai.com/v1/chat/completions',
            [
                'headers' => [
                    'Content-Type'  => 'application/json',
                    'Authorization' => 'Bearer ' . $api_key
                 ],
                'body'    => wp_json_encode( [
                    'model'      => $this->model,
                    'messages'   => [
                        [
                            'role'    => 'user',
                            'content' => 'Hello'
                         ]
                     ],
                    'max_tokens' => 5
                 ] ),
                'timeout' => 15
             ]
        );

        // Check for errors
        if ( is_wp_error( $response ) ) {
            return [
                'success' => false,
                'message' => $response->get_error_message()
             ];
        }

        // Parse the response
        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
        $response_code = wp_remote_retrieve_response_code( $response );

        // Check if the response is valid
        if ( $response_code !== 200 ) {
            $error_message = isset( $response_body[ 'error' ][ 'message' ] )
            ? $response_body[ 'error' ][ 'message' ]
            : __( 'Invalid API key or API error.', 'essential-blocks' );

            return [
                'success' => false,
                'message' => $error_message
             ];
        }

        return [
            'success' => true,
            'message' => __( 'API key is valid.', 'essential-blocks' )
         ];
    }

    /**
     * Generate content using OpenAI API
     *
     * @param string $prompt The complete prompt for content generation
     * @return array Response with status and content
     */
    public function generate_content( $prompt, $writePageContent = 'writePageContent' )
    {
        // Get AI settings
        $eb_write_with_ai = (array) get_option( 'eb_write_with_ai', [  ] );

        // Check if AI is enabled
        $is_ai_enabled_for_page_content = isset( $eb_write_with_ai[ 'writePageContent' ] ) ? $eb_write_with_ai[ 'writePageContent' ] : true;
        $is_ai_enabled_for_richtext     = isset( $eb_write_with_ai[ 'writeRichtext' ] ) ? $eb_write_with_ai[ 'writeRichtext' ] : true;
        $is_ai_enabled_for_input_fields = isset( $eb_write_with_ai[ 'writeInputFields' ] ) ? $eb_write_with_ai[ 'writeInputFields' ] : true;
        if ( $writePageContent === 'writePageContent' && ! $is_ai_enabled_for_page_content ) {
            return [
                'success' => false,
                'message' => __( 'AI page content generation is disabled. Please enable it in the settings.', 'essential-blocks' )
             ];
        } elseif ( $writePageContent === 'writeRichtext' && ! $is_ai_enabled_for_richtext ) {
            return [
                'success' => false,
                'message' => __( 'AI richtext content generation is disabled. Please enable it in the settings.', 'essential-blocks' )
             ];
        } elseif ( $writePageContent === 'writeInputFields' && ! $is_ai_enabled_for_input_fields ) {
            return [
                'success' => false,
                'message' => __( 'AI input fieldcontent generation is disabled. Please enable it in the settings.', 'essential-blocks' )
             ];
        }

        // Check if API key is set
        if ( empty( $this->api_key ) ) {
            return [
                'success' => false,
                'message' => __( 'OpenAI API key is not set. Please set it in the settings.', 'essential-blocks' )
             ];
        }

        // Prepare the request body
        $body = [
            'model'       => $this->model,
            'messages'    => [
                [
                    'role'    => 'user',
                    'content' => $prompt
                 ]
             ],
            'temperature' => 0.7,
            'max_tokens'  => $this->max_tokens
         ];

        // Make the API request
        $response = wp_remote_post(
            $this->api_endpoint,
            [
                'headers'     => [
                    'Content-Type'  => 'application/json',
                    'Authorization' => 'Bearer ' . $this->api_key
                 ],
                'body'        => wp_json_encode( $body ),
                'timeout'     => 60,
                'data_format' => 'body'
             ]
        );

        // Check for errors
        if ( is_wp_error( $response ) ) {
            return [
                'success' => false,
                'message' => $response->get_error_message()
             ];
        }

        // Parse the response
        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
        $response_code = wp_remote_retrieve_response_code( $response );

        // Check if the response is valid
        if ( $response_code !== 200 || ! isset( $response_body[ 'choices' ][ 0 ][ 'message' ][ 'content' ] ) ) {
            $error_message = isset( $response_body[ 'error' ][ 'message' ] )
            ? $response_body[ 'error' ][ 'message' ]
            : __( 'Unknown error occurred while generating content.', 'essential-blocks' );

            return [
                'success'  => false,
                'message'  => $error_message,
                'response' => $response_body
             ];
        }

        // Return the generated content
        return [
            'success' => true,
            'content' => $response_body[ 'choices' ][ 0 ][ 'message' ][ 'content' ],
            'usage'   => isset( $response_body[ 'usage' ] ) ? $response_body[ 'usage' ] : null
         ];
    }

    /**
     * Convert string compression values to numeric values
     *
     * @param string $compression The compression level (high, medium, low, or numeric value)
     * @return int The numeric compression value
     */
    private function convert_compression_to_numeric( $compression )
    {
        // If it's already numeric, return as integer
        if ( is_numeric( $compression ) ) {
            return intval( $compression );
        }

        // Convert string values to numeric
        switch ( strtolower( trim( $compression ) ) ) {
            case 'high':
                return 100;
            case 'medium':
                return 75;
            case 'low':
                return 50;
            case 'standard':
            default:
                return 100; // Default to high quality
        }
    }

    /**
     * Generate image using OpenAI DALL-E API
     *
     * @param string $prompt The prompt for image generation
     * @param string $model The model to use (dall-e-2, dall-e-3, gpt-image-1)
     * @param string $size Image size (varies by model)
     * @param string $quality Image quality (standard, hd)
     * @param string $style Image style (vivid, natural) - DALL-E 3 only
     * @param string $writePageContent Context for AI settings check
     * @param string $background Background handling option
     * @param string $output_format Image output format (png, jpeg, webp)
     * @param string $output_compression Compression level for the output
     * @param int $image_count Number of images to generate
     * @param string $reference_image_url Reference image URL for editing mode
     * @param string $editing_mode Whether editing mode is enabled ('true' or 'false')
     * @param string $edit_type Type of edit operation ('edit' or 'variation')
     * @return array Response with status and image URL/base64
     */
    public function generate_image( $prompt, $model = 'gpt-image-1', $size = '1024x1024', $quality = 'standard', $style = 'vivid', $writePageContent = 'writePageContent', $background = '', $output_format = 'png', $output_compression = 'standard', $image_count = 2, $reference_image_url = '', $editing_mode = 'false', $edit_type = 'edit' )
    {
        // Get AI settings
        $eb_write_with_ai = (array) get_option( 'eb_write_with_ai', [  ] );

        // Check if AI is enabled for image generation
        $is_ai_enabled_for_image = isset( $eb_write_with_ai[ 'generateImage' ] ) ? $eb_write_with_ai[ 'generateImage' ] : true;

        if ( ! $is_ai_enabled_for_image ) {
            return [
                'success' => false,
                'message' => __( 'AI Image generation is disabled. Please enable it in the settings.', 'essential-blocks' )
             ];
        }

        // Check if API key is set
        if ( empty( $this->api_key ) ) {
            return [
                'success' => false,
                'message' => __( 'OpenAI API key is not set. Please set it in the settings.', 'essential-blocks' )
             ];
        }

        // Validate prompt
        if ( empty( $prompt ) || ! is_string( $prompt ) ) {
            return [
                'success' => false,
                'message' => __( 'Image prompt is required and must be a valid string.', 'essential-blocks' )
             ];
        }

        // Validate and sanitize prompt length (DALL-E has a 1000 character limit)
        if ( strlen( $prompt ) > 1000 ) {
            return [
                'success' => false,
                'message' => __( 'Image prompt must be 1000 characters or less.', 'essential-blocks' )
             ];
        }

        // Implement intelligent model selection based on parameters
        // $model = $this->determine_optimal_model( $model, $size, $quality, $style, $background, $output_format, $output_compression );

        // Validate model
        $valid_models = [ 'dall-e-2', 'dall-e-3', 'gpt-image-1' ];
        if ( ! in_array( $model, $valid_models ) ) {
            $model = $this->image_model; // fallback to default
        }

        // Validate image size based on model
        if ( $model === 'dall-e-2' ) {
            $valid_sizes = [ '256x256', '512x512', '1024x1024' ];
        } else { // dall-e-3
            $valid_sizes = [ '1024x1024', '1792x1024', '1024x1792' ];
        }

        if ( ! in_array( $size, $valid_sizes ) ) {
            $size = $model === 'dall-e-2' ? '1024x1024' : '1024x1024'; // fallback to default
        }

        // Filter and validate parameters based on selected model
        $filtered_params = $this->filter_parameters_by_model( $model, $size, $quality, $style, $background, $output_format, $output_compression );

        // Extract filtered parameters
        $size               = $filtered_params[ 'size' ];
        $quality            = $filtered_params[ 'quality' ];
        $style              = $filtered_params[ 'style' ];
        $background         = $filtered_params[ 'background' ];
        $output_format      = $filtered_params[ 'output_format' ];
        $output_compression = $filtered_params[ 'output_compression' ];

        // Convert output_compression from string to numeric if needed
        $output_compression = $this->convert_compression_to_numeric( $output_compression );

        // Validate and set image count based on model capabilities
        $validated_image_count = $image_count;
        if ( $model === 'dall-e-3' && $image_count > 1 ) {
            $validated_image_count = 1; // DALL-E 3 only supports 1 image per request
        } elseif ( $image_count < 1 || $image_count > 10 ) {
            $validated_image_count = 2; // Default fallback
        }

        // Prepare the request body with filtered parameters
        $body = [
            'model'           => $model,
            'prompt'          => $prompt,
            'n'               => $validated_image_count, // number of images to generate
            'size'            => $size,
            'response_format' => 'b64_json' // url or b64_json
         ];

        // Add model-specific parameters based on capabilities
        switch ( $model ) {
            case 'dall-e-2':
                // DALL-E 2 only supports basic parameters
                break;

            case 'dall-e-3':
                // DALL-E 3 supports quality and style
                if ( ! empty( $quality ) && $quality !== 'standard' ) {
                    $body[ 'quality' ] = $quality;
                }
                if ( ! empty( $style ) && $style !== 'none' ) {
                    $body[ 'style' ] = $style;
                }
                // Note: 'n' is already set above with validated count (always 1 for dall-e-3)
                break;

            case 'gpt-image-1':
                // GPT-Image-1 supports additional parameters
                if ( ! empty( $background ) && $background !== 'auto' ) {
                    $body[ 'background' ] = $background;
                }
                if ( ! empty( $output_format ) && $output_format !== 'png' ) {
                    $body[ 'output_format' ] = $output_format;
                }
                if ( ! empty( $output_compression ) ) {
                    $body[ 'output_compression' ] = $output_compression;
                }
                if ( ! empty( $quality ) && $quality !== 'medium' ) {
                    $body[ 'quality' ] = $quality;
                }
                unset( $body[ 'response_format' ] );
                break;
        }
        // error_log( 'GPT Model: ' . $model );
        // error_log( 'GPT Body: ' . print_r( $body, true ) );

        // Handle editing mode with specialized OpenAI endpoints
        if ( ! empty( $reference_image_url ) && $editing_mode === 'true' ) {
            return $this->handle_image_editing( $reference_image_url, $prompt, $edit_type, $validated_image_count, $size );
        }

        // Make the API request
        $response = wp_remote_post(
            $this->image_api_endpoint,
            [
                'headers'     => [
                    'Content-Type'  => 'application/json',
                    'Authorization' => 'Bearer ' . $this->api_key
                 ],
                'body'        => wp_json_encode( $body ),
                'timeout'     => 180,
                'data_format' => 'body'
             ]
        );

        // error_log( 'Response-----' . print_r( $response, true ) );

        // Check for errors
        if ( is_wp_error( $response ) ) {
            return [
                'success' => false,
                'message' => $response->get_error_message()
             ];
        }

        // Parse the response
        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
        $response_code = wp_remote_retrieve_response_code( $response );

        // Check if the response is valid - handle both 'url' and 'b64_json' formats
        if ( $response_code !== 200 || ! isset( $response_body[ 'data' ][ 0 ] ) ) {
            $error_message = isset( $response_body[ 'error' ][ 'message' ] )
            ? $response_body[ 'error' ][ 'message' ]
            : __( 'Unknown error occurred while generating image.', 'essential-blocks' );

            return [
                'success'  => false,
                'message'  => $error_message,
                'response' => $response_body
             ];
        }

        // Check if first image has either url or b64_json
        $first_image = $response_body[ 'data' ][ 0 ];
        if ( ! isset( $first_image[ 'url' ] ) && ! isset( $first_image[ 'b64_json' ] ) ) {
            return [
                'success'  => false,
                'message'  => __( 'Invalid image data received from OpenAI API.', 'essential-blocks' ),
                'response' => $response_body
             ];
        }

        // Process all generated images
        $images = [  ];
        foreach ( $response_body[ 'data' ] as $index => $image_data ) {
            // Handle both URL and base64 formats
            $image_url = null;
            $image_b64 = null;

            if ( isset( $image_data[ 'url' ] ) ) {
                $image_url = $image_data[ 'url' ];
            } elseif ( isset( $image_data[ 'b64_json' ] ) ) {
                $image_b64 = $image_data[ 'b64_json' ];
            }

            $revised_prompt = isset( $image_data[ 'revised_prompt' ] ) ? $image_data[ 'revised_prompt' ] : $prompt;

            // Generate metadata for each image
            $metadata = $this->generate_image_metadata( $revised_prompt, $prompt );

            $images[  ] = [
                'image_url'      => $image_url,
                'image_b64'      => $image_b64,
                'revised_prompt' => $revised_prompt,
                'title'          => $metadata[ 'title' ],
                'alt_tag'        => $metadata[ 'alt_tag' ],
                'caption'        => $metadata[ 'caption' ],
                'description'    => $metadata[ 'description' ]
             ];
        }

        // Images processed successfully

        // Extract usage information from the API response
        $usage_info = $this->extract_image_usage_info( $response_body, $model, $validated_image_count );
        // error_log( 'Usage Info: ' . print_r( $usage_info, true ) );

        // Return all generated images with usage information
        return [
            'success' => true,
            'images'  => $images,
            'usage'   => $usage_info
         ];
    }

    /**
     * Extract usage information from OpenAI image generation API response
     *
     * @param array $response_body The API response body
     * @param string $model The model used for generation
     * @param int $image_count The number of images generated
     * @return array Usage information with formatted message
     */
    private function extract_image_usage_info( $response_body, $model, $image_count )
    {
        // Check if usage information is available in the response
        if ( isset( $response_body[ 'usage' ] ) ) {
            $usage = $response_body[ 'usage' ];

            // Extract token information
            $input_tokens  = isset( $usage[ 'input_tokens' ] ) ? intval( $usage[ 'input_tokens' ] ) : 0;
            $output_tokens = isset( $usage[ 'output_tokens' ] ) ? intval( $usage[ 'output_tokens' ] ) : 0;
            $total_tokens  = isset( $usage[ 'total_tokens' ] ) ? intval( $usage[ 'total_tokens' ] ) : ( $input_tokens + $output_tokens );

            // Create user-friendly usage message
            $usage_message = sprintf(
                __( 'Using %s model, you consumed %d input tokens and %d output tokens for generating %d image(s).', 'essential-blocks' ),
                strtoupper( $model ),
                $input_tokens,
                $output_tokens,
                $image_count
            );

            return [
                'input_tokens'  => $input_tokens,
                'output_tokens' => $output_tokens,
                'total_tokens'  => $total_tokens,
                'message'       => $usage_message,
                'raw_usage'     => $usage
             ];
        }

        // Fallback when usage information is not available
        $fallback_message = sprintf(
            __( 'Successfully generated %d image(s) using %s model. Token usage information not available.', 'essential-blocks' ),
            $image_count,
            strtoupper( $model )
        );

        return [
            'input_tokens'  => null,
            'output_tokens' => null,
            'total_tokens'  => null,
            'message'       => $fallback_message,
            'raw_usage'     => null
         ];
    }

    /**
     * Determine optimal model based on parameters
     *
     * @param string $requested_model The originally requested model
     * @param string $size Image size
     * @param string $quality Image quality
     * @param string $style Image style
     * @param string $background Background setting
     * @param string $output_format Output format
     * @param string $output_compression Output compression
     * @return string The optimal model to use
     */
    private function determine_optimal_model( $requested_model, $size, $quality, $style, $background, $output_format, $output_compression )
    {
        // Priority 1: If background is not 'auto', must use gpt-image-1
        if ( ! empty( $background ) && $background !== 'auto' ) {
            return 'gpt-image-1';
        }

        // Priority 2: If output_format or output_compression is not default, must use gpt-image-1
        if ( ( ! empty( $output_format ) && $output_format !== 'png' ) ||
            ( ! empty( $output_compression ) && $output_compression !== 'standard' ) ) {
            return 'gpt-image-1';
        }

        // Priority 3: If style is 'vivid' or 'natural', must use dall-e-3
        if ( ! empty( $style ) && ( $style === 'vivid' || $style === 'natural' ) ) {
            return 'dall-e-3';
        }

        // Priority 4: Size-based selection
        $dalle_e2_sizes   = [ '256x256', '512x512' ];
        $dalle_e3_sizes   = [ '1792x1024', '1024x1792' ];
        $gpt_image1_sizes = [ '1536x1024', '1024x1536', 'auto' ];

        if ( in_array( $size, $dalle_e2_sizes ) ) {
            return 'dall-e-2';
        }

        if ( in_array( $size, $dalle_e3_sizes ) ) {
            return 'dall-e-3';
        }

        if ( in_array( $size, $gpt_image1_sizes ) ) {
            return 'gpt-image-1';
        }

        // For 1024x1024 or other sizes, default to gpt-image-1 unless style forces dall-e-3
        return 'gpt-image-1';
    }

    /**
     * Filter parameters based on model capabilities
     *
     * @param string $model The selected model
     * @param string $size Image size
     * @param string $quality Image quality
     * @param string $style Image style
     * @param string $background Background setting
     * @param string $output_format Output format
     * @param string $output_compression Output compression
     * @return array Filtered parameters
     */
    private function filter_parameters_by_model( $model, $size, $quality, $style, $background, $output_format, $output_compression )
    {
        $filtered = [
            'size'               => $size,
            'quality'            => $quality,
            'style'              => $style,
            'background'         => $background,
            'output_format'      => $output_format,
            'output_compression' => $output_compression
         ];

        switch ( $model ) {
            case 'dall-e-2':
                // DALL-E 2: Only supports size and prompt
                $filtered[ 'quality' ]            = 'standard'; // Reset to default
                $filtered[ 'style' ]              = 'none'; // Reset to none
                $filtered[ 'background' ]         = 'auto'; // Reset to auto
                $filtered[ 'output_format' ]      = 'png'; // Reset to default
                $filtered[ 'output_compression' ] = 'standard'; // Reset to default

                // Validate size for DALL-E 2
                $valid_sizes = [ '256x256', '512x512', '1024x1024' ];
                if ( ! in_array( $size, $valid_sizes ) ) {
                    $filtered[ 'size' ] = '1024x1024'; // Default fallback
                }
                break;

            case 'dall-e-3':
                // DALL-E 3: Supports quality, style, size, prompt
                $filtered[ 'background' ]         = 'auto'; // Reset to auto
                $filtered[ 'output_format' ]      = 'png'; // Reset to default
                $filtered[ 'output_compression' ] = 'standard'; // Reset to default

                // Validate quality for DALL-E 3
                $valid_qualities = [ 'standard', 'hd' ];
                if ( ! in_array( $quality, $valid_qualities ) ) {
                    $filtered[ 'quality' ] = 'standard';
                }

                // Validate style for DALL-E 3
                $valid_styles = [ 'vivid', 'natural' ];
                if ( ! in_array( $style, $valid_styles ) ) {
                    $filtered[ 'style' ] = 'vivid'; // Default for DALL-E 3
                }

                // Validate size for DALL-E 3
                $valid_sizes = [ '1024x1024', '1792x1024', '1024x1792' ];
                if ( ! in_array( $size, $valid_sizes ) ) {
                    $filtered[ 'size' ] = '1024x1024'; // Default fallback
                }
                break;

            case 'gpt-image-1':
                // GPT-Image-1: Supports all parameters

                // Validate quality for GPT-Image-1
                $valid_qualities = [ 'high', 'medium', 'low' ];
                if ( ! in_array( $quality, $valid_qualities ) ) {
                    $filtered[ 'quality' ] = 'medium'; // Default for GPT-Image-1
                }

                // Validate background
                $valid_backgrounds = [ 'auto', 'transparent', 'opaque' ];
                if ( ! in_array( $background, $valid_backgrounds ) ) {
                    $filtered[ 'background' ] = 'auto';
                }

                // Validate output format
                $valid_formats = [ 'png', 'jpeg', 'webp' ];
                if ( ! in_array( $output_format, $valid_formats ) ) {
                    $filtered[ 'output_format' ] = 'png';
                }

                // Validate output compression
                $valid_compressions = [ 'standard', 'high', 'low', 'medium' ];
                if ( ! in_array( $output_compression, $valid_compressions ) ) {
                    $filtered[ 'output_compression' ] = 'standard';
                }
                // Validate output compression for PNG
                else if ( $filtered[ 'output_format' ] === 'png' ) {
                    $filtered[ 'output_compression' ] = 'standard';
                }

                // Validate size for GPT-Image-1
                $valid_sizes = [ '1024x1024', '1536x1024', '1024x1536', 'auto' ];
                if ( ! in_array( $size, $valid_sizes ) ) {
                    $filtered[ 'size' ] = 'auto'; // Default fallback
                }

                // Reset style to none for GPT-Image-1
                $filtered[ 'style' ] = 'none';
                break;
        }

        return $filtered;
    }

    /**
     * Generate metadata for an image based on its prompt
     *
     * @param string $revised_prompt The revised prompt from DALL-E
     * @param string $original_prompt The original user prompt
     * @return array Array containing title, alt_tag, caption, and description
     */
    private function generate_image_metadata( $revised_prompt, $original_prompt )
    {
        // If API key is not available, return default metadata
        if ( empty( $this->api_key ) ) {
            return $this->get_default_image_metadata( $original_prompt );
        }

        // Create a prompt for generating metadata
        $metadata_prompt = "Based on this image description: \"{$revised_prompt}\"\n\n" .
            "Generate appropriate metadata for this image in the following JSON format:\n" .
            "{\n" .
            "  \"title\": \"A concise, descriptive title (max 60 characters)\",\n" .
            "  \"alt_tag\": \"Descriptive alt text for accessibility (max 125 characters)\",\n" .
            "  \"caption\": \"A brief caption describing the image (max 200 characters)\",\n" .
            "  \"description\": \"A detailed description of the image (max 300 characters)\"\n" .
            "}\n\n" .
            "Make sure the JSON is valid and all fields are filled. Focus on being descriptive but concise.";

        // Prepare the request body for metadata generation
        $body = [
            'model'       => $this->model,
            'messages'    => [
                [
                    'role'    => 'system',
                    'content' => 'You are an expert at creating image metadata. Always respond with valid JSON only, no additional text.'
                 ],
                [
                    'role'    => 'user',
                    'content' => $metadata_prompt
                 ]
             ],
            'temperature' => 0.3, // Lower temperature for more consistent output
            'max_tokens'  => 300
         ];

        // Make the API request for metadata
        $response = wp_remote_post(
            $this->api_endpoint,
            [
                'headers'     => [
                    'Content-Type'  => 'application/json',
                    'Authorization' => 'Bearer ' . $this->api_key
                 ],
                'body'        => wp_json_encode( $body ),
                'timeout'     => 30,
                'data_format' => 'body'
             ]
        );

        // Check for errors or invalid response
        if ( is_wp_error( $response ) ) {
            return $this->get_default_image_metadata( $original_prompt );
        }

        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
        $response_code = wp_remote_retrieve_response_code( $response );

        if ( $response_code !== 200 || ! isset( $response_body[ 'choices' ][ 0 ][ 'message' ][ 'content' ] ) ) {
            return $this->get_default_image_metadata( $original_prompt );
        }

        // Parse the JSON response
        $metadata_json = $response_body[ 'choices' ][ 0 ][ 'message' ][ 'content' ];
        $metadata      = json_decode( $metadata_json, true );

        // Validate the metadata structure
        if ( ! is_array( $metadata ) ||
            ! isset( $metadata[ 'title' ] ) ||
            ! isset( $metadata[ 'alt_tag' ] ) ||
            ! isset( $metadata[ 'caption' ] ) ||
            ! isset( $metadata[ 'description' ] ) ) {
            return $this->get_default_image_metadata( $original_prompt );
        }

        // Sanitize and truncate the metadata fields
        return [
            'title'       => sanitize_text_field( substr( $metadata[ 'title' ], 0, 60 ) ),
            'alt_tag'     => sanitize_text_field( substr( $metadata[ 'alt_tag' ], 0, 125 ) ),
            'caption'     => sanitize_text_field( substr( $metadata[ 'caption' ], 0, 200 ) ),
            'description' => sanitize_text_field( substr( $metadata[ 'description' ], 0, 300 ) )
         ];
    }

    /**
     * Get default image metadata when AI generation fails
     *
     * @param string $prompt The original prompt
     * @return array Default metadata array
     */
    private function get_default_image_metadata( $prompt )
    {
        // Create basic metadata from the prompt
        $clean_prompt = sanitize_text_field( $prompt );
        $title        = substr( $clean_prompt, 0, 60 );

        return [
            'title'       => $title ?: __( 'AI Generated Image', 'essential-blocks' ),
            'alt_tag'     => substr( $clean_prompt, 0, 125 ) ?: __( 'AI generated image', 'essential-blocks' ),
            'caption'     => substr( $clean_prompt, 0, 200 ) ?: __( 'Image generated using AI', 'essential-blocks' ),
            'description' => substr( $clean_prompt, 0, 300 ) ?: __( 'This image was generated using artificial intelligence based on a text prompt.', 'essential-blocks' )
         ];
    }

    /**
     * Convert image URL to base64 data URL with RGBA format for OpenAI compatibility
     *
     * @param string $image_url The image URL to convert
     * @return string|false Base64 data URL or false on failure
     */
    private function convert_image_to_base64( $image_url )
    {
        if ( empty( $image_url ) ) {
            return false;
        }

        // Step 1: Try direct file access for local images
        $image_data  = $this->get_local_image_data( $image_url );
        $method_used = 'direct_file_access';

        // Step 2: Fallback to HTTP request if direct access failed
        if ( $image_data === false ) {
            $image_data  = $this->get_remote_image_data( $image_url );
            $method_used = 'http_request';
        }

        if ( $image_data === false ) {
            return false;
        }

        // Convert image to RGBA format for OpenAI compatibility
        $rgba_image_data = $this->convert_image_to_rgba( $image_data );
        if ( $rgba_image_data === false ) {
            return false;
        }

        // Encode to base64
        $base64_data = base64_encode( $rgba_image_data );
        if ( $base64_data === false ) {
            return false;
        }

        // Return as PNG data URL (PNG supports alpha channel)
        return 'data:image/png;base64,' . $base64_data;
    }

    /**
     * Convert image data to RGBA format for OpenAI compatibility
     *
     * @param string $image_data Binary image data
     * @return string|false RGBA image data as PNG or false on failure
     */
    private function convert_image_to_rgba( $image_data )
    {
        // Check if GD extension is available
        if ( ! extension_loaded( 'gd' ) ) {
            return false;
        }

        // Create image resource from string
        $image = imagecreatefromstring( $image_data );
        if ( $image === false ) {
            return false;
        }

        // Get image dimensions
        $width  = imagesx( $image );
        $height = imagesy( $image );

        if ( $width === false || $height === false ) {
            imagedestroy( $image );
            return false;
        }

        // Create a new true color image with alpha channel
        $rgba_image = imagecreatetruecolor( $width, $height );
        if ( $rgba_image === false ) {
            imagedestroy( $image );
            return false;
        }

        // Enable alpha blending and save alpha channel
        imagealphablending( $rgba_image, false );
        imagesavealpha( $rgba_image, true );

        // Fill with transparent background
        $transparent = imagecolorallocatealpha( $rgba_image, 0, 0, 0, 127 );
        if ( $transparent === false ) {
            imagedestroy( $image );
            imagedestroy( $rgba_image );
            return false;
        }

        imagefill( $rgba_image, 0, 0, $transparent );

        // Enable alpha blending for copying
        imagealphablending( $rgba_image, true );

        // Copy the original image to the RGBA image
        if ( ! imagecopy( $rgba_image, $image, 0, 0, 0, 0, $width, $height ) ) {
            imagedestroy( $image );
            imagedestroy( $rgba_image );
            return false;
        }

        // Clean up original image
        imagedestroy( $image );

        // Capture PNG output
        ob_start();
        $png_success = imagepng( $rgba_image );
        $png_data    = ob_get_contents();
        ob_end_clean();

        // Clean up RGBA image
        imagedestroy( $rgba_image );

        if ( ! $png_success || empty( $png_data ) ) {
            return false;
        }

        return $png_data;
    }

    /**
     * Attempt to get image data via direct file access for local images
     *
     * @param string $image_url The image URL to process
     * @return string|false Image data or false on failure
     */
    private function get_local_image_data( $image_url )
    {
        // Parse the URL
        $parsed_url = wp_parse_url( $image_url );
        if ( ! $parsed_url || ! isset( $parsed_url[ 'path' ] ) ) {
            return false;
        }

        // Check if this is likely a local URL
        if ( isset( $parsed_url[ 'host' ] ) ) {
            $host     = $parsed_url[ 'host' ];
            $is_local = in_array( $host, [ 'localhost', '127.0.0.1', '::1' ] ) ||
            filter_var( $host, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE ) === false;

            if ( ! $is_local ) {
                return false; // Not a local URL, skip direct file access
            }
        }

        // Convert URL path to file system path
        $file_path = $this->url_to_file_path( $image_url );
        if ( $file_path === false ) {
            return false;
        }

        // Check if file exists and is readable
        if ( ! file_exists( $file_path ) || ! is_readable( $file_path ) ) {
            return false;
        }

        // Verify it's an image file by checking MIME type
        $finfo = finfo_open( FILEINFO_MIME_TYPE );
        if ( $finfo ) {
            $mime_type = finfo_file( $finfo, $file_path );
            finfo_close( $finfo );

            if ( ! $mime_type || strpos( $mime_type, 'image/' ) !== 0 ) {
                return false; // Not an image file
            }
        }

        // Read the file contents
        $image_data = file_get_contents( $file_path );
        if ( $image_data === false ) {
            return false;
        }

        return $image_data;
    }

    /**
     * Convert URL to file system path
     *
     * @param string $image_url The image URL
     * @return string|false File system path or false on failure
     */
    private function url_to_file_path( $image_url )
    {
        // Get WordPress paths
        $wp_upload_dir = wp_upload_dir();
        $upload_url    = $wp_upload_dir[ 'baseurl' ];
        $upload_path   = $wp_upload_dir[ 'basedir' ];

        $content_url  = content_url();
        $content_path = WP_CONTENT_DIR;

        $site_url = site_url();
        $abspath  = ABSPATH;

        // Try to match against common WordPress URL patterns
        if ( strpos( $image_url, $upload_url ) === 0 ) {
            // Image is in uploads directory
            $relative_path = str_replace( $upload_url, '', $image_url );
            return $upload_path . $relative_path;
        } elseif ( strpos( $image_url, $content_url ) === 0 ) {
            // Image is in wp-content directory
            $relative_path = str_replace( $content_url, '', $image_url );
            return $content_path . $relative_path;
        } elseif ( strpos( $image_url, $site_url ) === 0 ) {
            // Image is somewhere in the WordPress installation
            $relative_path = str_replace( $site_url, '', $image_url );
            return $abspath . ltrim( $relative_path, '/' );
        }

        // Try to handle relative URLs or URLs without domain
        $parsed_url = wp_parse_url( $image_url );
        if ( isset( $parsed_url[ 'path' ] ) ) {
            $path = $parsed_url[ 'path' ];

            // Check if it's a path starting with /wp-content/
            if ( strpos( $path, '/wp-content/' ) === 0 ) {
                return $abspath . ltrim( $path, '/' );
            }

            // Check if it's a path that might be relative to uploads
            if ( strpos( $path, '/uploads/' ) !== false ) {
                $uploads_pos   = strpos( $path, '/uploads/' );
                $relative_path = substr( $path, $uploads_pos );
                return $upload_path . $relative_path;
            }
        }

        return false;
    }

    /**
     * Get image data via HTTP request (fallback method)
     *
     * @param string $image_url The image URL to download
     * @return string|false Image data or false on failure
     */
    private function get_remote_image_data( $image_url )
    {
        $response = wp_remote_get( $image_url, [
            'timeout'    => 30,
            'user-agent' => 'Essential Blocks Image Converter'
         ] );

        if ( is_wp_error( $response ) ) {
            return false;
        }

        $image_data = wp_remote_retrieve_body( $response );
        if ( empty( $image_data ) ) {
            return false;
        }

        return $image_data;
    }

    /**
     * Handle image editing using OpenAI's specialized endpoints
     *
     * @param string $reference_image_url The reference image URL
     * @param string $prompt The editing prompt (required for edits, ignored for variations)
     * @param string $edit_type Type of edit ('edit' or 'variation')
     * @param int $image_count Number of images to generate
     * @param string $size Image size
     * @return array Response with status and image data
     */
    private function handle_image_editing( $reference_image_url, $prompt, $edit_type, $image_count, $size )
    {
        // Process the reference image and get its dimensions
        $processed_image_data = $this->process_reference_image_with_dimensions( $reference_image_url );
        if ( $processed_image_data === false ) {
            return [
                'success' => false,
                'message' => __( 'Failed to process reference image for editing.', 'essential-blocks' )
             ];
        }

        $processed_image = $processed_image_data[ 'image_data' ];
        $image_width     = $processed_image_data[ 'width' ];
        $image_height    = $processed_image_data[ 'height' ];

        // Determine the optimal size based on reference image aspect ratio
        $optimal_size = $this->select_optimal_size_for_editing( $image_width, $image_height );

        // Log the size selection for debugging
        // error_log( sprintf(
        //     'Image editing size selection: Original dimensions %dx%d (ratio: %.2f), Selected size: %s',
        //     $image_width,
        //     $image_height,
        //     $image_width / $image_height,
        //     $optimal_size
        // ) );
        // wp_die();

        // Determine the appropriate endpoint
        // $endpoint = $edit_type === 'variation'
        // ? 'https://api.openai.com/v1/images/variations'
        // : 'https://api.openai.com/v1/images/edits';

        $endpoint = 'https://api.openai.com/v1/images/edits';

        // Prepare the multipart form data
        $boundary = wp_generate_uuid4();
        $model    = 'gpt-image-1';
        $body     = $this->build_multipart_body( $processed_image, $prompt, $edit_type, $image_count, $optimal_size, $boundary, $model );

        // $logged_body = preg_replace( '/[\x00-\x1F\x80-\xFF]/', '.', $body ); // replace binary with dots
        // error_log( 'Body-----' . print_r( $body, true ) );

        // Make the API request with multipart/form-data
        $dev = false;
        if ( $dev ) {
            $dummy_response_path = ESSENTIAL_BLOCKS_DIR_PATH . 'includes/Integrations/AI/image-edit-response.json';
            $json_data           = file_get_contents( $dummy_response_path );
            $response            = json_decode( $json_data, true ); // set true t
        } else {
            $response = wp_remote_post(
                $endpoint,
                [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $this->api_key,
                        'Content-Type'  => 'multipart/form-data; boundary=' . $boundary
                     ],
                    'body'    => $body,
                    'timeout' => 180
                 ]
            );
        }
        // error_log( 'Response-----' . print_r( $response, true ) );

        if ( is_wp_error( $response ) ) {
            return [
                'success' => false,
                'message' => $response->get_error_message()
             ];
        }

        // Parse the response
        $response_body_raw = wp_remote_retrieve_body( $response );
        $response_code     = wp_remote_retrieve_response_code( $response );

        // Handle both string and array response body
        if ( is_string( $response_body_raw ) ) {
            $response_body = json_decode( $response_body_raw, true );
            if ( json_last_error() !== JSON_ERROR_NONE ) {
                return [
                    'success' => false,
                    'message' => __( 'Invalid JSON response from OpenAI API.', 'essential-blocks' )
                 ];
            }
        } else {
            $response_body = $response_body_raw;
        }

        // Check if the response is valid
        if ( $response_code !== 200 || ! is_array( $response_body ) || ! isset( $response_body[ 'data' ] ) || ! is_array( $response_body[ 'data' ] ) || empty( $response_body[ 'data' ] ) ) {
            $error_message = ( is_array( $response_body ) && isset( $response_body[ 'error' ][ 'message' ] ) )
            ? $response_body[ 'error' ][ 'message' ]
            : __( 'Unknown error occurred during image editing.', 'essential-blocks' );

            return [
                'success'  => false,
                'message'  => $error_message,
                'response' => $response_body
             ];
        }
        $response_data = $response_body[ 'data' ];

        // Process the edited images
        $images = [  ];
        foreach ( $response_data as $image_data ) {
            $image_url = isset( $image_data[ 'url' ] ) ? $image_data[ 'url' ] : null;
            $image_b64 = isset( $image_data[ 'b64_json' ] ) ? $image_data[ 'b64_json' ] : null;

            // Generate metadata for the edited image
            $metadata = $this->generate_image_metadata( $prompt, $prompt );

            $images[  ] = [
                'image_url'      => $image_url,
                'image_b64'      => $image_b64,
                'revised_prompt' => $prompt,
                'title'          => $metadata[ 'title' ],
                'alt_tag'        => $metadata[ 'alt_tag' ],
                'caption'        => $metadata[ 'caption' ],
                'description'    => $metadata[ 'description' ]
             ];
        }

        // Extract usage information from the API response
        $usage_info = $this->extract_image_usage_info( $response_body, $model, count( $images ) );

        return [
            'success' => true,
            'images'  => $images,
            'usage'   => $usage_info
         ];
    }

    /**
     * Build multipart form data for image editing requests
     *
     * @param string $image_data Base64 image data
     * @param string $prompt The editing prompt
     * @param string $edit_type Type of edit ('edit' or 'variation')
     * @param int $image_count Number of images to generate
     * @param string $size Image size
     * @param string $boundary Multipart boundary
     * @param string $model The model to use for image generation
     * @return string Multipart form data
     */
    private function build_multipart_body( $image_data, $prompt, $edit_type, $image_count, $size, $boundary, $model )
    {
        $body = '';

        // Add image data
        if ( strpos( $image_data, 'data:' ) === 0 ) {
            // Extract base64 data from data URL
            $image_parts  = explode( ',', $image_data );
            $image_binary = base64_decode( $image_parts[ 1 ] );
            $mime_type    = explode( ';', explode( ':', $image_parts[ 0 ] )[ 1 ] )[ 0 ];
            $extension    = $this->get_extension_from_mime_type( $mime_type );
        } else {
            // Assume it's already binary data
            $image_binary = $image_data;
            $mime_type    = 'image/png'; // Default MIME type
            $extension    = 'png'; // Default extension
        }

        $body .= "--{$boundary}\r\n";
        $body .= "Content-Disposition: form-data; name=\"image\"; filename=\"image.{$extension}\"\r\n";
        $body .= "Content-Type: {$mime_type}\r\n\r\n";
        $body .= $image_binary . "\r\n";

        // Add prompt (only for edits, not variations)
        if ( ! empty( $prompt ) ) {
            // error_log( message: 'Inside prompt condition' . print_r( $prompt, return : true ) );
            $body .= "--{$boundary}\r\n";
            $body .= "Content-Disposition: form-data; name=\"prompt\"\r\n\r\n";
            $body .= $prompt . "\r\n";
        }

        // Add number of images
        $body .= "--{$boundary}\r\n";
        $body .= "Content-Disposition: form-data; name=\"n\"\r\n\r\n";
        $body .= $image_count . "\r\n";

        // Add size
        $body .= "--{$boundary}\r\n";
        $body .= "Content-Disposition: form-data; name=\"size\"\r\n\r\n";
        $body .= $size . "\r\n";

        // Add model
        $body .= "--{$boundary}\r\n";
        $body .= "Content-Disposition: form-data; name=\"model\"\r\n\r\n";
        $body .= $model . "\r\n";

        // if ( $edit_type === 'variation' ) {
        //     // Add response format
        //     $body .= "--{$boundary}\r\n";
        //     $body .= "Content-Disposition: form-data; name=\"response_format\"\r\n\r\n";
        //     $body .= "b64_json\r\n";
        // }

        $body .= "--{$boundary}--\r\n";

        return $body;
    }

    /**
     * Process reference image for editing mode
     *
     * @param string $reference_image_url The reference image URL
     * @return string|false Processed image URL/data or false on failure
     */
    private function process_reference_image( $reference_image_url )
    {
        if ( empty( $reference_image_url ) ) {
            return false;
        }
        return $this->convert_image_to_base64( $reference_image_url );
    }

    /**
     * Process reference image for editing mode and extract dimensions
     *
     * @param string $reference_image_url The reference image URL
     * @return array|false Array with image_data, width, height or false on failure
     */
    private function process_reference_image_with_dimensions( $reference_image_url )
    {
        if ( empty( $reference_image_url ) ) {
            return false;
        }

        // Get the original image data first to extract dimensions
        $image_data = $this->get_local_image_data( $reference_image_url );
        if ( $image_data === false ) {
            $image_data = $this->get_remote_image_data( $reference_image_url );
        }

        if ( $image_data === false ) {
            return false;
        }

        // Extract dimensions using GD
        if ( ! extension_loaded( 'gd' ) ) {
            return false;
        }

        $image = imagecreatefromstring( $image_data );
        if ( $image === false ) {
            return false;
        }

        $width  = imagesx( $image );
        $height = imagesy( $image );
        imagedestroy( $image );

        if ( $width === false || $height === false ) {
            return false;
        }

        // Now convert to base64 for API usage
        $processed_image = $this->convert_image_to_base64( $reference_image_url );
        if ( $processed_image === false ) {
            return false;
        }

        return [
            'image_data' => $processed_image,
            'width'      => $width,
            'height'     => $height
         ];
    }

    /**
     * Select optimal size for image editing based on reference image aspect ratio
     *
     * @param int $width Reference image width
     * @param int $height Reference image height
     * @return string Optimal size for OpenAI image editing API
     */
    private function select_optimal_size_for_editing( $width, $height )
    {
        // Default to square if dimensions are invalid
        if ( $width <= 0 || $height <= 0 ) {
            return '1024x1024';
        }

        // Calculate aspect ratio
        $aspect_ratio = $width / $height;

        // Define available sizes and their aspect ratios
        $available_sizes = [
            '1024x1024' => 1.0, // Square (1:1)
            '1536x1024' => 1.5, // Landscape (3:2)
            '1024x1536' => 0.67 // Portrait (2:3)
         ];

        // Find the closest aspect ratio match
        $closest_size        = '1024x1024'; // Default
        $smallest_difference = PHP_FLOAT_MAX;

        foreach ( $available_sizes as $size => $size_ratio ) {
            $difference = abs( $aspect_ratio - $size_ratio );
            if ( $difference < $smallest_difference ) {
                $smallest_difference = $difference;
                $closest_size        = $size;
            }
        }

        return $closest_size;
    }

    /**
     * Get file extension from MIME type
     *
     * @param string $mime_type MIME type
     * @return string File extension
     */
    private function get_extension_from_mime_type( $mime_type )
    {
        switch ( $mime_type ) {
            case 'image/jpeg':
                return 'jpg';
            case 'image/png':
                return 'png';
            case 'image/gif':
                return 'gif';
            case 'image/webp':
                return 'webp';
            case 'image/bmp':
                return 'bmp';
            default:
                return 'png';
        }
    }
}
