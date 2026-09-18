/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const SORT_OPTIONS = [
    { label: __('Newest Posts', 'essential-blocks'), value: 'most_recent' },
    { label: __('Oldest Posts', 'essential-blocks'), value: 'least_recent' },
];

export const LAYOUT = [
    { label: __('Grid', 'essential-blocks'), value: 'grid' },
    { label: __('List', 'essential-blocks'), value: 'list' },
    { label: __('Masonry', 'essential-blocks'), value: 'masonry' },
    { label: __('Carousel', 'essential-blocks'), value: 'carousel', isPro: true },
];

export const PAGINATION_TYPE = [
    { label: __('Numbered', 'essential-blocks'), value: 'numbered' },
    { label: __('AJAX Load More', 'essential-blocks'), value: 'ajax' },
];

export const NUMBER_OF_COLUMNS = 'fbCol';
export const ITEM_GAP = 'fbItemGap';
export const IMAGE_BORDER = 'fbImgBrdShd';
export const LOAD_MORE_BORDER = 'fbLoadMoreBdShd';
export const PAGINATION_BORDER = 'fbPaginationBdShd';
export const WRAPPER_MARGIN = 'fbWrpMargin';
export const WRAPPER_PADDING = 'fbWrpPadding';
export const WRAPPER_BG = 'fbWrpBg';
export const WRAPPER_BORDER = 'fbWrpBdShd';

// State toggle for the Load More button color/background pair.
export const NORMAL_HOVER = [
    { label: __('Normal', 'essential-blocks'), value: 'normal' },
    { label: __('Hover', 'essential-blocks'), value: 'hover' },
];

// Pagination chip has three meaningful visual states (the current page
// chip is styled separately so users can call it out distinctly).
export const PAGINATION_STATE = [
    { label: __('Normal', 'essential-blocks'), value: 'normal' },
    { label: __('Hover', 'essential-blocks'), value: 'hover' },
    { label: __('Active', 'essential-blocks'), value: 'active' },
];
