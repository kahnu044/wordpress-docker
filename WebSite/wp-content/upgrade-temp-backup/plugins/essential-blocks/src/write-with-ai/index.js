
import { createRoot } from "@wordpress/element"
import { subscribe } from '@wordpress/data'

import "./style.scss"
import WriteAIButton from "./WriteAiButton"

document.addEventListener('DOMContentLoaded', function () {
    // const plugin_file = "templately/templately.php";
    // const templately = EssentialBlocksLocalize.get_plugins[plugin_file];
    // if (templately && templately.active) {
    //     return;
    // }

    // Create Button
    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('eb-write-ai-button-wrapper')
    const root = createRoot(buttonDiv);
    root.render(<WriteAIButton />);

    subscribe(() => {
        const toplbar = document.querySelector('.editor-header__settings')
        if (toplbar) {
            const templately = undefined;
            if (templately && templately.active) {
                if (toplbar.querySelector('.eb-write-ai-button-wrapper')) {
                    toplbar.removeChild(buttonDiv)
                }
            }
            else if (!toplbar.querySelector('.eb-write-ai-button-wrapper')) {
                toplbar.prepend(buttonDiv)
            }
        }
    })
});
