import {
    DEFAULT_STATE,
    SET_GLOBAL_COLORS,
    SAVE_GLOBAL_COLORS,
    SET_BLOCK_DEFAULTS,
    SAVE_BLOCK_DEFAULTS,
    FETCH_GLOBAL_COLORS
} from "./constant"

export default function reducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_GLOBAL_COLORS:
            return {
                ...state,
                globalColors: {
                    ...state.globalColors,
                    ...action.value,
                },
            };
        case SAVE_GLOBAL_COLORS:
            return state
        case SET_BLOCK_DEFAULTS:
            return {
                ...state,
                blockDefaults: action.value,
            };
        case SAVE_BLOCK_DEFAULTS:
            return state
        case FETCH_GLOBAL_COLORS:
            return state
        default:
            return state;
    }
}