import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import Switch from "rc-switch";
import "../scss/switch.css";

import {
    installPlugin,
    deactivatePlugin
} from "@essential-blocks/controls";

import intregration from "../icons/intregration.svg";
import { ReactComponent as ArrowLeft } from "../icons/arrow-left.svg";

import { integrations } from "../helper";

const isJsonStr = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

/**
 * IntegrationsContent Components
 * @returns
 */
export default function IntegrationsContent({ handleTabChange, handleQuickSetupSubmit, isTemplatelyActive, templatelyPlugin }) {
    const [status, setStatus] = useState({});
    const [statusColor, setStatusColor] = useState(false);
    const [disableIntegration, setDisableIntegration] = useState(false);

    const prevtab = templatelyPlugin?.active ? 'pro' : "templately";

    useEffect(() => {
        const data = { ...status };
        integrations.map((item, index) => {
            const pluginData = EssentialBlocksLocalize.get_plugins[item.basename];

            let text = "Activate";
            if (pluginData) {
                if (pluginData?.active) {
                    text = "Deactivate";
                } else {
                    text = "Activate";
                }
            }
            data[item.basename] = {
                btnText: text,
                isLoading: false,
                error: ''
            };
        });
        setStatus({ ...data });
    }, []);

    const installIntegration = async (index, integrationName, plugin_file) => {
        setDisableIntegration(true);
        const pluginData = EssentialBlocksLocalize.get_plugins?.[plugin_file] || {};
        const isActive = pluginData?.active;
        const currentBtn = status[plugin_file]?.btnText;

        const updateStatus = (newState) => {
            setStatus((prevStatus) => ({
                ...prevStatus,
                [plugin_file]: {
                    ...prevStatus[plugin_file],
                    ...newState,
                },
            }));
        };

        // Deactivation logic
        if (currentBtn === "Deactivate") {
            updateStatus({ btnText: "Processing...", isLoading: true, error: "" });

            try {
                const data = await deactivatePlugin(integrationName, plugin_file);
                const res = isJsonStr(data) ? JSON.parse(data) : data;

                if (res.success) {
                    EssentialBlocksLocalize.get_plugins = {
                        ...EssentialBlocksLocalize.get_plugins,
                        [plugin_file]: {
                            TextDomain: integrationName,
                            active: false,
                        },
                    };
                }

                updateStatus({
                    btnText: res.success ? "Activate" : "Deactivate",
                    isLoading: false,
                    error: res.success ? "" : res?.data?.message || "Couldn't deactivate!",
                });
            } catch (err) {
                updateStatus({
                    btnText: "Deactivate",
                    isLoading: false,
                    error: "Deactivation failed!",
                });
            }

            setDisableIntegration(false);

            return;
        }

        // Install or Activate logic
        const nextText = "Processing...";
        updateStatus({ btnText: nextText, isLoading: true, error: "" });
        setStatusColor(true);

        try {
            const data = await installPlugin(integrationName, plugin_file);
            let res;
            if (typeof data === "string" && data.length > 3000) {
                // console.log('if');

                // Assume success if data is a very long string (like full HTML or JSON dump)
                res = { success: true };
            } else {
                // console.log('else');
                res = isJsonStr(data) ? JSON.parse(data) : data;
            }

            // console.log('installPlugin', integrationName, data);


            if (res.success) {
                EssentialBlocksLocalize.get_plugins = {
                    ...EssentialBlocksLocalize.get_plugins,
                    [plugin_file]: {
                        TextDomain: integrationName,
                        active: true,
                    },
                };
                setStatusColor(false);
            }

            updateStatus({
                btnText: res.success ? "Deactivate" : "Activate",
                isLoading: false,
                error: res.success ? "" : res?.data?.message || "Couldn't activate!",
            });

            setDisableIntegration(false);
        } catch (err) {
            updateStatus({
                btnText: "Activate",
                isLoading: false,
                error: "Activation failed!",
            });

            setDisableIntegration(false);
        }
    };


    return (
        <>
            <div className="eb-setup-integrations">
                <div className="eb-quick-setup-content eb-text-left">
                    <div className="setup-cta-section">
                        <img
                            src={intregration}
                            alt={__("Integrations", "essential-blocks")}
                        />
                        <div>
                            <h3>
                                {__("Must-Have", "essential-blocks")}
                                <span> {__(" Integrations ", "essential-blocks")}</span>
                                {__("For Your Website", "essential-blocks")}
                            </h3>
                            <p>{__("Boost your WordPress websites with the exclusive and popular plugins that will improve the user experience and increase conversions.", "essential-blocks")}</p>
                        </div>
                        {/* <label className="eb-admin-checkbox-label eb-setup-cta-btn">
                            {__("Enable All", "essential-blocks")}
                            <Switch
                                // checked={
                                //     !settingsData[item]
                                //         ? optimizations[item]
                                //             ?.default
                                //         : settingsData[item] ===
                                //             "false"
                                //             ? false
                                //             : true
                                // }
                                // onChange={(checked) =>
                                //     handleOptimizationSwitch(
                                //         item,
                                //         checked,
                                //     )
                                // }
                                defaultChecked={true}
                                disabled={false}
                                checkedChildren="ON"
                                unCheckedChildren="OFF"
                            />
                        </label> */}
                    </div>

                    <div className="eb-integrations-content-wrap">
                        <div className="eb-setup-option-card-wrap">
                            {integrations.map((item, index) => (
                                <div className="eb-setup-option-card" key={index}>
                                    <div className="option-block-header">
                                        <img src={item.logo} className="block-icon" />
                                        <h5>
                                            {item.title}
                                        </h5>
                                    </div>
                                    <div className="option-block-content">
                                        <p>
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="option-block-footer">
                                        <div className="option-block-footer-content">
                                            <h5>
                                                {status[item.basename]?.btnText}
                                            </h5>
                                            <div className="block-content">
                                                <label className="eb-admin-checkbox-label">
                                                    <Switch
                                                        checked={status[item.basename]?.btnText === "Deactivate"}
                                                        onChange={() => installIntegration(index, item.slug, item.basename)}
                                                        disabled={disableIntegration}
                                                        checkedChildren="Activated"
                                                        unCheckedChildren="Deactivated"
                                                        className={`${status[item.basename]?.isLoading && statusColor ? "rc-switch-checked" : ""
                                                            } ${status[item.basename]?.isLoading ? "eb-custom-disabled" : ""}`}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {status[item.basename]?.error.length > 0 && (
                                            <div className="integration-error">
                                                {status[item.basename]?.error}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="step-wrapper eb-flex-row-end">
                    <button
                        type="button"
                        className="eb-setup-btn eb-setup-btn-previous eb-flex-row-center"
                        onClick={() => handleTabChange(prevtab)}
                    >
                        <ArrowLeft />
                        {__(
                            "Previous",
                            "essential-blocks"
                        )}
                    </button>
                    <button
                        className="eb-setup-btn eb-setup-btn-next eb-flex-row-center"
                        type="button"
                        onClick={() => handleQuickSetupSubmit("submit")}
                    >
                        {__(
                            "Finish",
                            "essential-blocks"
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}
