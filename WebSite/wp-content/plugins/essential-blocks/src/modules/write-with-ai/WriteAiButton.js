/**
 * WordPress dependencies
 */
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button, Popover, TextControl, SelectControl, TextareaControl, ToggleControl } from "@wordpress/components";
import { createBlock } from "@wordpress/blocks";
import { dispatch, useDispatch, select, useSelect } from "@wordpress/data";

import AiSvgIcon from "./ai-write-icon";

const WriteAIButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [topic, setTopic] = useState('');
    const [prompt, setPrompt] = useState('');
    const [keywords, setKeywords] = useState('');
    const [contentLength, setContentLength] = useState('medium');
    const [tone, setTone] = useState('informative');
    const [overwriteContent, setOverwriteContent] = useState(false);
    const [isPromptGenerated, setIsPromptGenerated] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    /**
     * Get tone instructions based on selected tone
     *
     * @param {string} tone - The selected tone
     * @return {string} - Tone instructions
     */
    const getToneInstructions = (tone) => {
        switch (tone) {
            case 'casual':
                return "conversational and friendly, using a casual tone";
            case 'formal':
                return "professional and formal, using proper language";
            case 'persuasive':
                return "persuasive and compelling, designed to convince the reader";
            case 'informative':
            default:
                return "informative and educational, focusing on providing valuable information";
        }
    };

    /**
     * Get length instructions based on selected length
     *
     * @param {string} length - The selected length
     * @return {string} - Length instructions
     */
    const getLengthInstructions = (length) => {
        switch (length) {
            case 'short':
                return "Keep the content concise and to the point, around 150-250 words.";
            case 'long':
                return "Create comprehensive content with detailed explanations, around 500-800 words.";
            case 'medium':
            default:
                return "Write a moderate-length content of approximately 300-500 words.";
        }
    };



    /**
     * Generate the full prompt based on topic, keywords, tone, and length
     *
     * @param {string} topic - The topic to write about
     * @param {string} keywords - Optional keywords to include
     * @param {string} tone - The selected tone
     * @param {string} length - The selected length
     * @return {string} - Full prompt
     */
    const generateFullPrompt = (topic, keywords, tone, length) => {
        if (!topic || !topic.trim()) {
            return '';
        }

        const toneInstructions = getToneInstructions(tone);
        const lengthInstructions = getLengthInstructions(length);

        let prompt = `Generate content using proper HTML structure for '${topic}'. `;

        if (keywords && keywords.trim()) {
            prompt += `Include relevant details based on ${keywords} throughout the content. `;
        } else {
            prompt += `Include relevant details throughout the content. `;
        }

        prompt += `Ensure all text is enclosed with <p> tags, use appropriate heading tags (<h1>, <h2>, etc.) for structure, and apply a <span> tag with the class 'highlight' to important terms for emphasis. `;

        prompt += `The content should be ${toneInstructions}. ${lengthInstructions} `;

        return prompt;
    };

    /**
     * Parse content into blocks based on headings and paragraphs
     *
     * @param {string} content - The content to parse
     * @return {Array} - Array of blocks
     */
    const parseContentIntoBlocks = (content) => {

        // Split content by line breaks
        const lines = content.split(/\r?\n/);
        const blocks = [];
        let currentParagraph = '';

        // Helper function to process bold text marked with **
        const processBoldText = (text) => {
            // Regular expression to match text between ** (but not including the **)
            const boldRegex = /\*\*(.*?)\*\*/g;

            // Replace all occurrences of **text** with <strong>text</strong>
            return text.replace(boldRegex, '<strong>$1</strong>');
        };

        // Helper function to add a paragraph block
        const addParagraphBlock = (text) => {
            if (text.trim()) {
                // Process bold text before creating the block
                const processedText = processBoldText(text.trim());

                blocks.push(
                    createBlock('essential-blocks/text', {
                        tagName: 'p',
                        text: processedText,
                        source: 'custom'
                    })
                );
            }
        };

        // Process each line
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Skip empty lines
            if (!line) {
                // If we have accumulated paragraph content, add it as a block
                if (currentParagraph) {
                    addParagraphBlock(currentParagraph);
                    currentParagraph = '';
                }
                continue;
            }

            // Check for HTML-style headings (<h1>, <h2>, etc.)
            const htmlHeadingMatch = line.match(/<h([1-6])>(.*?)<\/h\1>/i);
            if (htmlHeadingMatch) {
                // If we have accumulated paragraph content, add it as a block first
                if (currentParagraph) {
                    addParagraphBlock(currentParagraph);
                    currentParagraph = '';
                }

                // Add heading block - process bold text in headings
                blocks.push(
                    createBlock('essential-blocks/advanced-heading', {
                        tagName: 'h' + htmlHeadingMatch[1],
                        titleText: processBoldText(htmlHeadingMatch[2].trim()),
                        source: 'custom'
                    })
                );
                continue;
            }

            // Check if line is a heading (starts with # or ##)
            const markdownHeadingMatch = line.match(/^(#{1,6})\s+(.+)$/);
            if (markdownHeadingMatch) {
                // If we have accumulated paragraph content, add it as a block first
                if (currentParagraph) {
                    addParagraphBlock(currentParagraph);
                    currentParagraph = '';
                }

                // Add heading block
                blocks.push(
                    createBlock('essential-blocks/advanced-heading', {
                        tagName: 'h' + markdownHeadingMatch[1].length, // h1, h2, etc. based on number of #
                        titleText: processBoldText(markdownHeadingMatch[2]),
                        source: 'custom'
                    })
                );
                continue;
            }

            // Check if line starts and ends with ** (treat as heading)
            const boldHeadingMatch = line.match(/^\*\*(.*)\*\*$/);
            if (boldHeadingMatch) {
                // If we have accumulated paragraph content, add it as a block first
                if (currentParagraph) {
                    addParagraphBlock(currentParagraph);
                    currentParagraph = '';
                }

                // Add heading block (h3 level for ** headings)
                blocks.push(
                    createBlock('essential-blocks/advanced-heading', {
                        tagName: 'h3',
                        titleText: boldHeadingMatch[1], // Use the content between ** without processing
                        source: 'custom'
                    })
                );
                continue;
            }

            // Check for numbered paragraph (1. Title, 2. Title, etc.)
            const numberedHeadingMatch = line.match(/^(\d+)\.?\s+(.+)$/);
            if (numberedHeadingMatch &&
                // Make sure it's not just a regular numbered list in the middle of content
                (i === 0 || !lines[i - 1].trim() || lines[i - 1].match(/^(\d+)\.?\s+/))) {

                // If we have accumulated paragraph content, add it as a block first
                if (currentParagraph) {
                    addParagraphBlock(currentParagraph);
                    currentParagraph = '';
                }

                // Add paragraph block
                addParagraphBlock(line);
                continue;
            }

            // Check if line is a list item or other formatted content
            if (line.match(/^[*-]\s+/) || line.match(/^\d+\.\s+/)) {
                // If we have accumulated paragraph content, add it as a block first
                if (currentParagraph) {
                    addParagraphBlock(currentParagraph);
                    currentParagraph = '';
                }

                // Remove the leading special character(s) (*, -, 1., 2., etc.)
                const cleanedLine = line.replace(/^[*-]\s+|^\d+\.\s+/, '').trim();

                // Wrap the cleaned line inside <li>...</li>
                // const listItem = `<li>${cleanedLine}</li>`;
                const listItem = `${cleanedLine}`;

                // Add it as a paragraph block (or list item depending on your structure)
                addParagraphBlock(listItem);
                continue;
            }

            // Regular paragraph content
            // Check if this line looks like a complete sentence and the next line is empty or starts a new thought
            const isEndOfParagraph =
                line.match(/[.!?]$/) && // Ends with punctuation
                (i === lines.length - 1 || // Last line
                    !lines[i + 1].trim() || // Next line is empty
                    lines[i + 1].match(/^[A-Z]/) || // Next line starts with capital letter
                    lines[i + 1].match(/^[*#\-]/) || // Next line is a list item or heading
                    lines[i + 1].match(/^\d+\./)); // Next line is a numbered item

            if (isEndOfParagraph) {
                currentParagraph += (currentParagraph ? ' ' : '') + line;
                addParagraphBlock(currentParagraph);
                currentParagraph = '';
            } else {
                // Add to current paragraph
                currentParagraph += (currentParagraph ? ' ' : '') + line;
            }
        }

        // Add any remaining paragraph content
        if (currentParagraph) {
            blocks.push(
                createBlock('essential-blocks/text', {
                    tagName: 'p',
                    text: currentParagraph,
                    source: 'custom'
                })
            );
        }

        // If no blocks were created, create a single paragraph block with the entire content
        if (blocks.length === 0 && content.trim()) {
            blocks.push(
                createBlock('essential-blocks/text', {
                    tagName: 'p',
                    text: content.trim(),
                    source: 'custom'
                })
            );
        }

        return blocks;
    };

    const generateAIContent = () => {
        if (!prompt) {
            alert(__("Please enter a prompt", "essential-blocks"));
            return;
        }

        setLoading(true);
        setError(false);

        // Add additional instruction to not include HTML or header tags
        const modifiedPrompt = prompt + "\n\nIMPORTANT: Do not include any <html> or <head> or <body> tag in your response. Provide content only for body. Do not add \\n for line breaks. Our system will handle the formatting.";

        // Start AI job using the improved approach
        let data = new FormData();
        data.append("action", "start_ai_job");
        data.append("admin_nonce", EssentialBlocksLocalize.admin_nonce);
        data.append("job_type", "content");
        data.append("prompt", modifiedPrompt);
        data.append("content_for", "writePageContent");

        fetch(EssentialBlocksLocalize?.ajax_url, {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    // Start polling for job completion
                    pollJobStatus(response.data.job_id);
                } else {
                    setLoading(false);
                    setError(true);
                    console.error("Error starting AI job:", response.data?.message);
                    alert(__("Error starting content generation. Please try again.", "essential-blocks"));
                }
            })
            .catch((error) => {
                setLoading(false);
                setError(true);
                console.error("AJAX Error:", error);
                alert(__("Error connecting to the server. Please try again.", "essential-blocks"));
            });
    }

    /**
     * Poll job status until completion
     */
    const pollJobStatus = (jobId) => {
        const maxPollingTime = 3 * 60 * 1000; // 3 minutes
        const pollingInterval = 3000; // 3 seconds
        const startTime = Date.now();

        const poll = () => {
            // Check if we've exceeded the maximum polling time
            if (Date.now() - startTime > maxPollingTime) {
                setLoading(false);
                setError(true);
                alert(__("Content generation timed out. Please try again.", "essential-blocks"));
                return;
            }

            // Make AJAX request to check job status
            let data = new FormData();
            data.append("action", "check_ai_job_status");
            data.append("admin_nonce", EssentialBlocksLocalize.admin_nonce);
            data.append("job_id", jobId);

            fetch(EssentialBlocksLocalize?.ajax_url, {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.success) {
                        const status = response.data.status;

                        if (status === 'completed') {
                            setLoading(false);

                            if (response.data.result && response.data.result.success) {
                                // Insert the generated content into the editor
                                const content = response.data.result.content;

                                // Get the block editor dispatch
                                const blockEditor = dispatch("core/block-editor");

                                // If overwrite is enabled, remove all existing blocks first
                                if (overwriteContent) {
                                    const { getBlocks } = select("core/block-editor");
                                    const allBlocks = getBlocks();

                                    if (allBlocks.length > 0) {
                                        blockEditor.removeBlocks(allBlocks.map(block => block.clientId));
                                    }
                                }

                                // Parse content to identify paragraphs and headings
                                const blocks = parseContentIntoBlocks(content);

                                // Insert the blocks
                                blockEditor.insertBlocks(blocks);

                                // Close the popover
                                setIsVisible(false);
                            } else {
                                setError(true);
                                const errorMessage = response.data.result?.message || __("Unknown error occurred", "essential-blocks");
                                console.error("Error in AI generation result:", errorMessage);
                                alert(__("Error generating content. Please try again.", "essential-blocks"));
                            }
                        } else if (status === 'failed' || status === 'expired') {
                            setLoading(false);
                            setError(true);
                            const errorMessage = response.data.error || __("Content generation failed", "essential-blocks");
                            console.error("AI job failed:", errorMessage);
                            alert(__("Error generating content. Please try again.", "essential-blocks"));
                        } else if (status === 'pending' || status === 'processing') {
                            // Continue polling
                            setTimeout(poll, pollingInterval);
                        }
                    } else {
                        setLoading(false);
                        setError(true);
                        console.error("Error checking job status:", response.data?.message);
                        alert(__("Error checking generation status. Please try again.", "essential-blocks"));
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    setError(true);
                    console.error("AJAX Error during polling:", error);
                    alert(__("Error connecting to the server. Please try again.", "essential-blocks"));
                });
        };

        // Start polling
        poll();
    };

    const isBlank = select('core/block-editor').getBlocks().length === 0 ? true : false;

    if (!EssentialBlocksLocalize?.hasOpenAiApiKey) {
        return "";
    }

    return EssentialBlocksLocalize?.enableWriteAIPageContent !== "1" ? "" : (
        <>
            <Button
                onClick={() => handleClick()}
                className={"eb-write-ai-button"}
            >
                <img
                    src={`${EssentialBlocksLocalize?.eb_plugins_url}assets/images/eb-logo.svg`}
                    alt={"Essential Blocks Icon"}
                />{" "}
                {__("Write With AI", "essential-blocks")}
            </Button>
            {isVisible && (
                <Popover className={"eb-write-ai-popover"}>
                    <div className="eb-write-ai-popover-content">
                        <div className="ai-content-generator">
                            <div className="eb-write-ai-header">
                                <h2 className="eb-write-ai-heading">
                                    <AiSvgIcon />
                                    {__("Write Content with Essential Blocks AI", "essential-blocks")}
                                </h2>
                                <p className="eb-write-ai-description">
                                    {__("Generate high-quality posts, pages, custom post types and product descriptions effortlessly with Essential Blocks AI. Simply input your title, keywords, prompt, and let the system automatically generate engaging and structured content tailored to your needs.", "essential-blocks")}
                                </p>
                            </div>

                            <div className="eb-write-ai-form">
                                {!EssentialBlocksLocalize?.hasOpenAiApiKey && (
                                    <div className="eb-write-ai-api-key-warning">
                                        <p>
                                            {__("Please Insert your OpenAI API Key to use this Write with AI feature.", "essential-blocks")}
                                        </p>
                                        <a href={`${EssentialBlocksLocalize?.eb_admin_url}admin.php?page=essential-blocks&tab=ai-suite`} target="_blank" rel="noopener noreferrer">
                                            {__("OpenAI API Key will redirect to our Write with AI Dashboard", "essential-blocks")}
                                        </a>
                                    </div>
                                )}


                                <TextControl
                                    label={__("Content Title:", "essential-blocks")}
                                    value={topic}
                                    onChange={(value) => {
                                        setTopic(value);
                                        // Generate prompt when topic changes
                                        if (value.trim()) {
                                            const newPrompt = generateFullPrompt(value, keywords, tone, contentLength);
                                            setPrompt(newPrompt);
                                            setIsPromptGenerated(true);
                                        } else {
                                            setPrompt('');
                                            setIsPromptGenerated(false);
                                        }
                                    }}
                                    placeholder={__("Enter a descriptive title for your post, page or custom post type.", "essential-blocks")}
                                    className="eb-write-ai-topic"
                                />

                                <TextControl
                                    label={__("Keywords:", "essential-blocks")}
                                    value={keywords}
                                    onChange={(value) => {
                                        setKeywords(value);
                                        // Update prompt if topic exists
                                        if (topic.trim()) {
                                            const newPrompt = generateFullPrompt(topic, value, tone, contentLength);
                                            setPrompt(newPrompt);
                                            setIsPromptGenerated(true);
                                        }
                                    }}
                                    placeholder={__("Add keywords to generate precise & relevant content (comma-separated).", "essential-blocks")}
                                    className="eb-write-ai-keywords"
                                />

                                <TextareaControl
                                    label={__("Prompt:", "essential-blocks")}
                                    value={prompt}
                                    onChange={(value) => {
                                        setPrompt(value);
                                        // If user edits the prompt, mark it as manually edited
                                        if (isPromptGenerated) {
                                            setIsPromptGenerated(false);
                                        }
                                    }}
                                    placeholder={__("Generate content using proper HTML structure for '{Content Title}'. Include relevant details based on {Content Keywords} throughout the content. Ensure all text is enclosed with <p> tags, use appropriate heading tags (<h1>, <h2>, etc.) for structure, and apply a <span> tag with the class 'highlight' to important terms for emphasis.", "essential-blocks")}
                                    rows={6}
                                    className="eb-write-ai-prompt"
                                    help={__("Ensure you include a clear and detailed prompt to receive the best possible output. Follow the provided guidelines for optimal results.", "essential-blocks")}
                                />

                                <SelectControl
                                    label={__("Content Tone:", "essential-blocks")}
                                    value={tone}
                                    options={[
                                        { label: __("Informative", "essential-blocks"), value: "informative" },
                                        { label: __("Casual", "essential-blocks"), value: "casual" },
                                        { label: __("Formal", "essential-blocks"), value: "formal" },
                                        { label: __("Persuasive", "essential-blocks"), value: "persuasive" }
                                    ]}
                                    onChange={(value) => {
                                        setTone(value);
                                        // Update prompt if topic exists
                                        if (topic.trim()) {
                                            const newPrompt = generateFullPrompt(topic, keywords, value, contentLength);
                                            setPrompt(newPrompt);
                                            setIsPromptGenerated(true);
                                        }
                                    }}
                                    className="eb-write-ai-tone"
                                />

                                <SelectControl
                                    label={__("Desired Content Length:", "essential-blocks")}
                                    value={contentLength}
                                    options={[
                                        { label: __("Short (around 150-250 words)", "essential-blocks"), value: "short" },
                                        { label: __("Medium (around 300-500 words)", "essential-blocks"), value: "medium" },
                                        { label: __("Long (around 500-800 words)", "essential-blocks"), value: "long" }
                                    ]}
                                    onChange={(value) => {
                                        setContentLength(value);
                                        // Update prompt if topic exists
                                        if (topic.trim()) {
                                            const newPrompt = generateFullPrompt(topic, keywords, tone, value);
                                            setPrompt(newPrompt);
                                            setIsPromptGenerated(true);
                                        }
                                    }}
                                    className="eb-write-ai-length"
                                />

                                {!isBlank && (
                                    <ToggleControl
                                        label={__("Overwrite existing content", "essential-blocks")}
                                        checked={overwriteContent}
                                        onChange={(value) => setOverwriteContent(value)}
                                        help={__("If enabled, all existing content will be removed before inserting the generated content.", "essential-blocks")}
                                        className="eb-write-ai-overwrite"
                                    />
                                )}

                                <div className="eb-write-ai-generate-button-wrapper">
                                    <Button
                                        className={`eb-write-ai-generate-button ${error ? 'eb-button-error' : ''}`}
                                        onClick={() => generateAIContent()}
                                        isPrimary
                                        disabled={loading || !prompt || !EssentialBlocksLocalize?.hasOpenAiApiKey}
                                    >
                                        <AiSvgIcon />
                                        {!error && !loading && __("Generate Content", "essential-blocks")}
                                        {!error && loading && (
                                            <>
                                                {__("Generating...", "essential-blocks")}
                                                <img
                                                    className="eb-install-loader"
                                                    src={`${EssentialBlocksLocalize.eb_plugins_url}/assets/images/loading.svg`}
                                                    alt={__("Loading", "essential-blocks")}
                                                />
                                            </>
                                        )}
                                        {error && __("Something went wrong!", "essential-blocks")}
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <a
                        className="eb-write-ai-close-btn"
                        href="#"
                        onClick={() => handleClick()}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_435_1560)">
                                <path
                                    d="M15 4.75L5 14.75"
                                    stroke="#667085"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5 4.75L15 14.75"
                                    stroke="#667085"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_435_1560">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </Popover>
            )}
        </>
    )
};

export default WriteAIButton;
