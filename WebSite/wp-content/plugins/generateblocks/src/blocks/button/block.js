/**
 * Block: Buttons
 */

import './editor.scss';

import editButton from './edit';
import saveButton from './save';
import deprecated from './deprecated';
import blockAttributes from './attributes';
import getIcon from '../../utils/get-icon';
import dynamicContentAttributes from '../../extend/dynamic-content/attributes';

import {
	__,
} from '@wordpress/i18n';

import {
	registerBlockType,
} from '@wordpress/blocks';
import getContentTypeLabel from '../../extend/dynamic-content/utils/getContentTypeLabel';

const attributes = Object.assign(
	{},
	blockAttributes,
	dynamicContentAttributes
);

/**
 * Register our Button block.
 *
 * @param {string} name     Block name.
 * @param {Object} settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'generateblocks/button', {
	apiVersion: 2,
	title: __( 'Button', 'generateblocks' ),
	description: __( 'Drive conversions with beautiful buttons.', 'generateblocks' ),
	parent: [ 'generateblocks/button-container' ],
	icon: getIcon( 'button' ),
	category: 'generateblocks',
	keywords: [
		__( 'button' ),
		__( 'buttons' ),
		__( 'generate' ),
	],
	attributes,
	supports: {
		className: false,
		inserter: false,
		reusable: false,
	},
	edit: editButton,
	save: saveButton,
	deprecated,
	usesContext: [ 'postId', 'postType', 'generateblocks/query', 'generateblocks/inheritQuery' ],
	__experimentalLabel: ( attrs ) => (
		getContentTypeLabel( attrs, __( 'Button', 'generateblocks' ) )
	),
} );
