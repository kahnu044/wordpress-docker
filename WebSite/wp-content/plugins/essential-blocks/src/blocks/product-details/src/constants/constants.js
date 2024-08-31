import { __ } from "@wordpress/i18n";

// the consts defined here should be unique from one another
export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";

export const RATING_SIZE = "ratingIcon";
export const RATING_GAP = "ratingGap";
export const COUNT_GAP = "countGap";

export const tabTitlePadding = "tabTitlePadding";
export const tabTitleMargin = "tabTitleMargin";
export const tabTitleBdShadow = "tabTitleBdShadow";

export const tabContentPadding = "tabContentPadding";
export const tabContentMargin = "tabContentMargin";
export const tabContentBdShadow = "tabContentBdShadow";

export const NORMAL_HOVER = [
    { label: "Normal", value: "normal" },
    { label: "Hover", value: "hover" },
];

export const PRODUCT_TABS = [
    {
        id: 'description',
        title: 'Description',
        active: true,
        content: __(
            'This block lists description, attributes and reviews for a single product.',
            'woocommerce'
        ),
    },
    {
        id: 'additional_information',
        title: 'Additional Information',
        active: false,
    },
    { id: 'reviews', title: 'Reviews', active: false, },
];
