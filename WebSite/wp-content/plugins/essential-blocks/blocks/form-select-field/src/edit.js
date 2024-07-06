/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { select } from "@wordpress/data"

/**
 * Internal dependencies
 */
const {
    duplicateBlockIdFix,
    filterBlocksByName,
    getBlockParentClientId,
    EBDisplayIcon,
    DynamicInputValueHandler,
    DynamicFormFieldValueHandler,
    BlockProps
} = EBControls;

import Inspector from "./inspector";
import Style from "./style";

export default function Edit(props) {
    const {
        attributes,
        setAttributes,
        isSelected,
        clientId,
    } = props;
    const {
        blockId,
        classHook,
        showLabel,
        labelText,
        options,
        fieldName,
        defaultValue,
        isRequired,
        validationMessage,
        isIcon,
        icon,
        formStyle,
        parentBlockPaddingLeft,
        parentBlockPaddingUnit,
        parentBlockIconSize,
        parentIconColor,
        dynamicValue,
        dynamicOptionType,
        dynamicValueLoader
    } = attributes;


    useEffect(() => {

        const parentClientId = getBlockParentClientId(
            clientId,
            "essential-blocks/form"
        );

        const getParentBlock = select("core/block-editor").getBlock(
            parentClientId
        );
        const getParentBlockId = getParentBlock?.attributes?.blockId;
        const parentIconColor = getParentBlock?.attributes?.inputIconColor;
        const parentBlockIconSize =
            getParentBlock?.attributes?.inputIconSizeRange;
        const parentBlockPaddingLeft =
            getParentBlock?.attributes?.fieldsPaddingLeft;
        const parentBlockPaddingUnit =
            getParentBlock?.attributes?.fieldsPaddingUnit;
        if (getParentBlockId)
            setAttributes({
                parentBlockId: getParentBlockId,
                parentBlockPaddingLeft,
                parentBlockPaddingUnit,
                parentBlockIconSize,
                parentIconColor,
            });

        //Handle as per parent settings
        const isBlockJustInserted = select(
            "core/block-editor"
        ).wasBlockJustInserted(clientId);
        const getFormLabel = getParentBlock?.attributes?.showLabel;
        const getFormIcon = getParentBlock?.attributes?.showInputIcon;
        if (
            isBlockJustInserted &&
            typeof getFormLabel !== "undefined" &&
            typeof getFormIcon !== "undefined"
        ) {
            setAttributes({
                showLabel: getFormLabel,
                isIcon: getFormIcon,
            });
        }

        const getFormStyle = getParentBlock?.attributes?.formStyle;
        if (getFormStyle) setAttributes({ formStyle: getFormStyle });

        //Hanlde Field Name
        if (!fieldName) {
            if (parentClientId) {
                const parentAllChildBlocks = select(
                    "core/block-editor"
                ).getBlocksByClientId(parentClientId);
                const filteredBlocks = filterBlocksByName(
                    parentAllChildBlocks,
                    name
                );
                const currentBlockIndex = filteredBlocks.indexOf(clientId);
                if (currentBlockIndex !== -1) {
                    if (filteredBlocks.length === 1) {
                        setAttributes({ fieldName: `select-field` });
                    } else {
                        setAttributes({
                            fieldName: `select-field-${currentBlockIndex + 1}`,
                        });
                    }
                }
            }
        }
    }, []);


    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-select-field',
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
                        className={`${blockId} eb-select-field-wrapper eb-field-wrapper`}
                    >
                        {showLabel && formStyle != "form-style-modern" && (
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

                        <div className="eb-field-input-wrap">
                            {isIcon && icon && <EBDisplayIcon icon={icon} className={"eb-input-icon"} />}
                            {/* <select
                                id={fieldName}
                                name={fieldName}
                                className={"eb-field-input"}
                                value={defaultValue}
                            >
                                {options.length > 0 &&
                                    options.map((option) => (
                                        <>
                                            <option
                                                selected={option.value === defaultValue}
                                                value={option?.value}
                                            >
                                                {option?.name}
                                            </option>
                                        </>
                                    ))}
                            </select> */}
                            <DynamicFormFieldValueHandler
                                type="select"
                                fieldName={fieldName}
                                defaultValue={defaultValue}
                                options={options}
                                dynamicValue={dynamicValue}
                                dynamicOptionType={dynamicOptionType}
                                dynamicValueLoader={dynamicValueLoader}
                                setAttributes={setAttributes}
                            />
                            {formStyle == "form-style-modern" && (
                                <>
                                    <label htmlFor={fieldName}>
                                        {labelText}{" "}
                                        {isRequired && (
                                            <span className="eb-required">
                                                *
                                            </span>
                                        )}
                                    </label>
                                </>
                            )}
                        </div>
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
