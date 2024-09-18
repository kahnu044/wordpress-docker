/**
 * Dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect, useCallback } from "@wordpress/element";
import {
    Popover,
    Dashicon,
    GradientPicker,
    ColorIndicator,
    PanelRow,
    SelectControl,
    RangeControl,
    TabPanel,
    Button,
    TextControl,
    __experimentalNavigatorProvider as NavigatorProvider,
    __experimentalNavigatorScreen as NavigatorScreen,
    __experimentalNavigatorButton as NavigatorButton,
    __experimentalNavigatorBackButton as NavigatorBackButton,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { dispatch, useSelect, withSelect } from "@wordpress/data";

import {
    FontFamilyPicker,
    UnitControl,
    ResetControl,
    WithResButtons,
    useDeviceType
} from "@essential-blocks/controls";

import {
    sizeUnitTypes,
    sizeUnitTypes2,
    optionsFontWeights,
    optionsFontStyles,
    optionsTextTransforms,
    optionsTextDecorations,
    TypographyElements,
    TypographyHeadingElements
} from './constants'


const UnitRangeControl = ({ label, unitTypes, itemKey, data, step, setTypo, deviceType }) => {
    let rangeKey = itemKey
    let unitKey = `${itemKey}Unit`;
    let unit = data?.[unitKey] || 'px';
    let rangeValue = data?.[rangeKey];
    const unitKeyDesktop = unitKey

    if (deviceType === 'Tablet') {
        rangeKey = `TAB${itemKey}`
        unitKey = `TAB${itemKey}Unit`;
        unit = data?.[unitKey] || data?.[unitKeyDesktop] || 'px';
        rangeValue = data?.[rangeKey];
    }
    else if (deviceType === 'Mobile') {
        rangeKey = `MOB${itemKey}`
        unitKey = `MOB${itemKey}Unit`;
        unit = data?.[unitKey] || data?.[unitKeyDesktop] || 'px';
        rangeValue = data?.[rangeKey];
    }

    return (
        <>
            <UnitControl
                selectedUnit={unit}
                unitTypes={unitTypes}
                onClick={(value) => {
                    setTypo(unitKey, value)
                }}
            />
            <ResetControl
                onReset={() => setTypo(rangeKey)}
            >
                <RangeControl
                    label={__(
                        label,
                        "essential-blocks"
                    )}
                    value={rangeValue}
                    onChange={(value) => setTypo(rangeKey, value)}
                    step={step ? step : unit === "em" ? 0.1 : 1}
                    min={0}
                    max={unit === "em" ? 10 : 300}
                />
            </ResetControl>
        </>
    )
}

const TypographyOptions = ({ element, typography, setTypography, hideFontFamily = false }) => {
    const deviceType = useDeviceType()

    //Function to seet Typography by key
    const setTypo = (key, value = false) => {
        const typo = { ...typography }
        typo[element] = {
            ...typography[element],
            [key]: value
        }
        if (!value) {
            delete typo[element][key]
        }
        setTypography({ ...typo })
    }

    return (
        <div className="eb-typography-control-wrapper">
            <FontFamilyPicker
                className="eb-fontpicker-fontfamily"
                label={__("Font Family", "essential-blocks")}
                value={typography[element]?.fontFamily || ''}
                onChange={(fontFamily) => setTypo('fontFamily', fontFamily)}
            />
            {!hideFontFamily && (
                <WithResButtons
                    className="global-font-size"
                >
                    <UnitRangeControl
                        label={"Font Size"}
                        unitTypes={sizeUnitTypes}
                        itemKey={'fontSize'}
                        data={typography[element]}
                        setTypo={setTypo}
                        deviceType={deviceType}
                    />
                </WithResButtons>
            )}

            <SelectControl
                label={__("Font Weight", "essential-blocks")}
                value={typography[element]?.fontWeight}
                options={optionsFontWeights}
                onChange={(fontWeight) => setTypo('fontWeight', fontWeight)}
            />

            <SelectControl
                label={__("Font Style", "essential-blocks")}
                value={typography[element]?.fontStyle}
                options={optionsFontStyles}
                onChange={(fontStyle) => setTypo('fontStyle', fontStyle)}
            />

            <SelectControl
                label={__("Text Transform", "essential-blocks")}
                value={typography[element]?.textTransform}
                options={optionsTextTransforms}
                onChange={(textTransform) => setTypo('textTransform', textTransform)}
            />

            <SelectControl
                label={__("Text Decoration", "essential-blocks")}
                value={typography[element]?.textDecoration}
                options={optionsTextDecorations}
                onChange={(textDecoration) => setTypo('textDecoration', textDecoration)}
            />

            <WithResButtons
                className="global-letter-spacing"
            >
                <UnitRangeControl
                    label={"Letter Spacing"}
                    unitTypes={sizeUnitTypes2}
                    itemKey={'letterSpacing'}
                    data={typography[element]}
                    setTypo={setTypo}
                    step='0.1'
                    deviceType={deviceType}
                />
            </WithResButtons>

            <WithResButtons
                className="global-line-height"
            >
                <UnitRangeControl
                    label={"Line Height"}
                    unitTypes={sizeUnitTypes2}
                    itemKey={'lineHeight'}
                    data={typography[element]}
                    setTypo={setTypo}
                    step='0.1'
                    deviceType={deviceType}
                />
            </WithResButtons>
        </div>
    )
}

const TypographySettings = (props) => {
    const {
        getGlobalTypography
    } = props

    const [typography, setTypography] = useState({});
    const [customTypography, setCustomTypography] = useState({});
    const [selectedHeading, setSelectedHeading] = useState('allHeadings');
    const [isMount, setIsMount] = useState(false);

    //Set Typography & CustomTypography when Store "getGlobalTypography" is changed
    useEffect(() => {
        if (JSON.stringify(getGlobalTypography) !== JSON.stringify(typography)) {
            setTypography(getGlobalTypography);
            if (getGlobalTypography.custom) {
                setCustomTypography(getGlobalTypography.custom)
            }
        }
        setIsMount(true)
    }, [getGlobalTypography]);

    useEffect(() => {
        if (isMount && typeof customTypography === 'object') {
            setTypography({
                ...typography,
                custom: { ...customTypography }
            });
        }
    }, [customTypography])

    //Update Store when "typography" is changed
    useEffect(() => {
        if (isMount && typeof typography === 'object') {
            dispatch("essential-blocks").setGlobalTypography(typography);
            dispatch('essential-blocks').setIsSaving(true);
        }
    }, [typography]);

    const changeCustomTypoName = (key, value) => {
        let typoObj = { ...customTypography }
        typoObj[key].name = value
        setCustomTypography({ ...typoObj })
    }

    const deleteItem = (item) => {
        const typography = { ...customTypography }
        delete typography[item]
        setCustomTypography({ ...typography })
    };

    const generateFontObj = (font, size = false) => {
        let result = {}
        if (typeof font === 'object' && Object.keys(font).length > 0) {
            result = {
                ...(font.fontFamily && { fontFamily: font.fontFamily }),
                ...(font.fontWeight && { fontWeight: font.fontWeight }),
                ...(font.textTransform && { textTransform: font.textTransform }),
                ...(font.fontStyle && { fontStyle: font.fontStyle }),
                ...(font.textDecoration && { textDecoration: font.textDecoration }),
                ...(font.letterSpacing && { letterSpacing: `${font.letterSpacing}${font.letterSpacingUnit || 'px'}` }),
                ...((size && font.fontSize) && { fontSize: `${font.fontSize}${font.fontSizeUnit || 'px'}` })
            }
        }
        return result
    }

    const isHeadingSaved = () => {
        const typoKeys = typography ? Object.keys(typography) : []
        if (typoKeys.length > 0) {
            return typoKeys.some((str) => str.startsWith('h'));
        }
        return false
    }

    return (
        <div className="eb-global-typography">
            <TabPanel
                className="eb-global-color-tab-panel"
                activeClass="active-tab"
                tabs={[
                    {
                        name: "elements",
                        title: "Elements",
                        className: "eb-tab solid",
                    },
                    {
                        name: "custom",
                        title: "Custom",
                        className: "eb-tab gradient",
                    }
                ]}
            >
                {(tab) => (
                    <div className={"eb-tab-control-item eb-tab-controls-" + tab.name}>
                        {tab.name === "elements" && (
                            <div className={'eb-custom-panel eb-global-typography-wrapper'}>
                                <NavigatorProvider initialPath="/">
                                    <NavigatorScreen path="/">
                                        {/* <p>Select Element to set Typography</p> */}
                                        {TypographyElements && Object.keys(TypographyElements).map((item, index) => (
                                            <div
                                                key={index}
                                                className="eb-custom-element eb-global-typography-element"
                                            >
                                                <NavigatorButton
                                                    path={`/${item}`}
                                                >
                                                    <span
                                                        style={generateFontObj(typography[item])}
                                                        className="font_preview"
                                                    >Aa</span>
                                                    {TypographyElements[item]}
                                                    {(typography[item] || (item === 'heading' && isHeadingSaved())) && (
                                                        <span className="edit_indecator"></span>
                                                    )}
                                                </NavigatorButton>
                                            </div>
                                        ))}
                                    </NavigatorScreen>

                                    {TypographyElements && Object.keys(TypographyElements).map((item, index) => (
                                        <div
                                            key={index}
                                            className="eb-global-typography-element-content"
                                        >
                                            <NavigatorScreen path={`/${item}`}>
                                                <NavigatorBackButton>
                                                    <Dashicon icon="arrow-left-alt2" /> {TypographyElements[item]}
                                                </NavigatorBackButton>
                                                {/* <p className="note">Typography Controls for <strong>{TypographyElements[item]}</strong></p> */}
                                                {item === 'heading' && (
                                                    <>
                                                        <ToggleGroupControl
                                                            __nextHasNoMarginBottom
                                                            isBlock
                                                            label="Select Heading"
                                                            value={selectedHeading}
                                                            hideLabelFromVision={true}
                                                            onChange={(value) => setSelectedHeading(value)}
                                                        >
                                                            {TypographyHeadingElements && Object.keys(TypographyHeadingElements).map((heading, headingIndex) => (
                                                                <ToggleGroupControlOption
                                                                    key={headingIndex}
                                                                    className={`eb-global-typography-element-heading ${typography[heading] ? 'edited' : ''}`}
                                                                    label={TypographyHeadingElements[heading]}
                                                                    value={heading}
                                                                />
                                                            ))}
                                                        </ToggleGroupControl>
                                                        {TypographyHeadingElements && Object.keys(TypographyHeadingElements).map((heading, headingIndex) => (
                                                            <div
                                                                key={headingIndex}
                                                                style={{ display: heading === selectedHeading ? 'block' : 'none' }}
                                                            >
                                                                <div
                                                                    style={generateFontObj(typography[heading], true)}
                                                                    className="font_preview_box"
                                                                >Aa</div>
                                                                <TypographyOptions
                                                                    element={heading}
                                                                    typography={typography}
                                                                    hideFontFamily={heading === 'allHeadings' ? true : false}
                                                                    setTypography={setTypography}
                                                                />
                                                            </div>
                                                        ))}
                                                    </>
                                                )}

                                                {item !== 'heading' && (
                                                    <>
                                                        <div
                                                            style={generateFontObj(typography[item], true)}
                                                            className="font_preview_box"
                                                        >Aa</div>
                                                        <TypographyOptions
                                                            element={item}
                                                            typography={typography}
                                                            setTypography={setTypography}
                                                        />
                                                    </>
                                                )}


                                            </NavigatorScreen>
                                        </div>
                                    ))}
                                </NavigatorProvider >
                            </div>
                        )}
                        {tab.name === "custom" && (
                            <div className={'eb-custom-panel eb-custom-typography-wrapper'}>
                                {customTypography && typeof customTypography === 'object' && (
                                    <NavigatorProvider initialPath="/">
                                        <NavigatorScreen path="/">
                                            <div>
                                                {Object.keys(customTypography).length > 0 && Object.keys(customTypography).map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="eb-custom-element eb-global-typography-element"
                                                    >
                                                        <NavigatorButton
                                                            path={`/${item}`}
                                                        >
                                                            <span
                                                                style={generateFontObj(customTypography[item])}
                                                                className="font_preview"
                                                            >Aa</span>
                                                            {customTypography[item]?.name}
                                                        </NavigatorButton>
                                                        <button
                                                            className={'eb-delete-item'}
                                                            onClick={() => deleteItem(item)}
                                                        >
                                                            <Dashicon icon="trash" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="eb-add-btn add-custom-typography">
                                                <Button
                                                    className="eb-add-btn__button add-custom-typography-btn"
                                                    onClick={() => setCustomTypography({
                                                        ...customTypography,
                                                        [`ebcustomtypo_${Math.random().toString(36).substring(2, 7)}`]: {
                                                            name: `Custom Typography`,
                                                        }
                                                    })}
                                                >Add Custom Typography <Dashicon icon={"plus"} /></Button>
                                            </div>
                                        </NavigatorScreen>

                                        {Object.keys(customTypography).length > 0 && Object.keys(customTypography).map((item, index) => (
                                            <div
                                                key={index}
                                                className="eb-global-typography-element-content"
                                            >
                                                <NavigatorScreen path={`/${item}`}>
                                                    <NavigatorBackButton>
                                                        <Dashicon icon="arrow-left-alt2" /> {customTypography[item]?.name}
                                                    </NavigatorBackButton>
                                                    <p className="note">Typography Controls for <strong>{customTypography[item]?.name}</strong></p>

                                                    <TextControl
                                                        label="Typography Name"
                                                        value={customTypography[item]?.name}
                                                        onChange={(value) => changeCustomTypoName(item, value)}
                                                    />

                                                    <div
                                                        style={generateFontObj(customTypography[item], true)}
                                                        className="font_preview_box"
                                                    >Aa</div>
                                                    <TypographyOptions
                                                        element={item}
                                                        typography={customTypography}
                                                        setTypography={setCustomTypography}
                                                    />
                                                </NavigatorScreen>
                                            </div>
                                        ))}
                                    </NavigatorProvider >
                                )}
                            </div>
                        )}
                    </div>
                )
                }
            </TabPanel >
        </div >
    )
}

export default withSelect((select) => {
    return {
        getGlobalTypography: select("essential-blocks").getGlobalTypography()
    };
})(TypographySettings);
