import { __ } from "@wordpress/i18n";

import eblogo from "../../../assets/images/eb-logo.svg";
import { ReactComponent as ArrowRight } from "../icons/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../icons/arrow-left.svg";
/**
 * ProContent Components
 * @returns
 */
export default function ProContent({ upgradeLink, proBlocks, handleTabChange, templatelyPlugin }) {

    const nextTab = templatelyPlugin?.active ? 'integrations' : 'templately';

    return (
        <>
            <div className="eb-setup-pro">
                <div className="eb-quick-setup-content eb-text-left">
                    <div className="setup-cta-section">
                        <img
                            src={eblogo}
                            alt={__("Essential Blocks Logo", "essential-blocks")}
                        />
                        <div>
                            <h3>
                                {__("Access", "essential-blocks")}
                                <span>{__(" 11+ Exclusive ", "essential-blocks")}</span>
                                {__("Blocks & Features", "essential-blocks")}
                            </h3>
                            <p>{__("Enhance your web-building experience with a variety of cool premium blocks, cutting-edge extensions, and powerful integrations.", "essential-blocks")}</p>
                        </div>
                        <a href="https://essential-blocks.com/upgrade-to-pro-quick-setup" target="_blank" className="eb-setup-cta-btn btn-upgrade-pro">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.41864 10.4887C1.11449 8.51172 0.810337 6.53477 0.506187 4.55777C0.438737 4.11952 0.937387 3.82062 1.29209 4.08667C2.23969 4.79737 3.18724 5.50802 4.13484 6.21872C4.44684 6.45272 4.89134 6.37657 5.10764 6.05207L7.47429 2.50207C7.72439 2.12692 8.27559 2.12692 8.52569 2.50207L10.8923 6.05207C11.1086 6.37657 11.5531 6.45267 11.8651 6.21872C12.8127 5.50802 13.7603 4.79737 14.7079 4.08667C15.0626 3.82062 15.5612 4.11952 15.4938 4.55777C15.1897 6.53477 14.8855 8.51172 14.5814 10.4887H1.41864Z" fill="white" />
                                <path d="M13.8944 13.7797H2.10422C1.72522 13.7797 1.41797 13.4724 1.41797 13.0934V11.5859H14.5807V13.0934C14.5807 13.4724 14.2734 13.7797 13.8944 13.7797Z" fill="white" />
                            </svg>

                            {__("Upgrade To PRO", "essential-blocks")}
                        </a>

                    </div>

                    <div className="eb-pro-content-wrap eb-flex-row-between">
                        <div className="eb-pro-content">
                            <h3>
                                {__(
                                    "Here’s What You’ll Get in ",
                                    "essential-blocks"
                                )}
                                <span> {__("Pro", "essential-blocks")} </span>
                            </h3>
                            <p>
                                {__("By upgrading to Essential Blocks PRO, you unlock seamless access to premium and unique blocks, out-of-the-box design presets, enhanced extensions, and much more. Here’s the highlights:",
                                    "essential-blocks"
                                )}
                            </p>

                            <ul>
                                <li>
                                    {__(
                                        "Exclusive design presets of popular Gutenberg blocks",
                                        "essential-blocks"
                                    )}
                                </li>
                                <li>
                                    {__(
                                        "WooCommerce store blocks for advanced transformation",
                                        "essential-blocks"
                                    )}
                                </li>
                                <li>
                                    {__(
                                        "Interactive Animation extension for dynamic Gsap effects",
                                        "essential-blocks"
                                    )}
                                </li>
                            </ul>

                            <a href="https://essential-blocks.com/demo-quick-setup" target="_blank" className="eb-setup-btn eb-setup-btn-link eb-flex-row-center">
                                {__(
                                    "Explore All Exclusive Features",
                                    "essential-blocks"
                                )}
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_4039_9917)">
                                        <path d="M12.75 5.25L5.25 12.75" stroke="#7731FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6 5.25H12.75V12" stroke="#7731FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4039_9917">
                                            <rect width="18" height="18" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </div>
                        <div className="eb-pro-blocks-wrap">
                            {Object.keys(proBlocks).map((block, index) => (
                                <a key={index} href={proBlocks[block].demo} className="eb-pro-block eb-flex-row-center">
                                    <img
                                        src={proBlocks[block].icon}
                                        alt={proBlocks[block].label}
                                    />
                                    <span className="tooltip-text">{proBlocks[block].label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="step-wrapper eb-flex-row-end">
                    <button
                        type="button"
                        className="eb-setup-btn eb-setup-btn-previous eb-flex-row-center"
                        onClick={() => handleTabChange("optimization")}
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
                        onClick={() => handleTabChange(nextTab)}
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
