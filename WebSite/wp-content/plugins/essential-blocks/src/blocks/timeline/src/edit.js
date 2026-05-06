/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect, createRef, useRef, memo } from "@wordpress/element";
import { select } from "@wordpress/data";
/**
 * Internal depencencies
 */
import Inspector from "./inspector";
import Style from "./style";
import TimelineContent from "./components/timeline-content";
import defaultAttributes from './attributes';
import {
    initTimelineProgressEditor,
    addTimelineNavigationEditor,
    initSVGZigzagTimelineEditor
} from './helper';

import { ReactComponent as Icon } from "./icon.svg";

import {
    BlockProps,
    BrowseTemplate,
    withBlockContext
} from '@essential-blocks/controls';

import Templates from '../../../../patterns/timeline.json'

function Edit(props) {
    const { attributes, setAttributes, isSelected } = props;
    const {
        blockId,
        blockMeta,
        resOption,
        timelineLayout,
        timelineLineStyle,
        classHook,
        contentSource,
        cover,
        showBlockContent,
        enableMeta,
        timelines,
        connectorColor,
        progressLineColor,
        connectorWidth,
        timelineVerticalPreset
    } = attributes;

    const [queryResults, setQueryResults] = useState(false);
    const [didMount, setDidMount] = useState(false);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-timeline',
        style: <Style {...props} />
    };

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        setTimeout(() => {
            setDidMount(true)
        }, 1500)
    }, []);

    const timelineWrapperRef = useRef(null);

    // Initialize timeline progress animation
    useEffect(() => {
        const wrapper = timelineWrapperRef.current;
        if (!wrapper) return;

        let cleanupProgress = null;
        let cleanupSVG = null;

        // Wait for DOM to be ready
        const timer = setTimeout(() => {
            // Initialize progress line animation
            cleanupProgress = initTimelineProgressEditor(wrapper);

            // Add navigation
            addTimelineNavigationEditor(wrapper);

            // Initialize SVG zigzag timeline for style-one
            if (wrapper.classList.contains('eb-timeline-line-style-one')) {
                cleanupSVG = initSVGZigzagTimelineEditor(wrapper, attributes);
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            if (cleanupProgress) cleanupProgress();
            if (cleanupSVG) cleanupSVG();
        };
    }, [attributes]);

    return cover.length ? (
        <div>
            <img
                src={cover}
                alt="timeline"
                style={{ maxWidth: "100%" }}
            />
        </div>
    ) : (
        <>
            {isSelected && showBlockContent && <Inspector {...props} setQueryResults={setQueryResults} />}

            {/* {contentSource === 'dynamic-content' && didMount === false && (
				<>
					{queryResults === false && (
						<div className="eb-loading">
							<img src={`${EssentialBlocksLocalize?.image_url}/ajax-loader.gif`} alt="Loading..." />
						</div>
					)}
				</>
			)} */}

            <BlockProps.Edit {...enhancedProps}>

                <BrowseTemplate
                    {...props}
                    Icon={Icon}
                    title={"Timeline"}
                    description={"Choose a template for the Timeline or start blank."}
                    patterns={Templates}
                    startTempateIndex={0}
                />

                {showBlockContent && (
                    <>
                        <div
                            className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                        >
                            {timelines && timelines.length > 0 && (
                                <div
                                    ref={timelineWrapperRef}
                                    className={`eb-timeline-wrapper ${blockId} ${timelineLayout} layout-${timelineVerticalPreset} eb-timeline-line-style-${timelineLineStyle} ${enableMeta ? '' : 'no-meta'}`}
                                    data-id={blockId}
                                    data-connector-color={connectorColor}
                                    data-progress-color={progressLineColor}
                                    data-connector-width={connectorWidth}
                                >
                                    {/* Progress Line */}
                                    <div className="eb-timeline-progress-line">
                                        <div className="eb-timeline-progress-fill"></div>
                                    </div>
                                    {timelineLineStyle !== "one" && (
                                        <div></div>
                                    )}

                                    <TimelineContent
                                        attributes={attributes}
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </BlockProps.Edit>
        </>
    );
}

export default memo(withBlockContext(defaultAttributes)(Edit))
