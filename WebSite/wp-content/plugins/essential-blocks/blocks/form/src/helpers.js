import { DefaultBlockAppender } from "@wordpress/block-editor";


/**
 * Generate validate rules
 * @param {*} obj
 * @returns
 */
export const getValidationRules = (obj) => {
    let result = {};

    if (obj?.attributes && obj?.attributes?.validationRules) {
        const key = Object.keys(obj.attributes.validationRules)[0];
        result[key] = obj.attributes.validationRules[key];
    }

    if (obj?.innerBlocks && obj?.innerBlocks.length > 0) {
        for (const innerBlock of obj.innerBlocks) {
            const innerBlockRules = getValidationRules(innerBlock);
            if (
                typeof innerBlockRules === "object" &&
                Object.keys(innerBlockRules).length > 0
            ) {
                result = {
                    ...result,
                    ...innerBlockRules,
                };
            }
        }
    }

    //Remove recaptcha field
    if (result['g-recaptcha-response']) {
        delete result['g-recaptcha-response']
    }

    return result;
};

/**
 * get Form Fields
 * @param {*} obj
 * @returns
 */
export const getFormFields = (obj) => {
    let result = {};

    if (obj?.attributes && obj?.attributes?.fieldName) {
        result[obj.attributes.fieldName] = {
            type: getType(obj.name), //type of the filed
            label: obj?.attributes?.labelText || obj?.attributes?.fieldName, //label of the field
            ...(obj?.attributes?.options && { options: obj.attributes.options }) //label of the field
        };
    }

    if (obj?.innerBlocks && obj?.innerBlocks.length > 0) {
        for (const innerBlock of obj.innerBlocks) {
            const innerBlockRules = getFormFields(innerBlock);
            if (
                typeof innerBlockRules === "object" &&
                Object.keys(innerBlockRules).length > 0
            ) {
                result = {
                    ...result,
                    ...innerBlockRules,
                };
            }
        }
    }

    //Remove recaptcha field
    if (result['g-recaptcha-response']) {
        delete result['g-recaptcha-response']
    }

    return result;
};

const getType = (blockName) => {
    switch (blockName) {
        case 'essential-blocks/form-text-field':
            return 'text'
            break;
        case 'essential-blocks/form-textarea-field':
            return 'textarea'
            break;
        case 'essential-blocks/form-email-field':
            return 'email'
            break;
        case 'essential-blocks/form-number-field':
            return 'number'
            break;
        case 'essential-blocks/form-select-field':
            return 'select'
            break;
        case 'essential-blocks/form-checkbox-field':
            return 'checkbox'
            break;
        case 'essential-blocks/form-radio-field':
            return 'radio'
            break;
        case 'essential-blocks/pro-form-datetime-picker':
            return 'datetime'
            break;
        case 'essential-blocks/pro-form-recaptcha':
            return 'recaptcha'
            break;
        default:
            return 'input'
    }
}
