import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import eblogo from "../../../assets/images/eb-logo.svg";
import { ReactComponent as ArrowRight } from "../icons/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../icons/arrow-left.svg";

import { modes } from "../helper";

/**
 * Configuration Components
 * @returns
 */
export default function ConfigurationContent({ handleTabChange, tracking, preferredMode, setPreferredMode }) {

    return (
        <>
            <div className="eb-setup-configuration">
                <div className="eb-quick-setup-content">
                    <div className="configuration-intro-content eb-flex-column-center">
                        <a
                            href="https://youtu.be/9svZxQOIR2c"
                            target="_blank"
                        >
                            <img
                                src={eblogo}
                                alt={__("Essential Blocks Logo", "essential-blocks")}
                            />
                        </a>
                        <h3>
                            {__("Select Your Preferred Mode for Essential Blocks", "essential-blocks")}
                        </h3>
                        <p>{__("Choose the mode that is most appropriate for you; later, you can access and customize features from all modes. ", "essential-blocks")}</p>
                    </div>

                    <div className="eb-configuration-content-wrap eb-flex-row-center">
                        {modes.map((mode) => (
                            <div
                                key={mode.id}
                                className={`eb-configuration-content`}
                                onClick={() => setPreferredMode(mode.id)}
                            >
                                <label className={`${preferredMode === mode.id ? "selected" : ""}`}>
                                    <span className="eb-configuration-content-title eb-flex-row-between">
                                        <h4>
                                            {mode.label}
                                            {mode.recommended && <span className="badge">{__("Recommended", "essential-blocks")}</span>}
                                        </h4>
                                        <input
                                            id={mode.id}
                                            value={mode.id}
                                            className="eael_preferences eael-d-none"
                                            name="eael_preferences"
                                            type="radio"
                                            checked={preferredMode === mode.id}
                                            onChange={() => setPreferredMode(mode.id)}
                                        />
                                    </span>
                                    <p>{mode.description}</p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="step-wrapper eb-flex-row-end">
                    {!tracking && (
                        <button
                            type="button"
                            className="eb-setup-btn eb-setup-btn-previous eb-flex-row-center"
                            onClick={() => handleTabChange("get-started")}
                        >
                            <ArrowLeft />
                            {__("Previous", "essential-blocks")}
                        </button>
                    )}

                    <button
                        type="button"
                        className="eb-setup-btn eb-setup-btn-next eael-user-email-address eb-flex-row-center"
                        onClick={() => handleTabChange("blocks")}
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
