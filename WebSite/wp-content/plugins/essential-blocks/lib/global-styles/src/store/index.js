/**
 * Store Setup
 */
import {
    createReduxStore,
    register,
    select,
    subscribe,
    dispatch
} from '@wordpress/data';

import * as actions from "./actions"
import * as selectors from "./selectors"
import * as controls from "./controls"
import * as resolvers from "./resolvers"
import reducer from "./reducer"

/**
 * Create WP Redux Store
 */
const store = createReduxStore(
    'essential-blocks',
    {
        reducer,
        actions,
        selectors,
        controls,
        resolvers
    }
);

register(store);

/**
 * Save Global Values on Save Page/Post
 */
// subscribe(() => {
//     const isSavingPost = select('core/editor').isSavingPost();
//     const isAutosavingPost = select('core/editor').isAutosavingPost();

//     if (isAutosavingPost && !isSavingPost) {
//         return;
//     }

//     /**
//      * Action
//      */
//     if (isSavingPost && !isAutosavingPost) {
//         const globalColors = select('essential-blocks').getGlobalColors()
//         dispatch('essential-blocks').saveGlobalColors(globalColors)
//     }
// });
