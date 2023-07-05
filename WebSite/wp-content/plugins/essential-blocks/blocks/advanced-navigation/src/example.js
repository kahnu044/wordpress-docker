import { __ } from "@wordpress/i18n";

const example = {
	attributes: {
		wrpBg_backgroundColor: "rgba(255,255,255,1)",
		navHamburgerBtnColor: "#000000",
	},

	innerBlocks: [
		{
			name: "core/navigation",
			attributes: {},

			innerBlocks: [
				{
					name: "core/navigation-link",
					attributes: {
						// translators: 'Home' as in a website's home page.
						label: __("Home"),
						url: "https://essential-blocks.com/",
					},
				},
				{
					name: "core/navigation-link",
					attributes: {
						// translators: 'About' as in a website's about page.
						label: __("Blog"),
						url: "https://essential-blocks.com/blog/",
					},
				},
				{
					name: "core/navigation-link",
					attributes: {
						// translators: 'Contact' as in a website's contact page.
						label: __("Docs"),
						url: "https://essential-blocks.com/docs/",
					},
				},
			],
		},
	],
};

export default example;
