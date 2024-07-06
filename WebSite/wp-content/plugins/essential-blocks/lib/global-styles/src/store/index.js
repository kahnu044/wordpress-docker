/**
 * Store Setup
 */
import {
    createReduxStore,
    register,
    select,
    subscribe,
    dispatch,
    useSelect
} from '@wordpress/data';

/**
 * Import Constants
 */
import {
    globalColorKey,
    customColorKey,
    gradientColorKey,
    customGradientColorKey,
    globalTypoKey
} from "./constant"

import { getGlobalSettings } from "../helpers/helpers"

/**
 * Import Fetch Functions
 */
import {
    updateGlobalStyle
} from '../fetch';

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

subscribe(() => {
    const isSavingPost = select('core/editor').isSavingPost();
    const isAutosavingPost = select('core/editor').isAutosavingPost();

    const ebIsSaving = select('essential-blocks').getIsSaving()

    if (!ebIsSaving || isAutosavingPost || !isSavingPost) {
        return;
    }

    const globals = getGlobalSettings()
    const allData = {
        [globalColorKey]: globals?.getGlobalColors,
        [customColorKey]: globals?.getCustomColors,
        [gradientColorKey]: globals?.getGradientColors,
        [customGradientColorKey]: globals?.getCustomGradientColors,
        [globalTypoKey]: globals?.getGlobalTypography
    }

    let response = updateGlobalStyle(allData);

    //setIsSaving to 'false' so that 'updateGlobalStyle' won't run multiple times
    dispatch('essential-blocks').setIsSaving(false)
});
