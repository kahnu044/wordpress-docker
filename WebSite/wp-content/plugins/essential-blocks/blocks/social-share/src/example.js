import { __ } from "@wordpress/i18n";
const example = {
    attributes: {
        // endTimeStamp: Date.now() + 462878000,
        socialDetails: [
            {
                icon: "fab fa-facebook-f",
                iconText: __("Facebook", "essential-blocks"),
                isExpanded: false,
            },
            {
                icon: "fab fa-twitter",
                iconText: __("Twitter", "essential-blocks"),
                isExpanded: false,
            },
            {
                icon: "fab fa-linkedin-in",
                iconText: __("Linkedin", "essential-blocks"),
                isExpanded: false,
            },
        ],
    },
};

export default example;
