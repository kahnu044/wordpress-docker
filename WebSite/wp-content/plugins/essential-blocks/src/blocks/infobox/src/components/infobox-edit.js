import { __ } from "@wordpress/i18n";
import { MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
    DynamicInputValueHandler,
    EBDisplayIconEdit,
    EBButton,
    ImageComponent,
} from "@essential-blocks/controls";
import { BUTTON_KEYS } from "../constants";

export default function InfoboxContainer({ attributes, setAttributes }) {
    const {
        blockId,
        media,
        infoboxIcon,
        number,
        imageUrl,
        titleTag,
        title,
        enableSubTitle,
        subTitleTag,
        subTitle,
        enableDescription,
        description,
        enableButton,
        isInfoClick,
        btnEffect,
        classHook,
        showMedia,
        enableTitle,
    } = attributes;

    return (
        <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
            <div className={`${blockId} eb-infobox-wrapper`}>
                <div className="infobox-wrapper-inner">
                    {showMedia && (
                        <>
                            {media === "icon" ? (
                                <div className="icon-img-wrapper">
                                    <div className={`eb-icon number-or-icon`}>
                                        <EBDisplayIconEdit
                                            icon={infoboxIcon}
                                            className={`eb-infobox-icon-data-selector`}
                                        />
                                    </div>
                                </div>
                            ) : null}

                            {media === "number" ? (
                                <div className="icon-img-wrapper">
                                    <div className="eb-infobox-num-wrapper number-or-icon">
                                        <span className="eb-infobox-number">
                                            {number}
                                        </span>
                                    </div>
                                </div>
                            ) : null}

                            {media === "image" ? (
                                <div className="icon-img-wrapper">
                                    <div className="eb-infobox-image-wrapper">
                                        {imageUrl && <ImageComponent hasStyle={false} />}
                                    </div>
                                </div>
                            ) : null}
                        </>
                    )}

                    <div className="contents-wrapper">
                        {enableTitle && (
                            <>
                                <DynamicInputValueHandler
                                    tagName={titleTag}
                                    className="title"
                                    value={title}
                                    onChange={(text) =>
                                        setAttributes({ title: text })
                                    }
                                />

                                {enableSubTitle ? (
                                    <DynamicInputValueHandler
                                        tagName={subTitleTag}
                                        className="subtitle"
                                        value={subTitle}
                                        onChange={(text) =>
                                            setAttributes({ subTitle: text })
                                        }
                                    />
                                ) : null}
                            </>
                        )}

                        {enableDescription ? (
                            <DynamicInputValueHandler
                                tagName="p"
                                className="description"
                                value={description}
                                onChange={(text) =>
                                    setAttributes({ description: text })
                                }
                            />
                        ) : null}

                        {enableButton && !isInfoClick ? (
                            <EBButton
                                className={`infobox-btn ${btnEffect || " "}`}
                                buttonAttrProps={BUTTON_KEYS}
                                urlInput={false}
                                btnWrapperClassName="eb-infobox-btn-wrapper"
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
