import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";
import { useState, useEffect, useRef, useCallback } from "@wordpress/element";
import { PanelBody, Button, Popover, Dashicon, TabPanel } from "@wordpress/components";
import { store as editorStore, PluginSidebar as PluginSidebarEditor } from '@wordpress/editor';
import { select, dispatch, useDispatch, useSelect, withSelect } from "@wordpress/data";
import { PluginSidebar as PluginSidebarEditPost } from "@wordpress/edit-post"
import {
    BlockPreview,
    PanelColorSettings
} from "@wordpress/block-editor";
import { createBlock } from "@wordpress/blocks";
import { store as noticesStore } from '@wordpress/notices';

import { useDeviceType } from "@essential-blocks/controls"

import EBIcon from "./assets/icon";
import ColorPalletWrapper from "./components/colorPalletWrapper"
import GradientColorPallet from "./components/GradientColorPallet"
import TypographySettings from "./components/typography/TypographySettings"
import {
    getGlobalSettings,
    generateTypographyCSS,
    applyTypographyCSS,
    loadGoogleFonts
} from "../helpers/helpers"
import { updateGlobalStyle } from "../helpers/fetch"

//Import Constants
import {
    globalColorKey,
    customColorKey,
    gradientColorKey,
    customGradientColorKey,
    globalTypoKey
} from "../store/constant"

import { blockComponentObject } from './blockObject'

import "./style.scss";

const PluginSidebar = PluginSidebarEditor || PluginSidebarEditPost;


/**
 * Global Controls Component
 * @param {*} props
 * @returns {Component}
 */
function EBGlobalControls(props) {
    const {
        getGlobalColors,
        getCustomColors,
        getGradientColors,
        getCustomGradientColors,
        getGlobalTypography,
        getBlockDefaults
    } = props;

    const localizeColors = EssentialBlocksLocalize.globalColors || []

    const components = applyFilters('eb_block_defaults', blockComponentObject);

    /**
     * State
     */
    const [globalColors, setGlobalColors] = useState([]);
    const [customColors, setCustomColors] = useState([]);
    const [gradientColors, setGradientColors] = useState([]);
    const [customGradientColors, setCustomGradientColors] = useState([]);
    const [blockDefaults, setBlockDefaults] = useState({});
    const [blockItemDefaults, setBlockItemDefaults] = useState({});
    const [popoverAnchor, setPopoverAnchor] = useState();
    const [clickedBlock, setClickedBlock] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    //Get Device type from context
    const deviceType = useDeviceType()

    //Create Element for write Global Typography
    useEffect(() => {
        if (Object.keys(getGlobalTypography).length > 0) {
            const cssString = generateTypographyCSS(getGlobalTypography, deviceType);
            applyTypographyCSS(cssString);
            loadGoogleFonts(getGlobalTypography)
        }
    }, [getGlobalTypography, deviceType])

    //Initial UseEffect, Set Defualt color if Store is empty
    useEffect(() => {
        //Set Global Colors
        if (typeof getGlobalColors === "object" && globalColors.length === 0) {
            setGlobalColors(localizeColors);
        }

        //Set Gradient Colors
        if (typeof getGradientColors === "object" && gradientColors.length === 0) {
            setGradientColors(EssentialBlocksLocalize.gradientColors || []);
        }
    }, []);

    //Set globalColors when Store "getGlobalColors" is changed
    useEffect(() => {
        if (JSON.stringify(getGlobalColors) !== JSON.stringify(globalColors)) {
            setGlobalColors(getGlobalColors);
        }
    }, [getGlobalColors]);

    //Set customColors when Store "getCustomColors" is changed
    useEffect(() => {
        if (JSON.stringify(getCustomColors) !== JSON.stringify(customColors)) {
            setCustomColors(getCustomColors);
        }
    }, [getCustomColors]);

    //Set gradientColors when Store "getGradientColors" is changed
    useEffect(() => {
        if (JSON.stringify(getGradientColors) !== JSON.stringify(gradientColors)) {
            setGradientColors(getGradientColors);
        }
    }, [getGradientColors]);

    //Set customGradientColors when Store "getCustomGradientColors" is changed
    useEffect(() => {
        if (JSON.stringify(getCustomGradientColors) !== JSON.stringify(customGradientColors)) {
            setCustomGradientColors(getCustomGradientColors);
        }
    }, [getCustomGradientColors]);

    //Update Store when "globalColors" is changed
    useEffect(() => {
        if (globalColors.length > 0) {
            dispatch("essential-blocks").setGlobalColors(globalColors);
            dispatch('essential-blocks').setIsSaving(true);
        }
        const root = document.documentElement;
        (globalColors.length > 0) && globalColors.map((item) => {
            if (item.var && item.color) {
                root.style.setProperty(item.var, item.color);
            }
        })

    }, [globalColors]);

    //Update Store when "customColors" is changed
    useEffect(() => {
        if (typeof customColors === 'object') {
            dispatch("essential-blocks").setCustomColors(customColors);
            dispatch('essential-blocks').setIsSaving(true);

            //Set color css to root
            const root = document.documentElement;
            if (customColors.length > 0) {
                customColors.map((item) => {
                    if (item.var && item.color) {
                        root.style.setProperty(item.var, item.color);
                    }
                })
            }
        }
    }, [customColors]);

    //Update Store when "gradientColors" is changed
    useEffect(() => {
        if (gradientColors.length > 0) {
            dispatch("essential-blocks").setGradientColors(gradientColors);
            dispatch('essential-blocks').setIsSaving(true);
        }
        const root = document.documentElement;
        (gradientColors.length > 0) && gradientColors.map((item) => {
            if (item.var && item.color) {
                root.style.setProperty(item.var, item.color);
            }
        })
    }, [gradientColors]);

    //Update Store when "customGradientColors" is changed
    useEffect(() => {
        if (typeof customGradientColors === 'object') {
            dispatch("essential-blocks").setCustomGradientColors(customGradientColors);
            dispatch('essential-blocks').setIsSaving(true);
        }
        const root = document.documentElement;
        (customGradientColors.length > 0) && customGradientColors.map((item) => {
            if (item.var && item.color) {
                root.style.setProperty(item.var, item.color);
            }
        })
    }, [customGradientColors]);

    //Update Global Colors
    const setGlobalColor = (index, color) => {
        const colors = [...globalColors];
        colors[index].color = color;
        setGlobalColors([...colors]);
        setIsChanged(true)
    };
    const setGradientColor = (index, color) => {
        const colors = [...gradientColors];
        colors[index].color = color;
        setGradientColors([...colors]);
        setIsChanged(true)
    };
    const setCustomGradientColor = (index, color) => {
        const colors = [...customGradientColors];
        colors[index].color = color;
        setCustomGradientColors([...colors]);
        setIsChanged(true)
    };
    const deleteCustomGradientColor = (index) => {
        const colors = [...customGradientColors];
        colors.splice(index, 1)
        setCustomGradientColors([...colors]);
        setIsChanged(true)
    };

    /**
     * Handle Popup Visibility
     * @param {*} block
     */
    const toggleVisible = (block) => {
        setClickedBlock(block);
        setIsVisible((state) => !state);
    };

    //Set blockDefaults when Store "getBlockDefaults" is changed
    useEffect(() => {
        if (JSON.stringify(getBlockDefaults) !== JSON.stringify(blockDefaults)) {
            setBlockDefaults(getBlockDefaults);
        }
    }, [getBlockDefaults]);

    useEffect(() => {
        setBlockDefaults({
            ...blockDefaults,
            ...blockItemDefaults,
        });
    }, [blockItemDefaults]);

    /**
     * Handle Save Block Default
     * @param {*} block
     */
    const handleSaveBlockDefault = () => {
        setIsVisible((state) => !state);

        //Save Block Default
        if (Object.keys(blockDefaults).length > 0) {
            dispatch("essential-blocks").setBlockDefault(blockDefaults);
            dispatch("essential-blocks").saveBlockDefault(blockDefaults);
        }
    };

    /**
     * Handle Save & Insert Block
     * @param {*} block
     */
    const handleSaveInsert = (clickedBlock) => {
        setIsVisible((state) => !state);

        //Save Block Default
        if (Object.keys(blockDefaults).length > 0) {
            dispatch("essential-blocks").setBlockDefault(blockDefaults);
            dispatch("essential-blocks").saveBlockDefault(blockDefaults);
        }

        const insertedBlock = wp.blocks.createBlock(`essential-blocks/${registeredBlocks[clickedBlock]?.is_pro ? 'pro-' : ''}${clickedBlock.replace(
            /_/g,
            "-"
        )}`,
            {
                ...previewData(
                    clickedBlock
                ),
            });
        wp.data.dispatch('core/block-editor').insertBlocks(insertedBlock);
    };

    /**
     * Handle Reset Block Default
     * @param {*} block
     */
    const handleResetBlockDefault = (selected) => {
        if (
            !window.confirm(
                `Are you sure, you want to reset all the changes you made for ${registeredBlocks[clickedBlock]?.label}`
            )
        ) {
            return;
        }
        const defaults = { ...blockDefaults };
        if (defaults[selected]) {
            delete defaults[selected];
        }

        //Save Block Default
        dispatch("essential-blocks").setBlockDefault(defaults);
        dispatch("essential-blocks").saveBlockDefault(defaults);

        //save updated blockDefault object after deleted selected
        setBlockItemDefaults({});
        setBlockDefaults(defaults);

        //Reload popup
        setIsVisible(false);
        setTimeout(() => {
            setIsVisible(true);
        }, 1);
    };

    /**
     * Handle Close without save
     * @param {*} selected
     */
    const handleCloseWithoutSave = (selected) => {
        setBlockItemDefaults({});
        setIsVisible(false);
    };

    /**
     * handleBlockDefault
     * @param {*} obj
     */
    const handleBlockDefault = useCallback((obj) => {
        let values = { ...blockDefaults[clickedBlock] };

        Object.keys(obj).map((item) => {
            values[item] = obj[item];
        });
        setBlockDefaults({ ...blockDefaults, [clickedBlock]: values });
    }, [blockDefaults, clickedBlock]);

    /**
     * Setup Popup
     */
    useEffect(() => {
        const editor = document.querySelector("#editor");
        setPopoverAnchor(editor);
    }, []);

    const ClickedComponent = components[clickedBlock]?.component;
    const allBlocksKeys = Object.keys(components);
    const registeredBlocks = EssentialBlocksLocalize?.all_blocks_default;
    const activedBlocks = EssentialBlocksLocalize?.all_blocks;

    /**
     * Handle preview data
     * @param {*} selected
     * @returns
     */
    const previewData = (selected) => {
        let data = { ...blockDefaults[selected] };
        if (components[selected].previewData) {
            data = {
                ...data,
                ...components[selected].previewData,
            };
        }
        return data;
    };

    const colorPanelArray = (colors, setColor, defaults = []) => {
        if (typeof colors !== 'object') {
            return []
        }
        const colorArr = []
        colors.map((colorObj, index) => (
            colorArr.push({
                label: colorObj.name || 'Color',
                value: colorObj.color,
                onChange: (newColor) => {
                    setColor(index, newColor || defaults[index]?.color || '#000')
                }
            })
        ))
        return colorArr
    }

    const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore);

    const successNotice = (message = 'Successfully saved Global settings!') => {
        createSuccessNotice(__(message), {
            type: 'snackbar',
            icon: <Dashicon icon={"saved"} />,
        })
    }
    const errorNotice = (message = 'Global settings could not be saved.') => {
        createErrorNotice(__(message), {
            type: 'snackbar',
            icon: <Dashicon icon={"info-outline"} />,
        })
    }

    const globalSettingsSave = () => {
        const globals = getGlobalSettings(select)
        const allData = {
            [globalColorKey]: globals?.getGlobalColors,
            [customColorKey]: globals?.getCustomColors,
            [gradientColorKey]: globals?.getGradientColors,
            [customGradientColorKey]: globals?.getCustomGradientColors,
            [globalTypoKey]: globals?.getGlobalTypography
        }
        let response = updateGlobalStyle(allData);
        response
            .then((result) => {
                if (result) {
                    successNotice()
                    setIsChanged(false)
                }
                else {
                    errorNotice()
                }
                // Handle the resolved value of the promise
            })
            .catch((error) => {
                // Handle errors
                errorNotice()
            });
    }

    const isResetable = (type = 'color') => {
        const globals = getGlobalSettings(select);
        if (!globals) return false;

        const {
            getGlobalColors,
            getCustomColors,
            getGradientColors,
            getCustomGradientColors,
            getGlobalTypography
        } = globals;

        if (type === 'color') {
            return [getGlobalColors, getCustomColors, getGradientColors, getCustomGradientColors]
                .some(data => Array.isArray(data) ? data.length > 0 : Object.keys(data || {}).length > 0);
        }

        if (type === 'typography') {
            return getGlobalTypography && Object.keys(getGlobalTypography).length > 0;
        }

        return false; // Default fallback
    };

    const globalSettingsReset = (type = 'all') => {
        if (!window.confirm('Are you sure you want to reset all the changes?')) { //Window alert for confirm reset
            return;
        }
        const globals = getGlobalSettings(select)

        const {
            globalColors = [],
            gradientColors = []
        } = window?.EssentialBlocksLocalize

        let colorsData;
        if (type === 'all' || type === 'color') {
            dispatch("essential-blocks").setGlobalColors(globalColors);
            dispatch("essential-blocks").setCustomColors([]);
            dispatch("essential-blocks").setGradientColors(gradientColors);
            dispatch("essential-blocks").setCustomGradientColors([]);
            colorsData = {
                [globalColorKey]: [],
                [customColorKey]: [],
                [gradientColorKey]: [],
                [customGradientColorKey]: []
            };
        } else {
            colorsData = {
                [globalColorKey]: globals?.getGlobalColors,
                [customColorKey]: globals?.getCustomColors,
                [gradientColorKey]: globals?.getGradientColors,
                [customGradientColorKey]: globals?.getCustomGradientColors
            };
        }

        let typoData;
        if (type === 'all' || type === 'typography') {
            dispatch("essential-blocks").setGlobalTypography({});
            typoData = { [globalTypoKey]: {} }
        }
        else {
            typoData = { [globalTypoKey]: globals?.getGlobalTypography }
        }

        const allData = { ...colorsData, ...typoData }
        let response = updateGlobalStyle(allData);
        response
            .then((result) => {
                if (result) {
                    successNotice('Successfully reset global settings!')
                    setIsChanged(false)
                }
                else {
                    errorNotice('Unable to reset global settings.')
                }
                // Handle the resolved value of the promise
            })
            .catch((error) => {
                // Handle errors
                errorNotice('Unable to reset global settings.')
            });
    }

    return (
        <>
            <PluginSidebar
                className="eb-global-controls"
                icon={<EBIcon />}
                name="eb-global-controls"
                title={__("EB Global Controls", "essential-blocks")}
            >
                <div className="eb-panel-control">
                    <PanelBody
                        title={__("Global Color", "essential-blocks")}
                        initialOpen={true}
                    >
                        <TabPanel
                            className="eb-global-color-tab-panel"
                            activeClass="active-tab"
                            tabs={[
                                {
                                    name: "solid",
                                    title: "Solid",
                                    className: "eb-tab solid",
                                },
                                {
                                    name: "gradient",
                                    title: "Gradient",
                                    className: "eb-tab gradient",
                                }
                            ]}
                        >
                            {(tab) => (
                                <div className={"eb-tab-control-item eb-tab-controls-" + tab.name}>
                                    {tab.name === "solid" && (
                                        <>
                                            <PanelColorSettings
                                                title={__(
                                                    "Global Colors",
                                                    "essential-blocks"
                                                )}
                                                className={"eb-color-panel eb-global-color-panel"}
                                                initialOpen={true}
                                                disableAlpha={true}
                                                disableCustomGradients={false}
                                                colorSettings={colorPanelArray(globalColors, setGlobalColor, localizeColors)}
                                            />

                                            {customColors && customColors.length > 0 && (
                                                <ColorPalletWrapper
                                                    customColors={customColors}
                                                    setCustomColors={setCustomColors}
                                                    setIsChanged={setIsChanged}
                                                />
                                            )}
                                            <div className="eb-add-btn add-custom-color">
                                                <Button
                                                    className="eb-add-btn__button add-custom-color-btn"
                                                    onClick={() => {
                                                        setIsChanged(true) //global settings is changed
                                                        setCustomColors([
                                                            ...customColors,
                                                            {
                                                                color: '#000000',
                                                                name: `Custom Color ${customColors.length + 1}`,
                                                                slug: `custom-color-${customColors.length + 1}`,
                                                                var: `--eb-custom-color-${customColors.length + 1}`
                                                            }
                                                        ])
                                                    }}
                                                >Add Custom Color <Dashicon icon={"plus"} /></Button>
                                            </div>
                                        </>
                                    )}
                                    {tab.name === "gradient" && (
                                        <>
                                            {/* Gradient Color Pallet */}
                                            <GradientColorPallet
                                                title={"Gradient Colors"}
                                                colors={gradientColors}
                                                setColor={setGradientColor}
                                                setColors={setGradientColors}
                                                wrapperClass={"eb-gradient-color-panel"}
                                                resetAction={true}
                                            />

                                            {/* Custom Gradient Color Pallet */}
                                            <GradientColorPallet
                                                title={"Custom Gradient Colors"}
                                                colors={customGradientColors}
                                                setColor={setCustomGradientColor}
                                                setColors={setCustomGradientColors}
                                                wrapperClass={"eb-custom-gradient-color-panel"}
                                                resetAction={true}
                                                deleteAction={true}
                                                enableEditName={true}
                                                onDelete={deleteCustomGradientColor}
                                            />

                                            <div className="eb-add-btn add-custom-color">
                                                <Button
                                                    className="eb-add-btn__button add-custom-color-btn"
                                                    onClick={() => setCustomGradientColors([
                                                        ...customGradientColors,
                                                        {
                                                            color: 'linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(155, 81, 224) 100%)',
                                                            name: `Custom Color ${customGradientColors.length + 1}`,
                                                            slug: `custom-gradient-color-${customGradientColors.length + 1}`,
                                                            var: `--eb-custom-gradient-color-${customGradientColors.length + 1}`
                                                        }
                                                    ])}
                                                >Add Custom Color <Dashicon icon={"plus"} /></Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </TabPanel>

                        <div className='global-controls-save'>
                            <Button
                                variant="secondary"
                                className={`global-controls-reset`}
                                onClick={() => globalSettingsReset('color')}
                                label="Reset All Global Color"
                                showTooltip={true}
                                disabled={!isResetable('color')}
                            >
                                <Dashicon icon={"image-rotate"} /> Reset
                            </Button>
                            <Button
                                variant="primary"
                                className={`global-controls-save-btn`}
                                disabled={!isChanged}
                                onClick={() => globalSettingsSave()}
                            >
                                <Dashicon icon={"database-export"} /> Save Settings
                            </Button>
                        </div>
                    </PanelBody>


                    <PanelBody
                        title={__("Global Typography", "essential-blocks")}
                        initialOpen={true}
                    >
                        <TypographySettings
                            isChanged={isChanged}
                            setIsChanged={setIsChanged}
                            globalSettingsSave={globalSettingsSave}
                            globalSettingsReset={globalSettingsReset}
                            isResetable={isResetable}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__("Block Defaults", "essential-blocks")}
                        initialOpen={false}
                    >
                        <div className="eb-block-list-button">
                            {typeof registeredBlocks === "object" &&
                                Object.keys(components).map((item, index) => (
                                    <div className="eb-block-button" key={index}>
                                        <Button
                                            variant="none"
                                            className="eb-block-default-button"
                                            onClick={() =>
                                                toggleVisible(
                                                    registeredBlocks[item].value
                                                )
                                            }
                                        >
                                            <img
                                                className="eb-global-icon"
                                                src={registeredBlocks[item]?.icon}
                                                alt={registeredBlocks[item]?.label}
                                            />
                                            {registeredBlocks[item]?.label}

                                            {getBlockDefaults[item] && (
                                                <span className="active">
                                                    {" "}
                                                    {__(<Dashicon icon={"edit"} />)}
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                ))}
                        </div>
                    </PanelBody>
                </div>
            </PluginSidebar>

            {isVisible && (
                <Popover
                    anchor={popoverAnchor}
                    className="eb-block-default-popup"
                >
                    <Button
                        className="btn-block-default btn-block-default-close"
                        onClick={() => handleCloseWithoutSave(clickedBlock)}
                    >
                        <Dashicon icon={"no"} />
                    </Button>
                    {allBlocksKeys.includes(clickedBlock) && (
                        <>
                            <div
                                id="eb-preview"
                                className="eb-block-default-preveiw-wrapper"
                            >
                                <div className="eb-block-default-heading">
                                    <span>
                                        {
                                            EssentialBlocksLocalize
                                                .all_blocks_default[
                                                clickedBlock
                                            ].label
                                        }{" "}
                                        Preview
                                    </span>
                                </div>

                                {components[clickedBlock].preview && activedBlocks[clickedBlock].visibility === "true" && (
                                    <BlockPreview
                                        blocks={createBlock(
                                            `essential-blocks/${registeredBlocks[clickedBlock]?.is_pro ? 'pro-' : ''}${clickedBlock.replace(/_/g, "-")}`,
                                            {
                                                ...previewData(
                                                    clickedBlock
                                                ),
                                            }
                                        )}
                                        viewportWidth={1100}
                                    />
                                )}

                                {activedBlocks[clickedBlock].visibility === "false" && (
                                    <p className="preview-not-available">
                                        {registeredBlocks[clickedBlock].label}{" "}
                                        Block isn't Enabled!
                                    </p>
                                )}

                                {!components[clickedBlock].preview && (
                                    <p className="preview-not-available">
                                        Preview not available
                                    </p>
                                )}

                                <div className="block-default-popup-footer">
                                    <Button
                                        className="btn-block-default-reset btn-block-default-link"
                                        onClick={() =>
                                            handleResetBlockDefault(
                                                clickedBlock
                                            )
                                        }
                                    >
                                        Reset
                                    </Button>

                                    <Button
                                        className="btn-block-default-link"
                                        onClick={() =>
                                            handleSaveInsert(
                                                clickedBlock
                                            )
                                        }
                                    >
                                        Save & Insert
                                    </Button>

                                    <Button
                                        className="btn-block-default-save"
                                        onClick={() => handleSaveBlockDefault()}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                            <div className="eb-block-default">
                                <ClickedComponent
                                    blockDefaults={blockDefaults[clickedBlock] || {}}
                                    setBlockDefaults={setBlockItemDefaults}
                                    name={clickedBlock}
                                    deviceType={deviceType}
                                    handleBlockDefault={handleBlockDefault}
                                />
                            </div>
                        </>
                    )}
                    {!allBlocksKeys.includes(clickedBlock) && (
                        <h3>Block Default Controls not available</h3>
                    )}
                </Popover>
            )}
        </>
    );
}

export default withSelect((select) => {
    return {
        ...getGlobalSettings(select),
        getBlockDefaults: select('essential-blocks').getBlockDefaults() || {}
    };
})(EBGlobalControls);
