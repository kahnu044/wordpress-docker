/**
 * WordPress dependencies
 */
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button, Modal } from "@wordpress/components";

import AIWooPopover from "./AIWooPopover";

const AIWooButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    // Check if OpenAI API key is configured
    if (!window.EssentialBlocksLocalize?.hasOpenAiApiKey) {
        return null;
    }

    return (
        <>
            <Button
                onClick={handleClick}
                className="eb-ai-woo-button page-title-action"
                variant="secondary"
            >
                <img
                    src={`${window.EssentialBlocksLocalize?.eb_plugins_url}assets/images/eb-logo.svg`}
                    alt="Essential Blocks Icon"
                    className="eb-ai-woo-button-icon"
                />
                {__("Generate with AI", "essential-blocks")}
            </Button>
            {isVisible && (
                <AIWooPopover
                    isVisible={isVisible}
                    onClose={handleClose}
                />
            )}
        </>
    );
};

export default AIWooButton;
