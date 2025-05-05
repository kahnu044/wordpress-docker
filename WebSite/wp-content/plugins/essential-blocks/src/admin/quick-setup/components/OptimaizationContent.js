import { useEffect, useState } from "@wordpress/element";
import Switch from "rc-switch";
import "../scss/switch.css";
import { __ } from "@wordpress/i18n";

import eblogo from "../../../assets/images/eb-logo.svg";
import { ReactComponent as ArrowRight } from "../icons/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../icons/arrow-left.svg";

import { optimizations, extensions } from '../helper'
/**
 * OptimaizationContent Components
 * @returns
 */
export default function OptimaizationContent({ settingsData, setSettingsData, handleTabChange }) {
    const [isOpionEnable, setIsOpionEnable] = useState(true);

    useEffect(() => {
        Object.keys(optimizations).forEach((item) => {
            // Check if the 'default' value is false
            if (optimizations[item].default === false) {
                setIsOpionEnable(false);
            }
        });
        Object.keys(extensions).forEach((item) => {
            // Check if the 'default' value is false
            if (extensions[item].default === false) {
                setIsOpionEnable(false);
            }
        });
    }, []);

    const handleOptimizationSwitch = (item, value) => {
        setSettingsData({
            ...settingsData,
            [item]: Boolean(value).toString(),
        });
    }

    const handleAllOptimizations = (value) => {
        const newSettingsData = { ...settingsData };

        Object.keys(optimizations).forEach((key) => {
            if (newSettingsData.hasOwnProperty(key)) {
                newSettingsData[key] = Boolean(value).toString();
            } else {
                newSettingsData[key] = Boolean(value).toString();
            }
        });
        Object.keys(extensions).forEach((key) => {
            if (newSettingsData.hasOwnProperty(key)) {
                newSettingsData[key] = Boolean(value).toString();
            } else {
                newSettingsData[key] = Boolean(value).toString();
            }
        });

        setIsOpionEnable(value);
        setSettingsData(newSettingsData);
    }

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
                                // defaultChecked={true}
                                // disabled={false}
                                checkedChildren="Enable"
                                unCheckedChildren="Disable"
                            />
                        </label>
                    </div>

                    <div className="eb-optimaization-content-wrap">
                        {/* <h4> {__("Optimization Options", "essential-blocks")}</h4> */}
                        <div className="eb-setup-option-card-wrap">
                            {Object.keys(optimizations).map((item, index) => (
                                <div className="eb-setup-option-card" key={index}>
                                    <div className="option-block-header">
                                        <img src={optimizations[item].logo} className="block-icon" />
                                        <h5>
                                            {optimizations[item].title}
                                        </h5>
                                    </div>
                                    <div className="option-block-content">
                                        <p>
                                            {optimizations[item].description}
                                        </p>
                                    </div>
                                    <div className="option-block-footer">
                                        <h5>
                                            {optimizations[item].label}
                                        </h5>
                                        <div className="block-content">
                                            <label className="eb-admin-checkbox-label">
                                                <Switch
                                                    checked={
                                                        !settingsData[item]
                                                            ? optimizations[item]
                                                                ?.default
                                                            : settingsData[item] ===
                                                                "false"
                                                                ? false
                                                                : true
                                                    }
                                                    onChange={(checked) =>
                                                        handleOptimizationSwitch(
                                                            item,
                                                            checked,
                                                        )
                                                    }
                                                    defaultChecked={true}
                                                    disabled={false}
                                                    checkedChildren="ON"
                                                    unCheckedChildren="OFF"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {Object.keys(extensions).map((item, index) => (
                                <div className="eb-setup-option-card" key={index}>
                                    <div className="option-block-header">
                                        <img src={extensions[item].logo} className="block-icon" />
                                        <h5>
                                            {extensions[item].title}
                                        </h5>
                                    </div>
                                    <div className="option-block-content">
                                        <p>
                                            {extensions[item].description}
                                        </p>
                                    </div>
                                    <div className="option-block-footer">
                                        <h5>
                                            {extensions[item].label}
                                        </h5>
                                        <div className="block-content">
                                            <label className="eb-admin-checkbox-label">
                                                <Switch
                                                    checked={
                                                        !settingsData[item]
                                                            ? extensions[item]
                                                                ?.default
                                                            : settingsData[item] ===
                                                                "false"
                                                                ? false
                                                                : true
                                                    }
                                                    onChange={(checked) =>
                                                        handleOptimizationSwitch(
                                                            item,
                                                            checked,
                                                        )
                                                    }
                                                    defaultChecked={true}
                                                    disabled={false}
                                                    checkedChildren="ON"
                                                    unCheckedChildren="OFF"
                                                />
                                            </label>
                                        </div>
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
                        onClick={() => handleTabChange("pro")}
                    >
                        {__(
                            "Next",
                            "essential-blocks"
                        )}
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </>
    );
}
