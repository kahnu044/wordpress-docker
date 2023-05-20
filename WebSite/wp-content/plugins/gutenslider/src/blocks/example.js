const { __ } = wp.i18n;

import { defaultBackground } from '../components/reusable/background/attributes';

export default {
	attributes: {
		duration: 1.5,
		autoplay: true,
		arrows: true,
		dots: true,
		fadeMode: false,
		sliderHeight: '200px',
		sliderHeightMd: '200px',
		sliderHeightSm: '200px',
	},
	innerBlocks: [
		{
			name: 'eedee/block-gutenslide',
			attributes: {
        contentPosition: 'center',
				background: {
					...defaultBackground,
					backgroundType: 'image',
					backgroundImage: {
						url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
					},
				},
			},
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						/* translators: example text for slide 1. */
						content: __( 'Gutenslider', 'gutenslider' ),
						textAlign: 'center',
					},
				},
			],
		},
		{
			name: 'eedee/block-gutenslide',
			attributes: {
				background: {
          contentPosition: 'center',
					...defaultBackground,
					backgroundType: 'image',
					backgroundImage: {
						url: 'https://images.unsplash.com/photo-1549876612-f9ea53d45266?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
					},
				},
			},
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						/* translators: example text for slide 2. */
						content: __( 'is', 'gutenslider' ),
						textAlign: 'center',
						customTextColor: '#00CEFF',
						style: {
              color: {
                text: '#00CEFF',
              },
            },
					},
				},
			],
		},
		{
			name: 'eedee/block-gutenslide',
			attributes: {
				background: {
          contentPosition: 'center',
					...defaultBackground,
					backgroundType: 'image',
					backgroundImage: {
						url: 'https://images.unsplash.com/photo-1570368336224-455084c1fb31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
					},
				},
			},
			innerBlocks: [
				{
					name: 'core/list',
					attributes: {
            "ordered": false,
            /* translators: example text for slide 3. */
            "values": "<li>awsome</li><li>fast</li><li>user friendly</li><li>leightweight</li><li>SEO friendly</li><li>...</li>",
            "textColor": "white",
            fontSize: 'large',
					},
				},
			],
		},
	],
};
