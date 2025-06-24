import { __ } from "@wordpress/i18n";
import { createRoot, useState, useEffect } from "@wordpress/element"

import {
    fetchEBSettingsData,
    saveEBSettingsData,
} from "@essential-blocks/controls";

import "./scss/style.scss";

import { quickSetupMenu, sortObject } from "./helper";

import {
    GetStartedContent,
    ConfigurationContent,
    BlocksContent,
    ProContent,
    OptimaizationContent,
    IntegrationsContent,
    TemplatelyContent,
    EBLoader,
    Header
} from "./components";

import { ReactComponent as CloseIcon } from "./icons/close.svg";
import { ReactComponent as SuccessLaunchIcon } from "./icons/successLaunch.svg";

const QuickSetupWizard = () => {
    const {
        all_blocks,
        all_blocks_default,
        is_pro_active,
        upgrade_pro_url,
        is_tracking,
        eb_user_type
    } = EssentialBlocksLocalize;

    let isTracking = !!+is_tracking;

    let currentTabValue = isTracking ? eb_user_type === "new" ? 'configuration' : 'blocks' : 'get-started';

    const [isTemplatelyActive, setIsTemplatelyActive] = useState(false);

    const [tracking, setTracking] = useState(isTracking);
    const [preferredMode, setPreferredMode] = useState('basic');
    const [upgradeProModal, setUpgradeProModal] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);
    const [activeTab, setActiveTab] = useState(currentTabValue);
    const [settingsData, setSettingsData] = useState({});
    const [blocks, setBlocks] = useState(sortObject(all_blocks));
    const [loaderData, setLoaderData] = useState({
        loading: false,
        response: false,
        message: "",
    });

    const pro_active = is_pro_active && is_pro_active === "true" ? true : false;
    const proBlocks = Object.fromEntries(
        Object.entries(all_blocks_default).filter(([key, value]) => value.is_pro)
    );

    const templatly_file = "templately/templately.php";
    const templatelyPlugin = EssentialBlocksLocalize.get_plugins[templatly_file];

    useEffect(() => {
        // fetch eb_settings data using AJAX
        fetchEBSettingsData("eb_settings").then((data) => {
            setSettingsData(data ?? {});
        });
    }, []);

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
    };

    const onChangeSwitch = (checked, blockName) => {
        let newblocks = { ...blocks };

        if (!pro_active && newblocks[blockName].is_pro) {
            setUpgradeProModal(true);
        } else {
            // setLoaderData({
            //     loading: true,
            //     response: false,
            //     message: "",
            // }); //Show Loader

            Object.keys(newblocks).map(
                (block) =>
                    newblocks[block].value === blockName &&
                    (newblocks[block].visibility = String(checked))
            );

            setBlocks(newblocks);
        }
    };

    const handleQuickSetupSubmit = () => {
        setLoaderData({
            loading: true,
            response: true,
            message: "Saving...",
        });

        saveEBSettingsData('all', JSON.stringify(settingsData)).then((data) => {
            const res = JSON.parse(data);

            if (res.success) {
                saveEBSettingsData('', JSON.stringify(blocks), "enable_disable").then((data) => {
                    const res = JSON.parse(data);
                    if (res.success) {
                        // Prepare form data for the final AJAX request
                        const setupData = new FormData();
                        setupData.append("action", "eb_save_quick_setup");
                        setupData.append("admin_nonce", EssentialBlocksLocalize.admin_nonce);
                        setupData.append("setup_shown", true);

                        fetch(EssentialBlocksLocalize.ajax_url, {
                            method: "POST",
                            body: setupData,
                        })
                            .then((res) => res.text())
                            .then((data) => {
                                const res = JSON.parse(data);
                                if (res.success && res.data.redirect_url) {
                                    setCompleteModal(true);

                                    setTimeout(() => {
                                        window.location = res.data.redirect_url;
                                    }, 1000);
                                } else {
                                    setLoaderData({
                                        loading: false,
                                        response: true,
                                        message: "Something went wrong! Please try again. eb_save_quick_setup",
                                    });
                                }
                            })
                            .catch((err) => console.log(err));
                    } else {
                        console.error("Error:", error);
                        setLoaderData({
                            loading: false,
                            response: true,
                            message: "Something went wrong! Please try again. blocks",
                        });
                    }
                })
            } else {
                console.error("Error:", error);
                setLoaderData({
                    loading: false,
                    response: true,
                    message: "Something went wrong! Please try again. settingsData",
                });
            }
        })
    };

    const closeUpgradeModal = () => {
        setUpgradeProModal(false);
    };

    return (
        <div className="eb-setup-settings-container">
            <Header
                menuList={quickSetupMenu}
                activeTab={activeTab}
                templatelyPlugin={templatelyPlugin}
                ebUserType={eb_user_type}
            />

            {activeTab === "get-started" &&
                <GetStartedContent
                    handleTabChange={handleTabChange}
                    setTracking={setTracking}
                    ebUserType={eb_user_type}
                />}
            {activeTab === "configuration" &&
                <ConfigurationContent
                    handleTabChange={handleTabChange}
                    tracking={tracking}
                    preferredMode={preferredMode}
                    setPreferredMode={setPreferredMode}
                />}
            {activeTab === "blocks" &&
                <BlocksContent
                    blocksDefault={all_blocks_default}
                    blocks={blocks}
                    setBlocks={setBlocks}
                    preferredMode={preferredMode}
                    proActive={pro_active}
                    handleTabChange={handleTabChange}
                    onChangeSwitch={onChangeSwitch}
                    ebUserType={eb_user_type}
                    isTracking={isTracking}
                />}
            {activeTab === "optimization" &&
                <OptimaizationContent
                    settingsData={settingsData}
                    setSettingsData={setSettingsData}
                    handleTabChange={handleTabChange}

                />
            }
            {activeTab === "pro" &&
                <ProContent
                    upgradeLink={upgrade_pro_url}
                    proBlocks={proBlocks}
                    handleTabChange={handleTabChange}
                    templatelyPlugin={templatelyPlugin}
                />}
            {activeTab === "templately" && <TemplatelyContent handleTabChange={handleTabChange} isTemplatelyActive={isTemplatelyActive} setIsTemplatelyActive={setIsTemplatelyActive} />}
            {activeTab === "integrations" &&
                <IntegrationsContent
                    handleTabChange={handleTabChange}
                    handleQuickSetupSubmit={handleQuickSetupSubmit}
                    isTemplatelyActive={isTemplatelyActive}
                    templatelyPlugin={templatelyPlugin}
                />
            }

            <EBLoader settings={loaderData} />

            {upgradeProModal && (
                <>
                    <div className="eb_pro_modal">
                        <div className="eb_pro_modal_content">
                            <div
                                className="eb_pro_modal_close"
                                onClick={() => closeUpgradeModal()}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.0006 8.82208L14.1253 4.69727L15.3038 5.87577L11.1791 10.0006L15.3038 14.1253L14.1253 15.3038L10.0006 11.1791L5.87577 15.3038L4.69727 14.1253L8.82208 10.0006L4.69727 5.87577L5.87577 4.69727L10.0006 8.82208Z"
                                        fill="#6A72A5"
                                    />
                                </svg>
                            </div>
                            <div className="eb_pro_modal_icon">
                                <svg
                                    width="56"
                                    height="56"
                                    viewBox="0 0 56 56"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M44.3339 22.3531L38.3372 23.8465L30.8472 14.5131C30.5193 14.1044 30.1037 13.7745 29.6312 13.5478C29.1587 13.3211 28.6413 13.2034 28.1172 13.2034C27.5931 13.2034 27.0757 13.3211 26.6032 13.5478C26.1307 13.7745 25.7152 14.1044 25.3872 14.5131L17.8972 23.8465L11.7839 22.3531C11.198 22.2129 10.5859 22.2253 10.0062 22.389C9.42645 22.5527 8.89837 22.8623 8.47239 23.2883C8.04641 23.7143 7.73677 24.2424 7.57305 24.8221C7.40932 25.4019 7.39698 26.0139 7.53721 26.5998L11.6672 41.1131C11.8083 41.6178 12.1153 42.0603 12.5386 42.3693C12.9618 42.6783 13.4768 42.8358 14.0005 42.8165H42.0005C42.5243 42.8358 43.0392 42.6783 43.4625 42.3693C43.8858 42.0603 44.1927 41.6178 44.3339 41.1131L48.4872 26.5998C48.6213 26.0232 48.6079 25.4222 48.4484 24.8521C48.2888 24.2821 47.9882 23.7615 47.5743 23.3383C47.1604 22.9151 46.6466 22.603 46.0802 22.4308C45.5139 22.2586 44.9133 22.2319 44.3339 22.3531Z"
                                        fill="#EFA83C"
                                    />
                                    <path
                                        d="M6.41667 19.8333C8.0275 19.8333 9.33333 18.5275 9.33333 16.9167C9.33333 15.3058 8.0275 14 6.41667 14C4.80584 14 3.5 15.3058 3.5 16.9167C3.5 18.5275 4.80584 19.8333 6.41667 19.8333Z"
                                        fill="#EFA83C"
                                    />
                                    <path
                                        d="M49.5827 19.8333C51.1935 19.8333 52.4993 18.5275 52.4993 16.9167C52.4993 15.3058 51.1935 14 49.5827 14C47.9719 14 46.666 15.3058 46.666 16.9167C46.666 18.5275 47.9719 19.8333 49.5827 19.8333Z"
                                        fill="#EFA83C"
                                    />
                                    <path
                                        d="M28.0007 9.91659C29.6115 9.91659 30.9173 8.61075 30.9173 6.99992C30.9173 5.38909 29.6115 4.08325 28.0007 4.08325C26.3898 4.08325 25.084 5.38909 25.084 6.99992C25.084 8.61075 26.3898 9.91659 28.0007 9.91659Z"
                                        fill="#EFA83C"
                                    />
                                    <path
                                        d="M41.9994 51.3332H13.9993C13.3805 51.3332 12.787 51.0873 12.3494 50.6498C11.9118 50.2122 11.666 49.6187 11.666 48.9998C11.666 48.381 11.9118 47.7875 12.3494 47.3499C12.787 46.9123 13.3805 46.6665 13.9993 46.6665H41.9994C42.6182 46.6665 43.2117 46.9123 43.6493 47.3499C44.0869 47.7875 44.3327 48.381 44.3327 48.9998C44.3327 49.6187 44.0869 50.2122 43.6493 50.6498C43.2117 51.0873 42.6182 51.3332 41.9994 51.3332Z"
                                        fill="#EFA83C"
                                    />
                                </svg>
                            </div>
                            <h4>{__("Unlock the PRO Features", "essential-blocks")}</h4>
                            <p>
                                {__("Upgrade to Essential Blocks PRO and gain access to advanced blocks and features to build websites more efficiently.", "essential-blocks")}
                            </p>
                            <a
                                className="eb-setup-btn eb-pro-upgrade"
                                variant="secondary"
                                href="https://essential-blocks.com/upgrade-to-pro-quick-setup"
                                target="_blank"
                            >
                                {__("Upgrade to PRO", "essential-blocks")}
                            </a>
                        </div>
                    </div>
                </>
            )}

            {completeModal && (
                <div className="option-modal setup-complete-modal">
                    <div className="option-modal__inner">
                        <button className="close-btn" onClick={() => setCompleteModal(false)} >
                            <CloseIcon />
                        </button>
                        <div className="option-modal-content">
                            <SuccessLaunchIcon />
                            <h5 className="option-modal__title">
                                {__("Congratulations!", "essential-blocks")}
                            </h5>
                            <p className="option-modal__content">
                                {__(
                                    "You have completed the configuration process. You can now go ahead & start building your Website with ease.",
                                    "essential-blocks"
                                )}
                            </p>
                        </div>
                    </div>
                </div >
            )}
        </div>
    );
};

document.addEventListener("DOMContentLoaded", () => {
    const setupContainer = document.getElementById("eb-quick-setup-wizard-container");
    const root = createRoot(setupContainer);
    root.render(<QuickSetupWizard />);
});
