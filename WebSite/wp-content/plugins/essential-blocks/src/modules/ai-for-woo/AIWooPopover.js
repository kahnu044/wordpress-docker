/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Modal, Button, Dashicon } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * AIWooPopover - A component for AI product generation
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isVisible - Whether the popover is visible
 * @param {Function} props.onClose - Function to close the popover
 */
const AIWooPopover = ({
    isVisible,
    onClose
}) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleClose = () => {
        onClose();
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        // TODO: Implement AI product generation logic
        setTimeout(() => {
            setIsGenerating(false);
            alert(__("AI product generation will be implemented here!", "essential-blocks"));
        }, 2000);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <Modal
            title={__('AI Product Generator', 'essential-blocks')}
            size="large"
            onRequestClose={handleClose}
            className="eb-ai-woo-popover"
        >
            {window.EssentialBlocksLocalize?.hasOpenAiApiKey !== "1" && (
                <div className="eb-ai-api-key-warning">
                    <p>
                        {__('Please add your OpenAI API Key to use this feature.', 'essential-blocks')}{' '}
                        <a
                            href={`${window.EssentialBlocksLocalize?.eb_admin_url}admin.php?page=essential-blocks&tab=ai-suite`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {__('Go to Settings', 'essential-blocks')}
                        </a>
                    </p>
                </div>
            )}

            <div className="eb-ai-woo-popover-content">
                <div className="eb-ai-header">
                    <div className="eb-ai-logo">
                        <img
                            src={`${window.EssentialBlocksLocalize?.eb_plugins_url}assets/images/eb-logo.svg`}
                            alt="Essential Blocks Icon"
                            className="eb-ai-logo-icon"
                        />
                    </div>
                    <div className="eb-ai-header-content">
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                            {__('AI Product Generator', 'essential-blocks')}
                        </h4>
                        <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#666' }}>
                            Generate WooCommerce products with the power of AI
                        </p>
                    </div>
                    <Button
                        variant="custom"
                        className="eb-ai-close-button"
                        onClick={handleClose}
                    >
                        <Dashicon icon="no-alt" />
                    </Button>
                </div>

                <div className="eb-ai-content">
                    <div className="eb-ai-hello-message">
                        <h3>{__("Hello!", "essential-blocks")}</h3>
                        <p>{__("This is a placeholder for the AI product generation feature. The actual AI functionality will be implemented in future iterations.", "essential-blocks")}</p>
                        
                        <div className="eb-ai-demo-actions">
                            <Button
                                variant="primary"
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="eb-ai-demo-button"
                            >
                                {isGenerating ? (
                                    <>
                                        <span className="eb-ai-generating-spinner"></span>
                                        {__('Generating...', 'essential-blocks')}
                                    </>
                                ) : (
                                    __('Demo Generate', 'essential-blocks')
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AIWooPopover;
