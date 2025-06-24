import { __ } from "@wordpress/i18n";

import betterDocs from "./icons/intregrations/bd.svg";
import betterlinks from "./icons/intregrations/btl.svg";
import easyjobs from "./icons/intregrations/ej.svg";
import embedpress from "./icons/intregrations/ep.svg";
import notificationx from "./icons/intregrations/nx.svg";
import betterPayment from "./icons/intregrations/bp.svg";
import scheduledPress from "./icons/intregrations/wscp.svg";
import essentialAddons from "./icons/intregrations/ea.svg";

export const quickSetupMenu = [
    {
        id: 'get-started',
        label: __("Get Started", "essential-blocks"),
    },
    {
        id: 'configuration',
        label: __("Configuration", "essential-blocks"),
    },
    {
        id: 'blocks',
        label: __("Blocks", "essential-blocks"),
    },
    {
        id: 'optimization',
        label: __("Optimization", "essential-blocks"),
    },
    {
        id: 'pro',
        label: __("Go Pro", "essential-blocks"),
    },
    {
        id: 'templately',
        label: __("Templately", "essential-blocks"),
    },
    {
        id: 'integrations',
        label: __("Integrations", "essential-blocks"),
    },
];

export const optimizations = {
    googleFont: {
        logo: `${EssentialBlocksLocalize.image_url}/admin/logo-google-font.png`,
        title: "Google Fonts",
        description: __(
            "Enable Google Fonts to get access to 1400+ exclusive fonts for all the fully customizable blocks of Essential Blocks.",
            "essential-blocks"
        ),
        label: __("Enable Google Fonts", "essential-blocks"),
        default: true,
    },
    enableFontawesome: {
        logo: `${EssentialBlocksLocalize.image_url}/admin/logo-fontawesome.png`,
        title: "Font Awesome",
        description: __(
            "Enable Font Awesome to get access to 2,000+ exclusive icon library and toolkit for all the fully customizable blocks of Essential Blocks.",
            "essential-blocks",
        ),
        label: __("Enable Font Awesome", "essential-blocks"),
        default: true,
    },
};

export const extensions = {
    quickToolbar: {
        logo: `${EssentialBlocksLocalize.image_url}/admin/quick-toolbar-icon.svg`,
        title: __("Quick Action Toolbar", "essential-blocks"),
        description: __(
            "Easily access your most-used Essential Blocks for Gutenberg blocks by pinning them for quick selection.",
            "essential-blocks",
        ),
        label: __("Enable Quick Action Toolbar", "essential-blocks"),
        default: true,
    },
};

export const sortObject = (unordered) => {
    if (Object.keys(unordered).length === 0) {
        return unordered
    }
    const ordered = Object.keys(unordered).sort().reduce(
        (obj, key) => {
            obj[key] = unordered[key];
            return obj;
        },
        {}
    );
    return ordered
}

export const modes = [
    { id: "basic", label: "Basic", description: "To keep your site lightweight, choose this mode. The most basic Essential Blocks features are activated here.", recommended: true },
    { id: "advanced", label: "Advanced", description: "Get advanced functionalities and dynamic elements of Essential Blocks. Useful to build intricate websites.", recommended: false },
    { id: "custom", label: "Custom", description: "Configure Essential Blocks elements manually to fit your needs and make your website more engaging and captivating.", recommended: false }
];

export const integrations = [
    {
        slug: "betterdocs",
        basename: "betterdocs/betterdocs.php",
        logo: betterDocs,
        title: "BetterDocs",
        desc: __(
            "BetterDocs will help you to create & organize your documentation page in a beautiful way that will make your visitors find any help article easily.",
            "essential-blocks"
        ),
    },
    {
        slug: "embedpress",
        basename: "embedpress/embedpress.php",
        logo: embedpress,
        title: "EmbedPress",
        desc: __(
            "EmbedPress lets you embed videos, images, posts, audio, maps and upload PDF, DOC, PPT & all other types of content into your WordPress site.",
            "essential-blocks"
        ),
    },
    {
        slug: "betterlinks",
        basename: "betterlinks/betterlinks.php",
        logo: betterlinks,
        title: "BetterLinks",
        desc: __(
            "Best Link Shortening tool to create, shorten and manage any URL to help you cross-promote your brands & products. Gather analytics reports, run successfully marketing campaigns easily & many more.",
            "essential-blocks"
        ),
    },
    {
        slug: "notificationx",
        basename: "notificationx/notificationx.php",
        logo: notificationx,
        title: "NotificationX",
        desc: __(
            "Best FOMO Social Proof Plugin to boost your sales conversion. Create stunning Sales Popup & Notification Bar With Elementor Support.",
            "essential-blocks"
        ),
    },
    {
        slug: "easyjobs",
        basename: "easyjobs/easyjobs.php",
        logo: easyjobs,
        title: "easy.jobs",
        desc: __(
            "Easy solution for the job recruitment to attract, manage & hire right talent faster. The Best Talent Recruitment Suite which lets you manage jobs & career page in Elementor.",
            "essential-blocks"
        ),
    },
    {
        slug: "wp-scheduled-posts",
        basename: "wp-scheduled-posts/wp-scheduled-posts.php",
        logo: scheduledPress,
        title: "SchedulePress",
        desc: __(
            "Best Content Marketing Tool For WordPress – Schedule, Organize, & Auto Share Blog Posts. Take a quick glance at your content planning with Schedule Calendar, Auto & Manual Scheduler and  more.",
            "essential-blocks"
        ),
    },
    {
        slug: "essential-addons-for-elementor-lite",
        basename:
            "essential-addons-for-elementor-lite/essential_adons_elementor.php",
        logo: essentialAddons,
        title: "Essential Addons for Elementor",
        desc: __(
            "Powerful Elementor widgets library with 100+ advanced, fully customizable elements & extensions to enhance your website designing experience.",
            "essential-blocks"
        ),
    },
    {
        slug: "better-payment",
        basename: "better-payment/better-payment.php",
        logo: betterPayment,
        title: "Better Payment",
        desc: __(
            "Better Payment streamlines transactions in Elementor, integrating PayPal, Stripe, advanced analytics, validation, and Elementor forms for the most secure & efficient payments.",
            "essential-blocks"
        ),
    },
];
