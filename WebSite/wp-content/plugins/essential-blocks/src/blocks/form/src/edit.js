/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    InnerBlocks,
    store as blockEditorStore,
} from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import isEqual from "lodash/isEqual";
import {
    useEffect,
    useState,
    useRef,
    useCallback,
    memo,
} from "@wordpress/element";
import { select, dispatch, useDispatch, subscribe, useSelect } from "@wordpress/data";
import { applyFilters } from "@wordpress/hooks";
import { createBlocksFromInnerBlocksTemplate, createBlock } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { getValidationRules, getFormFields } from "./helpers";
import {
    fetchFormBlockData,
    saveFormBlockData,
    DynamicInputValueHandler,
    getAllBlockClientIds,
    EBDisplayIcon,
    BlockProps,
    withBlockContext,
} from "@essential-blocks/controls";

import {
    CONTACT_FORM_TEMPLATE_1,
    CONTACT_FORM_TEMPLATE_2,
} from "./templates/contact-form";

import {
    SUBSCRIPTION_FORM_TEMPLATE_1,
    SUBSCRIPTION_FORM_TEMPLATE_2,
} from "./templates/subscription-form";

import { RSVP_FORM_TEMPLATE } from "./templates/rsvp-form";

import Inspector from "./inspector";

import ContactFormIcon from "./icons/contact.svg";
import SubscriptionFormIcon from "./icons/subscription.svg";
import RSVPFormIcon from "./icons/rsvp.svg";
import BlankIcon from "./icons/blank.svg";
import defaultAttributes from "./attributes";
import Style from "./style";

import loader from "../../../assets/images/loading.gif";

const Edit = (props) => {
    const { attributes, setAttributes, clientId, isSelected } = props;
    const {
        resOption,
        cover,
        blockId,
        classHook,
        formId,
        notificationType,
        formTitle,
        formType,
        template,
        integrations,
        buttonText,
        btnAddIcon,
        icon,
        iconPosition,
        formLayout,
        showLabel,
        showInputIcon,
        successMessage,
        errorMessage,
        validationErrorMessage,
        formStyle,
        multistepdata,
        stepIndecator,
        enableMultistepForm,
        enableStepCount,
        enableStepIcon,
        enableStepSubtitle,
        nextBtnText,
        prevBtnText,
    } = attributes;

    const [formSettings, setFormSettings] = useState({});
    const [allFields, setAllFields] = useState({});
    const [isTemplateLoading, setIsTemplateLoading] = useState(false);
    const { replaceInnerBlocks } = useDispatch(blockEditorStore);

    const showLabelRef = useRef(showLabel);
    const showIconRef = useRef(showInputIcon);
    const formStyleRef = useRef(formStyle);

    const formTypeRef = useRef(formType);
    const templateRef = useRef(template);

    const allowedBlocks = applyFilters("eb-form-block-allowed-blocks", [
        "essential-blocks/form-text-field",
        "essential-blocks/form-textarea-field",
        "essential-blocks/form-email-field",
        "essential-blocks/form-number-field",
        "essential-blocks/form-select-field",
        "essential-blocks/form-checkbox-field",
        "essential-blocks/form-radio-field",
        "essential-blocks/advanced-heading",
        "essential-blocks/advanced-image",
        "essential-blocks/row",
        "core/image",
        "core/heading",
        "core/paragraph",
    ]);

    const BLOCK_PREFIX = "eb-form";

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: BLOCK_PREFIX,
        style: <Style {...props} />,
    };
    const formInnerItem =
        select("core/block-editor").getBlock(clientId)?.innerBlocks;
    const innerBlocksRef = useRef(formInnerItem);

    // Set all fields when changes inner blocks
    useEffect(() => {
        const allBlocks = getAllBlockClientIds();
        if (allBlocks.includes(clientId)) {
            const blockObj = select("core/block-editor").getBlock(clientId);
            const fields = getFormFields(blockObj);
            setAllFields(fields);
        }
    }, [formInnerItem]);

    useEffect(() => {
        //Generate Custom Form ID
        let uniqueId = clientId.substr(clientId.length - 6);
        if (blockId && blockId.startsWith(BLOCK_PREFIX)) {
            uniqueId = blockId.replace(BLOCK_PREFIX + "-", "");
        }

        if (!formId || formId.length === 0) {
            setAttributes({ formId: `ebf-${uniqueId}` });
        }

        if (multistepdata.length === 0) {
            const multistepDataInit =
                innerBlocksRef?.current?.length > 0
                    ? innerBlocksRef.current.filter(
                        (item) =>
                            item.name ===
                            "essential-blocks/pro-form-multistep-wrapper",
                    )
                    : [];
            setAttributes({ multistepdata: multistepDataInit });
        }

        //Get formdata from Database
        const fetchData = async () => {
            return await fetchFormBlockData(blockId, "form_options");
        };

        fetchData().then((res) => {
            const response = res?.form_options;
            if (
                !response ||
                (typeof response === "object" &&
                    Object.keys(response).length === 0)
            ) {
                setFormSettings({
                    mailTo: "",
                    replyTo: "",
                    mailCc: "",
                    mailBcc: "",
                    mailSubject: "",
                });
            } else {
                setFormSettings(response);
                if (response.notification) {
                    setAttributes({ notificationType: response.notification });
                }
            }
        });
    }, []);

    useEffect(() => {
        if (innerBlocksRef?.current?.length === formInnerItem?.length) {
            if (!isEqual(innerBlocksRef.current, formInnerItem)) {
                innerBlocksRef.current = formInnerItem;
                const newMultistepData = innerBlocksRef.current.filter(
                    (item) =>
                        item.name ===
                        "essential-blocks/pro-form-multistep-wrapper",
                );
                setAttributes({ multistepdata: newMultistepData });
            } else {
                return;
            }
        }

        // add
        if (
            innerBlocksRef.current == undefined ||
            formInnerItem.length > innerBlocksRef.current.length
        ) {
            innerBlocksRef.current = formInnerItem;
            const newMultistepData = innerBlocksRef.current.filter(
                (item) =>
                    item.name === "essential-blocks/pro-form-multistep-wrapper",
            );
            setAttributes({ multistepdata: newMultistepData });
        }

        // remove
        if (formInnerItem.length < innerBlocksRef.current.length) {
            const difference = innerBlocksRef.current.filter(
                (item1) =>
                    !formInnerItem.some(
                        (item2) =>
                            item2.attributes.blockId ===
                            item1.attributes.blockId,
                    ),
            );

            // Filtering only "essential-blocks/pro-form-multistep-wrapper" items
            const filteredDifference = difference.filter(
                (item) =>
                    item.name === "essential-blocks/pro-form-multistep-wrapper",
            );

            if (filteredDifference.length === 1) {
                const removeditemId = difference[0]?.attributes?.blockId;
                const updateditem = multistepdata.filter(
                    (item) => item.attributes?.blockId !== removeditemId,
                );

                setAttributes({
                    multistepdata: updateditem,
                });
            }
            innerBlocksRef.current = formInnerItem;
        }
    }, [formInnerItem]);

    const updateRecursiveAttributes = (blocks, attributes) => {
        if (typeof blocks !== "object" || typeof attributes !== "object") {
            return [];
        }

        // let parentId = false;
        if (blocks.length > 0 && Object.keys(attributes).length > 0) {
            for (const block of blocks) {
                if (block.attributes && typeof block.attributes === "object") {
                    block.attributes = {
                        ...block.attributes,
                        ...attributes,
                    };
                }
                if (block.innerBlocks) {
                    updateRecursiveAttributes(block.innerBlocks, attributes);
                }
            }
        }
    };

    //useEffect for Update innerblocks attribute values
    useEffect(() => {
        if (
            showLabel !== showLabelRef.current ||
            showInputIcon !== showIconRef.current ||
            formStyle !== formStyleRef.current
        ) {
            showLabelRef.current = showLabel;
            showIconRef.current = showInputIcon;
            formStyleRef.current = formStyle;

            const formInnerBlocks =
                select("core/block-editor").getBlock(clientId).innerBlocks;
            updateRecursiveAttributes(formInnerBlocks, {
                showLabel: showLabel,
                isIcon: showInputIcon,
                formStyle: formStyle,
            });

            //Replace Innerblocks with updated attributes
            replaceInnerBlocks(clientId, formInnerBlocks);
        }
    }, [showLabel, showInputIcon, formStyle]);

    // On change formStyle
    useEffect(() => {
        if ("Desktop" !== resOption) {
            return;
        }
        if (formStyle === "form-style-modern") {
            const formWrapper = document.querySelector(`.${blockId}`);
            if (formWrapper) {
                const inputs =
                    formWrapper.getElementsByClassName("eb-field-input");

                for (let input of inputs) {
                    if (input.value) {
                        input.nextSibling?.classList.add("active");
                    }

                    input.addEventListener("focus", function (e) {
                        if (!input.nextSibling?.classList.contains("active")) {
                            input.nextSibling?.classList.add("active");
                        }
                    });

                    // Remove the class when the input loses focus
                    input.addEventListener("blur", function () {
                        if (!input.value) {
                            input.nextSibling?.classList.remove("active");
                        }
                    });
                }
            }
        }
    }, [formStyle]);

    //On change "formType", change Template
    useEffect(() => {
        if (
            formTypeRef.current === formType &&
            templateRef.current === template
        ) {
            return;
        }

        // Set loading state to true when template change starts
        setIsTemplateLoading(true);

        formTypeRef.current = formType;
        templateRef.current = template;

        // Set loading state to false after a short delay to ensure template is rendered
        setTimeout(() => {
            // Apply filter for form type selection
            applyFilters("eb_form_type_selected", null, attributes, setAttributes);

            if (formType === "contact_form") {
                if (!formTitle) {
                    setAttributes({ formTitle: "Contact Form" });
                }
                if (template === "contact_form_1") {
                    replaceInnerBlocks(
                        clientId,
                        createBlocksFromInnerBlocksTemplate(
                            CONTACT_FORM_TEMPLATE_1,
                        ),
                    );

                    setAttributes({
                        showInputIcon: true,
                    });
                } else if (template === "contact_form_2") {
                    replaceInnerBlocks(
                        clientId,
                        createBlocksFromInnerBlocksTemplate(
                            CONTACT_FORM_TEMPLATE_2,
                        ),
                    );
                }
            } else if (formType === "subscription_form") {
                if (!formTitle) {
                    setAttributes({ formTitle: "Subscription Form" });
                }
                if (template === "subscription_form_1") {
                    replaceInnerBlocks(
                        clientId,
                        createBlocksFromInnerBlocksTemplate(
                            SUBSCRIPTION_FORM_TEMPLATE_1,
                        ),
                    );

                    setAttributes({
                        showInputIcon: false,
                    });
                } else if (template === "subscription_form_2") {
                    replaceInnerBlocks(
                        clientId,
                        createBlocksFromInnerBlocksTemplate(
                            SUBSCRIPTION_FORM_TEMPLATE_2,
                        ),
                    );
                }
            } else if (formType === "rsvp_form") {
                if (!formTitle) {
                    setAttributes({ formTitle: "RSVP Form" });
                }
                replaceInnerBlocks(
                    clientId,
                    createBlocksFromInnerBlocksTemplate(RSVP_FORM_TEMPLATE),
                );

                setAttributes({
                    showInputIcon: false,
                });
            } else if (formType === "blank") {
                if (!formTitle) {
                    setAttributes({ formTitle: "New Form" });
                }

                replaceInnerBlocks(clientId, []);

                setAttributes({
                    showInputIcon: false,
                });
            }

            setIsTemplateLoading(false);
        }, 50);
    }, [formType, template]);

    //set "isEditedPostPublishable" true when formSettings is changed
    useEffect(() => {
        const isEditedPostPublishable =
            select("core/editor").isEditedPostPublishable();

        if (
            typeof isEditedPostPublishable !== "undefined" &&
            isEditedPostPublishable === false
        ) {
            dispatch("core/editor").editPost({ isPublishable: true });
        }
    }, [formSettings]);

    /**
     * Memorize function for hanlde endless render
     */
    const formSettingsSave = useCallback(() => {
        const isSavingPost = select("core/editor").isSavingPost();
        const isAutosavingPost = select("core/editor").isAutosavingPost();
        const isSavingTemplate = select("core/editor").isSavingNonPostEntityChanges();

        /**
         * Action
         */
        if ((isSavingPost && !isAutosavingPost) || isSavingTemplate) {
            const allBlocks = getAllBlockClientIds();
            if (
                allBlocks.includes(clientId) &&
                typeof formSettings === "object" &&
                Object.keys(formSettings).length > 0
            ) {
                const blockObj = select("core/block-editor").getBlock(clientId);
                const rules = getValidationRules(blockObj);
                const fields = getFormFields(blockObj);
                // const conditionalLogics = getConditionalLogics(blockObj);

                let otherSettings = {
                    validationRules: { ...rules },
                    messages: {
                        success: successMessage,
                        error: errorMessage,
                        validationError: validationErrorMessage,
                    },
                    // conditionalLogics: conditionalLogics,
                };

                if (Object.keys(integrations).length > 0) {
                    otherSettings.integrations = integrations;
                }

                // Apply filter to otherSettings
                otherSettings = applyFilters(
                    'eb_form_other_settings',
                    otherSettings,
                    {
                        blockId,
                        formTitle,
                        blockObj,
                        fields
                    }
                );

                const updatedFormSettings = {
                    ...formSettings,
                    notification: notificationType,
                };

                const save = saveFormBlockData(
                    blockId,
                    formTitle || "Form ID: " + blockId,
                    fields,
                    updatedFormSettings,
                    otherSettings,
                );
                // console.log('Free save called with:', save, otherSettings);

                //Display snackbar disable for now, will add later after fix multi render
                // save.then((res) => {
                //     //Show notice
                //     dispatch("core/notices").createNotice(
                //         res?.success ? "success" : "error",
                //         res.data || '',
                //         {
                //             type: "snackbar",
                //             isDismissible: true,
                //         }
                //     );
                // })

            }
        }
    }, [
        blockId,
        formTitle,
        notificationType,
        formSettings,
        successMessage,
        errorMessage,
        validationErrorMessage,
        integrations,
    ]);

    // subscribe
    // let unsubscribe = subscribe(formSettingsSave);

    const useFormSettingsSave = (deps) => {
        const wasSavingRef = useRef(false);

        useEffect(() => {
            const unsubscribe = subscribe(() => {
                const isSavingPost = select("core/editor").isSavingPost();
                const isAutosavingPost =
                    select("core/editor").isAutosavingPost();
                const isSavingTemplate =
                    select("core/editor").isSavingNonPostEntityChanges();

                const isRealSaving =
                    (isSavingPost && !isAutosavingPost) || isSavingTemplate;

                // Detect the transition: not saving -> saving
                if (isRealSaving && !wasSavingRef.current) {
                    wasSavingRef.current = true;

                    // Call your save logic
                    formSettingsSave();
                } else if (!isRealSaving) {
                    // Reset the ref when not saving anymore
                    wasSavingRef.current = false;
                }
            });

            return () => {
                unsubscribe();
            };
        }, [formSettingsSave]);
    };

    useFormSettingsSave();

    // Add new multistep wrapper
    const addMultistepWrapper = (event) => {
        // Stop event propagation to prevent selection issues
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Always get the latest blocks before adding a new one
        const currentBlocks = select("core/block-editor").getBlocks(clientId);

        // Create a new multistep wrapper block
        const newBlock = createBlock("essential-blocks/pro-form-multistep-wrapper", {
            stepName: `Step ${currentBlocks.filter(block =>
                block.name === "essential-blocks/pro-form-multistep-wrapper"
            ).length + 1}`,
            enableStepIcon: enableStepIcon,
            enableSubtitle: enableStepSubtitle,
            stepIcon: "fas fa-check"
        });

        // Store the clientId of the new block
        const newBlockClientId = newBlock.clientId;

        // Create a new array with all current blocks plus the new one
        const updatedBlocks = [...currentBlocks, newBlock];

        // Replace the inner blocks with the updated array
        dispatch("core/block-editor").replaceInnerBlocks(clientId, updatedBlocks);

        // Force focus back to the parent form block to ensure the button remains clickable
        dispatch("core/block-editor").selectBlock(clientId);

        // Then select the new block with a slight delay
        setTimeout(() => {
            dispatch("core/block-editor").selectBlock(newBlockClientId);

            // Update the multistepdata attribute
            const updatedMultistepData = updatedBlocks.filter(
                block => block.name === "essential-blocks/pro-form-multistep-wrapper"
            );
            setAttributes({ multistepdata: updatedMultistepData });

            // Force focus back to the parent form block after a short delay
            // This ensures the "Add a New Step" button remains clickable for subsequent clicks
            setTimeout(() => {
                dispatch("core/block-editor").selectBlock(clientId);
            }, 100);
        }, 50);
    };

    // Subscribe to block removals to update multistepdata in real-time
    useEffect(() => {
        // Skip if no multistep wrappers exist
        if (!multistepdata || multistepdata.length === 0) return;

        // Store the current multistep wrapper clientIds for comparison
        const multistepClientIds = multistepdata.map(step => step.clientId);

        // Create subscription to detect block removals
        const unsubscribe = subscribe(() => {
            // Skip if the form block itself is removed
            if (!select("core/block-editor").getBlock(clientId)) return;

            // Get current inner blocks
            const currentInnerBlocks = select("core/block-editor").getBlocks(clientId);

            // Get current multistep wrapper blocks
            const currentMultistepBlocks = currentInnerBlocks.filter(
                block => block.name === "essential-blocks/pro-form-multistep-wrapper"
            );

            // Get current multistep wrapper clientIds
            const currentMultistepClientIds = currentMultistepBlocks.map(block => block.clientId);

            // Check if any multistep wrapper has been removed
            const hasRemovedStep = multistepClientIds.some(
                id => !currentMultistepClientIds.includes(id)
            );

            // If a step was removed, select the parent form block
            if (hasRemovedStep && currentMultistepBlocks.length < multistepdata.length) {
                // Select the parent form block to trigger the useEffect that updates multistepdata
                dispatch("core/block-editor").selectBlock(clientId);
            }
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, [multistepdata]);


    return cover.length ? (
        <div>
            <img src={cover} alt="data table" style={{ maxWidth: "100%" }} />
        </div>
    ) : (
        <>
            {isSelected && (
                <Inspector
                    clientId={clientId}
                    attributes={attributes}
                    setAttributes={setAttributes}
                    formSettings={formSettings}
                    setFormSettings={setFormSettings}
                    allFormFields={allFields}
                />
            )}
            <BlockProps.Edit {...enhancedProps}>
                {EssentialBlocksLocalize?.unfilter_capability &&
                    EssentialBlocksLocalize.unfilter_capability === "false" && (
                        <div
                            style={{ marginLeft: "0", marginRight: "0" }}
                            className="notice notice-error"
                        >
                            <p>
                                You don't have permission to add/edit the Form
                                Block. Any changes you make won't work in the
                                frontend properly.
                            </p>
                        </div>
                    )}
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div id={blockId} className={`${blockId} eb-form-wrapper`}>
                        {!formType && (
                            <>
                                <div className="eb-form-editor-formtype-select">
                                    <h2>Please Select a Form Type</h2>
                                    <div
                                        className="eb-form-editor-formtype-item"
                                        onClick={() => {
                                            setIsTemplateLoading(true)
                                            setAttributes({
                                                formType: "contact_form",
                                            })
                                        }}
                                    >
                                        <div className="eb-form-editor-formtype-icon">
                                            <img
                                                src={ContactFormIcon}
                                                alt={"conact form icon"}
                                            />
                                        </div>
                                        <span>Contact Form</span>
                                    </div>
                                    <div
                                        className="eb-form-editor-formtype-item"
                                        onClick={() => {
                                            setIsTemplateLoading(true)
                                            setAttributes({
                                                formType: "subscription_form",
                                            })
                                        }}

                                    >
                                        <div className="eb-form-editor-formtype-icon">
                                            <img
                                                src={SubscriptionFormIcon}
                                                alt={"subscription form icon"}
                                            />
                                        </div>
                                        <span>Subscription Form</span>
                                    </div>
                                    <div
                                        className="eb-form-editor-formtype-item"
                                        onClick={() => {
                                            setIsTemplateLoading(true)
                                            setAttributes({
                                                formType: "rsvp_form",
                                            })
                                        }}
                                    >
                                        <div className="eb-form-editor-formtype-icon">
                                            <img
                                                src={RSVPFormIcon}
                                                alt={"rsvp form icon"}
                                            />
                                        </div>
                                        <span>RSVP Form</span>
                                    </div>

                                    {applyFilters(
                                        "eb_pro_form_type_selector",
                                        "",
                                        attributes,
                                        setAttributes,
                                        setIsTemplateLoading
                                    )}

                                    <div
                                        className="eb-form-editor-formtype-item"
                                        onClick={() =>
                                            setAttributes({ formType: "blank" })
                                        }
                                    >
                                        <div className="eb-form-editor-formtype-icon">
                                            <img
                                                src={BlankIcon}
                                                alt={"blank form icon"}
                                            />
                                        </div>
                                        <span>Blank</span>
                                    </div>
                                </div>
                            </>
                        )}
                        {formType && formType.length > 0 && (
                            <>
                                {isTemplateLoading ? (
                                    <div className="eb-form-template-loading">
                                        <img src={loader} />
                                        <p>Loading template...</p>
                                    </div>
                                ) : (
                                    <>
                                        {formInnerItem &&
                                            formInnerItem.length === 0 && (
                                                <div className="eb-popup-before-content">
                                                    <p>
                                                        <strong>Add Form {formType === "multistep_form" ? 'Step' : 'Field'}</strong>
                                                    </p>
                                                </div>
                                            )}
                                        <form
                                            id={formId}
                                            className={`eb-form form-layout-${formLayout} ${formStyle} ${enableMultistepForm
                                                ? "eb-multistep-form"
                                                : ""
                                                }`}
                                            action=""
                                        >
                                            {formType === "multistep_form" &&
                                                enableMultistepForm &&
                                                stepIndecator &&
                                                multistepdata.length > 0 && (
                                                    <>
                                                        {applyFilters(
                                                            "eb_form_step_indicator_html",
                                                            "",
                                                            attributes,
                                                        )}
                                                    </>
                                                )}
                                            <div className={"eb-form-fields"}>
                                                <InnerBlocks
                                                    template={[]}
                                                    renderAppender={
                                                        select(
                                                            "core/block-editor",
                                                        ).getBlockOrder(clientId)
                                                            .length > 0
                                                            ? undefined
                                                            : formType === "multistep_form" ? undefined : InnerBlocks.ButtonBlockAppender
                                                    }
                                                    allowedBlocks={formType === "multistep_form" ? ["essential-blocks/pro-form-multistep-wrapper"] : allowedBlocks}
                                                />

                                                {/* Add Multistep Button - Only show if multistep form is enabled */}
                                                {formType === "multistep_form" && enableMultistepForm && (
                                                    <Button
                                                        className="is-default eb-form-add-step-button"
                                                        label={__("Add a New Step", "essential-blocks")}
                                                        icon="plus-alt2"
                                                        onClick={(event) => addMultistepWrapper(event)}
                                                    >
                                                        <span className="eb-form-add-step-button-label">
                                                            {__("Add a New Step", "essential-blocks")}
                                                        </span>
                                                    </Button>
                                                )}
                                            </div>

                                            {formInnerItem?.length > 0 && formType !== "multistep_form" && (
                                                <div className={"eb-form-submit"}>
                                                    {applyFilters(
                                                        "eb_form_step_buttons_html",
                                                        "",
                                                        attributes,
                                                    )}

                                                    <button
                                                        data-id={blockId}
                                                        type="button"
                                                        className="btn btn-primary eb-form-submit-button"
                                                    >
                                                        {btnAddIcon &&
                                                            iconPosition === "left" ? (
                                                            <EBDisplayIcon
                                                                className={
                                                                    "eb-button-icon"
                                                                }
                                                                icon={icon}
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                        <DynamicInputValueHandler
                                                            value={buttonText}
                                                            onChange={(buttonText) =>
                                                                setAttributes({
                                                                    buttonText,
                                                                })
                                                            }
                                                            readOnly={true}
                                                        />
                                                        {btnAddIcon &&
                                                            iconPosition === "right" ? (
                                                            <EBDisplayIcon
                                                                className={
                                                                    "eb-button-icon"
                                                                }
                                                                icon={icon}
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                        </form>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
};
export default memo(withBlockContext(defaultAttributes)(Edit));
