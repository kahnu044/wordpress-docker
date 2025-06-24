<?php

namespace EssentialBlocks\Admin;

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
     * API Endpoint for OpenAI
     *
     * @var string
     */
    private $api_endpoint = 'https://api.openai.com/v1/chat/completions';

    /**
     * Model to use for OpenAI
     * //TODO: Add support for other models
     *
     * @var string
     */
    private $model = 'gpt-4o-mini';

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

        // error_log( print_r( $response, true ) );

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
     * Prepare system message based on tone and length
     *
     * @param string $tone
     * @param string $length
     * @return string
     */
    private function prepare_system_message( $tone, $length )
    {
        $tone_instructions   = $this->get_tone_instructions( $tone );
        $length_instructions = $this->get_length_instructions( $length );

        return "You are a professional content writer. " .
            "Write content that is {$tone_instructions}. " .
            "{$length_instructions} " .
            "Format the content with proper headings, paragraphs, and bullet points where appropriate. " .
            "The content should be engaging, well-structured, and optimized for web reading.";
    }

    /**
     * Prepare user message with prompt and keywords
     *
     * @param string $prompt
     * @param string $keywords
     * @return string
     */
    private function prepare_user_message( $prompt, $keywords )
    {
        $message = "Write content about: {$prompt}";

        if ( ! empty( $keywords ) ) {
            $message .= "\n\nInclude the following keywords in the content: {$keywords}";
        }

        return $message;
    }

    /**
     * Get tone instructions based on selected tone
     *
     * @param string $tone
     * @return string
     */
    private function get_tone_instructions( $tone )
    {
        switch ( $tone ) {
            case 'casual':
                return "conversational and friendly, using a casual tone";
            case 'formal':
                return "professional and formal, using proper language";
            case 'persuasive':
                return "persuasive and compelling, designed to convince the reader";
            case 'informative':
            default:
                return "informative and educational, focusing on providing valuable information";
        }
    }

    /**
     * Get length instructions based on selected length
     *
     * @param string $length
     * @return string
     */
    private function get_length_instructions( $length )
    {
        switch ( $length ) {
            case 'short':
                return "Keep the content concise and to the point, around 150-250 words.";
            case 'long':
                return "Create comprehensive content with detailed explanations, around 500-800 words.";
            case 'medium':
            default:
                return "Write a moderate-length content of approximately 300-500 words.";
        }
    }

    /**
     * Get max tokens based on selected length
     *
     * This method is kept for backward compatibility but is no longer used directly.
     * The max_tokens value from settings is used instead.
     *
     * @param string $length
     * @return int
     */
    private function get_max_tokens_by_length( $length )
    {
        switch ( $length ) {
            case 'short':
                return 350;
            case 'long':
                return 1200;
            case 'medium':
            default:
                return 800;
        }
    }
}
