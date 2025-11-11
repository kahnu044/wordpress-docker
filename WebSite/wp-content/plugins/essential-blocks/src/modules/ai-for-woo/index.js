import { createRoot } from "@wordpress/element";

import "./style.scss";
import AIWooButton from "./AIWooButton";

console.log('AI for WooCommerce loaded');

document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on a WooCommerce product edit page
    const isWooProductPage = () => {
        const currentUrl = window.location.href;
        return (
            currentUrl.includes('post.php') &&
            currentUrl.includes('action=edit') &&
            document.querySelector('body.post-type-product')
        ) || (
                currentUrl.includes('post-new.php') &&
                currentUrl.includes('post_type=product')
            );
    };
    console.log('isWooProductPage', isWooProductPage());

    // Only proceed if we're on a WooCommerce product page
    if (!isWooProductPage()) {
        return;
    }

    // Create Button
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('eb-ai-woo-button-wrapper');
    const root = createRoot(buttonDiv);
    root.render(<AIWooButton />);

    // Function to add button to the page
    const addButtonToPage = () => {
        // Look for the page title action area (where "Add new product" button is)
        const titleAction = document.querySelector('.page-title-action');

        if (titleAction && !document.querySelector('.eb-ai-woo-button-wrapper')) {
            // Insert our button after the existing page-title-action button
            titleAction.parentNode.insertBefore(buttonDiv, titleAction.nextSibling);
        }
    };

    // Try to add button immediately
    addButtonToPage();

    // Also try after a short delay in case the DOM isn't fully ready
    setTimeout(addButtonToPage, 100);
    setTimeout(addButtonToPage, 500);
    setTimeout(addButtonToPage, 1000);

    // Monitor for DOM changes in case WooCommerce dynamically loads content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                addButtonToPage();
            }
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
