import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    __experimentalDivider as Divider,
} from "@wordpress/components";

import {
    BackgroundControl, ColorControl
} from "@essential-blocks/controls";

export default function singleBoxControl({
    heading,
    resRequiredProps,
    bgControlName,
    dayDgColor,
    dayLbColor,
    dayBdrColor,
}) {
    const { attributes } = resRequiredProps;
    return (
        <>
            <h3
                style={{
                    fontSize: "15px",
                    color: "#444",
                    margin: "0 0 10px 0",
                }}
            >
                {heading}
            </h3>
            <PanelBody
                title={__("Background", "essential-blocks")}
            // initialOpen={false}
            >
                <BackgroundControl
                    noTransition
                    controlName={bgControlName}
                    noOverlay
                    noMainBgi
                // noOverlayBgi // if U pass 'noOverlay' prop U don't need to pass 'noOverlayBgi'
                />
            </PanelBody>

            <ColorControl
                label={__("Digit Color", "essential-blocks")}
                color={dayDgColor}
                attributeName={'dayDgColor'}
            />

            <ColorControl
                label={__("Label Color", "essential-blocks")}
                color={attributes[dayLbColor]}
                attributeName={'dayLbColor'}
            />

            {attributes.boxsBds_borderStyle !== "none" && (
                <ColorControl
                    label={__("Border Color", "essential-blocks")}
                    color={attributes[dayBdrColor]}
                    attributeName={'dayBdrColor'}
                />
            )}

            <Divider />
        </>
    );
}
