/**
 * Store Setup
 */
import {
    createReduxStore,
    register
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
