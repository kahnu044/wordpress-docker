
import { createRoot } from "@wordpress/element"
import { subscribe } from '@wordpress/data'

import "./style.scss"
import PatternLibraryButton from "./PatternLibraryButton"

document.addEventListener('DOMContentLoaded', function () {
    const plugin_file = "templately/templately.php";
    const templately = EssentialBlocksLocalize.get_plugins[plugin_file];
    if (templately && templately.active) {
        return;
    }

    // Create Button
    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('eb-pattern-library-button-wrapper')
    const root = createRoot(buttonDiv);
    root.render(<PatternLibraryButton />);

    subscribe(() => {
        const toplbar = document.querySelector('.edit-post-header-toolbar')
        if (toplbar) {
            const templately = EssentialBlocksLocalize.get_plugins[plugin_file];
            if (templately && templately.active) {
                if (toplbar.querySelector('.eb-pattern-library-button-wrapper')) {
                    toplbar.removeChild(buttonDiv)
                }
            }
            else if (!toplbar.querySelector('.eb-pattern-library-button-wrapper')) {
                toplbar.appendChild(buttonDiv)
            }
        }
    })
});
