/**
 * WordPress dependencies
 */
import { useEffect, useRef, memo } from "@wordpress/element";
import {
    BlockControls,
    AlignmentToolbar,
} from "@wordpress/block-editor";

import {
    BlockProps,
    withBlockContext
} from "@essential-blocks/controls";

/**
 * External dependencies
 */
import Typed from "typed.js";

/**
 * Internal dependencies
 */
import Inspector from "./inspector";
import Style from "./style";
import defaultAttributes from './attributes';
import { escapeHTML } from "@wordpress/escape-html";

function Edit(props) {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
        name
    } = props;
    const {
        blockId,
        blockMeta,
        // responsive control attribute ⬇
        resOption,
        prefix,
        typedText,
        typeSpeed,
        startDelay,
        smartBackspace,
        backSpeed,
        backDelay,
        fadeOut,
        fadeOutDelay,
        loop,
        showCursor,
        suffix,
        textAlign,
        classHook,
        tagName,
    } = attributes;
    const block = useRef(null);
    const typedInstance = useRef(null);
    const isInitialized = useRef(false);
    let TagName = tagName;

    const generateOptions = () => {
        // Generate options for Typed instance
        const {
            typedText,
            typeSpeed,
            startDelay,
            smartBackspace,
            backSpeed,
            backDelay,
            fadeOut,
            fadeOutDelay,
            loop,
            showCursor,
        } = attributes;
        let strings = getStrings(typedText);

        return {
            strings,
            typeSpeed,
            startDelay,
            smartBackspace,
            backSpeed,
            backDelay,
            fadeOut,
            fadeOutDelay,
            loop,
            showCursor,
        };
    };

    const getStrings = (typedText) => {
        let strings = [];
        if (typeof typedText === "object" && typedText.length > 0) {
            typedText.map((item) => strings.push(escapeHTML(item.text)));
        } else {
            strings = ["first string", "second string"];
        }

        return strings;
    };

    // Single useEffect to handle both initialization and updates
    useEffect(() => {
        // Cleanup function to remove cursor elements
        const cleanupCursors = () => {
            const wrapperNode = block.current?.parentNode;
            if (wrapperNode) {
                const cursors = wrapperNode.querySelectorAll('.typed-cursor');
                cursors.forEach(cursor => cursor.remove());
            }
        };

        //Set Default "typedText" on first mount
        if (!isInitialized.current && typedText.length === 0) {
            const defaultTypedText = [
                {
                    text: "first string",
                },
                {
                    text: "second string",
                },
            ];

            setAttributes({ typedText: defaultTypedText });
            setAttributes({ prefix: "This is the " });
            setAttributes({ suffix: "of the sentence." });
            return; // Exit early, will re-run after attributes are set
        }

        // Destroy existing instance if it exists
        if (typedInstance.current) {
            typedInstance.current.destroy();
            cleanupCursors();
        }

        // Create new instance
        if (block.current) {
            typedInstance.current = new Typed(block.current, generateOptions());
            isInitialized.current = true;
        }

        // Cleanup on unmount
        return () => {
            if (typedInstance.current) {
                typedInstance.current.destroy();
                cleanupCursors();
            }
        };
    }, [
        typedText,
        typeSpeed,
        startDelay,
        smartBackspace,
        backSpeed,
        backDelay,
        fadeOut,
        fadeOutDelay,
        loop,
        showCursor,
        tagName,
    ]);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-typing-text',
        style: <Style {...props} />
    };

    // Return if there is no typed text
    if (!typedText) return <div />;

    return (
        <>
            <BlockControls>
                <AlignmentToolbar
                    value={textAlign}
                    onChange={(textAlign) => setAttributes({ textAlign })}
                />
            </BlockControls>
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            )}
            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <TagName
                        className={`eb-typed-wrapper ${blockId}`}
                        data-id={blockId}
                    >
                        <span className="eb-typed-prefix">{prefix}</span>
                        <span className="eb-typed-text" ref={block} />
                        <span className="eb-typed-suffix">{suffix}</span>
                    </TagName>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
