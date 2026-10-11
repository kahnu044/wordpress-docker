import { useEffect, useState } from "@wordpress/element";
import Switch from "rc-switch";
import "../scss/switch.css";
import { __, sprintf } from "@wordpress/i18n";

import {
    installPlugin,
    recordXSpeedOffer,
} from "@essential-blocks/controls";

import eblogo from "../../../assets/images/eb-logo.svg";
import { ReactComponent as ArrowRight } from "../icons/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../icons/arrow-left.svg";

import { optimizations, extensions, recommendedPlugins } from '../helper'

/**
 * A gated plugin card is withheld whenever the site has already answered — it has the
 * plugin, it removed it, or it (or a sibling WPDeveloper plugin) declined. The gate is
 * computed in PHP; see includes/Utils/XSpeedOffer.php.
 */
const mayOffer = (plugin) =>
    !plugin.offerGate || window.EBQuickSetup?.[plugin.offerGate]?.may_ask === true;

const offerablePlugins = Object.fromEntries(
    Object.entries(recommendedPlugins).filter(([, plugin]) => mayOffer(plugin))
);

// xSpeed is the only card with a shared offer record today. Its answer is read and
// written by EmbedPress, Essential Addons and Templately too, so it has to be recorded
// whichever way the user goes.
const XSPEED_CARD = "xspeedCache";
const isXSpeedOffered = Boolean(offerablePlugins[XSPEED_CARD]);

// Every card on this step, in display order. Keys are eb_settings keys.
const optionCards = { ...optimizations, ...extensions, ...offerablePlugins };

const parseResponse = (data) => {
    try {
        return JSON.parse(data);
    } catch (e) {
        return null;
    }
};

// WordPress.org errors can carry HTML (links, entities); show them as plain text
const toPlainText = (html) =>
    html ? new window.DOMParser().parseFromString(String(html), "text/html").body.textContent : "";

/**
 * What xSpeed reports about itself once it is active, reduced to what is worth showing.
 * `conflict-safe` is a success, not a failure: another plugin already owned the page
 * cache and xSpeed stood down by design. Render the reason and leave it there.
 */
const buildNotice = (status) => {
    if (!status) {
        return null;
    }

    const notice = {
        owner: status.page_cache_owner || "",
        reason: status.page_cache_blocked_reason || "",
        snippet: status.page_cache_manual_snippet || "",
    };

    return notice.reason || notice.snippet ? notice : null;
};

/**
 * OptimaizationContent Components
 * @returns
 */
export default function OptimaizationContent({ settingsData, setSettingsData, handleTabChange }) {
    const [isOpionEnable, setIsOpionEnable] = useState(true);
    const [isInstalling, setIsInstalling] = useState(false);
    const [pluginStatus, setPluginStatus] = useState({});

    useEffect(() => {
        Object.keys(optionCards).forEach((item) => {
            // Check if the 'default' value is false
            if (optionCards[item].default === false) {
                setIsOpionEnable(false);
            }
        });
    }, []);

    // The offer is on screen now, so record that the site was asked. `add_option`
    // semantics server-side make this idempotent and unable to bury an existing answer.
    useEffect(() => {
        if (isXSpeedOffered) {
            recordXSpeedOffer("offered");
        }
    }, []);

    const isOptionChecked = (item) =>
        !settingsData[item]
            ? optionCards[item]?.default
            : settingsData[item] === "false"
                ? false
                : true;

    const handleOptimizationSwitch = (item, value) => {
        setSettingsData({
            ...settingsData,
            [item]: Boolean(value).toString(),
        });

        // Toggling a plugin card clears its install error so the next "Next" retries
        if (offerablePlugins[item]) {
            setPluginStatus((prevStatus) => ({ ...prevStatus, [item]: {} }));
        }
    }

    const handleAllOptimizations = (value) => {
        const newSettingsData = { ...settingsData };

        Object.keys(optionCards).forEach((key) => {
            newSettingsData[key] = Boolean(value).toString();
        });

        setIsOpionEnable(value);
        setSettingsData(newSettingsData);
        setPluginStatus({});
    }

    /**
     * Install + activate enabled plugin cards, then go to the next step.
     * On failure stay on this step and show the error; the next click moves on without retrying.
     *
     * A card left switched off is a decline: Quick Setup runs once per site, so this is
     * the only time we ask, and the answer has to survive for the sibling plugins that
     * read the same record.
     */
    const handleNext = async () => {
        const pendingPlugins = Object.keys(offerablePlugins).filter((item) =>
            isOptionChecked(item) &&
            !EssentialBlocksLocalize.get_plugins?.[offerablePlugins[item].basename]?.active &&
            !pluginStatus[item]?.failed
        );

        if (isXSpeedOffered && !isOptionChecked(XSPEED_CARD)) {
            recordXSpeedOffer("declined");
        }

        if (pendingPlugins.length === 0) {
            handleTabChange("pro");
            return;
        }

        setIsInstalling(true);

        const newStatus = { ...pluginStatus };
        let hasError = false;
        let hasNotice = false;

        for (const item of pendingPlugins) {
            const { slug, basename, title } = offerablePlugins[item];
            const res = parseResponse(await installPlugin(slug, basename));

            // plugin_installer wraps the installer result, so check both flags
            if (res?.success && res?.data?.success) {
                EssentialBlocksLocalize.get_plugins = {
                    ...EssentialBlocksLocalize.get_plugins,
                    [basename]: {
                        TextDomain: slug,
                        active: true,
                    },
                };

                const notice = buildNotice(res.data.xspeed);
                newStatus[item] = notice ? { notice } : {};
                hasNotice = hasNotice || Boolean(notice);
            } else {
                hasError = true;
                const serverMessage = typeof res?.data === "string" ? res.data : res?.data?.message;
                newStatus[item] = {
                    failed: true,
                    error: toPlainText(serverMessage) || sprintf(
                        /* translators: %s: plugin name */
                        __("Couldn't install %s. You can install it later from the Plugins page.", "essential-blocks"),
                        title
                    ),
                };
            }
        }

        setPluginStatus(newStatus);
        setIsInstalling(false);

        // A notice keeps the user on this step so they can read it. The plugin is active
        // now, so the next click finds nothing pending and moves on.
        if (!hasError && !hasNotice) {
            handleTabChange("pro");
        }
    };

    return (
        <>
            <div className="eb-setup-optimaization">
                <div className="eb-quick-setup-content eb-text-left">
                    <div className="setup-cta-section">
                        <img
                            src={eblogo}
                            alt={__("Essential Blocks Logo", "essential-blocks")}
                        />
                        <div>
                            <h3> {__("Optimize Your Editor For Smoother Performance", "essential-blocks")}</h3>
                            <p>{__("Enable/disable advanced options to enhance Gutenberg editor experience You can also optimize these later via the dashboard.", "essential-blocks")}</p>
                        </div>
                        <label className="eb-admin-checkbox-label eb-setup-cta-btn">
                            {isOpionEnable ? __("Disable All", "essential-blocks") : __("Enable All", "essential-blocks")}
                            <Switch
                                checked={isOpionEnable}
                                onChange={(checked) =>
                                    handleAllOptimizations(checked)
                                }
                                disabled={isInstalling}
                                checkedChildren="Enable"
                                unCheckedChildren="Disable"
                            />
                        </label>
                    </div>

                    <div className="eb-optimaization-content-wrap">
                        {/* <h4> {__("Optimization Options", "essential-blocks")}</h4> */}
                        <div className="eb-setup-option-card-wrap">
                            {Object.keys(optionCards).map((item) => (
                                <div className="eb-setup-option-card" key={item}>
                                    <div className="option-block-header">
                                        <img src={optionCards[item].logo} className="block-icon" />
                                        <h5>
                                            {optionCards[item].title}
                                        </h5>
                                    </div>
                                    <div className="option-block-content">
                                        <p>
                                            {optionCards[item].description}
                                        </p>
                                    </div>
                                    <div className="option-block-footer">
                                        <h5>
                                            {optionCards[item].label}
                                        </h5>
                                        <div className="block-content">
                                            <label className="eb-admin-checkbox-label">
                                                <Switch
                                                    checked={isOptionChecked(item)}
                                                    onChange={(checked) =>
                                                        handleOptimizationSwitch(
                                                            item,
                                                            checked,
                                                        )
                                                    }
                                                    defaultChecked={true}
                                                    disabled={isInstalling}
                                                    checkedChildren="ON"
                                                    unCheckedChildren="OFF"
                                                />
                                            </label>
                                        </div>
                                        {pluginStatus[item]?.error && (
                                            <div className="integration-error">
                                                {pluginStatus[item].error}
                                            </div>
                                        )}
                                        {pluginStatus[item]?.notice && (
                                            <div className="integration-notice">
                                                {pluginStatus[item].notice.reason && (
                                                    <p>
                                                        {pluginStatus[item].notice.owner
                                                            ? sprintf(
                                                                /* translators: 1: caching plugin name, 2: reason page caching was not enabled */
                                                                __("%1$s is already handling page caching, so it was left in charge. %2$s", "essential-blocks"),
                                                                pluginStatus[item].notice.owner,
                                                                pluginStatus[item].notice.reason
                                                            )
                                                            : pluginStatus[item].notice.reason}
                                                    </p>
                                                )}
                                                {pluginStatus[item].notice.snippet && (
                                                    <>
                                                        <p>
                                                            {__("For the fastest path, add this line to your wp-config.php:", "essential-blocks")}
                                                        </p>
                                                        <code>{pluginStatus[item].notice.snippet}</code>
                                                    </>
                                                )}
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
                        onClick={() => handleTabChange("blocks")}
                        disabled={isInstalling}
                    >
                        <ArrowLeft />
                        {__(
                            "Previous",
                            "essential-blocks"
                        )}
                    </button>
                    <button
                        type="button"
                        className="eb-setup-btn eb-setup-btn-next eael-user-email-address eb-flex-row-center"
                        onClick={handleNext}
                        disabled={isInstalling}
                    >
                        {isInstalling && (
                            <img
                                className="eb-install-loader"
                                src={`${EssentialBlocksLocalize.eb_plugins_url}/assets/images/loading.svg`}
                            />
                        )}
                        {isInstalling
                            ? __("Installing...", "essential-blocks")
                            : __("Next", "essential-blocks")}
                        {!isInstalling && <ArrowRight />}
                    </button>
                </div>
            </div>
        </>
    );
}
