/**
 * Import Constants
 */
import {
    DEFAULT_STATE,
    SET_GLOBAL_COLORS,
    SAVE_GLOBAL_COLORS,
    SET_BLOCK_DEFAULTS,
    SAVE_BLOCK_DEFAULTS,
    FETCH_GLOBAL_COLORS,
    FETCH_BLOCK_DEFAULTS,
} from "./constant"

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
 * Action: Set Global Colors
 * @param {*} value
 * @returns
 */
export function setGlobalColors(value) {
    return {
        type: SET_GLOBAL_COLORS,
        value,
    }
}

/**
 * Action: Save Global Color to Database
 * @param {*} value
 * @returns
 */
export function saveGlobalColors(value) {
    return async ({ select, resolveSelect, dispatch }) => {
        if (Object.keys(value).length > 0) {
            let response = await updateGlobalStyle(value);
        }
        dispatch({
            type: SAVE_GLOBAL_COLORS,
            value,
        })
    };
}

/**
 * Action: Fetch Global Color from Database
 * @returns
 */
export function fetchGlobalColor() {
    return {
        type: FETCH_GLOBAL_COLORS,
    }
}

/**
 * Action: Set block default
 * @param {*} value
 * @returns
 */
export function setBlockDefault(value) {
    return {
        type: SET_BLOCK_DEFAULTS,
        value,
    }
}

/**
 * Action: Save block default when click save button on each block default settings
 * @param {*} value
 * @returns
 */
export function saveBlockDefault(value) {
    return async ({ select, resolveSelect, dispatch }) => {
        // if (Object.keys(value).length > 0) {
        //     let response = await updateBlockDefaults(value);
        // }
        if (typeof value === 'object') {
            let response = await updateBlockDefaults(value);
        }
        dispatch({
            type: SAVE_BLOCK_DEFAULTS,
            value,
        })
    };
}

/**
 * Action: Fetch Block Defaults from Database
 * @returns
 */
export function fetchBlockDefaults() {
    return {
        type: FETCH_BLOCK_DEFAULTS,
    }
}
