/**
 * Essential Blocks Pointer Notices
 * 
 * Handles WordPress admin pointer notices functionality
 * 
 * @package EssentialBlocks
 * @since 5.8.0
 */

import domReady from '@wordpress/dom-ready';

/**
 * Initialize pointer notices when DOM is ready
 */
domReady(() => {
    if (typeof EBPointerNoticesData === 'undefined') {
        return;
    }

    const { pointers, ajaxurl, nonce } = EBPointerNoticesData;

    // Process each pointer
    Object.keys(pointers).forEach((pointerId) => {
        const pointer = pointers[pointerId];
        showPointer(pointerId, pointer);
    });

    /**
     * Show a pointer notice
     * 
     * @param {string} pointerId Unique pointer ID
     * @param {object} pointer Pointer configuration
     */
    function showPointer(pointerId, pointer) {
        const target = jQuery(pointer.target || 'body');

        if (target.length === 0) {
            return;
        }

        // Prepare content with optional button
        let content = pointer.content || '';
        if (pointer.buttonText && pointer.buttonLink) {
            content += '<p style="margin-top: 15px;"><a href="' + pointer.buttonLink + '" class="button button-primary" target="_blank" rel="noopener">' + pointer.buttonText + '</a></p>';
        }

        // Default pointer options
        const options = {
            content: content,
            position: {
                edge: pointer.edge || 'top',
                align: pointer.align || 'center'
            },
            close: function() {
                dismissPointer(pointerId);
            }
        };

        // Merge with custom options
        if (pointer.options) {
            jQuery.extend(true, options, pointer.options);
        }

        // Show the pointer
        target.pointer(options).pointer('open');

        // Auto-dismiss after timeout if specified
        if (pointer.timeout) {
            setTimeout(() => {
                target.pointer('close');
                dismissPointer(pointerId);
            }, pointer.timeout * 1000);
        }
    }

    /**
     * Dismiss a pointer via AJAX
     * 
     * @param {string} pointerId Pointer ID to dismiss
     */
    function dismissPointer(pointerId) {
        jQuery.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'eb_dismiss_pointer',
                pointer_id: pointerId,
                nonce: nonce
            },
            success: function(response) {
                if (response.success) {
                    console.log('Essential Blocks: Pointer dismissed successfully');
                } else {
                    console.error('Essential Blocks: Failed to dismiss pointer', response.data);
                }
            },
            error: function(xhr, status, error) {
                console.error('Essential Blocks: AJAX error dismissing pointer', { xhr, status, error });
            }
        });
    }

    /**
     * Utility function to create pointer content with title and description
     * 
     * @param {string} title Pointer title
     * @param {string} description Pointer description
     * @param {string} buttonText Optional button text
     * @param {string} buttonUrl Optional button URL
     * @returns {string} HTML content
     */
    window.EBCreatePointerContent = function(title, description, buttonText, buttonUrl) {
        let content = '<h3>' + title + '</h3>';
        content += '<p>' + description + '</p>';
        
        if (buttonText && buttonUrl) {
            content += '<p><a href="' + buttonUrl + '" class="button button-primary" target="_blank">' + buttonText + '</a></p>';
        }
        
        return content;
    };
});
