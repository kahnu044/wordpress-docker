import { PluginSidebar } from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { PanelBody, Button, Popover, Dashicon } from "@wordpress/components";

import { dispatch, useSelect, withSelect } from "@wordpress/data";
import {
    __experimentalColorGradientControl as ColorGradientControl,
    BlockPreview,
} from "@wordpress/block-editor";
import { createBlock, store as blocksStore } from "@wordpress/blocks";

import EBIcon from "./assets/icon";
import "./style.scss";

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

/**
 * Global Controls Component
 * @param {*} props
 * @returns {Component}
 */
function EBGlobalControls(props) {
    const {
        // getGlobalColors,
        getBlockDefaults
    } = props;

    const defaultColors = {
        primaryColor: "#551ef7",
        secondaryColor: "#abb8c3",
        headingColor: "#333333",
        linkColor: "#551ef7",
        buttonTextColor: "#551ef7",
        buttonBgColor: "#333333",
        backgroundColor: "#f7f7f7",
    };

    const components = {
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
                    url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/advanced-images.jpeg",
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
                leftImageURL: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/white-balloon-bnw.jpeg",
                rightImageURL: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/white-balloon.jpeg",
            },
        },
        image_gallery: {
            component: ImageGallery,
            preview: true,
            previewData: {
                images: [
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Maldive.png",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Australia.png",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/hongkong.png",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/iceland.png",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/china.png",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/CA.png",
                    },
                ],

                sources: [
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Maldive.png",
                        caption: "",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Australia.png",
                        caption: "",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/hongkong.png",
                        caption: "",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/iceland.png",
                        caption: "",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/china.png",
                        caption: "",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/CA.png",
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
                imageURL: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/advanced-images.jpeg",
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
                        src: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Maldive.png",
                    },
                    {
                        src: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Australia.png",
                    },
                    {
                        src: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/hongkong.png",
                    },
                    {
                        src: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/iceland.png",
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
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Maldive.png",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/Australia.png",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/hongkong.png",
                    },
                    {
                        url: EssentialBlocksLocalize?.eb_plugins_url + "assets/images/gallery-images/iceland.png",
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
    };

    /**
     * State
     */
    // const [globalColors, setGlobalColors] = useState({});
    const [blockDefaults, setBlockDefaults] = useState({});
    const [blockItemDefaults, setBlockItemDefaults] = useState({});
    const [popoverAnchor, setPopoverAnchor] = useState();
    const [clickedBlock, setClickedBlock] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    //Initial UseEffect, Set Defualt color if Store is empty
    // useEffect(() => {
    //     if (
    //         typeof getGlobalColors === "object" &&
    //         Object.keys(globalColors).length === 0
    //     ) {
    //         setGlobalColors(defaultColors);
    //     }
    // }, []);

    //Set globalColors when Store "getGlobalColors" is changed
    // useEffect(() => {
    //     if (JSON.stringify(getGlobalColors) !== JSON.stringify(globalColors)) {
    //         setGlobalColors(getGlobalColors);
    //     }
    // }, [getGlobalColors]);

    //Update Store when "globalColors" is changed
    // useEffect(() => {
    //     if (Object.keys(globalColors).length > 0) {
    //         dispatch("essential-blocks").setGlobalColors(globalColors);
    //     }
    // }, [globalColors]);

    //Update Global Colors
    // const setGlobalColor = (colorObj) => {
    //     const colors = { ...globalColors };
    //     if (Object.keys(colorObj)[0] && Object.values(colorObj)[0]) {
    //         colors[Object.keys(colorObj)[0]] = Object.values(colorObj)[0];
    //     }

    //     setGlobalColors(colors);
    // };

    //Get Device type from "__experimentalGetPreviewDeviceType" Function
    const deviceType = useSelect((select) => {
        return select("core/edit-post").__experimentalGetPreviewDeviceType();
    });

    /**
     * Handle Popup Visibility
     * @param {*} block
     */
    const toggleVisible = (block) => {
        setClickedBlock(block);
        setIsVisible((state) => !state);
    };

    //Set blockDefaults when Store "getBlockDefaults" is changed
    useEffect(() => {
        if (JSON.stringify(getBlockDefaults) !== JSON.stringify(blockDefaults)) {
            setBlockDefaults(getBlockDefaults);
        }
    }, [getBlockDefaults]);

    useEffect(() => {
        setBlockDefaults({
            ...blockDefaults,
            ...blockItemDefaults,
        });
    }, [blockItemDefaults]);

    /**
     * Handle Save Block Default
     * @param {*} block
     */
    const handleSaveBlockDefault = () => {
        setIsVisible((state) => !state);

        //Save Block Default
        if (Object.keys(blockDefaults).length > 0) {
            dispatch("essential-blocks").setBlockDefault(blockDefaults);
            dispatch("essential-blocks").saveBlockDefault(blockDefaults);
        }
    };

    /**
     * Handle Reset Block Default
     * @param {*} block
     */
    const handleResetBlockDefault = (selected) => {
        if (
            !window.confirm(
                `Are you sure, you want to reset all the changes you made for ${registeredBlocks[clickedBlock]?.label}`
            )
        ) {
            return;
        }
        const defaults = { ...blockDefaults };
        if (defaults[selected]) {
            delete defaults[selected];
        }

        //Save Block Default
        dispatch("essential-blocks").setBlockDefault(defaults);
        dispatch("essential-blocks").saveBlockDefault(defaults);

        //save updated blockDefault object after deleted selected
        setBlockItemDefaults({});
        setBlockDefaults(defaults);

        //Reload popup
        setIsVisible(false);
        setTimeout(() => {
            setIsVisible(true);
        }, 1);
    };

    /**
     * Handle Close without save
     * @param {*} selected
     */
    const handleCloseWithoutSave = (selected) => {
        setBlockItemDefaults({});
        setIsVisible(false);
    };

    /**
     * Setup Popup
     */
    useEffect(() => {
        const editor = document.querySelector("#editor");
        setPopoverAnchor(editor);
    }, []);

    const ClickedComponent = components[clickedBlock]?.component;
    const allBlocksKeys = Object.keys(components);
    const registeredBlocks = EssentialBlocksLocalize?.all_blocks_default;
    const activedBlocks = EssentialBlocksLocalize?.all_blocks;

    /**
     * Handle preview data
     * @param {*} selected
     * @returns
     */
    const previewData = (selected) => {
        let data = { ...blockDefaults[selected] };
        if (components[selected].previewData) {
            data = {
                ...data,
                ...components[selected].previewData,
            };
        }
        return data;
    };

    return (
        <>
            <PluginSidebar
                className="eb-global-controls"
                icon={<EBIcon />}
                name="eb-global-controls"
                title={__("EB Global Controls", "essential-blocks")}
            >
                {/* <div className="eb-panel-control">
					<PanelBody
						title={__("Global Colors", "essential-blocks")}
						initialOpen={false}
					>
						<ColorControl
							label={__("Primary Color", "essential-blocks")}
							color={globalColors.primaryColor}
							onChange={(value) => setGlobalColor({ primaryColor: value })}
						/>

						<ColorControl
							label={__("Secondary Color", "essential-blocks")}
							color={globalColors.secondaryColor}
							onChange={(value) => setGlobalColor({ secondaryColor: value })}
						/>

						<ColorControl
							label={__("Heading Color", "essential-blocks")}
							color={globalColors.headingColor}
							onChange={(value) => setGlobalColor({ headingColor: value })}
						/>

						<ColorControl
							label={__("Link Color", "essential-blocks")}
							color={globalColors.linkColor}
							onChange={(value) => setGlobalColor({ linkColor: value })}
						/>

						<ColorControl
							label={__("Button Text Color", "essential-blocks")}
							color={globalColors.buttonTextColor}
							onChange={(value) => setGlobalColor({ buttonTextColor: value })}
						/>

						<ColorControl
							label={__("Button Background Color", "essential-blocks")}
							color={globalColors.buttonBgColor}
							onChange={(value) => setGlobalColor({ buttonBgColor: value })}
						/>

						<ColorControl
							label={__("Background Color", "essential-blocks")}
							color={globalColors.backgroundColor}
							onChange={(value) => setGlobalColor({ backgroundColor: value })}
						/>
					</PanelBody>
				</div> */}

                <PanelBody
                    title={__("Block Defaults", "essential-blocks")}
                    initialOpen={true}
                >
                    <div className="eb-block-list-button">
                        {typeof registeredBlocks === "object" &&
                            Object.keys(components).map((item, index) => (
                                <div className="eb-block-button" key={index}>
                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            toggleVisible(
                                                registeredBlocks[item].value
                                            )
                                        }
                                    >
                                        <img
                                            className="eb-global-icon"
                                            src={registeredBlocks[item]?.icon}
                                            alt={registeredBlocks[item]?.label}
                                        />
                                        {registeredBlocks[item]?.label}

                                        {getBlockDefaults[item] && (
                                            <span className="active">
                                                {" "}
                                                {__(<Dashicon icon={"edit"} />)}
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            ))}
                    </div>
                </PanelBody>
            </PluginSidebar>

            {isVisible && (
                <Popover
                    anchor={popoverAnchor}
                    className="eb-block-default-popup"
                >
                    <Button
                        className="btn-block-default btn-block-default-close"
                        onClick={() => handleCloseWithoutSave(clickedBlock)}
                    >
                        {__(<Dashicon icon={"no"} />)}
                    </Button>
                    {allBlocksKeys.includes(clickedBlock) && (
                        <>
                            <div
                                id="eb-preview"
                                className="eb-block-default-preveiw-wrapper"
                            >
                                <div className="eb-block-default-heading">
                                    <span>
                                        {
                                            EssentialBlocksLocalize
                                                .all_blocks_default[
                                                clickedBlock
                                            ].label
                                        }{" "}
                                        Preview
                                    </span>
                                </div>

                                {components[clickedBlock].preview &&
                                    activedBlocks[clickedBlock].visibility ===
                                    "true" && (
                                        <BlockPreview
                                            blocks={createBlock(
                                                `essential-blocks/${clickedBlock.replace(
                                                    /_/g,
                                                    "-"
                                                )}`,
                                                {
                                                    ...previewData(
                                                        clickedBlock
                                                    ),
                                                }
                                            )}
                                            viewportWidth={500}
                                        />
                                    )}

                                {activedBlocks[clickedBlock].visibility ===
                                    "false" && (
                                        <p className="preview-not-available">
                                            {registeredBlocks[clickedBlock].label}{" "}
                                            Block isn't Enabled!
                                        </p>
                                    )}

                                {!components[clickedBlock].preview && (
                                    <p className="preview-not-available">
                                        Preview not available
                                    </p>
                                )}

                                <div className="block-default-popup-footer">
                                    <Button
                                        className="btn-block-default-reset"
                                        onClick={() =>
                                            handleResetBlockDefault(
                                                clickedBlock
                                            )
                                        }
                                    >
                                        Reset
                                    </Button>

                                    <Button
                                        className=" btn-block-default-save"
                                        onClick={() => handleSaveBlockDefault()}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                            <div className="eb-block-default">
                                <ClickedComponent
                                    blockDefaults={blockDefaults}
                                    setBlockDefaults={setBlockItemDefaults}
                                    name={clickedBlock}
                                    deviceType={deviceType}
                                />
                            </div>
                        </>
                    )}
                    {!allBlocksKeys.includes(clickedBlock) && (
                        <h3>Block Default Controls not available</h3>
                    )}
                </Popover>
            )}
        </>
    );
}

export default withSelect((select) => {
    return {
        // getGlobalColors: select("essential-blocks").getGlobalColors(),
        getBlockDefaults: select("essential-blocks").getBlockDefaults(),
    };
})(EBGlobalControls);
