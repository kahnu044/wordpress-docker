/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { applyFilters } from "@wordpress/hooks";
import {
    SelectControl,
    ToggleControl,
    RangeControl,
    BaseControl,
    __experimentalDivider as Divider,
    PanelRow,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    ColorControl,
    ResponsiveRangeController,
    ResponsiveDimensionsControl,
    TypographyDropdown,
    BorderShadowControl,
    InspectorPanel,
    EBIconPicker,
    EBTextControl,
    EBTextareaControl,
    ImageComponent,
    SortControl,
    ButtonGroupControl,
    DynamicInputControl,
    ProSelectControl,
} from "@essential-blocks/controls";

import {
    HOTSPOT_ANIMATIONS,
    HOTSPOT_MARKER_TYPES,
    TOOLTIP_POSITIONS,
    TOOLTIP_TRIGGERS,
    TOOLTIP_ANIMATIONS,
    HOTSPOT_SIZE_RANGE,
    TOOLTIP_WIDTH_RANGE,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    HOTSPOT_PADDING,
    TOOLTIP_PADDING,
    WRAPPER_BG,
    WRAPPER_BORDER_SHADOW,
    HOTSPOT_BORDER_SHADOW,
    TOOLTIP_BORDER_SHADOW,
    CONTENT_TYPE,
    MEDIA_TYPES,
    HOTSPOT_ICON_SIZE,
    HOTSPOT_ICON_WIDTH,
    TOOLTIP_TITLE_TYPOGRAPHY,
    TOOLTIP_CONTENT_TYPOGRAPHY,
    HOTSPOT_TEXT_TYPOGRAPHY,
    HOTSPOT_NUMBER_SIZE,
    HOTSPOT_DOT_WIDTH,
    HOTSPOT_DOT_HEIGHT,
    TOOLTIP_OFFSET,
    TOOLTIP_ARROW_SIZE,
    TOOLTIP_CONTNET_ALIGNMENT,
    IMAGE_WIDTH,
    IMAGE_ALIGNMENT,
    IMAGE_ALIGN
} from "./constants";

function Inspector({
    attributes,
    setAttributes,
    selectedHotspotId = null, // Add this prop to receive the selected hotspot ID from edit.js
}) {
    const {
        hotspots,
        globalTooltipTrigger,
        globalTooltipPosition,
        globalTooltipAnimation,
        globalMarkerColor,
        globalMarkerBgColor,
        globalTooltipBgColor,
        globalTooltipTitleColor,
        globalTooltipContentColor,
        tooltipShowArrow,
        alwaysVisibleTooltip,
        globalAnimation,
        glowColor,
        globalTooltipAlignment,
        globalTooltipContentGap,
        globalTooltipIconSize,
        globalTooltipIconColor,
    } = attributes;

    // State to track which hotspot settings panel should be opened
    const [activeSettingsId, setActiveSettingsId] = useState(null);

    // Convert selectedHotspotId to SortControl position-based ID
    useEffect(() => {
        if (selectedHotspotId && hotspots.length > 0) {
            // Find the position of the hotspot with the given ID
            const hotspotIndex = hotspots.findIndex(hotspot => hotspot.id === selectedHotspotId);
            if (hotspotIndex !== -1) {
                // SortControl uses 1-based indexing
                setActiveSettingsId(hotspotIndex + 1);
            } else {
                // If the hotspot doesn't exist, clear the active settings
                setActiveSettingsId(null);
            }
        } else {
            setActiveSettingsId(null);
        }
    }, [selectedHotspotId, hotspots]);

    // Add new hotspot function for SortControl
    const onHotspotAdd = () => {
        const count = hotspots.length + 1;
        const newHotspot = {
            id: `hotspot_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            x: 50,
            y: 50,
            contentType: "content",
            markerType: "icon",
            icon: "fas fa-plus",
            text: `Hotspot ${count}`,
            number: count,
            enableTooltip: false,
            tooltipContent: `Hotspot ${count} content`,
            tooltipTitle: `Hotspot ${count} title`,
            mediaType: "none",
            tooltipContentIcon: "fas fa-plus",
            tooltipContentImage: "",
            tooltipContentImageAlt: "",
            tooltipContentImageId: "",
            link: "",
            linkNewTab: false,
            addNofollow: false,
        };

        setAttributes({
            hotspots: [...hotspots, newHotspot],
        });
    };

    // Handle hotspot changes from SortControl
    const onHotspotChange = (key, value, position) => {
        const newHotspotList = [...hotspots];
        const newHotspot = { ...hotspots[position] };

        if (Array.isArray(key)) {
            key.map((item, index) => {
                newHotspot[item] = value[index];
            });
        } else {
            newHotspot[key] = value;
        }

        newHotspotList[position] = newHotspot;
        setAttributes({ hotspots: newHotspotList });
    };

    // Generate hotspot settings components for SortControl
    const getHotspotsComponents = () => {
        return hotspots.map((hotspot, index) => (
            <div key={hotspot.id}>
                <ButtonGroupControl
                    label={__("", "essential-blocks")}
                    options={CONTENT_TYPE}
                    currentValue={hotspot.contentType}
                    attrName="contentType"
                    onChange={(contentType) => onHotspotChange("contentType", contentType, index)}
                />

                {hotspot.contentType === 'content' && (
                    <>
                        <ButtonGroupControl
                            label={__("Marker Type", "essential-blocks")}
                            options={HOTSPOT_MARKER_TYPES}
                            currentValue={hotspot.markerType}
                            attrName="markerType"
                            onChange={(markerType) => onHotspotChange("markerType", markerType, index)}
                        />

                        {hotspot.markerType === 'icon' && (
                            <EBIconPicker
                                label={__("Select Icon", "essential-blocks")}
                                value={hotspot.icon}
                                onChange={(icon) => onHotspotChange("icon", icon, index)}
                            />
                        )}

                        {hotspot.markerType === 'text' && (
                            <EBTextControl
                                label={__("Marker Text", "essential-blocks")}
                                value={hotspot.text}
                                onChange={(text) => onHotspotChange("text", text, index)}
                            />
                        )}

                        {hotspot.markerType === 'number' && (
                            <RangeControl
                                label={__("Number", "essential-blocks")}
                                value={hotspot.number}
                                onChange={(number) => onHotspotChange("number", number, index)}
                                min={1}
                                max={999}
                            />
                        )}
                    </>
                )}

                {hotspot.contentType === 'position' && (
                    <>
                        <RangeControl
                            label={__("X Position", "essential-blocks")}
                            value={hotspot.x}
                            onChange={(x) => onHotspotChange("x", x, index)}
                            min={0}
                            max={100}
                        />
                        <RangeControl
                            label={__("Y Position", "essential-blocks")}
                            value={hotspot.y}
                            onChange={(y) => onHotspotChange("y", y, index)}
                            min={0}
                            max={100}
                        />
                    </>
                )}

                {hotspot.contentType === 'tooltip' && (
                    <>
                        <ToggleControl
                            label={__("Enable Tooltip", "essential-blocks")}
                            checked={hotspot.enableTooltip}
                            onChange={(enableTooltip) => onHotspotChange("enableTooltip", enableTooltip, index)}
                        />
                        {hotspot.enableTooltip && (
                            <>
                                <ButtonGroupControl
                                    label={__("Media Type", "essential-blocks")}
                                    options={MEDIA_TYPES}
                                    currentValue={hotspot.mediaType}
                                    attrName="mediaType"
                                    onChange={(mediaType) => onHotspotChange("mediaType", mediaType, index)}
                                />

                                {hotspot.mediaType === 'icon' && (
                                    <EBIconPicker
                                        label={__("Select Icon", "essential-blocks")}
                                        value={hotspot.tooltipContentIcon}
                                        onChange={(tooltipContentIcon) => onHotspotChange("tooltipContentIcon", tooltipContentIcon, index)}
                                    />
                                )}
                                {hotspot.mediaType === 'image' && (
                                    <>
                                        <ImageComponent.GeneralTab
                                            onSelect={({ id, url, alt }) => {
                                                onHotspotChange(["tooltipContentImageId", "tooltipContentImage", "tooltipContentImageAlt"], [id, url, alt], index);
                                            }}
                                            onRemove={() => onHotspotChange("tooltipContentImage", "", index)}
                                            value={hotspot.tooltipContentImage}
                                            hasTag={false}
                                            hasCaption={false}
                                            hasStyle={false}
                                            hasLink={false}
                                            showInPanel={false}
                                        />
                                    </>
                                )}
                                <EBTextControl
                                    label={__("Tooltip Title", "essential-blocks")}
                                    value={hotspot.tooltipTitle}
                                    onChange={(tooltipTitle) => onHotspotChange("tooltipTitle", tooltipTitle, index)}
                                />
                                <EBTextControl
                                    label={__("Tooltip Content", "essential-blocks")}
                                    value={hotspot.tooltipContent}
                                    onChange={(tooltipContent) => onHotspotChange("tooltipContent", tooltipContent, index)}
                                />
                            </>
                        )}
                    </>
                )}

                {/* <EBTextControl
                            label={__("Link URL", "essential-blocks")}
                            value={hotspot.link}
                            onChange={(link) => onHotspotChange("link", link, index)}
                            placeholder="https://"
                            fieldType="url"
                            showValidation={true}
                            enableSecurity={true}
                        /> */}
                <DynamicInputControl
                    label={__("Link URL", "essential-blocks")}
                    attrName="link"
                    inputValue={hotspot.link}
                    setAttributes={setAttributes}
                    onChange={(link) => onHotspotChange("link", link, index)}
                    help={__(
                        "Use https or http",
                        "essential-blocks"
                    )}
                    enableAi={false}
                    fieldType="url"
                    showValidation={true}
                    enableSecurity={true}
                />

                {hotspot.link && (
                    <>
                        <ToggleControl
                            label={__("Open in New Tab", "essential-blocks")}
                            checked={hotspot.linkNewTab}
                            onChange={(linkNewTab) => onHotspotChange("linkNewTab", linkNewTab, index)}
                        />
                        <ToggleControl
                            label={__("Add nofollow", "essential-blocks")}
                            checked={hotspot.addNofollow}
                            onChange={(addNofollow) => onHotspotChange("addNofollow", addNofollow, index)}
                        />
                    </>
                )}
            </div >
        ));
    };

    return (
        <InspectorPanel
            advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                paddingPrefix: WRAPPER_PADDING,
                backgroundPrefix: WRAPPER_BG,
                borderPrefix: WRAPPER_BORDER_SHADOW,
                hasMargin: true,
            }}
        >
            <InspectorPanel.General>
                <ImageComponent.GeneralTab
                    label={__("Image", "essential-blocks")}
                    showInPanel={true}
                    hasTag={false}
                    hasLink={false}
                    useImageAlign={true}
                    hasCaption={false}
                    hasWidth={true}
                    width={IMAGE_WIDTH}
                />

                <InspectorPanel.PanelBody
                    title={__("Hotspots", "essential-blocks")}
                    initialOpen={true}
                >
                    <SortControl
                        items={hotspots.map((hotspot, index) => ({
                            ...hotspot,
                            title: hotspot.text || `Hotspot ${index + 1}`,
                        }))}
                        labelKey="title"
                        onSortEnd={(sortedHotspots) => {
                            // Update hotspot numbers based on new order
                            const updatedHotspots = sortedHotspots.map((hotspot, index) => ({
                                ...hotspot,
                                number: index + 1,
                                text: `Hotspot ${index + 1}`,
                                tooltipTitle: `Hotspot ${index + 1} title`,
                                tooltipContent: `Hotspot ${index + 1} content`,
                            }));
                            setAttributes({ hotspots: updatedHotspots });
                        }}
                        onDeleteItem={(index) => {
                            const updatedHotspots = hotspots
                                .filter((_, i) => i !== index)
                                .map((hotspot, newIndex) => ({
                                    ...hotspot,
                                    number: newIndex + 1,
                                    text: `Hotspot ${newIndex + 1}`,
                                    tooltipTitle: `Hotspot ${newIndex + 1} title`,
                                    tooltipContent: `Hotspot ${newIndex + 1} content`,
                                }));
                            setAttributes({ hotspots: updatedHotspots });
                        }}
                        hasSettings={true}
                        settingsComponents={getHotspotsComponents()}
                        hasAddButton={true}
                        onAddItem={onHotspotAdd}
                        defaultShowItemId={activeSettingsId} // Add this line to open the selected hotspot's panel
                        addButtonText={__("Add Hotspot", "essential-blocks")}
                    />

                    <Divider />
                    <ProSelectControl
                        label={__("Marker Animation", "essential-blocks")}
                        value={globalAnimation}
                        options={HOTSPOT_ANIMATIONS}
                        onChange={(globalAnimation) => setAttributes({ globalAnimation })}
                    />

                    {globalAnimation === 'glow' && (
                        <ColorControl
                            label={__("Glow Color", "essential-blocks")}
                            color={glowColor}
                            onChange={(glowColor) => setAttributes({ glowColor })}
                        />
                    )}
                </InspectorPanel.PanelBody>

                <InspectorPanel.PanelBody
                    title={__("Tooltip", "essential-blocks")}
                    initialOpen={false}
                >
                    {globalTooltipTrigger !== 'follow-cursor' && (
                        <ToggleControl
                            label={__("Show Arrow", "essential-blocks")}
                            checked={tooltipShowArrow}
                            onChange={(tooltipShowArrow) => setAttributes({ tooltipShowArrow })}
                        />
                    )}

                    <SelectControl
                        label={__("Position", "essential-blocks")}
                        value={globalTooltipPosition}
                        options={TOOLTIP_POSITIONS}
                        onChange={(globalTooltipPosition) => setAttributes({ globalTooltipPosition })}
                    />

                    <ToggleControl
                        label={__("Always Visible Tooltip", "essential-blocks")}
                        checked={alwaysVisibleTooltip}
                        onChange={(alwaysVisibleTooltip) => setAttributes({ alwaysVisibleTooltip })}
                    />

                    {!alwaysVisibleTooltip && (
                        <>
                            <ProSelectControl
                                label={__("Trigger", "essential-blocks")}
                                value={globalTooltipTrigger}
                                options={TOOLTIP_TRIGGERS}
                                onChange={(globalTooltipTrigger) => setAttributes({ globalTooltipTrigger, tooltipShowArrow: globalTooltipTrigger === 'follow-cursor' ? false : tooltipShowArrow })}
                                help={
                                    (globalTooltipTrigger === 'click' && __("Note: Hotspot Link will not work with this trigger.", "essential-blocks")) ||
                                    (globalTooltipTrigger === 'follow-cursor' && __("Follow cursor is only show in frontend.", "essential-blocks")) ||
                                    (globalTooltipTrigger === 'scroll' && __("Scroll trigger is only show in frontend.", "essential-blocks")) ||
                                    (globalTooltipTrigger === 'double-click' && __("Double click trigger is only show in frontend. Note: Hotspot Link will not work with this trigger.", "essential-blocks"))
                                }
                            />

                            <ProSelectControl
                                label={__("Animation", "essential-blocks-pro")}
                                value={globalTooltipAnimation}
                                options={TOOLTIP_ANIMATIONS}
                                onChange={(globalTooltipAnimation) => setAttributes({ globalTooltipAnimation })}
                            />

                            {applyFilters("eb_image_hotspot_pro_tooltip_animation", "", attributes, setAttributes)}
                        </>
                    )}
                </InspectorPanel.PanelBody>
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <ImageComponent.StyleTab
                    hasBackground={false}
                    hasBorder={true}
                    hasRadius={true}
                    hasFilter={false}
                    hasWidth={true}
                    width={IMAGE_WIDTH}
                    hasHeight={true}
                    hasAutoHeight={false}
                    hasCaption={false}
                />

                <InspectorPanel.PanelBody
                    title={__("Hotspots", "essential-blocks")}
                    initialOpen={false}
                >
                    <ColorControl
                        label={__("Background", "essential-blocks")}
                        color={globalMarkerBgColor}
                        onChange={(globalMarkerBgColor) => setAttributes({ globalMarkerBgColor })}
                    />
                    <ColorControl
                        label={__("Content Color", "essential-blocks")}
                        color={globalMarkerColor}
                        onChange={(globalMarkerColor) => setAttributes({ globalMarkerColor })}
                    />
                    <BaseControl>
                        <h3 className="eb-control-title">{__("Border", "essential-blocks")}</h3>
                    </BaseControl>
                    <BorderShadowControl
                        controlName={HOTSPOT_BORDER_SHADOW}
                        noShadow
                    />
                    <ResponsiveDimensionsControl
                        controlName={HOTSPOT_PADDING}
                        baseLabel={__("Padding", "essential-blocks")}
                    />

                    <Divider />
                    <PanelRow>{__("Dot", "essential-blocks")}</PanelRow>
                    <ResponsiveRangeController
                        baseLabel={__("Width", "essential-blocks")}
                        controlName={HOTSPOT_DOT_WIDTH}
                        min={10}
                        max={500}
                        step={1}
                    />
                    <ResponsiveRangeController
                        baseLabel={__("Height", "essential-blocks")}
                        controlName={HOTSPOT_DOT_HEIGHT}
                        min={10}
                        max={500}
                        step={1}
                    />
                    <PanelRow>{__("Icon", "essential-blocks")}</PanelRow>
                    <ResponsiveRangeController
                        baseLabel={__("Width", "essential-blocks")}
                        controlName={HOTSPOT_ICON_WIDTH}
                        min={10}
                        max={500}
                        step={1}
                    />
                    <ResponsiveRangeController
                        baseLabel={__("Size", "essential-blocks")}
                        controlName={HOTSPOT_ICON_SIZE}
                        min={10}
                        max={200}
                        step={1}
                    />
                    <PanelRow>{__("Number", "essential-blocks")}</PanelRow>
                    <ResponsiveRangeController
                        baseLabel={__("Size", "essential-blocks")}
                        controlName={HOTSPOT_NUMBER_SIZE}
                        min={10}
                        max={200}
                        step={1}
                    />
                    <PanelRow>{__("Text", "essential-blocks")}</PanelRow>
                    <TypographyDropdown
                        baseLabel={__("Typography", "essential-blocks")}
                        typographyPrefixConstant={HOTSPOT_TEXT_TYPOGRAPHY}
                    />
                </InspectorPanel.PanelBody>

                <InspectorPanel.PanelBody
                    title={__("Tooltip", "essential-blocks")}
                    initialOpen={false}
                >
                    {tooltipShowArrow && (
                        <ResponsiveRangeController
                            baseLabel={__("Arrow Size", "essential-blocks-pro")}
                            controlName={TOOLTIP_ARROW_SIZE}
                            min={1}
                            max={100}
                            step={1}
                        />
                    )}
                    <ResponsiveRangeController
                        baseLabel={__("Tooltip Offset", "essential-blocks-pro")}
                        controlName={TOOLTIP_OFFSET}
                        min={0}
                        max={50}
                        step={1}
                    />
                    <ColorControl
                        label={__("Background", "essential-blocks")}
                        color={globalTooltipBgColor}
                        onChange={(globalTooltipBgColor) => setAttributes({ globalTooltipBgColor })}
                    />
                    <ResponsiveRangeController
                        baseLabel={__("Width", "essential-blocks")}
                        controlName={TOOLTIP_WIDTH_RANGE}
                        min={10}
                        max={500}
                        step={1}
                    />
                    <ResponsiveDimensionsControl
                        controlName={TOOLTIP_PADDING}
                        baseLabel={__("Padding", "essential-blocks")}
                    />

                    <ResponsiveDimensionsControl
                        controlName={TOOLTIP_BORDER_SHADOW}
                        baseLabel={__("Border Radius", "essential-blocks")}
                    />

                    <Divider />
                    <ButtonGroupControl
                        label={__("Alignment", "essential-blocks")}
                        attrName="globalTooltipAlignment"
                        options={TOOLTIP_CONTNET_ALIGNMENT}
                        currentValue={globalTooltipAlignment}
                    />
                    <RangeControl
                        label={__("Content Gap", "essential-blocks")}
                        value={globalTooltipContentGap}
                        onChange={(globalTooltipContentGap) => setAttributes({ globalTooltipContentGap })}
                        min={0}
                        max={100}
                        step={1}
                        allowReset
                        resetFallbackValue={10}
                    />
                    <RangeControl
                        label={__("Icon Size", "essential-blocks")}
                        value={globalTooltipIconSize}
                        onChange={(globalTooltipIconSize) => setAttributes({ globalTooltipIconSize })}
                        min={0}
                        max={100}
                        step={1}
                        allowReset
                        resetFallbackValue={30}
                    />
                    <ColorControl
                        label={__("Icon Color", "essential-blocks")}
                        color={globalTooltipIconColor}
                        onChange={(globalTooltipIconColor) => setAttributes({ globalTooltipIconColor })}
                    />
                    <TypographyDropdown
                        baseLabel={__("Title Typography", "essential-blocks")}
                        typographyPrefixConstant={TOOLTIP_TITLE_TYPOGRAPHY}
                    />
                    <ColorControl
                        label={__("Color", "essential-blocks")}
                        color={globalTooltipTitleColor}
                        onChange={(globalTooltipTitleColor) => setAttributes({ globalTooltipTitleColor })}
                    />
                    <TypographyDropdown
                        baseLabel={__("Content Typography", "essential-blocks")}
                        typographyPrefixConstant={TOOLTIP_CONTENT_TYPOGRAPHY}
                    />
                    <ColorControl
                        label={__("Color", "essential-blocks")}
                        color={globalTooltipContentColor}
                        onChange={(globalTooltipContentColor) => setAttributes({ globalTooltipContentColor })}
                    />
                </InspectorPanel.PanelBody>
            </InspectorPanel.Style>
        </InspectorPanel>
    );
}

export default Inspector;
