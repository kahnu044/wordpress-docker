/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";
import { Fragment, memo } from "@wordpress/element";
import { select } from "@wordpress/data";
import { createHigherOrderComponent } from "@wordpress/compose";

/**
 * Internal dependencies
 */
import {
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";
import Inspector from "./inspector";
import defaultAttributes from './attributes';
import Style from "./style";

import { editUseEffect } from "./handleEditUseEffect"

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, name, clientId, isSelected, setAttributes } = props;

        if (name && name != "core/navigation") {
            return <BlockEdit {...props} />;
        }

        const parentBlock = select("core/block-editor").getBlockParents(
            clientId
        );
        let isParentBlockNavigation = false;
        let parentAttributes = {};
        parentBlock.map((block) => {
            const thisProps = select("core/block-editor").getBlock(block);
            if (
                thisProps &&
                thisProps.name == "essential-blocks/advanced-navigation"
            ) {
                isParentBlockNavigation = true;
                parentAttributes = { ...thisProps.attributes };
            }
        });

        let inspector;
        if (isParentBlockNavigation && isSelected) {
            setTimeout(() => {
                inspector = document.querySelector(
                    ".block-editor-block-inspector"
                );

                if (inspector) {
                    let buttonSelector = inspector.querySelector(".block-editor-block-inspector__tabs")
                    if (buttonSelector) {
                        let tabButtons = buttonSelector.querySelectorAll('[aria-label="Settings"], [aria-label="Styles"]');
                        tabButtons && tabButtons.forEach((element) => {
                            element.style.display = "none";
                        });
                    }
                }
            }, 200);

            if (inspector) {
                setTimeout(() => {
                    // inspector.querySelector(
                    //     ".block-editor-block-card"
                    // ).style.display = "none";

                    let nodes = inspector.children;

                    let tabButtons = inspector
                        .querySelector(".block-editor-block-inspector__tabs")
                        .querySelectorAll(
                            '[aria-label="Settings"], [aria-label="Styles"]'
                        );

                    tabButtons.forEach((element) => {
                        element.style.display = "none";
                    });

                    for (let i = 0; i <= nodes.length - 1; i++) {
                        let card = nodes[i].classList.contains(
                            "block-editor-block-card"
                        );
                        let tab = nodes[i].classList.contains(
                            "block-editor-block-inspector__tabs"
                        );

                        let childen = nodes[i].children;

                        if (!card && !tab) {
                            for (let x = 0; x <= childen.length - 1; x++) {
                                const hasNavigation = childen[x].querySelector(
                                    ".wp-block-navigation__navigation-selector"
                                );

                                if (!hasNavigation) {
                                    childen[x].style.display = "none";
                                }
                            }
                        }
                    }
                }, 200);

                return (
                    <Fragment>
                        <BlockEdit {...props} />
                    </Fragment>
                );
            } else {
                return <BlockEdit {...props} />;
            }
        } else {
            inspector = document.querySelector(".block-editor-block-inspector");

            if (inspector) {
                setTimeout(() => {
                    inspector.querySelector(
                        ".block-editor-block-card"
                    ).style.display = "block";

                    let nodes = inspector.children;
                    for (let i = 0; i <= nodes.length - 1; i++) {
                        let childen = nodes[i].children;

                        for (let x = 0; x <= childen.length - 1; x++) {
                            childen[x].style.display = "block";
                        }
                    }
                }, 200);
            }
            return <BlockEdit {...props} />;
        }
    };
}, "withInspectorControl");

wp.hooks.addFilter(
    "editor.BlockEdit",
    "essential-blocks/advanced-navigation",
    withInspectorControls
);

const Edit = (props) => {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
        name
    } = props;

    const {
        blockId,
        layout,
        navAlign,
        preset,
        verticalPreset,
        navBtnType,
        showDropdownIcon,
        navVerticalAlign,
        hamburgerCloseIconAlign,
        classHook,
    } = attributes;

    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-advanced-navigation',
        style: <Style {...props} />
    };

    editUseEffect(props) //editUseEffect Hook

    const layoutPreset = layout === "is-horizontal" ? preset : verticalPreset;

    return (
        <>
            {isSelected && (
                <Inspector
                    clientId={clientId}
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`${blockId} eb-advanced-navigation-wrapper ${layout} ${layoutPreset} ${layout == "is-horizontal"
                            ? navAlign
                            : navVerticalAlign
                            } ${showDropdownIcon ? "" : "remove-dropdown-icon"} ${navBtnType === true
                                ? "responsive-icon"
                                : "responsive-text"
                            } ${hamburgerCloseIconAlign}`}
                    >
                        <div className={`eb-nav-contents`}>
                            <InnerBlocks
                                templateLock={false}
                                template={[
                                    [
                                        "core/navigation",
                                        { className: `${layout} ${navAlign}` },
                                    ],
                                ]}
                                allowedBlocks={["core/navigation"]}
                                renderAppender={
                                    select("core/block-editor").getBlock(
                                        clientId
                                    )?.innerBlocks.length < 1
                                        ? InnerBlocks.ButtonBlockAppender
                                        : false
                                }
                            />
                        </div>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
};

export default memo(withBlockContext(defaultAttributes)(Edit))

