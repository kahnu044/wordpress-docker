/**
 * Import Helper Functions
*/
const {
    ebJsonStringCheck
} = window.EBControls;

/**
 * Import Constants
 */
import {
    globalColorKey,
    globalTypoKey,
    blockDefaultsKey,
} from "./constant";

/**
 * Import Fetch Functions
 */
import {
    updateGlobalStyle,
    getGlobalSettings,
    updateBlockDefaults,
    getBlockDefaults
} from '../fetch';

/**
 * Fetch Global Color from Database using AJAX
 * @returns {Object || false}
 */
export function FETCH_GLOBAL_COLORS() {
    return getGlobalSettings().then(response => {
        if (response && typeof response === 'object') {
            if (response[globalColorKey] && ebJsonStringCheck(response[globalColorKey]) && typeof JSON.parse(response[globalColorKey]) === 'object') {
                return JSON.parse(response[globalColorKey])
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    });
}

/**
 * Fetch Block Defaults from Database using AJAX
 * @returns {Object || false}
 */
export function FETCH_BLOCK_DEFAULTS() {
    return getBlockDefaults().then(response => {
        if (response && ebJsonStringCheck(response) && typeof JSON.parse(response) === 'object') {
            return JSON.parse(response)
        }
        else {
            return false
        }
    });
}