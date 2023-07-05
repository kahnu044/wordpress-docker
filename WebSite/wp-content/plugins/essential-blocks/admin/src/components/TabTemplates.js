import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { select, dispatch } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";

import { installPlugin } from "./helpers/installPlugins";
import { getTemplates, getTemplateCount } from "./helpers/getTemplates";
import { ebJsonStringCheck } from "./helpers";

import ReactPlayer from "react-player";

import templatelyLogo from "../icons/templately-logo.svg";
import iconMan from "../icons/iconMan.svg";
import iconBlueCheck from "../icons/iconBlueCheck.svg";
import { LayerRedIcon } from "../icons/layer-red-icon.js";
import templatelyOverlay from "../icons/templately-overlay.jpg";
import playIcon from "../icons/play-icon.svg";

export default function TabTemplates() {
    let videoPlayIcon = <img src={playIcon} />;

    /**
     * 0 = 'not installed', 1 = 'Not activated', 2 = 'Activated'
     */
    const [templateCount, setTemplateCount] = useState(0);
    const [templates, setTemplates] = useState();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(0);
    const [buttonText, setButtonText] = useState("Install Templately");
    const plugin_file = "templately/templately.php";

    useEffect(() => {
        // getTemplateCount().then((res) => {
        //     if (res.body && ebJsonStringCheck(res.body)) {
        //         const result = JSON.parse(res.body);
        //         const counts = result?.data?.getCounts;
        //         const itemCounts = counts.filter((item, index) => item.key === 'items')
        //         if (typeof itemCounts === "object" && itemCounts[0].value) {
        //             setTemplateCount(itemCounts[0].value)
        //         }
        //     }
        // })
        getTemplates().then((res) => {
            if (res?.body && ebJsonStringCheck(res?.body)) {
                const result = JSON.parse(res.body);
                const packs = result?.data?.packs.data;
                if (typeof packs === "object" && packs.length > 0) {
                    setTemplates(packs);
                }
            }
        });

        const templately = EssentialBlocksLocalize.get_plugins[plugin_file];
        if (templately) {
            if (templately.active) {
                setStatus(2);
                setButtonText("Activated");
            } else {
                setStatus(1);
                setButtonText("Active Templately");
            }
        }
    }, []);

    const installTemplately = () => {
        if (status === 2) {
            return;
        }
        setLoading(true);
        installPlugin("templately", plugin_file).then((data) => {
            const res = JSON.parse(data);
            if (res.success) {
                setStatus(2);
                setButtonText("Installed and Activated");
                setLoading(false);
            }
            else {
                setStatus(0);
                setButtonText("Couldn\'t Activated the plugin!");
                setLoading(false);
            }
        });
    };

    const handleTemplateUrl = (slug) => {
        if (status === 2) {
            return (
                EssentialBlocksLocalize.eb_admin_url +
                "admin.php?page=templately&path=gutenberg%2Fpacks"
            );
        } else {
            return "https://templately.com/pack/" + slug;
        }
    };

    const browseTemplates = () => {
        if (status === 2) {
            return (
                EssentialBlocksLocalize.eb_admin_url +
                "admin.php?page=templately&path=gutenberg%2Fpacks"
            );
        } else {
            return "https://templately.com/platform/gutenberg";
        }
    };

    return (
        <>
            <div className="eb-admin-grid">
                <div className="eb-col-12">
                    <div className="eb-admin-block eb-templates-intro-block mb30">
                        <div className="eb-admin-grid">
                            <div className="eb-col-5">
                                <img
                                    src={templatelyLogo}
                                    className="temlately-logo"
                                />
                                <h2>
                                    <span>
                                        {/* {__(templateCount+"+", "essential-blocks")} */}
                                        {__("4000+", "essential-blocks")}
                                    </span>

                                    {__(
                                        " Stunning Templates for WordPress",
                                        "essential-blocks"
                                    )}
                                </h2>
                                <ul>
                                    <li>
                                        <LayerRedIcon></LayerRedIcon>
                                        {__(
                                            "Access Thousands Of Stunning, Ready Website Templates",
                                            "essential-blocks"
                                        )}
                                    </li>
                                    <li>
                                        <img src={iconBlueCheck} />
                                        {__(
                                            "Save Your Design Anywhere With MyCloud Storage Space",
                                            "essential-blocks"
                                        )}
                                    </li>
                                    <li>
                                        <img src={iconMan} />
                                        {__(
                                            "Add Team Members & Collaborate On Cloud With Templately WorkSpace",
                                            "essential-blocks"
                                        )}
                                    </li>
                                </ul>
                                <button
                                    className="eb-btn eb-btn-primary eb-install-button"
                                    onClick={() => installTemplately()}
                                >
                                    {loading && (
                                        <img
                                            className="eb-install-loader"
                                            src={`${EssentialBlocksLocalize.eb_plugins_url}/assets/images/loading.svg`}
                                        />
                                    )}

                                    {buttonText}
                                </button>
                            </div>
                            <div className="eb-col-7">
                                <div className="eb-admin-video-block">
                                    <ReactPlayer
                                        url="https://www.youtube.com/watch?v=mdPrcpR46GI"
                                        loop={true}
                                        muted={true}
                                        playing={true}
                                        controls={false}
                                        light={templatelyOverlay}
                                        playIcon={videoPlayIcon}
                                        className="eb-react-player"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {typeof templates === "object" && (
                        <>
                            <div className="eb-admin-block">
                                <div className="templates-heading-wrapper eb-block-xs">
                                    <h3>
                                        {__("Popular Templates", "essential-blocks")}
                                    </h3>
                                </div>

                                <div className="eb-admin-grid">
                                    {templates.map((item, index) => (
                                        <a
                                            key={index}
                                            className="eb-col-4 eb-templates-block"
                                            href={handleTemplateUrl(item.slug)}
                                            target="_blank"
                                        >
                                            <img src={item.thumbnail} />
                                            <h4>{item.name}</h4>
                                        </a>
                                    ))}
                                </div>

                                <a
                                    href={browseTemplates()}
                                    target={status === 2 ? "_self" : "_blank"}
                                    className="eb-btn eb-btn-primary eb-btn-center"
                                >
                                    {__("Browse More Templates", "essential-blocks")}
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
