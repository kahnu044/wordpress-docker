

import Accordion from "./block-defaults/accordion";
import AdvancedHeading from "./block-defaults/advanced-heading";
import AdvancedImage from "./block-defaults/advanced-image";
import AdvancedTabs from "./block-defaults/advanced-tabs";
import AdvancedVideo from "./block-defaults/advanced-video";
import AdvancedNavigation from "./block-defaults/advanced-navigation";
import EBButton from "./block-defaults/button";
import CallToAction from "./block-defaults/call-to-action";
import Countdown from "./block-defaults/countdown";
import DualButton from "./block-defaults/dual-button";
import FeatureList from "./block-defaults/feature-list";
import Flipbox from "./block-defaults/flipbox";
import FluentForms from "./block-defaults/fluent-forms";
import ImageComparison from "./block-defaults/image-comparison";
import ImageGallery from "./block-defaults/image-gallery";
import Infobox from "./block-defaults/infobox";
import InstagramFeed from "./block-defaults/instagram-feed";
import InteractivePromo from "./block-defaults/interactive-promo";
import NftGallery from "./block-defaults/nft-gallery";
import Notice from "./block-defaults/notice";
import NumberCounter from "./block-defaults/number-counter";
import Openverse from "./block-defaults/openverse";
import ParallaxSlider from "./block-defaults/parallax-slider";
import Popup from "./block-defaults/popup";
import PostCarousel from "./block-defaults/post-carousel";
import PostGrid from "./block-defaults/post-grid";
import PricingTable from "./block-defaults/pricing-table";
import ProgressBar from "./block-defaults/progress-bar";
import Row from "./block-defaults/row";
import Slider from "./block-defaults/slider";
import Social from "./block-defaults/social";
import SocialShare from "./block-defaults/social-share";
import TableOfContents from "./block-defaults/table-of-contents";
import TeamMember from "./block-defaults/team-member";
import Testimonial from "./block-defaults/testimonial";
import ToggleContent from "./block-defaults/toggle-content";
import TypingText from "./block-defaults/typing-text";
import WooProductGrid from "./block-defaults/woo-product-grid";
import Wpforms from "./block-defaults/wpforms";
import Wrapper from "./block-defaults/wrapper";
import GoogleMap from "./block-defaults/google-map";
import Form from "./block-defaults/form";

export const blockComponentObject = {
    advanced_heading: {
        component: AdvancedHeading,
        preview: true,
    },
    accordion: {
        component: Accordion,
        preview: true,
    },
    advanced_image: {
        component: AdvancedImage,
        preview: true,
        previewData: {
            image: {
                url: EssentialBlocksLocalize?.image_url + "/gallery-images/hongkong.jpg",
            },
            imageCaption: "Style images in Gutenberg with advanced options.",
        },
    },
    advanced_tabs: {
        component: AdvancedTabs,
        preview: true,
    },
    advanced_video: {
        component: AdvancedVideo,
        preview: true,
    },
    advanced_navigation: {
        component: AdvancedNavigation,
        preview: false,
    },
    button: {
        component: EBButton,
        preview: true,
    },
    call_to_action: {
        component: CallToAction,
        preview: true,
    },
    countdown: {
        component: Countdown,
        preview: true,
    },
    dual_button: {
        component: DualButton,
        preview: true,
    },
    feature_list: {
        component: FeatureList,
        preview: true,
    },
    flipbox: {
        component: Flipbox,
        preview: true,
    },
    fluent_forms: {
        component: FluentForms,
        preview: false,
    },
    image_comparison: {
        component: ImageComparison,
        preview: true,
        previewData: {
            leftImageURL: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/white-balloon-bnw.jpeg",
            rightImageURL: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/white-balloon.jpeg",
        },
    },
    image_gallery: {
        component: ImageGallery,
        preview: true,
        previewData: {
            images: [
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Maldive.jpg",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Australia.jpg",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/hongkong.jpg",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/iceland.jpg",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/china.jpg",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/CA.jpg",
                },
            ],

            sources: [
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Maldive.jpg",
                    caption: "",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Australia.jpg",
                    caption: "",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/hongkong.jpg",
                    caption: "",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/iceland.jpg",
                    caption: "",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/china.jpg",
                    caption: "",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/CA.jpg",
                    caption: "",
                },
            ],
        },
    },
    infobox: {
        component: Infobox,
        preview: true,
    },
    instagram_feed: {
        component: InstagramFeed,
        preview: false,
    },
    interactive_promo: {
        component: InteractivePromo,
        preview: true,
        previewData: {
            imageURL: EssentialBlocksLocalize?.image_url + "/gallery-images/china.jpg",
        },
    },
    nft_gallery: {
        component: NftGallery,
        preview: false,
    },
    notice: {
        component: Notice,
        preview: true,
    },
    number_counter: {
        component: NumberCounter,
        preview: true,
    },
    openverse: {
        component: Openverse,
        preview: false,
    },
    parallax_slider: {
        component: ParallaxSlider,
        preview: true,
        previewData: {
            sliderData: [
                {
                    src: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Maldive.jpg",
                },
                {
                    src: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Australia.jpg",
                },
                {
                    src: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/hongkong.jpg",
                },
                {
                    src: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/iceland.jpg",
                },
            ],
        },
    },
    popup: {
        component: Popup,
        preview: true,
    },
    post_carousel: {
        component: PostCarousel,
        preview: false,
    },
    post_grid: {
        component: PostGrid,
        preview: false,
    },
    pricing_table: {
        component: PricingTable,
        preview: true,
    },
    progress_bar: {
        component: ProgressBar,
        preview: true,
    },
    row: {
        component: Row,
        preview: false,
    },
    slider: {
        component: Slider,
        preview: true,
        previewData: {
            images: [
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Maldive.jpg",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Australia.jpg",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/hongkong.jpg",
                },
                {
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/iceland.jpg",
                },
            ],
        },
    },
    social: {
        component: Social,
        preview: true,
    },
    social_share: {
        component: SocialShare,
        preview: true,
    },
    table_of_contents: {
        component: TableOfContents,
        preview: true,
    },
    team_member: {
        component: TeamMember,
        preview: true,
    },
    testimonial: {
        component: Testimonial,
        preview: true,
    },
    toggle_content: {
        component: ToggleContent,
        preview: true,
    },
    typing_text: {
        component: TypingText,
        preview: true,
    },
    woo_product_grid: {
        component: WooProductGrid,
        preview: false,
    },
    wpforms: {
        component: Wpforms,
        preview: false,
    },
    wrapper: {
        component: Wrapper,
        preview: true,
    },
    google_map: {
        component: GoogleMap,
        preview: false,
    },
    form: {
        component: Form,
        preview: false,
    },
};
