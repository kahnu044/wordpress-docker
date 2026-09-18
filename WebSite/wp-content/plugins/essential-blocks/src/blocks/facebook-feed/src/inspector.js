/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import {
    SelectControl,
    TextControl,
    RangeControl,
    ToggleControl,
    BaseControl,
    __experimentalDivider as Divider,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

/**
 * External dependencies
 */
import {
    EBTextControl,
    ColorControl,
    ResponsiveRangeController,
    BorderShadowControl,
    TypographyDropdown,
    InspectorPanel,
    ProSelectControl
} from '@essential-blocks/controls';

/**
 * Internal dependencies
 */
import {
    LAYOUT,
    SORT_OPTIONS,
    PAGINATION_TYPE,
    NUMBER_OF_COLUMNS,
    ITEM_GAP,
    IMAGE_BORDER,
    LOAD_MORE_BORDER,
    PAGINATION_BORDER,
    NORMAL_HOVER,
    PAGINATION_STATE,
    WRAPPER_MARGIN,
    WRAPPER_PADDING,
    WRAPPER_BG,
    WRAPPER_BORDER,
} from './constants';
import {
    typoPrefix_message,
    typoPrefix_meta,
    typoPrefix_header,
    typoPrefix_loadMore,
    typoPrefix_pagination,
} from './constants/typographyPrefixConstants';
import { FacebookFeedFilterUpgradePro } from './helper';

const Inspector = ({ attributes, setAttributes }) => {
    const {
        sortBy,
        numberOfPosts,
        cacheTtl,
        layout,
        showProfileImage,
        showPageName,
        showTimestamp,
        showMessage,
        messageLimit,
        showReactions,
        showComments,
        showShares,
        enablePagination,
        paginationType,
        postsPerPage,
        loadMoreText,
        enableLink,
        openInNewTab,
        headerColor,
        messageColor,
        metaColor,
        actionsBorderColor,
        cardBgColor,
        loadMoreState,
        loadMoreColor,
        loadMoreBgColor,
        loadMoreHoverColor,
        loadMoreHoverBgColor,
        paginationState,
        paginationColor,
        paginationBgColor,
        paginationHoverColor,
        paginationHoverBgColor,
        paginationActiveColor,
        paginationActiveBgColor,
    } = attributes;

    const handelLayout = (newLayout) => {
        const layoutValue = newLayout || layout;

        setAttributes({ layout: layoutValue });

        applyFilters("eb_facebook_feed_layout_change", layoutValue, attributes, setAttributes);
    }

    return (
        <InspectorPanel
            advancedControlProps={{
                marginPrefix: WRAPPER_MARGIN,
                paddingPrefix: WRAPPER_PADDING,
                backgroundPrefix: WRAPPER_BG,
                borderPrefix: WRAPPER_BORDER,
                hasMargin: true,
                hasPadding: true,
            }}
        >
            <InspectorPanel.General>
                <InspectorPanel.PanelBody
                    title={__('Source', 'essential-blocks')}
                    initialOpen={true}
                >
                    <SelectControl
                        label={__('Sort By', 'essential-blocks')}
                        value={sortBy}
                        options={SORT_OPTIONS}
                        onChange={(newSortBy) =>
                            setAttributes({ sortBy: newSortBy })
                        }
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />
                    <RangeControl
                        label={__('Number of Posts', 'essential-blocks')}
                        value={numberOfPosts}
                        onChange={(value) =>
                            setAttributes({ numberOfPosts: value })
                        }
                        min={1}
                        max={50}
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />
                    <RangeControl
                        label={__('Cache TTL (minutes)', 'essential-blocks')}
                        help={__(
                            'How long fetched posts stay cached before re-querying Facebook. Higher values reduce API hits at the cost of feed freshness.',
                            'essential-blocks'
                        )}
                        value={cacheTtl}
                        onChange={(value) =>
                            setAttributes({ cacheTtl: value })
                        }
                        min={5}
                        max={1440}
                        step={5}
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />
                    {applyFilters(
                        'eb_facebook_feed_inspector_after_source',
                        // Default shown when Pro is INACTIVE — an upgrade
                        // card advertising the content-filter feature. When
                        // Pro is active it has no listener gate here: Pro's
                        // `contentFilters` replaces this default with the real
                        // controls. Gating on `is_pro_active` keeps the upsell
                        // out of the array Pro spreads as `{content}` so it
                        // never double-renders alongside the live controls.
                        EssentialBlocksLocalize?.is_pro_active === 'false'
                            ? <FacebookFeedFilterUpgradePro />
                            : null,
                        attributes,
                        setAttributes
                    )}
                </InspectorPanel.PanelBody>

                <InspectorPanel.PanelBody
                    title={__('Layout', 'essential-blocks')}
                    initialOpen={false}
                >
                    <ProSelectControl
                        label={__('Layout', 'essential-blocks')}
                        value={layout}
                        options={LAYOUT}
                        onChange={(newLayout) => handelLayout(newLayout)}
                    />
                    {(layout === 'grid' || layout === 'masonry') && (
                        <ResponsiveRangeController
                            baseLabel={__('Columns', 'essential-blocks')}
                            controlName={NUMBER_OF_COLUMNS}
                            min={1}
                            max={6}
                            step={1}
                            noUnits
                        />
                    )}
                    {layout !== 'carousel' && (
                        <ResponsiveRangeController
                            baseLabel={__('Item Gap', 'essential-blocks')}
                            controlName={ITEM_GAP}
                            min={0}
                            max={80}
                            step={1}
                            noUnits
                        />
                    )}
                </InspectorPanel.PanelBody>

                <InspectorPanel.PanelBody
                    title={__('Content Display', 'essential-blocks')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Show profile image', 'essential-blocks')}
                        checked={showProfileImage}
                        onChange={(value) =>
                            setAttributes({ showProfileImage: value })
                        }
                        __nextHasNoMarginBottom
                    />
                    <ToggleControl
                        label={__('Show page name', 'essential-blocks')}
                        checked={showPageName}
                        onChange={(value) =>
                            setAttributes({ showPageName: value })
                        }
                        __nextHasNoMarginBottom
                    />
                    <ToggleControl
                        label={__('Show timestamp', 'essential-blocks')}
                        checked={showTimestamp}
                        onChange={(value) =>
                            setAttributes({ showTimestamp: value })
                        }
                        __nextHasNoMarginBottom
                    />
                    <ToggleControl
                        label={__('Show message', 'essential-blocks')}
                        checked={showMessage}
                        onChange={(value) =>
                            setAttributes({ showMessage: value })
                        }
                        __nextHasNoMarginBottom
                    />
                    {showMessage && (
                        <RangeControl
                            label={__(
                                'Message word limit',
                                'essential-blocks'
                            )}
                            value={messageLimit}
                            onChange={(value) =>
                                setAttributes({ messageLimit: value })
                            }
                            min={0}
                            max={200}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                    )}
                    <ToggleControl
                        label={__('Show reactions', 'essential-blocks')}
                        checked={showReactions}
                        onChange={(value) =>
                            setAttributes({ showReactions: value })
                        }
                        __nextHasNoMarginBottom
                    />
                    <ToggleControl
                        label={__(
                            'Show comments count',
                            'essential-blocks'
                        )}
                        checked={showComments}
                        onChange={(value) =>
                            setAttributes({ showComments: value })
                        }
                        __nextHasNoMarginBottom
                    />
                    <ToggleControl
                        label={__('Show shares count', 'essential-blocks')}
                        checked={showShares}
                        onChange={(value) =>
                            setAttributes({ showShares: value })
                        }
                        __nextHasNoMarginBottom
                    />
                    <Divider />
                    {layout === 'carousel' ? (
                        // Carousel streams every post horizontally — pagination
                        // doesn't apply. Surface the constraint so the panel
                        // doesn't look broken (Enable Pagination toggle absent).
                        <p
                            style={{
                                fontSize: '12px',
                                color: '#757575',
                                marginTop: 0,
                            }}
                        >
                            {__(
                                'Pagination is not available for the Carousel layout.',
                                'essential-blocks'
                            )}
                        </p>
                    ) : (
                        <>
                            <ToggleControl
                                label={__(
                                    'Enable pagination',
                                    'essential-blocks'
                                )}
                                checked={enablePagination}
                                onChange={(value) =>
                                    setAttributes({ enablePagination: value })
                                }
                                __nextHasNoMarginBottom
                            />
                            {enablePagination && (
                                <>
                                    <SelectControl
                                        label={__(
                                            'Pagination',
                                            'essential-blocks'
                                        )}
                                        value={paginationType}
                                        options={applyFilters(
                                            'eb_facebook_feed_pagination_types',
                                            PAGINATION_TYPE
                                        )}
                                        onChange={(value) =>
                                            setAttributes({
                                                paginationType: value,
                                            })
                                        }
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />
                                    <RangeControl
                                        label={__(
                                            'Posts per page',
                                            'essential-blocks'
                                        )}
                                        value={postsPerPage}
                                        onChange={(value) =>
                                            setAttributes({
                                                postsPerPage: value,
                                            })
                                        }
                                        min={1}
                                        max={20}
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />
                                    {paginationType === 'ajax' && (
                                        <EBTextControl
                                            label={__(
                                                'Load more text',
                                                'essential-blocks'
                                            )}
                                            value={loadMoreText}
                                            onChange={(value) =>
                                                setAttributes({
                                                    loadMoreText: value,
                                                })
                                            }
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}
                    <ToggleControl
                        label={__(
                            'Link posts to Facebook',
                            'essential-blocks'
                        )}
                        checked={enableLink}
                        onChange={(value) =>
                            setAttributes({ enableLink: value })
                        }
                        __nextHasNoMarginBottom
                    />
                    {enableLink && (
                        <ToggleControl
                            label={__(
                                'Open in new tab',
                                'essential-blocks'
                            )}
                            checked={openInNewTab}
                            onChange={(value) =>
                                setAttributes({ openInNewTab: value })
                            }
                            __nextHasNoMarginBottom
                        />
                    )}
                    {applyFilters(
                        'eb_facebook_feed_inspector_after_behavior',
                        null,
                        attributes,
                        setAttributes
                    )}
                </InspectorPanel.PanelBody>
                {applyFilters(
                    'eb_facebook_feed_general_inspector',
                    null,
                    attributes,
                    setAttributes
                )}
            </InspectorPanel.General>

            <InspectorPanel.Style>
                <InspectorPanel.PanelBody
                    title={__('Card Styles', 'essential-blocks')}
                    initialOpen={true}
                >
                    <ColorControl
                        label={__('Background', 'essential-blocks')}
                        color={cardBgColor}
                        attributeName={'cardBgColor'}
                    />
                    <BaseControl __nextHasNoMarginBottom>
                        <h3 className="eb-control-title">
                            {__('Border & Shadow', 'essential-blocks')}
                        </h3>
                    </BaseControl>
                    <BorderShadowControl controlName={IMAGE_BORDER} />
                </InspectorPanel.PanelBody>

                <InspectorPanel.PanelBody
                    title={__('Page Name (Header)', 'essential-blocks')}
                    initialOpen={false}
                >
                    <TypographyDropdown
                        baseLabel={__('Typography', 'essential-blocks')}
                        typographyPrefixConstant={typoPrefix_header}
                    />
                    <ColorControl
                        label={__('Color', 'essential-blocks')}
                        color={headerColor}
                        attributeName={'headerColor'}
                    />
                </InspectorPanel.PanelBody>

                <InspectorPanel.PanelBody
                    title={__('Message', 'essential-blocks')}
                    initialOpen={false}
                >
                    <TypographyDropdown
                        baseLabel={__('Typography', 'essential-blocks')}
                        typographyPrefixConstant={typoPrefix_message}
                    />
                    <ColorControl
                        label={__('Color', 'essential-blocks')}
                        color={messageColor}
                        attributeName={'messageColor'}
                    />
                </InspectorPanel.PanelBody>

                <InspectorPanel.PanelBody
                    title={__('Meta & Actions', 'essential-blocks')}
                    initialOpen={false}
                >
                    <TypographyDropdown
                        baseLabel={__('Typography', 'essential-blocks')}
                        typographyPrefixConstant={typoPrefix_meta}
                    />
                    <ColorControl
                        label={__('Color', 'essential-blocks')}
                        color={metaColor}
                        attributeName={'metaColor'}
                    />
                    <ColorControl
                        label={__('Border Color', 'essential-blocks')}
                        color={actionsBorderColor}
                        attributeName={'actionsBorderColor'}
                    />
                </InspectorPanel.PanelBody>
                {enablePagination && paginationType === 'ajax' && (
                    <InspectorPanel.PanelBody
                        title={__('Load More Button', 'essential-blocks')}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__('Typography', 'essential-blocks')}
                            typographyPrefixConstant={typoPrefix_loadMore}
                        />
                        <ToggleGroupControl
                            label={__('Button State', 'essential-blocks')}
                            value={loadMoreState}
                            onChange={(value) => setAttributes({ loadMoreState: value })}
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {NORMAL_HOVER.map((item) => (
                                <ToggleGroupControlOption
                                    key={item.value}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>
                        {loadMoreState === 'normal' && (
                            <>
                                <ColorControl
                                    label={__('Color', 'essential-blocks')}
                                    color={loadMoreColor}
                                    attributeName={'loadMoreColor'}
                                />
                                <ColorControl
                                    label={__(
                                        'Background Color',
                                        'essential-blocks'
                                    )}
                                    color={loadMoreBgColor}
                                    attributeName={'loadMoreBgColor'}
                                />
                            </>
                        )}
                        {loadMoreState === 'hover' && (
                            <>
                                <ColorControl
                                    label={__('Color', 'essential-blocks')}
                                    color={loadMoreHoverColor}
                                    attributeName={'loadMoreHoverColor'}
                                />
                                <ColorControl
                                    label={__(
                                        'Background Color',
                                        'essential-blocks'
                                    )}
                                    color={loadMoreHoverBgColor}
                                    attributeName={'loadMoreHoverBgColor'}
                                />
                            </>
                        )}

                        <BaseControl __nextHasNoMarginBottom>
                            <h3 className="eb-control-title">
                                {__('Border & Shadow', 'essential-blocks')}
                            </h3>
                        </BaseControl>
                        <BorderShadowControl controlName={LOAD_MORE_BORDER} />

                    </InspectorPanel.PanelBody>

                )}
                {enablePagination && paginationType === 'numbered' && (
                    <InspectorPanel.PanelBody
                        title={__('Pagination', 'essential-blocks')}
                        initialOpen={false}
                    >
                        <TypographyDropdown
                            baseLabel={__('Typography', 'essential-blocks')}
                            typographyPrefixConstant={typoPrefix_pagination}
                        />
                        <ToggleGroupControl
                            // label={__('Chip State', 'essential-blocks')}
                            value={paginationState}
                            onChange={(value) =>
                                setAttributes({ paginationState: value })
                            }
                            isBlock
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        >
                            {PAGINATION_STATE.map((item) => (
                                <ToggleGroupControlOption
                                    key={item.value}
                                    value={item.value}
                                    label={item.label}
                                />
                            ))}
                        </ToggleGroupControl>
                        {paginationState === 'normal' && (
                            <>
                                <ColorControl
                                    label={__('Color', 'essential-blocks')}
                                    color={paginationColor}
                                    attributeName={'paginationColor'}
                                />
                                <ColorControl
                                    label={__(
                                        'Background Color',
                                        'essential-blocks'
                                    )}
                                    color={paginationBgColor}
                                    attributeName={'paginationBgColor'}
                                />
                            </>
                        )}
                        {paginationState === 'hover' && (
                            <>
                                <ColorControl
                                    label={__('Color', 'essential-blocks')}
                                    color={paginationHoverColor}
                                    attributeName={'paginationHoverColor'}
                                />
                                <ColorControl
                                    label={__(
                                        'Background Color',
                                        'essential-blocks'
                                    )}
                                    color={paginationHoverBgColor}
                                    attributeName={'paginationHoverBgColor'}
                                />
                            </>
                        )}
                        {paginationState === 'active' && (
                            <>
                                <ColorControl
                                    label={__('Color', 'essential-blocks')}
                                    color={paginationActiveColor}
                                    attributeName={'paginationActiveColor'}
                                />
                                <ColorControl
                                    label={__(
                                        'Background Color',
                                        'essential-blocks'
                                    )}
                                    color={paginationActiveBgColor}
                                    attributeName={'paginationActiveBgColor'}
                                />
                            </>
                        )}

                        <BaseControl __nextHasNoMarginBottom>
                            <h3 className="eb-control-title">
                                {__('Border & Shadow', 'essential-blocks')}
                            </h3>
                        </BaseControl>
                        <BorderShadowControl controlName={PAGINATION_BORDER} />
                    </InspectorPanel.PanelBody>
                )}
                {applyFilters(
                    'eb_facebook_feed_style_inspector',
                    null,
                    attributes,
                    setAttributes
                )}
            </InspectorPanel.Style>
        </InspectorPanel>
    );
};

export default Inspector;
