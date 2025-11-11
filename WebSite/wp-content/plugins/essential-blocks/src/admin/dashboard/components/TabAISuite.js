import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Switch from "rc-switch";
import AsyncSelect from "react-select/async";
import apiFetch from "@wordpress/api-fetch";
import { select, useSelect, withSelect } from "@wordpress/data";
import { Dashicon } from '@wordpress/components';

import {
    fetchEBSettingsData,
    saveEBSettingsData,
} from "@essential-blocks/controls";

export default function TabAISuite() {
    const [aiSettings, setAiSettings] = useState({
        writePageContent: true,
        writeRichtext: true,
        writeInputFields: true,
        generateImage: true,
        postTypes: ['all'],
        apiKey: "",
        maxTokens: 1500,
        contentModel: 'gpt-4.1-nano',
    });

    // Track if settings have been loaded from the server
    const [settingsLoaded, setSettingsLoaded] = useState(false);

    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState({});
    const [apiKeyError, setApiKeyError] = useState('');
    const [showFeatureOptions, setShowFeatureOptions] = useState(false);
    const [postTypeOptions, setPostTypeOptions] = useState([
        { value: 'all', label: __('All Post Types', 'essential-blocks') }
    ]);

    const filterablePostTypes = useSelect((select) => {
        const postTypes = select("core").getPostTypes({ per_page: -1 });

        if (!postTypes) {
            return []; // Or default value if needed
        }

        const filteredValues = postTypes.filter((item) => (!['attachment', 'docs', 'product'].includes(item.slug)) && item.viewable)
            .map((item) => ({
                label: item.name,
                value: item.slug
            }));

        return filteredValues.length > 0 ? filteredValues : [{ label: "Post", value: "posts" }];
    }, []);

    // Function to load post types
    const loadPostTypes = (inputValue, callback) => {
        const options = [
            { value: 'all', label: __('All Post Types', 'essential-blocks') },
            ...filterablePostTypes
        ];

        setPostTypeOptions(options);
        callback(options.filter(option =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
        ));
    };

    // Effect to load settings data
    useEffect(() => {
        fetchEBSettingsData("eb_write_with_ai").then((data) => {
            if (data) {
                data = { ...aiSettings, ...data }

                // Ensure postTypes is always an array
                if (!Array.isArray(data.postTypes)) {
                    data.postTypes = ['all'];
                }

                if ('enableAi' in data) {
                    if (data.enableAi === true) {
                        data.writePageContent = true;
                        data.writeRichtext = true;
                        data.writeInputFields = true;
                    }
                    else {
                        data.writePageContent = false;
                        data.writeRichtext = false;
                        data.writeInputFields = false;
                    }

                    delete data.enableAi
                }

                setAiSettings({
                    ...data
                });
            }

            setSettingsLoaded(true);
        });
    }, []);

    // Effect to update post type options when filterablePostTypes changes
    useEffect(() => {
        if (filterablePostTypes && filterablePostTypes.length > 0) {
            const options = [
                { value: 'all', label: __('All Post Types', 'essential-blocks') },
                ...filterablePostTypes
            ];
            setPostTypeOptions(options);
        }
    }, [filterablePostTypes]);

    const allContentEnabled = aiSettings.writePageContent || aiSettings.writeRichtext || aiSettings.writeInputFields;

    const onChangeAllContentSwitch = (value) => {
        setAiSettings({
            ...aiSettings,
            writePageContent: value,
            writeRichtext: value,
            writeInputFields: value,
        });
    };

    const toggleFeatureOptions = () => {
        setShowFeatureOptions(!showFeatureOptions);
    };

    const onChangewritePageContent = (value) => {
        setAiSettings({
            ...aiSettings,
            writePageContent: value,
        });
    };

    const onChangewriteRichtext = (value) => {
        setAiSettings({
            ...aiSettings,
            writeRichtext: value,
        });
    };

    const onChangewriteInputFields = (value) => {
        setAiSettings({
            ...aiSettings,
            writeInputFields: value,
        });
    };

    const onChangeGenerateImage = (value) => {
        setAiSettings({
            ...aiSettings,
            generateImage: value,
        });
    };

    const handlePostTypesChange = (selectedOptions) => {
        setAiSettings({
            ...aiSettings,
            postTypes: selectedOptions ? selectedOptions.map(option => option.value) : ['all'],
        });
    };

    const handleApiKeyChange = (event) => {
        // Clear any previous API key error when the user starts typing
        if (apiKeyError) {
            setApiKeyError('');
        }

        setAiSettings({
            ...aiSettings,
            apiKey: event.target.value,
        });
    };

    const handleMaxTokensChange = (event) => {
        setAiSettings({
            ...aiSettings,
            maxTokens: parseInt(event.target.value) || 1200,
        });
    };

    const handleContentModelChange = (event) => {
        setAiSettings({
            ...aiSettings,
            contentModel: event.target.value,
        });
    };

    const saveOptionsData = () => {
        setIsSaving(true);
        setSaveMessage({});

        saveEBSettingsData("eb_write_with_ai", JSON.stringify(aiSettings), "write_with_ai").then((res) => {
            const response = JSON.parse(res);
            setIsSaving(false);

            if (response.success) {
                setSaveMessage({
                    type: "success",
                    message: __("Settings saved successfully.", "essential-blocks"),
                });
                setTimeout(() => setSaveMessage({}), 3000);
            } else {
                // Check if it's an API key validation error
                if (response.data && response.data.type === 'api_key_error') {
                    // const errorMessage = response.data.message || __("Incorrect API key provided. Please check and try again.", "essential-blocks");
                    const errorMessage = __("Incorrect API key provided. Please check and try again.", "essential-blocks");
                    setApiKeyError(errorMessage);
                    setSaveMessage({
                        type: "error",
                        message: errorMessage,
                    });
                } else {
                    setSaveMessage({
                        type: "error",
                        message: __("Error saving settings.", "essential-blocks"),
                    });
                }
            }
        });
    };

    return (
        <>
            <div className="eb-admin-grid">
                <div className="eb-col-12">
                    <div className="eb-admin-block eb-write-with-ai mb30">
                        <div className="eb-admin-grid">

                            {/* Write with AI */}
                            <div className="eb-admin-inner-grid eb-col-12">
                                <div className="eb-col-6">
                                    <h2>{__("Enable Write with AI", "essential-blocks")}</h2>
                                    <p>{__("Toggle to enable or disable the AI writing functionality inside the Gutenberg Editor.", "essential-blocks")}</p>
                                </div>
                                <div className="eb-col-6 eb-admin-checkbox-wrapper">
                                    <div className="eb-admin-input-wrapper eb-admin-checkbox-all eb-admin-checkbox eb-block-box">
                                        <h4 className={allContentEnabled ? "enabled" : "disabled"}>
                                            Enable or disable all content features
                                        </h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <label className="eb-toggle-switch">
                                                <label htmlFor="switch-all-content" className="eb-admin-checkbox-label">
                                                    <Switch
                                                        checked={allContentEnabled}
                                                        onChange={onChangeAllContentSwitch}
                                                        defaultChecked={true}
                                                        disabled={false}
                                                        checkedChildren="ON"
                                                        unCheckedChildren="OFF"
                                                    />
                                                </label>
                                            </label>

                                            <button
                                                type="button"
                                                onClick={toggleFeatureOptions}
                                                style={{
                                                    background: 'none',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px',
                                                    padding: '4px 8px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px',
                                                    color: '#666'
                                                }}
                                            >
                                                <Dashicon icon={showFeatureOptions ? "arrow-up-alt2" : "arrow-down-alt2"} />
                                            </button>
                                        </div>
                                    </div>

                                    {showFeatureOptions && (
                                        <div className="eb-admin-checkbox-items-wrapper">
                                            <div className="eb-admin-input-wrapper eb-admin-checkbox eb-block-box">
                                                <h4 className={aiSettings?.writePageContent ? "enabled" : "disabled"}>
                                                    Generate Page Content
                                                </h4>
                                                <label className="eb-toggle-switch">
                                                    <label htmlFor="switch-feature-one" className="eb-admin-checkbox-label">
                                                        <Switch
                                                            checked={aiSettings?.writePageContent}
                                                            onChange={onChangewritePageContent}
                                                            defaultChecked={true}
                                                            disabled={false}
                                                            checkedChildren="ON"
                                                            unCheckedChildren="OFF"
                                                        />
                                                    </label>
                                                </label>
                                            </div>

                                            <div className="eb-admin-input-wrapper eb-admin-checkbox eb-block-box">
                                                <h4 className={aiSettings?.writeRichtext ? "enabled" : "disabled"}>
                                                    Generate RichText Content
                                                </h4>
                                                <label className="eb-toggle-switch">
                                                    <label htmlFor="switch-feature-two" className="eb-admin-checkbox-label">
                                                        <Switch
                                                            checked={aiSettings?.writeRichtext}
                                                            onChange={onChangewriteRichtext}
                                                            defaultChecked={true}
                                                            disabled={false}
                                                            checkedChildren="ON"
                                                            unCheckedChildren="OFF"
                                                        />
                                                    </label>
                                                </label>
                                            </div>

                                            <div className="eb-admin-input-wrapper eb-admin-checkbox eb-block-box">
                                                <h4 className={aiSettings?.writeInputFields ? "enabled" : "disabled"}>
                                                    Generate Block Input Content
                                                </h4>
                                                <label className="eb-toggle-switch">
                                                    <label htmlFor="switch-feature-three" className="eb-admin-checkbox-label">
                                                        <Switch
                                                            checked={aiSettings?.writeInputFields}
                                                            onChange={onChangewriteInputFields}
                                                            defaultChecked={true}
                                                            disabled={false}
                                                            checkedChildren="ON"
                                                            unCheckedChildren="OFF"
                                                        />
                                                    </label>
                                                </label>
                                            </div>


                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Generate AI Images */}
                            <div className="eb-admin-inner-grid eb-col-12">
                                <div className="eb-col-6">
                                    <h2>{__("Generate AI Images", "essential-blocks")}</h2>
                                    <p>{__("Toggle to enable or disable the AI image generation functionality inside the Gutenberg Editor.", "essential-blocks")}</p>
                                </div>
                                <div className="eb-col-6 eb-admin-checkbox-wrapper">
                                    <div className="eb-admin-input-wrapper eb-admin-checkbox eb-block-box">
                                        <h4 className={aiSettings?.generateImage ? "enabled" : "disabled"}>
                                            Generate AI Images
                                        </h4>
                                        <label className="eb-toggle-switch">
                                            <label htmlFor="switch-generate-images" className="eb-admin-checkbox-label">
                                                <Switch
                                                    checked={aiSettings?.generateImage}
                                                    onChange={onChangeGenerateImage}
                                                    defaultChecked={true}
                                                    disabled={false}
                                                    checkedChildren="ON"
                                                    unCheckedChildren="OFF"
                                                />
                                            </label>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Choose Post Types */}
                            <div className="eb-admin-inner-grid eb-col-12">
                                <div className="eb-col-6">
                                    <h2>{__("Choose Post Types", "essential-blocks")}</h2>
                                    <p>{__("Select which post types you want to enable AI writing for (Posts, Pages, or any custom post types).", "essential-blocks")}</p>
                                </div>
                                <div className="eb-col-6">
                                    <div className="eb-admin-input-wrapper eb-block-box p0">
                                        <AsyncSelect
                                            isMulti
                                            cacheOptions
                                            defaultOptions={postTypeOptions}
                                            loadOptions={loadPostTypes}
                                            value={settingsLoaded && postTypeOptions.filter(option =>
                                                aiSettings.postTypes && aiSettings.postTypes.includes(option.value)
                                            )}
                                            onChange={handlePostTypesChange}
                                            placeholder={__("Select Post Types", "essential-blocks")}
                                            className="eb-post-types-select"
                                            classNamePrefix="eb-select"
                                            isLoading={!settingsLoaded || !filterablePostTypes || filterablePostTypes.length === 0}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content Generation Model */}
                            <div className="eb-admin-inner-grid eb-col-12">
                                <div className="eb-col-6">
                                    <h2>{__("Content Generation Model", "essential-blocks")}</h2>
                                    <p>{__("Select the OpenAI model to use for AI content generation. Different models offer varying capabilities and performance.", "essential-blocks")}</p>
                                </div>
                                <div className="eb-col-6">
                                    <div className="eb-admin-input-wrapper eb-block-box p0">
                                        <select
                                            value={aiSettings.contentModel}
                                            onChange={handleContentModelChange}
                                            className="eb-content-model-select"
                                        >
                                            <option value="gpt-4.1-nano">{__("GPT-4.1 Nano (Recommended)", "essential-blocks")}</option>
                                            <option value="gpt-4o">{__("GPT-4o", "essential-blocks")}</option>
                                            <option value="gpt-4-turbo">{__("GPT-4 Turbo", "essential-blocks")}</option>
                                            <option value="gpt-4o-mini">{__("GPT-4o Mini", "essential-blocks")}</option>
                                            <option value="gpt-3.5-turbo">{__("GPT-3.5 Turbo", "essential-blocks")}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* API Keys */}
                            <div className="eb-admin-inner-grid eb-col-12">
                                <div className="eb-col-6">
                                    <h2>{__("API Key", "essential-blocks")}</h2>
                                    <p>{__("Connect your OpenAI account by entering your API key.", "essential-blocks")}</p>
                                    <p>
                                        {__("Check this ", "essential-blocks")}
                                        <a href="https://essential-blocks.com/docs/write-with-ai/" target="_blank" rel="noopener noreferrer">{__("documentation", "essential-blocks")}</a>
                                        {__(" to learn how to generate your OpenAI API key.", "essential-blocks")}
                                    </p>
                                </div>
                                <div className="eb-col-6">
                                    <div className="eb-admin-input-wrapper eb-openai-api-key eb-block-box p0">
                                        <input
                                            type="text"
                                            value={aiSettings.apiKey}
                                            onChange={handleApiKeyChange}
                                            placeholder={__("Enter API key", "essential-blocks")}
                                            className={apiKeyError ? "eb-input-error" : ""}
                                        />
                                        {apiKeyError && (
                                            <div className="eb-api-key-error">
                                                {apiKeyError}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Set Max Tokens */}
                            <div className="eb-admin-inner-grid eb-col-12">
                                <div className="eb-col-6">
                                    <h2>{__("Set Max Tokens", "essential-blocks")}</h2>
                                    <p>
                                        {__("Content will be generated based on the Token Limits you have set. For more information on Token Limits, you can check out this ", "essential-blocks")}
                                        <a href="https://platform.openai.com/settings/organization/limits" target="_blank" rel="noopener noreferrer">{__("link.", "essential-blocks")}</a>
                                    </p>
                                </div>
                                <div className="eb-col-6">
                                    <div className="eb-admin-input-wrapper eb-block-box p0">
                                        <input
                                            type="number"
                                            value={aiSettings.maxTokens}
                                            onChange={handleMaxTokensChange}
                                            min="1"
                                            max="4000"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="eb-admin-action-grid eb-col-12" style={{ textAlign: "right", marginTop: "20px" }}>
                                {saveMessage && (
                                    <span className={`eb-save-message ${saveMessage?.type}`} style={{ marginRight: "10px" }}>
                                        {saveMessage?.message}
                                    </span>
                                )}
                                <button
                                    className="eb-save-button eb-btn-md eb-btn-border"
                                    onClick={saveOptionsData}
                                    disabled={isSaving}
                                >
                                    {isSaving
                                        ? __("Saving...", "essential-blocks")
                                        : __("Save Changes", "essential-blocks")
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
