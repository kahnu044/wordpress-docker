import * as actions from "./actions";

/**
 * getGlobalColors resolver
 * @returns 
 */
export function *getGlobalColors() {
    let globalColors = yield actions.fetchGlobalColor();
    return actions.setGlobalColors(globalColors)
}

/**
 * getBlockDefaults resolver
 * @returns 
 */
export function *getBlockDefaults() {
    let value = yield actions.fetchBlockDefaults();
    return actions.setBlockDefault(value)
}