=== Carousel Slider Block for Gutenberg ===
Contributors: virgildia
Donate link: http://virgiliudiaconu.com/
Tags: carousel, slide, gutenberg, swiper
Requires at least: 6.1
Tested up to: 6.8
Requires PHP: 7.0
Stable tag: 2.0.5
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html


== Description ==

A responsive carousel slider for the Gutenberg block editor that lets you add any blocks to your slides.

🚀 **Carousel Slider Version 2 is here!** Now powered by **Swiper.js** for a smoother, faster, and more modern experience. See below for update instructions.

= Features =

 - Add unlimited slides
 - Add any blocks to the slides
 - Preview the carousel in the editor
 - Responsive and touch enabled

= Settings =

 - Slides per view
 - Slides to scroll at a time
 - Slide speed
 - Slide padding
 - Prev/next arrows
 - Dots navigation
 - Infinite loop sliding
 - Autoplay
 - Responsive settings: slides to show and scroll at given screen size
 - RTL

== Requirements ==

PHP 5.6+ is recommended, WordPress 5.8+, with Gutenberg active.

== Documentation ==

Select the Carousel Slider block from the Design category. Click the + button located at the end of the carousel to add slides. Add any block within the slides. Use the horizontal scrollbar to preview the slides in the editor.

You can reorder the slides by using the left and right arrow buttons in the toolbar.

To remove a slide, select the slide and click the three dots right above it. Click the option to remove that slide.

Click the Carousel Block (the block nesting all the slides) to show the carousel settings.

== Carousel Slider Version 2 ==

Carousel Slider v2 now uses Swiper.js instead of Slick. It's more modern, better supported, and works smoother across devices.

= Upgrading from Legacy Carousel =

- Existing legacy (v1) Carousel Slider blocks will still work. You can re-enable them in the admin settings under **Settings → Carousel Slider**.
- To upgrade, click on a legacy Carousel Slider block in the editor. In the block's toolbar (the floating bar that appears above the block), click the **block icon (first button on the left)**. From the dropdown, choose **"Transform to Carousel Slider v2"**. Your existing carousel settings will be preserved, but note that the design and HTML markup will change.
- Legacy styles will not apply to v2. You may need to adjust custom CSS. 

**Optional: Re-enable Legacy Blocks**

You can show/hide legacy blocks from the block inserter and disable v2 upgrade notices via **Settings → Carousel Slider** in the admin menu.

**Note**: Legacy blocks will continue to function, but are no longer supported. It is highly recommended to upgrade to v2 for continued improvements and compatibility.

= Customizing v2 Styles =

Carousel Slider v2 supports custom styling via CSS variables:

### Navigation  
- `--wp--custom--carousel-block--navigation-size`: Arrow size  
- `--wp--custom--carousel-block--navigation-sides-offset`: Distance from edge  
- `--wp--custom--carousel-block--navigation-color`: Arrow color  
- `--wp--custom--carousel-block--navigation-alignfull-color`: Arrow color when the carousel is full width

### Pagination (dots)  
- `--wp--custom--carousel-block--pagination-top`: Top offset for pagination  
- `--wp--custom--carousel-block--pagination-bullet-size`: Dot size  
- `--wp--custom--carousel-block--pagination-bullet-color`: Dot color (inactive)  
- `--wp--custom--carousel-block--pagination-bullet-active-color`: Dot color (active)  
- `--wp--custom--carousel-block--pagination-bullet-opacity`: Dot opacity (inactive)  
- `--wp--custom--carousel-block--pagination-bullet-active-opacity`: Dot opacity (active)  
- `--wp--custom--carousel-block--pagination-bullet-horizontal-gap`: Horizontal spacing between dots  
- `--wp--custom--carousel-block--pagination-bullet-vertical-gap`: Vertical spacing between dots  

### Block spacing  
- `--wp--custom--carousel-block--image-margin-top`: Top spacing for image blocks 
- `--wp--custom--carousel-block--image-margin-bottom`: Bottom spacing for image blocks
- `--wp--custom--carousel-block--cover-margin-top`: Top spacing for cover blocks  
- `--wp--custom--carousel-block--cover-margin-bottom`: Bottom spacing for cover blocks

Note: The CSS variables use the WordPress `--wp--custom--` prefix, allowing you to override them in your theme's theme.json for site-wide styling.

== Installation ==

1. From your WordPress dashboard go to **Plugins > Add New**.
1. Search for **Carousel Slider Block** in the **Search Plugins** box.
1. Click **Install Now** to install the **Carousel Slider Block** Plugin.
1. Click **Activate** to activate the plugin.
1. **Carousel Slider Block** will be added to the **Design** block group in the editor. 

If you still need help. visit [WordPress codex](https://codex.wordpress.org/Managing_Plugins#Installing_Plugins)

== Screenshots ==

1. Carousel slider
2. Add any blocks to the carousel slides
3. Carousel settings

== Frequently Asked Questions ==
 
= What is Gutenberg? =
 
Gutenberg is the name of the new block based editor introduced in WordPress 5. Gutenberg makes it easy to create content within the editor using blocks.

= How do I add a carousel to WordPress? =
 
Select the Carousel Slider block from the Design category.

= How do I add a slide to WordPress? =
 
Select the Carousel Slider block. Click the plus button to add slides to the carousel. 

---


== Changelog ==

= 1.0.0 =
First release of the plugin.

= 1.0.1 =
Fixed lodash issue.

= 1.0.2 =
Updates for latest WP Gutenberg version. Fixed editor CSS. 

= 1.0.3 =
Added autoplay settings.

= 1.0.4 =
Improved UI experience by using inner blocks controls. Added RTL option. Removed padding option. Updated slide block icon.

= 1.0.5 =
Added block.json. Improved carousel block layout in the editor. Updated slide block icon. Tested for WordPress 5.9.

= 1.0.6 =
Eliminated block margin CSS issue in slides.
Changed the style of the "Add slide" button.

= 1.0.7 =
Added responsive setting for slides to scroll at a time.

= 1.0.8 =
Small CSS improvements in the editor. Updated slick CSS stylesheet handle. Tested on WordPress 6.0.

= 1.0.9 =
Fixed error message on Widget Editor screen. Tested on WordPress 6.3.1.

= 1.0.10 =
Fixed lodash error with latest WordPress 6.4 update.

= 1.0.11 =
Fixed layout issue in rows.
Code refactoring.

= 1.0.12 =
Added tag dependency.

= 1.0.13 = 
Reverted Slick init to working solution - outside the WP block build process.

= 1.0.14 = 
Update CSS for image block centering. 

= 1.0.15 = 
Button block appender fix.

= 1.0.16 = 
Fix slider init.

= 2.0.0 =
- Introduced Carousel Slider v2 built on Swiper.js
- Legacy blocks are still supported but can be upgraded to v2 via block transforms
- Added settings to hide legacy blocks and legacy upgrade notices

= 2.0.1 =
- Changed legacy block setting to "Show legacy blocks", disabled by default.
- CSS update for pagination margin.

= 2.0.2 =
- Added custom CSS variable for pagination bullet gap
- Corrected documentation for navigation color variable
- Removed unnecessary max-width property blocking inner block widths in editor

= 2.0.3 =
Removed block.json from legacy blocks

= 2.0.4 =
- Fix for hide legacy option
- Update plugin description

= 2.0.5 =
- Fix for block inserters