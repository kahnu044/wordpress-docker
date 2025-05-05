import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Switch from "rc-switch";
import "../scss/switch.css";

import eblogo from "../../../assets/images/eb-logo.svg";
import { ReactComponent as ArrowRight } from "../icons/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../icons/arrow-left.svg";

import { sortObject } from "../helper";
/**
 * Configuration Components
 * @returns
 */
export default function BlocksContent({ blocksDefault, blocks, setBlocks, preferredMode, proActive, handleTabChange, onChangeSwitch, ebUserType, isTracking }) {

    const [groupBlocks, setGroupBlocks] = useState({});
    const [enableDisable, setEnableDisable] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const previousTab = ebUserType === "new" ? 'configuration' : !isTracking ? 'get-started' : null;
    // const previousTab = ebUserType === "new" && isTracking ? 'configuration' : 'get-started';

    const isShowPreviousTab = ebUserType === "new" ? true : isTracking ? false : true;

    useEffect(() => {
        const updatedBlocks = { ...blocks };

        if (ebUserType === "new") {
            if (preferredMode !== 'custom') {
                Object.keys(updatedBlocks).map((item) => {
                    const block = updatedBlocks[item];
                    const preferences = block.preferences ?? [];
                    const hasPreference = preferences?.includes(preferredMode);

                    updatedBlocks[item] = {
                        ...updatedBlocks[item],
                        visibility: hasPreference ? 'true' : 'false',
                    };
                });
                setBlocks(updatedBlocks);
            } else {
                Object.keys(updatedBlocks).map((item) => {
                    updatedBlocks[item] = {
                        ...updatedBlocks[item],
                        visibility: 'true',
                    };
                });
                setBlocks(updatedBlocks);
            }
        }

        if (!proActive && typeof blocks === "object") {
            Object.keys(updatedBlocks).map((item) => {
                if (updatedBlocks[item].is_pro) {
                    updatedBlocks[item] = {
                        ...updatedBlocks[item],
                        visibility: 'false',
                    };
                }
            });
            setBlocks(updatedBlocks);
        }

        //Blocks by Group
        const groupedData = {};
        // Loop through the data and group items by category
        for (const key in updatedBlocks) {
            const item = updatedBlocks[key];
            const category = item.category;

            // Add the item to the corresponding category
            groupedData[category] = {
                ...groupedData[category],
                [item.value]: item
            };
        }

        //Set State
        setGroupBlocks(sortObject(groupedData));
    }, []);

    const groupNames = {
        content: 'Content Blocks',
        creative: 'Creative Blocks',
        dynamic: 'Dynamic Blocks',
        form: 'Form Blocks',
        marketing: 'Marketing Blocks',
        social: 'Social Blocks',
        woocommerce: 'WooCommerce Blocks',
        layout: 'Layout Blocks',
    }

    return (
        <>
            <div className="eb-quick-setup-content eb-text-left">
                <div className="setup-cta-section">
                    <img
                        src={eblogo}
                        alt={__("Essential Blocks Logo", "essential-blocks")}
                    />
                    <div>
                        <h3>
                            {__("Turn On The", "essential-blocks")}
                            <span>{__(" Blocks ", "essential-blocks")}</span>
                            {__("That You Need", "essential-blocks")}
                        </h3>
                        <p>{__("Toggle to Enable/Disable the blocks that you need. Later, you can customize from the Essential Blocks dashboard as well.", "essential-blocks")}</p>
                    </div>
                    <a href="https://essential-blocks.com/demo-quick-setup" target="_blank" className="eb-setup-btn eb-setup-btn-secondry">
                        {__("View All", "essential-blocks")}
                        <ArrowRight />
                    </a>
                </div>

                <div className="eb-blocks-content-wrap">
                    <div className="eb-admin-checkboxes-group-wrapper">
                        {Object.keys(groupBlocks).map((group, index) => (
                            <div key={index}>
                                <div className="eb-col-12 eb-group-title-wrapper">
                                    {groupNames[group] && (
                                        <h2 className="eb-block-group-title">{groupNames[group]}</h2>
                                    )}
                                </div>
                                <div className="eb-admin-checkboxes-wrapper eb-admin-grid">
                                    {groupBlocks[group] && Object.keys(groupBlocks[group]).length > 0 && Object.keys(groupBlocks[group]).map((block, index) => (
                                        <div
                                            key={index}
                                            className={`eb-col-4 eb-admin-checkbox eb-block-box ${blocksDefault[block]?.is_pro ? 'pro' : ''}`}
                                        >
                                            <div className="block-title">
                                                <img
                                                    src={blocksDefault[block]?.icon}
                                                    className="block-icon"
                                                />
                                                <h4>{blocksDefault[block]?.label}</h4>
                                            </div>

                                            <div className="block-content">
                                                <label
                                                    htmlFor={blocks[block]?.value}
                                                    className="eb-admin-checkbox-label"
                                                >
                                                    <Switch
                                                        checked={blocks[block]?.visibility == "true"}
                                                        onChange={(checked) =>
                                                            onChangeSwitch(
                                                                checked,
                                                                blocks[block]?.value
                                                            )
                                                        }
                                                        defaultChecked={
                                                            blocks[block]?.visibility == "true"
                                                        }
                                                        disabled={false}
                                                        checkedChildren="ON"
                                                        unCheckedChildren="OFF"
                                                    />
                                                </label>
                                            </div>

                                            {blocksDefault[block]?.is_pro && (
                                                <div className="eb-pro">Pro</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div >
                </div>
            </div >

            <div className="step-wrapper eb-flex-row-end">
                {isShowPreviousTab && (
                    <button
                        type="button"
                        className="eb-setup-btn eb-setup-btn-previous eb-flex-row-center"
                        onClick={() => handleTabChange(previousTab)}
                    >
                        <ArrowLeft />
                        {__(
                            "Previous",
                            "essential-blocks"
                        )}
                    </button>
                )}

                <button
                    type="button"
                    className="eb-setup-btn eb-setup-btn-next eael-user-email-address eb-flex-row-center"
                    onClick={() => handleTabChange("optimization")}
                >
                    {__(
                        "Next",
                        "essential-blocks"
                    )}
                    <ArrowRight />
                </button>
            </div>
        </>
    );
}
