/**
 * Internal dependencies
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";

const save = ({ attributes }) => {
    const {
        blockId,
        buttonText,
        iconPosition,
        addIcon,
        icon,
        buttonURL,
        newWindow,
        addNofollow,
        hoverEffect,
        classHook,
    } = attributes;

    return (
        <div {...useBlockProps.save()}>
            <div
                className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
            >
                <div
                    className={`eb-button-wrapper eb-button-alignment ${blockId}`}
                >
                    <div className="eb-button">
                        <a
                            className={`eb-button-anchor${
                                hoverEffect ? ` ${hoverEffect}` : ""
                            }`}
                            href={buttonURL ? buttonURL : ""}
                            {...(newWindow && { target: "_blank" })}
                            rel={addNofollow ? "nofollow noopener" : "noopener"}
                        >
                            {addIcon && iconPosition === "left" ? (
                                <i
                                    className={`${icon} eb-button-icon eb-button-icon-left hvr-icon`}
                                ></i>
                            ) : (
                                ""
                            )}
                            <RichText.Content value={buttonText} />
                            {addIcon && iconPosition === "right" ? (
                                <i
                                    className={`${icon} eb-button-icon eb-button-icon-right hvr-icon`}
                                ></i>
                            ) : (
                                ""
                            )}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default save;
