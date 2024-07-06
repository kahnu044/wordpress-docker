/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

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
import { endsWith } from "lodash";

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
        blockId,
        parentBlockId,
        classHook,
        showLabel,
        labelText,
        options,
        fieldName,
        defaultValue,
        isRequired,
        validationRules,
        validationMessage,
        dynamicValue,
        dynamicOptionType,
        dynamicValueLoader
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-checkbox-field',
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

    const blockProps = useBlockProps({
        className: classnames(
            className,
            `eb-guten-block-main-parent-wrapper eb-form-field`
        ),
    });

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
                        className={`${blockId} eb-checkbox-field-wrapper eb-field-wrapper`}
                    >
                        {showLabel && (
                            <>
                                <label
                                    htmlFor={fieldName}
                                    className="eb-field-label"
                                >
                                    <DynamicInputValueHandler
                                        value={labelText}
                                        onChange={(labelText) =>
                                            setAttributes({ labelText })
                                        }
                                        readOnly={true}
                                    />
                                    {" "}
                                    {isRequired && (
                                        <span className="eb-required">*</span>
                                    )}
                                </label>
                            </>
                        )}
                        {/* {options.length > 0 &&
                            options.map((option) => (
                                <div className="eb-checkbox-inputarea">
                                    <label htmlFor={option.value}>
                                        <input
                                            type="checkbox"
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
                            type="checkbox"
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
                                    <DynamicInputValueHandler
                                        value={validationMessage}
                                        onChange={(validationMessage) =>
                                            setAttributes({ validationMessage })
                                        }
                                        readOnly={true}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
