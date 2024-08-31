/**
 * Selector: Get Global Colors
 * @param {*} state
 * @returns
 */
export function getGlobalColors(state) {
    const { globalColors } = state
    return globalColors;
}

/**
 * Selector: Get Global Colors by Item
 * @param {*} state
 * @param {*} item
 * @returns
 */
export function getGlobalColorsByItem(state, item) {
    const { globalColors } = state
    return globalColors[item]
}

/**
 * Selector: Get Custom Colors
 * @param {*} state
 * @returns
 */
export function getCustomColors(state) {
    const { customColors } = state
    return customColors;
}

/**
 * Selector: Get Gradient Colors
 * @param {*} state
 * @returns
 */
export function getGradientColors(state) {
    const { gradientColors } = state
    return gradientColors;
}

/**
 * Selector: Get Custom Gradient Colors
 * @param {*} state
 * @returns
 */
export function getCustomGradientColors(state) {
    const { customGradientColors } = state
    return customGradientColors;
}

/**
 * Selector: Get Global Typography
 * @param {*} state
 * @returns
 */
export function getGlobalTypography(state) {
    const { globalTypography } = state
    return globalTypography;
}

/**
 * Selector: Get Block Defaults
 * @param {*} state
 * @returns
 */
export function getBlockDefaults(state) {
    const { blockDefaults } = state
    return blockDefaults;
}

/**
 * Selector: Get Block Defaults by Item
 * @param {*} state
 * @param {*} item
 * @returns
 */
export function getBlockDefaultsByItem(state, item) {
    const { blockDefaults } = state
    return blockDefaults[item]
}

/**
 * Selector: Get Is Saving
 * @param {*} state
 * @returns
 */
export function getIsSaving(state) {
    const { isSaving } = state
    return isSaving
}


/**
 * Selector: Get Block Data
 * @param {object} state
 * @param {string} selector
 * @returns
 */
export function getBlockData(state, selector) {
    const { blockData } = state
    if (selector) {
        return blockData[selector] || {}
    }
    return blockData
}
