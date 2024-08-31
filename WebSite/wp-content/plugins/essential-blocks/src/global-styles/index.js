/**
 * WordPress Dependencies
 */
import {
    select,
    subscribe,
    dispatch
} from '@wordpress/data';

/**
 * Register Essential Block Global Controls Panel
 */
import { registerPlugin } from '@wordpress/plugins';

import EBGlobalControls from "./controls";
import EBIcon from "./assets/icon"

//Import Constants
import {
    globalColorKey,
    customColorKey,
    gradientColorKey,
    customGradientColorKey,
    globalTypoKey
} from "../store/constant"
import { getGlobalSettings } from "../helpers/helpers"
import { updateGlobalStyle } from '../helpers/fetch';


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

    const globals = getGlobalSettings(select)
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



/**
 * Register EB Global Controls Slotfill
 */
registerPlugin(
    'eb-global-controls',
    {
        icon: EBIcon,
        render: EBGlobalControls,
    }
);
