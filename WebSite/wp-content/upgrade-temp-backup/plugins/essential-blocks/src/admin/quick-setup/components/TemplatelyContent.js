import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";

import cloud from "../icons/cloud.svg";
import download from "../icons/download.svg";
import man from "../icons/man.svg";
import grid from "../icons/grid.svg";
import templatelyFrame from "../icons/templately-frame.jpg";
import { ReactComponent as ArrowRight } from "../icons/arrow-right.svg";

import {
    installPlugin,
} from "@essential-blocks/controls";
/**
 * TemplatelyContent Components
 * @returns
 */
export default function TemplatelyContent({ handleTabChange, isTemplatelyActive, setIsTemplatelyActive }) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(0);
    const [buttonText, setButtonText] = useState("Enable Templates");
    const plugin_file = "templately/templately.php";
    const templately = EssentialBlocksLocalize.get_plugins[plugin_file];

    useEffect(() => {
        if (templately) {
            if (templately.active || isTemplatelyActive) {
                setStatus(2);
                setButtonText("Next");
            } else {
                setStatus(1);
                setButtonText("Active Templately");
            }
        }
    }, []);

    const installTemplately = () => {
        if (status === 2) {
            handleTabChange("integrations");
            return;
        }
        setLoading(true);
        setButtonText("Processing");
        installPlugin("templately", plugin_file).then((data) => {
            const res = JSON.parse(data);

            if (res.success) {
                setStatus(2);
                setButtonText("Next");
                setIsTemplatelyActive(true);
                setLoading(false);
                handleTabChange("integrations");
            } else {
                setStatus(0);
                setButtonText("Couldn't Activated the plugin!");
                setLoading(false);
            }
        });
    };

    return (
        <>
            <div className="eb-setup-templates">
                <div className="eb-quick-setup-content eb-text-left">
                    <div className="eb-templates-intro-block eb-flex-row-between">
                        <div className="eb-templates-intro-content">
                            <h3>
                                <span>
                                    {__("2800+", "essential-blocks")}
                                </span>

                                {__(
                                    " Ready Gutenberg Templates",
                                    "essential-blocks"
                                )}
                            </h3>
                            <p>
                                {__("Get access to the ultimate templates cloud and boost your Gutenberg web-building experience with Templately",
                                    "essential-blocks"
                                )}
                            </p>

                            <ul>
                                <li>
                                    <img src={grid} />
                                    {__(
                                        "Stunning, Ready Website Templates",
                                        "essential-blocks"
                                    )}
                                </li>
                                <li>
                                    <img src={man} />
                                    {__(
                                        "Add Team Members & Collaborate",
                                        "essential-blocks"
                                    )}
                                </li>
                                <li>
                                    <img src={download} />
                                    {__(
                                        "Design With MyCloud Storage Space",
                                        "essential-blocks"
                                    )}
                                </li>
                                <li>
                                    <img src={cloud} />
                                    {__(
                                        "Cloud With Templately WorkSpace",
                                        "essential-blocks"
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div className="eb-templates-frame">
                            <img src={templatelyFrame} />
                        </div>
                    </div>
                </div>

                <div className="step-wrapper eb-flex-row-end">
                    <button
                        type="button"
                        className="skip-setup-btn no-underline"
                        onClick={() => handleTabChange("integrations")}
                    >
                        {__(
                            "Skip",
                            "essential-blocks"
                        )}
                    </button>
                    <button
                        type="button"
                        className="eb-setup-btn eb-setup-btn-next eael-user-email-address eb-flex-row-center"
                        onClick={() => installTemplately()}
                    >
                        {loading && (
                            <img
                                className="eb-install-loader"
                                src={`${EssentialBlocksLocalize.eb_plugins_url}/assets/images/loading.svg`}
                            />
                        )}
                        {buttonText}

                        {status === 2 && (
                            <ArrowRight />
                        )}

                    </button>
                </div>
            </div>
        </>
    );
}
