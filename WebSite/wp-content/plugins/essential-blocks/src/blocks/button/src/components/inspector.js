/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import {
    SelectControl
} from "@wordpress/components";
/**
 * Internal depencencies
 */
import {
    WRAPPER_MARGIN,
    LAYOUT_TYPES
} from "./constants";

import {
    InspectorPanel,
    EBButton
} from "@essential-blocks/controls";

const Inspector = (props) => {
    const { attributes, setAttributes, context } = props;
    const {
        type,
    } = attributes;

    // Detect Loop Builder/Post Template context
    const isInLoopBuilder = Boolean(
        context &&
        context.hasOwnProperty("essential-blocks/postId") &&
        context.hasOwnProperty("essential-blocks/postType")
    );

    const loopPostId = context?.["essential-blocks/postId"];
    const loopPostType = context?.["essential-blocks/postType"];

    // Fetch the current post permalink for display in inspector when dynamic
    const postPermalink = useSelect(
        (select) => {
            if (!isInLoopBuilder || !loopPostId || !loopPostType) return "";
            const { getEditedEntityRecord } = select(coreStore);
            return (
                getEditedEntityRecord("postType", loopPostType, loopPostId)?.link || ""
            );
        },
        [isInLoopBuilder, loopPostId, loopPostType]
    );

    const changeType = (type) => {
        setAttributes({ type });
        switch (type) {
            case "default":
                setAttributes({
                    textColor: "#ffffff",
                    hoverTextColor: "#ffffff",
                    btnBackbackgroundColor: "rgba(121, 103, 255,1)",
                    hov_btnBackbackgroundColor: "rgba(81, 63, 212,1)",
                });
                break;
            case "info":
                setAttributes({
                    textColor: "#000000",
                    hoverTextColor: "#000000",
                    btnBackbackgroundColor: "rgba(13, 202, 240,1)",
                    hov_btnBackbackgroundColor: "rgba(13, 180, 214,1)",
                });
                break;
            case "success":
                setAttributes({
                    textColor: "#ffffff",
                    hoverTextColor: "#ffffff",
                    btnBackbackgroundColor: "rgba(25, 135, 84,1)",
                    hov_btnBackbackgroundColor: "rgba(20, 108, 67,1)",
                });
                break;
            case "warning":
                setAttributes({
                    textColor: "#000000",
                    hoverTextColor: "#000000",
                    btnBackbackgroundColor: "rgba(255, 193, 7,1)",
                    hov_btnBackbackgroundColor: "rgba(224, 170, 10,1)",
                });
                break;
            case "danger":
                setAttributes({
                    textColor: "#ffffff",
                    hoverTextColor: "#ffffff",
                    btnBackbackgroundColor: "rgba(220, 53, 69,1)",
                    hov_btnBackbackgroundColor: "rgba(176, 42, 55,1)",
                });
                break;
            default:
                return false;
        }
    };

    return (
        <InspectorPanel advancedControlProps={{
            marginPrefix: WRAPPER_MARGIN,
            hasMargin: true,
            hasPadding: false,
            hasBackground: false,
            hasBorder: false
        }}>
            <InspectorPanel.General>
                <InspectorPanel.PanelBody
                    title={__(
                        "General",
                        "essential-blocks"
                    )}
                    initialOpen={true}
                >
                    <SelectControl
                        label={__(
                            "Type",
                            "essential-blocks"
                        )}
                        value={type}
                        options={LAYOUT_TYPES}
                        onChange={(type) =>
                            changeType(type)
                        }
                    />
                    </InspectorPanel.PanelBody>
                <EBButton.GeneralTab isDynamic={isInLoopBuilder} dynamicPermalink={postPermalink} />
            </InspectorPanel.General>
            <InspectorPanel.Style>
                <EBButton.StyleTab />
            </InspectorPanel.Style>
        </InspectorPanel>
    );
};

export default Inspector;
