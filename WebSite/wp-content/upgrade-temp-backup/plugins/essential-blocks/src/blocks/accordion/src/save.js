/**
 * WordPress dependencies
 */
import { InnerBlocks } from "@wordpress/block-editor";
import { BlockProps } from "@essential-blocks/controls";

const Save = ({ attributes }) => {
    const {
        blockId,
        classHook,
        accordionType,
        displayIcon,
        tabIcon,
        expandedIcon,
        transitionDuration,
        accordionLists,
        titleOrientation,
    } = attributes;

    const allNotClickable = accordionLists?.every(
        (item) => item.clickable === false,
    );
    const defaultImageUrl =
        EssentialBlocksLocalize?.image_url + "/image-placeholder.jpg";

    const accordionTypeClass =
        accordionType === "image"
            ? " eb-accordion-type-image"
            : accordionType === "horizontal"
            ? " eb-accordion-type-horizontal"
            : "";
    const orientationClass =
        accordionType === "horizontal"
            ? titleOrientation === "bottom-top"
                ? " eb-accordion-bottom-top"
                : " eb-accordion-top-bottom"
            : "";

    return (
        <BlockProps.Save attributes={attributes}>
            <div
                className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
            >
                <div
                    className={`eb-accordion-container ${blockId}${accordionTypeClass}${orientationClass}`}
                    data-accordion-type={accordionType || "toggle"}
                    data-tab-icon={displayIcon ? tabIcon : ""}
                    data-expanded-icon={displayIcon ? expandedIcon : ""}
                    data-transition-duration={
                        transitionDuration
                            ? Number(transitionDuration) * 1000
                            : 500
                    }
                >
                    <div className="eb-accordion-inner">
                        <InnerBlocks.Content />
                    </div>
                    {accordionType === "image" && (
                        <div className="eb-accordion-image-container">
                            <img
                                src={
                                    (allNotClickable && accordionLists[0]?.imageUrl || "")
                                }
                                alt={
                                    (allNotClickable &&
                                        accordionLists[0]?.imageAlt) ||
                                    ""
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </BlockProps.Save>
    );
};

export default Save;
