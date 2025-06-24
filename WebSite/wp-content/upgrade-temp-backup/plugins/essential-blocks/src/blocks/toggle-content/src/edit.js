/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState, useRef, memo } from "@wordpress/element";
import {
    BlockControls,
    AlignmentToolbar,
    InnerBlocks,
    RichText,
} from "@wordpress/block-editor";
import { createBlock } from "@wordpress/blocks";
import { select, dispatch, useSelect } from "@wordpress/data";
/**
 * Internal dependencies
 */
import Style from "./style";
import { DEFAULT_TEMPLATE } from "./constants";
import { typoPrefix_tgl } from "./constants/typographyPrefixConstants";

import { withBlockContext, BlockProps } from "@essential-blocks/controls";
import Inspector from "./inspector";
import defaultAttributes from "./attributes";

function Edit(props) {
    const { clientId, isSelected, attributes, setAttributes, className, name } =
        props;

    const {
        resOption,
        blockId,
        blockMeta,
        classHook,
        initialContent,
        switchStyle,
        switchSize,
        seperatorType,
        primaryLabelText = "First",
        secondaryLabelText = "Second",
        alignment,

        [`${typoPrefix_tgl}FontSize`]: fontSize,
        [`${typoPrefix_tgl}SizeUnit`]: sizeUnit,
        backgroundType,
        backgroundColor,
        backgroundGradient,
        controllerType,
        controllerColor,
        controllerGradient,
        controllerColorSecondary
    } = attributes;

    const [isPrimary, setPrimary] = useState(
        initialContent === "primary" ? true : false,
    );
    const [isRemoved, setRemoved] = useState(false);

    const contentRef = useRef(null);
    const primaryTextRef = useRef(null);
    const secondaryTextRef = useRef(null);
    const primaryRef = useRef(null);
    const secondaryRef = useRef(null);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: "eb-toggle",
        style: <Style {...props} />,
    };

    useEffect(() => {
        setTimeout(() => {
            if (contentRef.current) {
                let container = contentRef.current.querySelector(
                    ".block-editor-block-list__layout",
                );

                if (!container) return;

                let childElemenets = [];
                const child = container.children;
                for (let i = 0; i < child.length; i++) {
                    if (
                        child[i].classList?.contains(
                            "block-editor-block-list__block",
                        )
                    ) {
                        childElemenets.push(child[i]);
                    }
                }

                if (childElemenets.length === 2) {
                    let firstChild = childElemenets[0];
                    let lastChild = childElemenets[1];

                    if (isPrimary) {
                        firstChild.classList.add("active");
                        firstChild.classList.remove("inactive");
                        firstChild.dataset.activeTab = "active";

                        lastChild.classList.add("inactive");
                        lastChild.classList.remove("active");
                        lastChild.dataset.activeTab = "inactive";
                    } else {
                        firstChild.classList.add("inactive");
                        firstChild.classList.remove("active");
                        firstChild.dataset.activeTab = "inactive";

                        lastChild.classList.add("active");
                        lastChild.classList.remove("inactive");
                        lastChild.dataset.activeTab = "active";
                    }
                }
            }
        }, 0);
    }, [isPrimary, primaryRef.current, secondaryRef.current]);

    /**
     * Get innerBlocks
     */
    const { innerBlocks } = useSelect(
        (select) =>
            select("core/block-editor").getBlocksByClientId(clientId)[0],
    );
    useEffect(() => {
        const isBlockJustInserted =
            select("core/block-editor").wasBlockJustInserted(clientId);
        if (!isBlockJustInserted) {
            if (innerBlocks && innerBlocks.length === 2) {
                setRemoved(false);
            } else {
                setRemoved(true);
            }
        }
    }, [innerBlocks]);

    useEffect(() => {
        // Set block id
        setAttributes({ id: clientId });

        // Add label click event listender for text type switch
        setClickEvents();

        //
        backgroundType === "solid" ? setAttributes({ backgroundColor }) : setAttributes({ backgroundColor: backgroundGradient })
        controllerType === "solid" ? setAttributes({ controllerColor }) : setAttributes({ controllerColor: controllerGradient })
    }, []);

    useEffect(() => {
        // Replace removed block with an empty block
        if (isRemoved) {
            const { replaceInnerBlocks } = dispatch("core/block-editor");
            const newBlock = createBlock("essential-blocks/wrapper", {});

            const filterInnerBlock = innerBlocks[0]
                ? innerBlocks[0]
                : createBlock("essential-blocks/wrapper", {});

            let replaceBlocks = [];
            if (isPrimary) {
                replaceBlocks = [newBlock, filterInnerBlock];
            } else {
                replaceBlocks = [filterInnerBlock, newBlock];
            }

            replaceInnerBlocks(clientId, replaceBlocks);
        }
    }, [isRemoved]);

    const setClickEvents = () => {
        primaryRef.current &&
            primaryRef.current.addEventListener("click", () =>
                setPrimary(true),
            );

        secondaryRef.current &&
            secondaryRef.current.addEventListener("click", () =>
                setPrimary(false),
            );

        primaryTextRef.current &&
            primaryTextRef.current.addEventListener("click", () =>
                setPrimary(true),
            );

        secondaryTextRef.current &&
            secondaryTextRef.current.addEventListener("click", () =>
                setPrimary(false),
            );
    };

    const onSwitchClick = (e) => {
        setPrimary(e.target.checked);
    };

    const getMargin = () => {
        switch (alignment) {
            case "center":
                return {
                    marginLeft: "auto",
                    marginRight: "auto",
                };

            case "right":
                return {
                    marginLeft: "auto",
                    marginRight: "0px",
                };

            case "left":
                return {
                    marginLeft: "0px",
                    marginRight: "auto",
                };
        }

        return {
            marginLeft: "auto",
            marginRight: "auto",
        };
    };

    const getTransform = () => {
        if (isPrimary) return "translateX(0px)";

        switch (switchSize) {
            case "s":
                return "translateX(22px)";
            case "m":
                return "translateX(26px)";
            case "l":
                return "translateX(36px)";
            case "xl":
                return "translateX(42px)";
        }
    };

    const getRadius = () => {
        if (switchStyle === "rectangle") return "0px";

        switch (switchSize) {
            case "s":
                return "10px";
            case "m":
                return "13px";
            case "l":
                return "16px";
            case "xl":
                return "21px";
        }
    };

    return (
        <>
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}

            <BlockControls>
                <AlignmentToolbar
                    value={alignment}
                    onChange={(alignment) => setAttributes({ alignment })}
                />
            </BlockControls>
            <BlockProps.Edit {...enhancedProps}>
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div className={`${blockId} eb-toggle-wrapper ${isPrimary ? 'eb-toggle-primary' : 'eb-toggle-secondary'}`}>
                        <div
                            className="eb-toggle-heading"
                            style={{
                                // ...headingStyle,
                                display:
                                    switchStyle === "toggle" ? "block" : "none",
                            }}
                        >
                            <div className="eb-text-switch-wrapper">
                                <div
                                    className="eb-text-switch-content"
                                    style={{ ...getMargin() }}
                                >
                                    <label
                                        className="eb-text-switch-label"
                                    // style={sliderStyle}
                                    >
                                        <div
                                            className="eb-text-switch-toggle"
                                            style={{
                                                // ...controllerStyle,
                                                // zIndex: 0,
                                                marginLeft: !isPrimary && "50%",
                                            }}
                                        ></div>
                                        <div className="eb-switch-names">
                                            <RichText
                                                tagName="span"
                                                className="eb-toggle-primary-label-text"
                                                ref={primaryTextRef}
                                                // placeholder={__("First", "essential-blocks")}
                                                // style={primaryLabelStyle}
                                                value={primaryLabelText}
                                                onChange={(primaryLabelText) =>
                                                    setAttributes({
                                                        primaryLabelText,
                                                    })
                                                }
                                            />

                                            <RichText
                                                tagName="span"
                                                className="eb-toggle-secondary-label-text"
                                                ref={secondaryTextRef}
                                                // placeholder={__("Second", "essential-blocks")}
                                                // style={secondaryLabelStyle}
                                                value={secondaryLabelText}
                                                onChange={(
                                                    secondaryLabelText,
                                                ) =>
                                                    setAttributes({
                                                        secondaryLabelText,
                                                    })
                                                }
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div
                            className="eb-toggle-heading"
                            style={{
                                // ...headingStyle,
                                display:
                                    switchStyle !== "toggle" ? "block" : "none",
                            }}
                        >
                            <RichText
                                tagName="span"
                                className="eb-toggle-primary-label"
                                ref={primaryRef}
                                placeholder={__("First", "essential-blocks")}
                                value={primaryLabelText}
                                onChange={(primaryLabelText) =>
                                    setAttributes({ primaryLabelText })
                                }
                            />
                            <label
                                className={`eb-toggle-switch toggle-${switchSize}`}
                            // style={labelStyle}
                            >
                                <input
                                    type="checkbox"
                                    checked={isPrimary}
                                    onChange={(e) => onSwitchClick(e)}
                                />
                                <span
                                    className="eb-toggle-controller"
                                    style={{
                                        transform: getTransform(),
                                        borderRadius: getRadius(),
                                    }}
                                />
                                <span
                                    className="eb-toggle-slider"
                                // style={sliderStyle}
                                />
                            </label>

                            <span
                                className={`eb-toggle-seperator eb-toggle-${seperatorType}`}
                            // style={seperatorStyle}
                            ></span>

                            <RichText
                                tagName="span"
                                ref={secondaryRef}
                                className="eb-toggle-secondary-label"
                                placeholder={__("Second", "essential-blocks")}
                                value={secondaryLabelText}
                                onChange={(secondaryLabelText) =>
                                    setAttributes({ secondaryLabelText })
                                }
                            />
                        </div>
                        <div
                            className="eb-toggle-content eb-toggle-content-editor"
                            ref={contentRef}
                        >
                            <InnerBlocks
                                templateLock={'insert'}
                                template={DEFAULT_TEMPLATE}
                            />
                        </div>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit));
