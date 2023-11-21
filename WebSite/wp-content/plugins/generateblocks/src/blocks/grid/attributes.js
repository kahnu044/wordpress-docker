/* eslint-disable no-undef */
export default {
	uniqueId: {
		type: 'string',
		default: '',
	},
	templateLock: {
		type: [ 'string', 'boolean' ],
		enum: [ 'all', 'insert', 'contentOnly', false ],
	},
	anchor: {
		type: 'string',
		default: '',
	},
	columns: {
		type: 'number',
		default: '',
	},
	horizontalGap: {
		type: 'number',
		default: generateBlocksDefaults.gridContainer.horizontalGap,
	},
	verticalGap: {
		type: 'number',
		default: generateBlocksDefaults.gridContainer.verticalGap,
	},
	verticalAlignment: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.verticalAlignment,
	},
	horizontalGapTablet: {
		type: 'number',
		default: generateBlocksDefaults.gridContainer.horizontalGapTablet,
	},
	verticalGapTablet: {
		type: 'number',
		default: generateBlocksDefaults.gridContainer.verticalGapTablet,
	},
	verticalAlignmentTablet: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.verticalAlignmentTablet,
	},
	horizontalGapMobile: {
		type: 'number',
		default: generateBlocksDefaults.gridContainer.horizontalGapMobile,
	},
	verticalGapMobile: {
		type: 'number',
		default: generateBlocksDefaults.gridContainer.verticalGapMobile,
	},
	verticalAlignmentMobile: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.verticalAlignmentMobile,
	},
	horizontalAlignment: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.horizontalAlignment,
	},
	horizontalAlignmentTablet: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.horizontalAlignmentTablet,
	},
	horizontalAlignmentMobile: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.horizontalAlignmentMobile,
	},
	isDynamic: {
		type: 'boolean',
	},
	blockVersion: {
		type: 'number',
	},
	isQueryLoop: {
		type: 'boolean',
		default: false,
	},
	useLegacyRowGap: {
		type: 'boolean',
		default: false,
	},
	blockLabel: {
		type: 'string',
		default: '',
	},
	// deprecated since 1.2.0
	elementId: {
		type: 'string',
		default: '',
	},
	cssClasses: {
		type: 'string',
		default: '',
	},
};
/* eslint-enable no-undef */
