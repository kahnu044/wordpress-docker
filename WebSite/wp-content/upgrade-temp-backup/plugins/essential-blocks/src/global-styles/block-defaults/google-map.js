/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    SelectControl,
    RangeControl,
    __experimentalDivider as Divider,
} from "@wordpress/components";

import objAttributes from "@essential-blocks/blocks/google-map/src/attributes";
import {
    wrapMarginConst,
    wrapPaddingConst,
    WrpBgConst,
    WrpBdShadowConst,
} from "@essential-blocks/blocks/google-map/src/constants";
import {
    typoPrefix_title,
    typoPrefix_desc,
} from "@essential-blocks/blocks/google-map/src/constants/typographyConstants";

import {
    ColorControl,
    ResponsiveDimensionsControl,
    BorderShadowControl,
    TypographyDropdown,
    BackgroundControl,
    useBlockDefaults,
    withBlockContext
} from "@essential-blocks/controls";

function GoogleMap(props) {
    const { blockDefaults, setBlockDefaults, name, deviceType, handleBlockDefault } = props;

    const {
        mapType,
        mapZoom,
        mapHeight,
        titleColor,
        titleHoverColor,
        descColor,
    } = blockDefaults;
    const isDefaultSet = useBlockDefaults(name, blockDefaults, setBlockDefaults, objAttributes)

    const changeMapType = (value) => {
        if (value) {
            handleBlockDefault({ mapType: value });
        }
    };
    const changeZoom = (value) => {
        if (value) {
            handleBlockDefault({ mapZoom: value.toString() });
        } else {
            handleBlockDefault({ mapZoom: "13" });
        }
    };

    return (
        <>
            {isDefaultSet && (
                <div className="eb-panel-control">
                    <PanelBody title={__("Height & Zoom", "essential-blocks")}>
                        <SelectControl
                            label={__("Map Type", "essential-blocks")}
                            value={mapType}
                            options={[
                                {
                                    label: __("Road Map", "essential-blocks"),
                                    value: "roadmap",
                                },
                                {
                                    label: __(
                                        "Satellite View",
                                        "essential-blocks"
                                    ),
                                    value: "satellite",
                                },
                                {
                                    label: __("Hybrid", "essential-blocks"),
                                    value: "hybrid",
                                },
                                {
                                    label: __("Terrain", "essential-blocks"),
                                    value: "terrain",
                                },
                            ]}
                            onChange={(value) => changeMapType(value)}
                        />

                        <RangeControl
                            label={__("Map Zoom Level", "essential-blocks")}
                            value={parseInt(mapZoom)}
                            onChange={(value) => changeZoom(value)}
                            min={0}
                            max={20}
                            allowReset={true}
                        />

                        <RangeControl
                            label={__("Map Height", "essential-blocks")}
                            value={parseInt(mapHeight)}
                            onChange={(value) => {
                                handleBlockDefault({
                                    mapHeight: value ? value.toString() : "400",
                                });
                            }}
                            min={100}
                            max={1400}
                            allowReset={true}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Info Card", "essential-blocks")}
                        initialOpen={true}
                    >
                        <>
                            <ColorControl
                                label={__("Title Color", "essential-blocks")}
                                color={titleColor}
                                onChange={(titleColor) =>
                                    handleBlockDefault({ titleColor })
                                }
                            />
                            <ColorControl
                                label={__(
                                    "Title Hover Color",
                                    "essential-blocks"
                                )}
                                color={titleHoverColor}
                                onChange={(titleHoverColor) =>
                                    handleBlockDefault({ titleHoverColor })
                                }
                            />
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_title}
                            />
                            <Divider />
                            <ColorControl
                                label={__(
                                    "Description Color",
                                    "essential-blocks"
                                )}
                                color={descColor}
                                onChange={(descColor) =>
                                    handleBlockDefault({ descColor })
                                }
                            />
                            <TypographyDropdown
                                baseLabel={__("Typography", "essential-blocks")}
                                typographyPrefixConstant={typoPrefix_desc}
                            />
                        </>
                    </PanelBody>
                    <PanelBody
                        title={__("Margin & Padding", "essential-blocks")}
                    >
                        <ResponsiveDimensionsControl
                            controlName={wrapMarginConst}
                            baseLabel="Margin"
                        />
                        <ResponsiveDimensionsControl
                            controlName={wrapPaddingConst}
                            baseLabel="Padding"
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Background ", "essential-blocks")}
                        initialOpen={false}
                    >
                        <BackgroundControl
                            controlName={WrpBgConst}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Border & Shadow")}
                        initialOpen={false}
                    >
                        <BorderShadowControl
                            controlName={WrpBdShadowConst}
                        />
                    </PanelBody>
                </div>
            )}
        </>
    );
}

export default withBlockContext(objAttributes)(GoogleMap);
