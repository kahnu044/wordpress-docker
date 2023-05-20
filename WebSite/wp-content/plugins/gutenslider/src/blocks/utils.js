import classnames from 'classnames';

export const ASPECT_RATIOS = [
	// Common video resolutions.
	{ ratio: '2.33', className: 'wp-embed-aspect-21-9' },
	{ ratio: '2.00', className: 'wp-embed-aspect-18-9' },
	{ ratio: '1.78', className: 'wp-embed-aspect-16-9' },
	{ ratio: '1.33', className: 'wp-embed-aspect-4-3' },
	// Vertical video and instagram square video support.
	{ ratio: '1.00', className: 'wp-embed-aspect-1-1' },
	{ ratio: '0.56', className: 'wp-embed-aspect-9-16' },
	{ ratio: '0.50', className: 'wp-embed-aspect-1-2' },
];

export const hexToRgb = ( hex, alpha ) => {
	if ( typeof hex === 'undefined' ) {
		return 'transparent';
	}
	hex = hex.replace( '#', '' );
	const r = parseInt( hex.length === 3 ? hex.slice( 0, 1 ).repeat( 2 ) : hex.slice( 0, 2 ), 16 );
	const g = parseInt( hex.length === 3 ? hex.slice( 1, 2 ).repeat( 2 ) : hex.slice( 2, 4 ), 16 );
	const b = parseInt( hex.length === 3 ? hex.slice( 2, 3 ).repeat( 2 ) : hex.slice( 4, 6 ), 16 );
	if ( typeof alpha !== 'undefined' ) {
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
	}
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

const POSITION_CLASSNAMES = {
	'top left': 'is-position-top-left',
	'top center': 'is-position-top-center',
	'top right': 'is-position-top-right',
	'center left': 'is-position-center-left',
	'center center': 'is-position-center-center',
	center: 'is-position-center-center',
	'center right': 'is-position-center-right',
	'bottom left': 'is-position-bottom-left',
	'bottom center': 'is-position-bottom-center',
	'bottom right': 'is-position-bottom-right',
};

/**
 * Checks of the contentPosition is the center (default) position.
 *
 * @param {string} contentPosition The current content position.
 * @return {boolean} Whether the contentPosition is center.
 */
export function isContentPositionCenter( contentPosition ) {
	return (
		! contentPosition ||
		contentPosition === 'center center' ||
		contentPosition === 'center'
	);
}

/**
 * Retrieves the className for the current contentPosition.
 * The default position (center) will not have a className.
 *
 * @param {string} contentPosition The current content position.
 * @return {string} The className assigned to the contentPosition.
 */
export function getPositionClassName( contentPosition ) {
	return POSITION_CLASSNAMES[ contentPosition ];
}

/**
 * Removes all previously set aspect ratio related classes and return the rest
 * existing class names.
 *
 * @param {string} existingClassNames Any existing class names.
 * @return {string} The class names without any aspect ratio related class.
 */
 export const removeAspectRatioClasses = ( existingClassNames ) => {
	const aspectRatioClassNames = ASPECT_RATIOS.reduce(
		( accumulator, { className } ) => {
			accumulator[ className ] = false;
			return accumulator;
		},
		{ 'wp-has-aspect-ratio': false }
	);
	return classnames( existingClassNames, aspectRatioClassNames );
};

/**
 * Returns class names with any relevant responsive aspect ratio names.
 *
 * @param {string}  html               The preview HTML that possibly contains an iframe with width and height set.
 * @param {string}  existingClassNames Any existing class names.
 * @param {boolean} allowResponsive    If the responsive class names should be added, or removed.
 * @return {string} Deduped class names.
 */
 export function getEmbedClassNames(
	html,
	existingClassNames = '',
	allowResponsive = true
) {
	if ( ! allowResponsive ) {
		return removeAspectRatioClasses( existingClassNames );
	}

	const previewDocument = document.implementation.createHTMLDocument( '' );
	previewDocument.body.innerHTML = html;
	const iframe = previewDocument.body.querySelector( 'iframe' );

	// If we have a fixed aspect iframe, and it's a responsive embed block.
	if ( iframe && iframe.height && iframe.width ) {
		const aspectRatio = ( iframe.width / iframe.height ).toFixed( 2 );
		// Given the actual aspect ratio, find the widest ratio to support it.
		for (
			let ratioIndex = 0;
			ratioIndex < ASPECT_RATIOS.length;
			ratioIndex++
		) {
			const potentialRatio = ASPECT_RATIOS[ ratioIndex ];
			if ( aspectRatio >= potentialRatio.ratio ) {
				return classnames(
					removeAspectRatioClasses( existingClassNames ),
					potentialRatio.className,
					'wp-has-aspect-ratio'
				);
			}
		}
	}

	return existingClassNames;
}

/**
 *
 * @param {string} uniqueId 						The sliders unique id as saved in attribute gsBlockId
 * @param {Object} newAttributes				The new attributes to be set, typically a new dotType
 * @param {function} setAttributesFunc 	The function to set the attributes
 */
export function updateDotsAndSetAttributes( uniqueId, newAttributes, setAttributesFunc ) {
	const domPagination = document.querySelector( `#gutenslider-${ uniqueId } .eedee-gutenslider-pagination` );
	if ( domPagination ) {
		domPagination.classList.remove(
			'swiper-pagination-progressbar-opposite',
			'swiper-pagination-progressbar',
			'swiper-pagination-fraction',
			'swiper-pagination-bullets',
			'swiper-pagination-bullets-dynamic'
		);
		domPagination.style.height = '';
		domPagination.style.width = '';
	}
	setAttributesFunc( newAttributes );
}

// HTML Escape helper utility
var util = (function () {
  // Thanks to Andrea Giammarchi
  var
    reEscape = /[&<>'"]/g,
    reUnescape = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g,
    oEscape = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    },
    oUnescape = {
      '&amp;': '&',
      '&#38;': '&',
      '&lt;': '<',
      '&#60;': '<',
      '&gt;': '>',
      '&#62;': '>',
      '&apos;': "'",
      '&#39;': "'",
      '&quot;': '"',
      '&#34;': '"'
    },
    fnEscape = function (m) {
      return oEscape[m];
    },
    fnUnescape = function (m) {
      return oUnescape[m];
    },
    replace = String.prototype.replace
  ;
  return (Object.freeze || Object)({
    escape: function escape(s) {
      return replace.call(s, reEscape, fnEscape);
    },
    unescape: function unescape(s) {
      return replace.call(s, reUnescape, fnUnescape);
    }
  });
}());

// Tagged template function
export function trueHtml(pieces) {
    var result = pieces[0];
    var substitutions = [].slice.call(arguments, 1);
    for (var i = 0; i < substitutions.length; ++i) {
        result += util.escape(substitutions[i]) + pieces[i + 1];
    }

    return result;
}

