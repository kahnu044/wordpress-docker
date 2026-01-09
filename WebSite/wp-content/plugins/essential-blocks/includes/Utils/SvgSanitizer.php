<?php

/**
 * SVG Sanitizer class for Essential Blocks
 */

namespace EssentialBlocks\Utils;

use Error;
use EssentialBlocks\Traits\HasSingletone;

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

class SvgSanitizer
{
	use HasSingletone;

	public function __construct() {}

	/**
	 * Sanitize SVG File
	 *
	 * @access public
	 *
	 * @param string $filename
	 * @return void
	 */
	public function sanitize_file($filename)
	{
		if (! file_exists($filename)) {
			return;
		}

		$original_content = file_get_contents($filename);

		if (empty($original_content)) {
			return;
		}

		$sanitized_content = $this->sanitize($original_content);
		if (empty($sanitized_content)) {
			return;
		}

		file_put_contents($filename, $sanitized_content);
	}

	/**
	 * Sanitize SVG
	 *
	 * @access public
	 *
	 * @param string $content
	 * @return string
	 */
	public function sanitize($content)
	{
		// Strip php tags
		$content = $this->strip_comments($content);
		$content = $this->strip_php_tags($content);
		$content = $this->strip_line_breaks($content);

		$svg = new \DOMDocument();

		// Suppress warnings from invalid XML during loading
		libxml_use_internal_errors(true);

		if (! $svg->loadXML($content, LIBXML_NONET)) {
			return '';
		}

		libxml_clear_errors();

		$xpath = new \DOMXPath($svg);
		$elements = $xpath->query('//*');
		$allowed_elements = $this->get_allowed_elements();
		$allowed_attributes = $this->get_allowed_attributes();

		foreach ($elements as $element) {
			if (! in_array($element->nodeName, $allowed_elements, true)) {
				$element->parentNode->removeChild($element);
				continue;
			}

			if ($element->hasAttributes()) {
				foreach (iterator_to_array($element->attributes) as $attribute) {
					if (! in_array(strtolower($attribute->nodeName), $allowed_attributes, true)) {
						$element->removeAttribute($attribute->nodeName);
					}
				}
			}
		}

		// Strip any DOCTYPE/ENTITY declarations for safety.
		$this->strip_doctype($svg);

		$sanitized_svg = $svg->saveXML();

		return $sanitized_svg;
	}

	/**
	 * Strip Comments
	 *
	 * @access private
	 *
	 * @param string $content
	 * @return string
	 */
	private function strip_comments($content)
	{
		// Remove comments.
		$content = preg_replace('/<!--(.*)-->/Us', '', $content);
		$content = preg_replace('/\/\*(.*)\*\//Us', '', $content);
		if ((false !== strpos($content, '<!--')) || (false !== strpos($content, '/*'))) {
			return '';
		}
		return $content;
	}

	/**
	 * Strip PHP Tags
	 *
	 * @access private
	 *
	 * @param string $content
	 * @return string
	 */
	private function strip_php_tags($content)
	{
		$content = preg_replace('/<\?(=|php)(.+?)\?>/i', '', $content);
		// Remove XML, ASP, etc.
		$content = preg_replace('/<\?(.*)\?>/Us', '', $content);
		$content = preg_replace('/<\%(.*)\%>/Us', '', $content);

		if ((false !== strpos($content, '<?')) || (false !== strpos($content, '<%'))) {
			return '';
		}
		return $content;
	}

	/**
	 * Strip Line Breaks
	 *
	 * @access private
	 *
	 * @param string $content
	 * @return string
	 */
	private function strip_line_breaks($content)
	{
		// Remove line breaks.
		return preg_replace('/\r|\n/', '', $content);
	}

	/**
	 * Strip DOCTYPE/ENTITY declarations
	 *
	 * Removes any DOCTYPE or ENTITY declarations from the DOM to prevent XXE-style attacks.
	 *
	 * @access private
	 *
	 * @param \DOMDocument $document
	 * @return void
	 */
	private function strip_doctype($document)
	{
		if ($document instanceof \DOMDocument && $document->doctype) {
			$document->removeChild($document->doctype);
		}
	}

	/**
	 * Get Allowed Attributes
	 *
	 * Returns an array of allowed tag attributes in SVG files.
	 *
	 * @access private
	 *
	 * @return array
	 */
	private function get_allowed_attributes()
	{
		$allowed_attributes = [
			'accent-height',
			'accumulate',
			'additivive',
			'alignment-baseline',
			'aria-hidden',
			'aria-controls',
			'aria-describedby',
			'aria-description',
			'aria-expanded',
			'aria-haspopup',
			'aria-label',
			'aria-labelledby',
			'aria-roledescription',
			'ascent',
			'attributename',
			'attributetype',
			'azimuth',
			'basefrequency',
			'baseline-shift',
			'begin',
			'bias',
			'by',
			'class',
			'clip',
			'clip-path',
			'clip-rule',
			'clippathunits',
			'color',
			'color-interpolation',
			'color-interpolation-filters',
			'color-profile',
			'color-rendering',
			'cx',
			'cy',
			'd',
			'dx',
			'dy',
			'diffuseconstant',
			'direction',
			'display',
			'divisor',
			'dominant-baseline',
			'dur',
			'edgemode',
			'elevation',
			'end',
			'fill',
			'fill-opacity',
			'fill-rule',
			'filter',
			'filterres',
			'filterunits',
			'flood-color',
			'flood-opacity',
			'font-family',
			'font-size',
			'font-size-adjust',
			'font-stretch',
			'font-style',
			'font-variant',
			'font-weight',
			'fx',
			'fy',
			'g1',
			'g2',
			'glyph-name',
			'glyphref',
			'gradienttransform',
			'gradientunits',
			'height',
			'href',
			'id',
			'image-rendering',
			'in',
			'in2',
			'k',
			'k1',
			'k2',
			'k3',
			'k4',
			'kerning',
			'keypoints',
			'keysplines',
			'keytimes',
			'lang',
			'lengthadjust',
			'letter-spacing',
			'kernelmatrix',
			'kernelunitlength',
			'lighting-color',
			'local',
			'marker-end',
			'marker-mid',
			'marker-start',
			'markerheight',
			'markerunits',
			'markerwidth',
			'mask',
			'maskcontentunits',
			'maskunits',
			'max',
			'media',
			'method',
			'mode',
			'min',
			'name',
			'numoctaves',
			'offset',
			'opacity',
			'operator',
			'order',
			'orient',
			'orientation',
			'origin',
			'overflow',
			'paint-order',
			'path',
			'pathlength',
			'patterncontentunits',
			'patterntransform',
			'patternunits',
			'points',
			'preservealpha',
			'preserveaspectratio',
			'primitiveunits',
			'r',
			'rx',
			'ry',
			'radius',
			'refx',
			'refy',
			'repeatcount',
			'repeatdur',
			'requiredfeatures',
			'restart',
			'result',
			'role',
			'rotate',
			'scale',
			'seed',
			'shape-rendering',
			'spacing',
			'specularconstant',
			'specularexponent',
			'spreadmethod',
			'startoffset',
			'stddeviation',
			'stitchtiles',
			'stop-color',
			'stop-opacity',
			'stroke',
			'stroke-dasharray',
			'stroke-dashoffset',
			'stroke-linecap',
			'stroke-linejoin',
			'stroke-miterlimit',
			'stroke-opacity',
			'stroke-width',
			'style',
			'surfacescale',
			'systemlanguage',
			'tabindex',
			'targetx',
			'targety',
			'transform',
			'transform-origin',
			'text-anchor',
			'text-decoration',
			'text-rendering',
			'textlength',
			'type',
			'u1',
			'u2',
			'underline-position',
			'underline-thickness',
			'unicode',
			'unicode-bidi',
			'values',
			'vector-effect',
			'vert-adv-y',
			'vert-origin-x',
			'vert-origin-y',
			'viewbox',
			'visibility',
			'width',
			'word-spacing',
			'wrap',
			'writing-mode',
			'x',
			'x1',
			'x2',
			'xchannelselector',
			'xlink:href',
			'xlink:title',
			'xmlns',
			'xmlns:se',
			'xmlns:xlink',
			'xml:lang',
			'xml:space',
			'y',
			'y1',
			'y2',
			'ychannelselector',
			'z',
			'zoomandpan',
		];

		/**
		 * Allowed attributes in SVG file.
		 *
		 * Filters the list of allowed attributes in SVG files.
		 *
		 * Since SVG files can run JS code that may inject malicious code, all attributes
		 * are removed except the allowed attributes.
		 *
		 * This hook can be used to manage allowed SVG attributes. To either add new
		 * attributes or delete existing attributes. To strengthen or weaken site security.
		 *
		 * @param array $allowed_attributes A list of allowed attributes.
		 */
		$allowed_attributes = apply_filters('essential_blocks/files/svg/allowed_attributes', $allowed_attributes);

		return $allowed_attributes;
	}


	/**
	 * Get Allowed Elements
	 *
	 * Returns an array of allowed element tags to be in SVG files.
	 *
	 * @access private
	 *
	 * @return array
	 */
	private function get_allowed_elements()
	{
		$allowed_elements = [
			'a',
			'animate',
			'animateMotion',
			'animateTransform',
			'circle',
			'clippath',
			'defs',
			'desc',
			'ellipse',
			'feBlend',
			'feColorMatrix',
			'feComponentTransfer',
			'feComposite',
			'feConvolveMatrix',
			'feDiffuseLighting',
			'feDisplacementMap',
			'feDistantLight',
			'feDropShadow',
			'feFlood',
			'feFuncA',
			'feFuncB',
			'feFuncG',
			'feFuncR',
			'feGaussianBlur',
			'feImage',
			'feMerge',
			'feMergeNode',
			'feMorphology',
			'feOffset',
			'fePointLight',
			'feSpecularLighting',
			'feSpotLight',
			'feTile',
			'feTurbulence',
			'filter',
			'foreignobject',
			'g',
			'image',
			'line',
			'lineargradient',
			'marker',
			'mask',
			'metadata',
			'mpath',
			'path',
			'pattern',
			'polygon',
			'polyline',
			'radialgradient',
			'rect',
			'set',
			'stop',
			'style',
			'svg',
			'switch',
			'symbol',
			'text',
			'textpath',
			'title',
			'tspan',
			'use',
			'view',
		];

		/**
		 * Allowed elements in SVG file.
		 *
		 * Filters the list of allowed elements in SVG files.
		 *
		 * Since SVG files can run JS code that may inject malicious code, all elements
		 * are removed except the allowed elements.
		 *
		 * This hook can be used to manage SVG elements. To either add new elements or
		 * delete existing elements. To strengthen or weaken site security.
		 *
		 * @param array $allowed_elements A list of allowed elements.
		 */
		$allowed_elements = apply_filters('essential_blocks/files/svg/allowed_elements', $allowed_elements);

		return $allowed_elements;
	}
}
