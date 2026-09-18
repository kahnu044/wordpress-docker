/**
 * Pro-upsell icons for the Facebook Feed inspector.
 *
 * `FilterProIcon` heads the "Content Filters" upgrade card; `Crown` sits in
 * the upgrade button. Both are copied from the canonical woo-product-grid /
 * advanced-controls upsell SVGs so the visual treatment matches the rest of
 * the plugin's free→Pro upsell cards (the `eb_ie` card pattern). Shown only
 * when Pro is inactive (`EssentialBlocksLocalize.is_pro_active === "false"`).
 */

export const FilterProIcon = () => (
    <svg
        width="73"
        height="72"
        viewBox="0 0 73 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="1.02941"
            y="0.529412"
            width="70.9412"
            height="70.9412"
            rx="15.4706"
            fill="url(#paint0_linear_fb_filter)"
        />
        <rect
            x="1.02941"
            y="0.529412"
            width="70.9412"
            height="70.9412"
            rx="15.4706"
            stroke="url(#paint1_linear_fb_filter)"
            strokeWidth="1.05882"
        />
        <path
            d="M26 24h21a1 1 0 0 1 .78 1.625l-7.53 9.41a2 2 0 0 0-.44 1.25v8.09a1 1 0 0 1-.55.9l-4 2A1 1 0 0 1 33.7 46.3v-9.94a2 2 0 0 0-.44-1.25l-7.53-9.41A1 1 0 0 1 26 24Z"
            fill="#6C3BFF"
        />
        <defs>
            <linearGradient
                id="paint0_linear_fb_filter"
                x1="36.5"
                y1="0"
                x2="36.5"
                y2="72"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#FFF0E4" />
                <stop offset="1" stopColor="#FFF0E4" stopOpacity="0" />
            </linearGradient>
            <linearGradient
                id="paint1_linear_fb_filter"
                x1="36.5"
                y1="0"
                x2="29"
                y2="36"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#FFDDC2" />
                <stop offset="1" stopColor="#FFDDC2" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

export const Crown = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
    >
        <path
            fill="#fff"
            d="M1.419 10.489.506 4.558a.495.495 0 0 1 .786-.471l2.843 2.132a.68.68 0 0 0 .973-.167l2.366-3.55a.632.632 0 0 1 1.052 0l2.366 3.55c.217.325.661.4.973.167l2.843-2.132a.495.495 0 0 1 .786.47l-.913 5.932zM13.894 13.78H2.104a.686.686 0 0 1-.686-.687v-1.507h13.163v1.507a.686.686 0 0 1-.687.687"
        ></path>
    </svg>
);
