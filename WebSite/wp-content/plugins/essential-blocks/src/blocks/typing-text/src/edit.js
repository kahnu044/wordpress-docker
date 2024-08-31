/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState, memo } from "@wordpress/element";
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
    } = attributes;
    const block = useRef(null);
    const [typed, setTyped] = useState(null);

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

    useEffect(() => {
        if (typed) {
            typed.destroy();
            setTyped(new Typed(block.current, generateOptions()));
        }
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
    ]);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-typing-text',
        style: <Style {...props} />
    };


    // this useEffect is for creating an unique id for each block's unique className by a random unique number
    useEffect(() => {
        //Set Default "typedText"
        if (typedText.length === 0) {
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
        }

        //Init Typed class execute
        const new_typed = new Typed(block.current, generateOptions());
        setTyped(new_typed);
        return () => {
            // Destroy Typed instance
            if (typed) {
                typed.destroy();
            }
        };
    }, []);

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
                    <div
                        className={`eb-typed-wrapper ${blockId}`}
                        data-id={blockId}
                    >
                        <span className="eb-typed-prefix">{prefix}</span>
                        <span className="eb-typed-text" ref={block} />
                        <span className="eb-typed-suffix">{suffix}</span>
                    </div>
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
