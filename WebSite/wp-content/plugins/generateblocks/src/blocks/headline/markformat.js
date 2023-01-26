import {
	__,
} from '@wordpress/i18n';

import {
	Fragment,
} from '@wordpress/element';

import {
	toggleFormat,
	registerFormatType,
} from '@wordpress/rich-text';

import {
	RichTextToolbarButton,
	RichTextShortcut,
} from '@wordpress/block-editor';

import {
	withSelect,
} from '@wordpress/data';

import {
	ifCondition,
	compose,
} from '@wordpress/compose';

const icon = <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414"><path d="M4.331,15.598l2.193,1.693c0,0 -0.813,1.215 -0.992,1.215c-1.129,0.003 -1.424,0.008 -2.603,-0.001c-0.741,-0.006 -0.04,-0.955 0.187,-1.269c0.502,-0.694 1.215,-1.638 1.215,-1.638Zm7.632,-14.107c0.364,-0.061 5.412,3.896 5.439,4.272c0.031,0.438 -4.887,8.469 -5.635,9.648c-0.251,0.397 -1.185,0.206 -2.064,0.472c-0.801,0.243 -1.89,1.336 -2.193,1.105c-1.047,-0.796 -2.217,-1.646 -3.117,-2.49c-0.367,-0.343 0.388,-1.241 0.405,-2.188c0.015,-0.811 -0.644,-2.029 -0.196,-2.575c0.836,-1.019 6.931,-8.172 7.361,-8.244Zm0.144,1.454l3.95,3.105l-4.972,8.1l-5.197,-4.053l6.219,-7.152Z" /></svg>;
const name = 'generateblocks/mark';

const GenerateBlocksMarkHightlightButton = function( props ) {
	const onToggle = () => props.onChange( toggleFormat( props.value, { type: name } ) );

	return (
		<Fragment>
			<RichTextShortcut
				type="primary"
				character="m"
				onUse={ onToggle }
			/>
			<RichTextToolbarButton
				icon={ icon }
				title={ __( 'Highlight', 'generateblocks' ) }
				onClick={ onToggle }
				isActive={ props.isActive }
				shortcutType="access"
				shortcutCharacter="m"
				className={ `toolbar-button-with-text toolbar-button__${ name }` }
			/>
		</Fragment>
	);
};

const ConditionalButton = compose(
	withSelect( function( select ) {
		return {
			selectedBlock: select( 'core/block-editor' ).getSelectedBlock(),
		};
	} ),
	ifCondition( function( props ) {
		return (
			props.selectedBlock &&
            props.selectedBlock.name === 'generateblocks/headline'
		);
	} )
)( GenerateBlocksMarkHightlightButton );

const GenerateBlocksMarkHighlight = {
	title: __( 'Highlight', 'generateblocks' ),
	tagName: 'mark',
	className: 'gb-highlight',
	edit: ConditionalButton,
};

registerFormatType( name, GenerateBlocksMarkHighlight );
