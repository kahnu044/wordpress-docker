/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";
import {
EBDisplayIcon
} from "@essential-blocks/controls";
import attributes from "./attributes";

const deprecated = [
    {
        attributes: { ...attributes },
        supports: {
            align: ["full"],
        },
        save: ({ attributes }) => {
            const {
                resOption,
                blockMeta,
                blockId,
                classHook,
                showLabel,
                labelText,
                options,
                fieldName,
                defaultValue,
                isRequired,
                validationMessage,
            } = attributes;
            const blockProps = useBlockProps.save({
                className: "eb-form-field",
            });

            return (
                <div {...blockProps}>
                    <div
                        className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                    >
                        <div
                            className={`${blockId} eb-radio-field-wrapper eb-field-wrapper`}
                        >
                            {showLabel && (
                                <>
                                    <label htmlFor={fieldName}>
                                        {labelText}{" "}
                                        {isRequired && (
                                            <span className="eb-required">*</span>
                                        )}
                                    </label>
                                </>
                            )}
                            {options.length > 0 &&
                                options.map((option) => (
                                    <div className="eb-radio-inputarea">
                                        <label htmlFor={option.value}>
                                            <input
                                                id={option.value}
                                                name={fieldName}
                                                value={option.value}
                                                checked={defaultValue === option.value}
                                                type="radio"
                                            />{" "}
                                            {option.name}
                                        </label>
                                    </div>
                                ))}
                            {isRequired && (
                                <>
                                    <div
                                        className={`eb-form-validation eb-validate-${fieldName}`}
                                    >
                                        {validationMessage}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        attributes: { ...attributes },
        supports: {
            align: ["full"],
        },
        save: ({ attributes }) => {
            const {
                blockId,
                classHook,
                showLabel,
                labelText,
                fieldName,
                defaultValue,
                placeholderText,
                isRequired,
                validationMessage,
                isIcon,
                icon,
                formStyle,
            } = attributes;
            const blockProps = useBlockProps.save({
                className: "eb-form-field",
            });

            return (
                <div {...blockProps}>
                    <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                        <div className={`${blockId} eb-number-field-wrapper eb-field-wrapper`}>
                            {showLabel && formStyle != "form-style-modern" && (
                                <>
                                    <label htmlFor={fieldName}>
                                        {labelText} {isRequired && <span className="eb-required">*</span>}
                                    </label>
                                </>
                            )}

                            <div className="eb-field-input-wrap">
                                {isIcon && icon && <i className={`${icon} eb-input-icon`}></i>}
                                <input
                                    type="number"
                                    id={fieldName}
                                    name={fieldName}
                                    className={"eb-field-input"}
                                    value={defaultValue}
                                    placeholder={placeholderText}
                                    required={isRequired}
                                />
                                {formStyle == "form-style-modern" && (
                                    <>
                                        <label htmlFor={fieldName}>
                                            {labelText} {isRequired && <span className="eb-required">*</span>}
                                        </label>
                                    </>
                                )}
                            </div>
                            {isRequired && (
                                <>
                                    <div className={`eb-form-validation eb-validate-${fieldName}`}>
                                        {validationMessage}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            );
        },
    },
];

export default deprecated;
