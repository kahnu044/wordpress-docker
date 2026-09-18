/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Edit from './edit';
import example from './example';
import metadata from '../block.json';
import './style.scss';
import './editor.scss';
import attributes from './attributes';
/**
 * External dependencies
 */
import { ebConditionalRegisterBlockType } from '@essential-blocks/controls';
import { ReactComponent as Icon } from './icon.svg';

ebConditionalRegisterBlockType( metadata, {
	icon: Icon,
	attributes,
	keywords: [
		__( 'Facebook Feed', 'essential-blocks' ),
		__( 'eb Facebook Feed', 'essential-blocks' ),
		__( 'social', 'essential-blocks' ),
	],
	edit: Edit,
	save: () => null,
	example,
} );
