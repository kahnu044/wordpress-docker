/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
 import { registerBlockType } from '@wordpress/blocks';

 /**
	* Retrieves the translation of text.
	*
	* @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
	*/
 import { __ } from '@wordpress/i18n';

 /**
	* Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
	* All files containing `style` keyword are bundled together. The code used
	* gets applied both to the front of your site and to the editor.
	*
	* @see https://www.npmjs.com/package/@wordpress/scripts#using-css
	*/
 import './gutenslider/style.scss';

 /**
	* Internal dependencies
	*/
 import Edit from './gutenslider/free/edit';
 import save from './gutenslider/save';
 import sliderDeprecated from './gutenslider/deprecations';
 import sliderTransforms from './gutenslider/transforms';

 import SlideEdit from './gutenslide/free/edit';
 import SlideSave from './gutenslide/save';
 import slideDeprecated from './gutenslide/deprecations';

 import './gutenslider/free/filters';
 import icons from './icons';
 import example from './example';

 /**
	* Every block starts by registering a new block type definition.
	*
	* @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
	*/
 registerBlockType( 'eedee/block-gutenslider', {
	 apiVersion: 2,
	 title: 'Gutenslider',
	 description: __( 'Slider Block for Gutenberg that slides images and videos with arbitrary blocks on top.', 'gutenslider' ),
	 category: 'media',
	 keywords: [
		 __( 'Slider', 'gutenslider' ),
		 __( 'Image', 'gutenslider' ),
		 __( 'Carousel', 'gutenslider' ),
	 ],
	 icon: icons.gutenslider,
	 supports: {
		 align: [ 'wide', 'full' ],
		 html: false,
		 defaultStylePicker: false,
	 },
	 edit: Edit,
	 save,
	 example,
	 deprecated: sliderDeprecated,
	 transforms: sliderTransforms,
 } );

 registerBlockType( 'eedee/block-gutenslide', {
	 apiVersion: 2,
	 title: __( 'Gutenslide', 'gutenslider' ),
	 description: __( 'Single Slide for Gutenslider.', 'gutenslider' ),
	 category: 'media',
	 icon: icons.gutenslide,
	 keywords: [
		 __( 'Slide', 'gutenslider' ),
		 __( 'Swipe', 'gutenslider' ),
		 __( 'Carousel', 'gutenslider' ),
	 ],
	 supports: {
		 html: false,
		 inserter: false,
		 defaultStylePicker: false,
	 },
	 edit: SlideEdit,
	 save: SlideSave,
	 deprecated: slideDeprecated,
 } );

