/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    ToggleControl,
    BaseControl,
    ButtonGroup,
    Button,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    WRAPPER_BG,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BORDER_SHADOW,
    NORMAL_HOVER,
    tabTitlePadding,
    tabTitleMargin,
    tabTitleBdShadow,
    tabContentMargin,
    tabContentPadding,
    tabContentBdShadow,
} from "@essential-blocks/blocks/product-details/src/constants/constants";

import {
    typoTabTitle,
    typoTabContent,
} from "@essential-blocks/blocks/product-details/src/constants/typographyPrefixConstants";

import objAttributes from "@essential-blocks/blocks/product-details/src/attributes";

import {
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    ColorControl,
    BackgroundControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function ProductDetails(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        showDescriptionTab,
        showAdditionalTab,
        showReviewsTab,
        tabTitleType,
        tabTitleColor,
        tabTitleBGColor,
        tabTitleHvColor,
        tabTitleHvBGColor,
        tabTitleActiveColor,
        tabTitleActiveBGColor,
        tabTitleActiveHvColor,
        tabTitleActiveHvBGColor,
        tabContentColor,
        tabContentBGColor,
    } = blockDefaults;

    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Settings", "essential-blocks")}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__("Show Description Tab", "essential-blocks")}
                            checked={showDescriptionTab}
                            onChange={(showDescriptionTab) =>
                                handleBlockDefault({ showDescriptionTab })
                            }
                        />
                        <ToggleControl
                            label={__("Show Additional Info Tab", "essential-blocks")}
                            checked={showAdditionalTab}
                            onChange={(showAdditionalTab) =>
                                handleBlockDefault({ showAdditionalTab })
                            }
                        />
                        <ToggleControl
                            label={__("Show Reviews Tab", "essential-blocks")}
                            checked={showReviewsTab}
                            onChange={(showReviewsTab) =>
                                handleBlockDefault({ showReviewsTab })
                            }
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Tab Title Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoTabTitle}
                        />
                        <BaseControl>
                            <ButtonGroup>
                                {NORMAL_HOVER.map(({ label, value }, index) => (
                                    <Button
                                        key={index}
                                        isSecondary={tabTitleType !== value}
                                        isPrimary={tabTitleType === value}
                                        onClick={() =>
                                            handleBlockDefault({
                                                tabTitleType: value,
                                            })
                                        }
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </BaseControl>
                        {tabTitleType === 'normal' && (
                            <>
                                <ColorControl
                                    label={__("Text Color", "essential-blocks")}
                                    color={tabTitleColor}
                                    onChange={(tabTitleColor) =>
                                        handleBlockDefault({ tabTitleColor })
                                    }
                                />
                                <ColorControl
                                    label={__("Background Color", "essential-blocks")}
                                    color={tabTitleBGColor}
                                    onChange={(tabTitleBGColor) =>
                                        handleBlockDefault({ tabTitleBGColor })
                                    }
                                />
                                <ColorControl
                                    label={__("Active Tab Text Color", "essential-blocks")}
                                    color={tabTitleActiveColor}
                                    onChange={(tabTitleActiveColor) =>
                                        handleBlockDefault({ tabTitleActiveColor })
                                    }
                                />
                                <ColorControl
                                    label={__("Active Tab Background Color", "essential-blocks")}
                                    color={tabTitleActiveBGColor}
                                    onChange={(tabTitleActiveBGColor) =>
                                        handleBlockDefault({ tabTitleActiveBGColor })
                                    }
                                />
                            </>
                        )}
                        {tabTitleType === 'hover' && (
                            <>
                                <ColorControl
                                    label={__("Text Color", "essential-blocks")}
                                    color={tabTitleHvColor}
                                    onChange={(tabTitleHvColor) =>
                                        handleBlockDefault({ tabTitleHvColor })
                                    }
                                />
                                <ColorControl
                                    label={__("Background Color", "essential-blocks")}
                                    color={tabTitleHvBGColor}
                                    onChange={(tabTitleHvBGColor) =>
                                        handleBlockDefault({ tabTitleHvBGColor })
                                    }
                                />
                                <ColorControl
                                    label={__("Active Tab Text Color", "essential-blocks")}
                                    color={tabTitleActiveHvColor}
                                    onChange={(tabTitleActiveHvColor) =>
                                        handleBlockDefault({ tabTitleActiveHvColor })
                                    }
                                />
                                <ColorControl
                                    label={__("Active Tab Background Color", "essential-blocks")}
                                    color={tabTitleActiveHvBGColor}
                                    onChange={(tabTitleActiveHvBGColor) =>
                                        handleBlockDefault({ tabTitleActiveHvBGColor })
                                    }
                                />
                            </>
                        )}
                        <ResponsiveDimensionsControl
                            controlName={tabTitleMargin}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={tabTitlePadding}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                        <BorderShadowControl
                            controlName={tabTitleBdShadow}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Tab Content Styles", "essential-blocks")}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__("Typography", "essential-blocks")}
                            typographyPrefixConstant={typoTabContent}
                        />
                        <ColorControl
                            label={__("Text Color", "essential-blocks")}
                            color={tabContentColor}
                            onChange={(tabContentColor) =>
                                handleBlockDefault({ tabContentColor })
                            }
                        />
                        <ColorControl
                            label={__("Background Color", "essential-blocks")}
                            color={tabContentBGColor}
                            onChange={(tabContentBGColor) =>
                                handleBlockDefault({ tabContentBGColor })
                            }
                        />
                        <ResponsiveDimensionsControl
                            controlName={tabContentMargin}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={tabContentPadding}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                        <BorderShadowControl
                            controlName={tabContentBdShadow}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Margin & Padding", "essential-blocks")}
                        initialOpen={false}
                    >
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_MARGIN}
                            baseLabel={__("Margin", "essential-blocks")}
                        />
                        <ResponsiveDimensionsControl
                            controlName={WRAPPER_PADDING}
                            baseLabel={__("Padding", "essential-blocks")}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Background", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WRAPPER_BG}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Border & Shadow", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WRAPPER_BORDER_SHADOW}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(ProductDetails);
