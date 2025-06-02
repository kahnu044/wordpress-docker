/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { ebConditionalRegisterBlockType } from "../controls/src/helpers";
import { createElement } from "@wordpress/element";
import { select, dispatch, subscribe } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

import Crown from "./dashboard/icons/crown";
import ProBadge from "./dashboard/icons/ProBadge";

/**
 * Auto Recovery for Essential Blocks Pro Blocks Only
 * Automatically recovers invalid Essential Blocks pro blocks without manual intervention
 */
const autoRecoverEssentialProBlocks = () => {
    // Check if we're in the block editor
    if (!select('core/block-editor')) {
        return;
    }

    // Function to check if a block is a pro block
    const isProBlock = (block) => {
        return block && block.name && (
            block.name.includes('essential-blocks/pro-')
        );
    };

    // Function to check if a pro block is invalid
    const isProBlockInvalid = (block) => {
        return isProBlock(block) && (
            !block.isValid ||
            block.name === 'core/missing'
        );
    };

    // Function to recover a single pro block
    const recoverProBlock = (block) => {
        try {
            // Try to recreate the block with the same attributes
            const newBlock = createBlock(block.name, block.attributes, block.innerBlocks);
            return newBlock;
        } catch (error) {
            return block;
        }
    };

    // Function to recover pro blocks recursively
    const recoverProBlocksRecursively = (blocks) => {
        return blocks.map(block => {
            let recoveredBlock = block;

            // Recover inner blocks first
            if (block.innerBlocks && block.innerBlocks.length > 0) {
                recoveredBlock = {
                    ...block,
                    innerBlocks: recoverProBlocksRecursively(block.innerBlocks)
                };
            }

            // Only recover if it's a pro block and invalid
            if (isProBlockInvalid(recoveredBlock)) {
                recoveredBlock = recoverProBlock(recoveredBlock);
            }

            return recoveredBlock;
        });
    };

    // Main recovery function for pro blocks
    const performProBlockAutoRecovery = () => {
        try {
            const allBlocks = select('core/block-editor').getBlocks();

            // Check if there are any invalid pro blocks
            const hasInvalidProBlocks = (blocks) => {
                return blocks.some(block => {
                    if (isProBlockInvalid(block)) {
                        return true;
                    }
                    if (block.innerBlocks && block.innerBlocks.length > 0) {
                        return hasInvalidProBlocks(block.innerBlocks);
                    }
                    return false;
                });
            };

            if (hasInvalidProBlocks(allBlocks)) {
                const recoveredBlocks = recoverProBlocksRecursively(allBlocks);
                dispatch('core/block-editor').resetBlocks(recoveredBlocks);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    // Set up auto recovery for pro blocks on editor load
    const unsubscribe = subscribe(() => {
        const blocks = select('core/block-editor').getBlocks();
        if (blocks && blocks.length > 0) {
            // Delay execution to ensure editor is fully loaded
            setTimeout(() => {
                performProBlockAutoRecovery();
                unsubscribe(); // Only run once per editor load
            }, 1000);
        }
    });
};

/**
 * Create a custom icon with pro badge
 */
const createProIcon = (iconName) => {
    return () => {
        let iconElement;

        if (typeof iconName === "string") {
            if (iconName.endsWith(".svg")) {
                iconElement = createElement("img", {
                    src: iconName,
                    alt: "Block Icon",
                    style: {
                        width: "24px",
                        height: "24px",
                        display: "block",
                    },
                    key: "icon",
                });
            } else if (iconName.startsWith("<svg")) {
                iconElement = createElement("span", {
                    className: "eb-pro-icon",
                    style: { display: "inline-block" },
                    dangerouslySetInnerHTML: { __html: iconName },
                    key: "icon",
                });
            } else {
                iconElement = createElement("span", {
                    className: `eb-pro-icon ${iconName}`,
                    style: { display: "inline-block" },
                    key: "icon",
                });
            }
        } else if (typeof iconName === "object" && iconName !== null) {
            iconElement = createElement(iconName, {
                key: "icon",
            });
        } else {
            iconElement = createElement("span", {
                className: "eb-pro-icon dashicons dashicons-block-default",
                style: { display: "inline-block" },
                key: "icon",
            });
        }

        return createElement("div", { className: "eb-pro-icon-wrapper" }, [
            // The icon element we created above
            iconElement,
            // Pro badge
            createElement(
                "span",
                {
                    className: "eb-pro-badge",
                    style: {
                        position: "absolute",
                        top: "-4px",
                        right: "-4px",
                        background: "#f2a80b",
                        color: "#ffffff",
                        fontSize: "8px",
                        padding: "2px 4px",
                        borderRadius: "3px",
                        fontWeight: "bold",
                        lineHeight: "1",
                        zIndex: "1",
                    },
                    key: "badge",
                },
                <Crown />,
            ),
        ]);
    };
};

/**
 * Register pro blocks when pro plugin is not active
 */
export const registerProBlocks = () => {
    if (EssentialBlocksLocalize?.is_pro_active === "false") {
        const all_blocks = EssentialBlocksLocalize?.all_blocks_default || {};
        const proBlocks = [];
        for (const [key, block] of Object.entries(all_blocks)) {
            if (block?.is_pro && block?.name) {
                proBlocks.push({
                    key: key,
                    name: `essential-blocks/${block.name}`,
                    title: block.label,
                    description: block.description || "",
                    category: "essential-blocks-pro",
                    icon: block.icon || "block-default",
                });
            }
        }

        // Register each pro block
        proBlocks.forEach((block) => {
            // Create a custom icon with pro badge
            const iconWithBadge = createProIcon(block.icon);

            let metadata = {
                name: block.name,
                title: block.title,
                category: "essential-blocks-pro",
                apiVersion: 2,
                textdomain: "essential-blocks",
                icon: iconWithBadge,
                attributes: {
                    cover: {
                        type: "string",
                        default: "",
                    },
                },
            };

            // Function to create an icon element for the title
            const createTitleIcon = (iconName) => {
                // Handle different types of icon inputs
                let iconElement;

                if (typeof iconName === "string") {
                    if (iconName.endsWith(".svg")) {
                        iconElement = createElement("img", {
                            src: iconName,
                            alt: "Block Icon",
                            style: {
                                width: "20px",
                                height: "20px",
                                display: "block",
                            },
                        });
                    } else if (iconName.startsWith("<svg")) {
                        iconElement = createElement("span", {
                            className: "eb-pro-title-icon",
                            style: { display: "inline-block" },
                            dangerouslySetInnerHTML: { __html: iconName },
                        });
                    } else {
                        // For dashicons or other class-based icons
                        iconElement = createElement("span", {
                            className: `eb-pro-title-icon ${iconName}`,
                            style: { display: "inline-block" },
                        });
                    }
                } else if (typeof iconName === "object" && iconName !== null) {
                    // For React component icons
                    iconElement = createElement(iconName, {});
                } else {
                    // Fallback to a default icon
                    iconElement = createElement("span", {
                        className:
                            "eb-pro-title-icon dashicons dashicons-block-default",
                        style: { display: "inline-block" },
                    });
                }

                return iconElement;
            };

            // Create a placeholder edit component that shows a pro notice
            const Edit = ({ attributes, isSelected }) => {
                return attributes?.cover.length ? (
                    <div>
                        <img
                            src={attributes?.cover}
                            alt="Previes Image"
                            style={{ maxWidth: "100%" }}
                        />
                    </div>
                ) : (
                    <>
                        <div className="eb-pro-notice">
                            <h3 className="eb-pro-notice-title">
                                <span className="eb-pro-notice-icon">
                                    {createTitleIcon(block.icon)}
                                </span>
                                {block.title}
                            </h3>
                            <p
                                className="eb-pro-notice-description"
                                dangerouslySetInnerHTML={{
                                    __html: sprintf(
                                        __(
                                            "This is a %1$s Block. Please upgrade to %2$s to use this.",
                                            "essential-blocks",
                                        ),
                                        "<strong>PRO</strong>",
                                        "<strong>Essential Blocks Pro</strong>",
                                    ),
                                }}
                            />
                            <a
                                href={
                                    "https://essential-blocks.com/go/upgrade-to-pro-gutenberg-editor"
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="eb-pro-upgrade-button"
                            >
                                <ProBadge />
                                {"Upgrade to Pro"}
                            </a>
                        </div>
                    </>
                );
            };

            // Register the block
            ebConditionalRegisterBlockType(metadata, {
                ...metadata,
                example: {
                    attributes: {
                        cover: `${
                            EssentialBlocksLocalize?.image_url
                        }/block-preview/${block.name
                            .replace("essential-blocks/", "")
                            .replace("pro-", "")}.jpg`,
                    },
                },
                edit: Edit,
                save: () => null,
            });
        });
    }
};

registerProBlocks();

// Initialize auto recovery for pro blocks when pro plugin status changes
if (typeof window !== 'undefined') {
    // Run auto recovery when the editor loads
    document.addEventListener('DOMContentLoaded', () => {
        if (window.wp && window.wp.data) {
            autoRecoverEssentialProBlocks();
        }
    });

    // Also run when the pro plugin is activated/deactivated
    window.addEventListener('load', () => {
        if (window.wp && window.wp.data) {
            autoRecoverEssentialProBlocks();
        }
    });
}
