/**
 * Register Essential Block Global Controls Panel
 */
import { registerPlugin } from '@wordpress/plugins';

import EBGlobalControls from "./controls";
import EBIcon from "./assets/icon"

import "./store";


if (eb_conditional_localize?.editor_type !== 'edit-site') {
    registerPlugin(
        'eb-global-controls',
        {
            icon: EBIcon,
            render: EBGlobalControls,
        }
    );
}
