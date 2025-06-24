import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import { ReactComponent as ArrowRight } from "../icons/arrow-right.svg";
import { ReactComponent as InfoIcon } from "../icons/info.svg";
import { ReactComponent as CloseIcon } from "../icons/close.svg";

/**
 * GetStartedContent Components
 * @returns
 */
export default function GetStartedContent({ handleTabChange, setTracking, ebUserType }) {
    const [collectModal, setCollectModal] = useState(false);

    const nextTab = ebUserType === "new" ? 'configuration' : 'blocks';

    const handleCollectModal = () => {
        setCollectModal(true);
    };

    const handleTracking = (value) => {
        setTracking(value);
        handleTabChange(nextTab);
    };

    const acceptTracking = () => {
        let trackingData = new FormData();
        trackingData.append("action", "eb_quick_setup_save_tracking");
        trackingData.append("admin_nonce", EssentialBlocksLocalize.admin_nonce);
        trackingData.append("is_tracking", true);

        fetch(EssentialBlocksLocalize.ajax_url, {
            method: "POST",
            body: trackingData,
        }) // wrapped
            .then((res) => res.text())
            .then((data) => {
                const res = JSON.parse(data);
                if (res.success) {
                    setTracking(true);
                    handleTabChange(nextTab);
                } else {
                    setTracking(false);
                    handleTabChange(nextTab);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="eb-setup-getstarted">
                <div className="eb-quick-setup-content">
                    <div className="get-started-intro-content eb-flex-column-center">
                        <a
                            href="https://youtu.be/zineKKxp3a0?list=PLWHp1xKHCfxAk6IzUeT_jvBDjiPghKJbe"
                            target="_blank"
                        >
                            <img
                                src={`${EssentialBlocksLocalize.image_url}/admin/get-started-video.png`}
                                alt={__("Youtube Promo", "essential-blocks")}
                            />
                        </a>
                        <h3>
                            {__("Let’s Get Started With Essential Blocks", "essential-blocks")}
                        </h3>
                        <p>{__("Thank you for choosing Essential Blocks for Gutenberg. Simply follow easy setup wizard steps to instantly elevate Gutenberg web-building experience!", "essential-blocks")}</p>
                    </div>
                    <div className="step-wrapper eb-flex-column-center">
                        <button
                            className="eb-setup-btn eb-setup-btn-next eael-user-email-address eb-flex-row-center"
                            type="button"
                            onClick={() => acceptTracking()}
                        >
                            {__(
                                "Proceed To Next Step",
                                "essential-blocks"
                            )}
                            <ArrowRight />
                        </button>
                        <span
                            className="skip-setup-btn"
                            type="button"
                            onClick={() => handleTracking(false)}
                        >
                            {__("Skip It", "essential-blocks")}
                        </span>
                    </div>

                    <p className="get-started-footer eb-flex-row-center">
                        <InfoIcon />

                        {__(
                            "By proceeding, you grant permission for this plugin to collect your information. ",
                            "essential-blocks"
                        )}
                        <span className="get-started-collect-info" onClick={handleCollectModal} >
                            {__("Find out what we collect?", "essential-blocks")}
                        </span>
                    </p>
                </div >
            </div>

            {collectModal && (
                <div className="option-modal collect-modal">
                    <div className="option-modal__inner">
                        <button className="close-btn" onClick={() => setCollectModal(false)} >
                            <CloseIcon />
                        </button>
                        <div className="option-modal-content">
                            <h5 className="option-modal__title">
                                {__("What We Collect?", "essential-blocks")}
                            </h5>
                            <p className="option-modal__content">
                                {__(
                                    "We collect non-sensitive diagnostic data and plugin usage information. Your site URL, WordPress & PHP version, plugins & themes, and email address to send you the discount coupon. This data lets us make sure this plugin always stays compatible with the most popular plugins and themes. No spam, we promise.",
                                    "essential-blocks"
                                )}
                            </p>
                        </div>
                    </div>
                </div >
            )}
        </>
    );
}
