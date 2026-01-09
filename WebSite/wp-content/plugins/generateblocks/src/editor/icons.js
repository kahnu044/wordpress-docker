import { addFilter, applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

import generalSvgs from '@components/icon-picker/svgs-general';
import socialSvgs from '@components/icon-picker/svgs-social';

addFilter(
	'generateblocks.editor.iconSVGSets',
	'generateblocks/standard-icons',
	( icons, attributes ) => {
		const showStandardIcons = applyFilters(
			'generateblocks.editor.showStandardIcons',
			true,
			{ attributes }
		);

		if ( ! showStandardIcons ) {
			return icons;
		}

		return {
			general: {
				group: __( 'General', 'generateblocks' ),
				svgs: generalSvgs,
			},
			social: {
				group: __( 'Social', 'generateblocks' ),
				svgs: socialSvgs,
			},
			...icons,
		};
	}
);
