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