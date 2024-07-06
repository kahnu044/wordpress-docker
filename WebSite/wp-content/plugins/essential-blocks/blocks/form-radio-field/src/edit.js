/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InnerBlocks } from "@wordpress/block-editor";
import { useEffect, useState, useRef } from "@wordpress/element";
import { select, dispatch, useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */

const {
    duplicateBlockIdFix,
    filterBlocksByName,
    getBlockParentClientId,
    DynamicInputValueHandler,
    DynamicFormFieldValueHandler,
    BlockProps
} = EBControls;

import classnames from "classnames";
import Inspector from "./inspector";
import Style from "./style";

export default function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
        clientId,
        className,
        name,
    } = props;
    const {
        resOption,
        blockMeta,
        parentBlockId,
        blockId,
        classHook,
        showLabel,
        labelText,
        options,
        fieldName,
        defaultValue,
        isRequired,
        validationMessage,
        validationRules,
        dynamicValue,
        dynamicOptionType,
        dynamicValueLoader
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-radio-field',
        rootClass: `eb-guten-block-main-parent-wrapper eb-form-field`,
        style: <Style {...props} />
    };

    //UseEffect for set Validation rules
    useEffect(() => {
        const rules = {
            [fieldName]: {
                isRequired: {
                    status: isRequired,
                    message: validationMessage,
                },
            },
        };
        setAttributes({ validationRules: rules });
    }, [isRequired, fieldName, validationMessage]);

    return (
        <>
            {isSelected && (
                <Inspector
                    clientId={clientId}
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        className={`${blockId} eb-radio-field-wrapper eb-field-wrapper`}
                    >
                        {showLabel && (
                            <>
                                <label htmlFor={fieldName}>
                                    <DynamicInputValueHandler
                                        value={labelText}
                                        onChange={(labelText) =>
                                            setAttributes({ labelText })
                                        }
                                        readOnly={true}
                                    />{" "}
                                    {isRequired && (
                                        <span className="eb-required">*</span>
                                    )}
                                </label>
                            </>
                        )}
                        {/* {options.length > 0 &&
                            options.map((option) => (
                                <div className="eb-radio-inputarea">
                                    <label htmlFor={option.value}>
                                        <input
                                            type="radio"
                                            id={option.value}
                                            name={fieldName}
                                            value={option.value}
                                            checked={defaultValue === option.value}
                                        />{" "}
                                        {option.name}
                                    </label>
                                </div>
                            ))} */}

                        <DynamicFormFieldValueHandler
                            type="radio"
                            fieldName={fieldName}
                            defaultValue={defaultValue}
                            options={options}
                            dynamicValue={dynamicValue}
                            dynamicOptionType={dynamicOptionType}
                            dynamicValueLoader={dynamicValueLoader}
                            setAttributes={setAttributes}
                        />
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
            </BlockProps.Edit>
        </>
    );
}
