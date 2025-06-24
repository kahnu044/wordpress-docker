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

	public function sanitize($content)
	{
		if (! $this->is_valid($content)) {
			return '';
		}

		$allowed_attributes = apply_filters(
			'essential_blocks/files/svg/allowed_attributes',
			[
				'xmlns',
				'fill',
				'fill-rule',
				'clip-rule',
				'stroke',
				'stroke-width',
				'stroke-linecap',
				'stroke-linejoin',
				'stroke-miterlimit',
				'd',
				'cx',
				'cy',
				'r',
				'transform',
				'viewBox',
				'xmlns:xlink',
				'xml:space',
				'version',
				'x',
				'y',
				'width',
				'height',
				'class',
				'style',
				'opacity',
				'id',
			]
		);

		$allowed_elements = apply_filters(
			'essential_blocks/files/svg/allowed_elements',
			[
				'svg',
				'g',
				'path',
				'circle',
				'rect',
				'use',
				'polygon',
				'line',
				'polyline',
				'ellipse',
				'title',
				'desc',
				'defs',
				'linearGradient',
				'stop',
				'style',
				'metadata',
				'symbol',
			]
		);

		$svg = new \DOMDocument();

		// Suppress warnings from invalid XML during loading
		libxml_use_internal_errors(true);

		if (! $svg->loadXML($content, LIBXML_NONET)) {
			return '';
		}

		libxml_clear_errors();

		$xpath = new \DOMXPath($svg);
		$elements = $xpath->query('//*');

		foreach ($elements as $element) {
			if (! in_array($element->nodeName, $allowed_elements, true)) {
				$element->parentNode->removeChild($element);
				continue;
			}

			if ($element->hasAttributes()) {
				foreach (iterator_to_array($element->attributes) as $attribute) {
					if (! in_array($attribute->nodeName, $allowed_attributes, true)) {
						$element->removeAttribute($attribute->nodeName);
					}
				}
			}
		}

		$sanitized_svg = $svg->saveXML();

		return $sanitized_svg;
	}

	public function is_valid($content)
	{
		if (str_contains($content, '<!ENTITY') || str_contains($content, '<!DOCTYPE')) {
			return false;
		}

		return true;
	}
}
