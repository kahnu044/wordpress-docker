import { __ } from "@wordpress/i18n";
import { ExternalLink } from "@wordpress/components";
import { useState } from "@wordpress/element";
import {
    saveEBSettingsData
} from "@essential-blocks/controls";

const GoogleMaps = (props) => {
    const { setTrigger, settingsKey, settingsData, setSettingsData } = props;
    const [apikey, setApiKey] = useState(settingsData[settingsKey]);
    const [saveBtnText, setSaveBtnText] = useState(
        __("Save Changes", "essential-blocks")
    );
    const [error, setError] = useState("");

    const handleSaveData = () => {
        setSaveBtnText(__("Saved!", "essential-blocks"));

        saveEBSettingsData(settingsKey, apikey).then((data) => {
            const res = JSON.parse(data);
            if (res.success) {
                setSaveBtnText(__("Saved", "essential-blocks"));
                setSettingsData({
                    ...settingsData,
                    [settingsKey]: apikey,
                });

                setTimeout(() => {
                    setTrigger(false);
                }, 300);
            } else {
                setSaveBtnText(__("Save Changes", "essential-blocks"));
                setError(
                    typeof res.data === "string"
                        ? res.data
                        : __(
                            "Something went wrong! Please try again.",
                            "essential-blocks"
                        )
                );
            }
        });
    }

    const handleClick = () => {
        if (apikey === undefined) {
            handleSaveData();
            return;
        }

        setSaveBtnText(__("Saving...", "essential-blocks"));

        const ebGoogleMapUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=New+York&key=${apikey}`;

        let data = new FormData();
        data.append("action", "google_map_api_key_validation"); // Required action parameter for WordPress
        data.append("admin_nonce", EssentialBlocksLocalize.admin_nonce); // Security nonce
        data.append("ebGoogleMapUrl", ebGoogleMapUrl); // The test URL to validate the API key

        fetch(EssentialBlocksLocalize.ajax_url, {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.error_message) {
                    setSaveBtnText(__("Save Changes", "essential-blocks"));
                    setError(
                        typeof data?.error_message === "string"
                            ? data?.error_message
                            : __(
                                "Invalid API Key.",
                                "essential-blocks"
                            )
                    );
                } else {
                    handleSaveData();
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="option-modal-content">
                <h3 className="option-modal__title">
                    {__("Google Map API", "essential-blocks")}
                </h3>
                <p className="option-modal__content">
                    {__(
                        "To enable location search, please ensure Places API is activated in the Google Developers Console ",
                        "essential-blocks" + " "
                    )}
                    <ExternalLink href="https://developers.google.com/places/web-service/intro">
                        {__("More info", "essential-blocks")}
                    </ExternalLink>
                </p>

                <div className="eb-form-control">
                    <label htmlFor="input-text">
                        {__("API Key", "essential-blocks")}
                    </label>
                    <input
                        type="text"
                        id="input-text"
                        className="eb-input-control"
                        placeholder={__(
                            "Place your Google Map API key here",
                            "essential-blocks"
                        )}
                        value={apikey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </div>

                <button
                    className="eb-btn eb-btn-border eb-btn-sm"
                    onClick={() => handleClick()}
                >
                    {saveBtnText}
                </button>
                {error && (
                    <div className="mt10">
                        <span className="error eb-alert-error">{error}</span>
                    </div>
                )}
            </div>
        </>
    );
};
export default GoogleMaps;
