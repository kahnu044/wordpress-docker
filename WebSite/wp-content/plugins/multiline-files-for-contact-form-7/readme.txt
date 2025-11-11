=== MultiLine Files for Contact Form 7 ===
Contributors: zluck, divyeshk71
Donate link: https://www.buymeacoffee.com/zluck
Tags: contact form 7, multiple file upload, file attachment, form plugin, file uploader
Requires at least: 5.6
Tested up to: 6.8.2
Requires PHP: 7.4
Stable tag: 3.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Upload unlimited files to Contact Form 7 with an intuitive interface, file management, and automatic ZIP compression for email delivery.

== Description ==

**MultiLine Files for Contact Form 7** is the ultimate solution for adding multiple file upload functionality to your Contact Form 7 forms. Whether you're collecting documents, images, videos, or any other file types, this plugin provides a seamless, user-friendly experience that enhances your forms' capabilities.

**Why Choose MultiLine Files for Contact Form 7?**

✅ **Unlimited File Uploads** - No restrictions on the number of files users can upload
✅ **Intuitive User Interface** - Clean, responsive design that works on all devices
✅ **Smart File Management** - Users can preview, remove, and manage files before submission
✅ **Automatic ZIP Compression** - All files are automatically compressed into a single ZIP file for easy email delivery
✅ **Advanced Security** - Built-in file type validation, size limits, and security measures
✅ **Easy Integration** - Works seamlessly with Contact Form 7 without complex setup
✅ **Fully Responsive** - Perfect experience on desktop, tablet, and mobile devices

**Perfect For:**

- Document submission forms
- Portfolio uploads
- Job application forms
- Support ticket systems
- Content submission platforms
- Any form requiring multiple file attachments

== Installation ==

**Method 1: WordPress Admin (Recommended)**
1. Go to **Plugins** → **Add New** in your WordPress admin
2. Search for "MultiLine Files for Contact Form 7"
3. Click **Install Now** and then **Activate**

**Method 2: Manual Upload**
1. Download the plugin ZIP file
2. Go to **Plugins** → **Add New** → **Upload Plugin**
3. Choose the ZIP file and click **Install Now**
4. Click **Activate Plugin**

**Method 3: FTP Upload**
1. Extract the plugin ZIP file
2. Upload the `multiline-files-upload-for-contact-form-7` folder to `/wp-content/plugins/`
3. Activate the plugin through the **Plugins** menu

**Configuration:**
1. Go to **Contact** → **Contact Forms** in your WordPress admin
2. Edit your desired form
3. Click the **multilinefile** button in the form editor
4. Configure your settings (file types, size limits, etc.)
5. Insert the generated shortcode into your form
6. In the **Mail** tab, add the field name to **File Attachments**

== How to change style? ==
If you want to change our plugin button or others file listing style and apply your custom style please add your custom css in your theme's css file. Adding style in child theme is recommended. Here I have shown style guide for button and listing. so, you can easily update style of the elements.

1. **Buttton style:** `#mfcf7_zl_add_file { background-color: #004834; }`

2. **'X' icon style:** `.mfcf7_zl_multifilecontainer p .mfcf7_zl_delete_file i { color: azure; }`

3. **Selected file name style:** `.mfcf7-zl-multifile-name { color: black; }`

== Frequently Asked Questions ==

= How do I add a multiple file upload field to my Contact Form 7 form? =

In the Contact Form 7 form editor, click the **multilinefile** button or manually add `[multilinefile]` where you want the upload field to appear. You can also use `[multilinefile*]` for required fields.

= Can I restrict the types of files users can upload? =

Yes! Use the `filetypes` attribute in your shortcode. For example:
- `[multilinefile filetypes:jpg|png|gif]` - Only images
- `[multilinefile filetypes:pdf|doc|docx]` - Only documents
- `[multilinefile filetypes:mp4|avi|mov]` - Only videos

= How do I set a maximum file size for uploads? =

Use the `limit` attribute with file size in bytes:
- `[multilinefile limit:1048576]` - 1MB limit
- `[multilinefile limit:5242880]` - 5MB limit
- `[multilinefile limit:10485760]` - 10MB limit

= Is there a limit to the number of files a user can upload? =

By default, there's no limit. However, you can set limits using the `minfile` and `maxfile` options in the premium version.

= How do I receive the uploaded files via email? =

In your Contact Form 7 form's **Mail** tab, add your field name to the **File Attachments** field. For example, if your field is named "documents", add `[documents]` to the File Attachments field.

= Will this work with my theme? =

Yes! The plugin is designed to work with any WordPress theme. It uses standard WordPress styling and is fully responsive.

= Can I customize the appearance of the upload button and file list? =

Yes! You can add custom CSS to your theme to style the upload button and file list. The plugin provides CSS classes for easy customization. See the "How to Change Style?" section above for detailed styling examples.

= Is this plugin compatible with the latest WordPress version? =

Yes! The plugin is regularly updated and tested with the latest WordPress versions, Contact Form 7, and PHP versions.

= Do I need any special server requirements? =

The plugin requires the ZipArchive PHP extension, which is available on most hosting providers. If you're unsure, contact your hosting provider.

= Can I use this plugin on multiple sites? =

Yes! The plugin is licensed under GPL, so you can use it on as many sites as you want.

== Screenshots ==

1. **Form Editor Integration** - Easy-to-use tag generator in Contact Form 7 editor
2. **Frontend Upload Interface** - Clean, user-friendly file upload button and file list
3. **File Management** - Users can preview and remove selected files before submission
4. **Admin Settings** - Comprehensive configuration options for file types and size limits
5. **Email Attachments** - Received files automatically compressed into a single ZIP file
6. **Mobile Responsive** - Perfect experience on all devices and screen sizes
7. **File Type Validation** - Built-in security with file type and size validation
8. **Multiple File Support** - Upload unlimited files with intuitive management

== Changelog ==

= 3.1.0 =
* ✅ **MAJOR UPDATE** - Full compatibility with WordPress 6.8.2
* ✅ **MAJOR UPDATE** - Tested and compatible with Contact Form 7 5.9+
* ✅ **MAJOR UPDATE** - PHP 8.3 compatibility confirmed
* ✅ Enhanced file validation and error handling
* ✅ Improved user interface for better accessibility
* ✅ Updated documentation and help text
* ✅ Performance optimizations for faster loading
* ✅ Better mobile responsiveness
* ✅ Enhanced security measures

= 3.0.1 =
* Minor bug fixes and compatibility check with WordPress 6.7.2
* Fixed file validation edge cases
* Improved error messages

= 3.0.0 =
* Implement support for the Tag Generator v2
* Enhanced admin interface
* Better file management system
* Improved user experience

= 2.9.1 =
* Fix the undefined variable error when upgrading plugin in WordPress version 6.6.2

= 2.9 =
* Fix the Wordfence security issues
* Enhanced security validation

= 2.8.1 =
* Warning fixes and code improvements

= 2.8 =
* Added feedback popup when deactivating the plugin
* Changes to be compatible with Latest WordPress

= 2.7 =
* Changes to be compatible with Latest WordPress
* Minor improvements and bug fixes

= 2.6 =
* Updated banner and styling
* Improved user interface

= 2.5 =
* Added admin notices and improved styling
* Enhanced user experience

= 2.4 =
* Minor improvements and bug fixing
* Better error handling

= 2.3 =
* Changes to be compatible with Latest WordPress
* Minor improvements and bug fixing

= 2.2 =
* Changes to be compatible with Latest WordPress
* Minor improvements

= 2.1 =
* Changes to be compatible with Latest WordPress
* File Type Restriction bug fixed

= 2.0 =
* Changes to be compatible with Contact Form 7 v5.4

= 1.9 =
* Safari Ajax issue fixed
* If one file is uploaded, it won't be zipped
* Latest WordPress compatibility checked

= 1.8 =
* Minor warning fix and Latest WordPress compatibility checked

= 1.7 =
* Safari Compatibility issues fixes and UI/UX improvements

= 1.6.3 =
* Hot fix for admin notices

= 1.6.2 =
* Hot fix

= 1.6.1 =
* Bug hot fix

= 1.6 =
* UI/UX Improvements

= 1.5 =
* Fixed minor bugs about admin notices, safe to update

= 1.4 =
* Safari 11 on Mac bug fixed, IE and Edge support added

= 1.3 =
* Safari Compatibility issues fixes and UI/UX improvements

= 1.2 =
* Bug fixes and UI/UX improvement

= 1.1 =
* Bug fix for older IE browsers
* Added ability to change upload button name

= 1.0 =
* Initial Release

== Upgrade Notice ==

= 3.1.0 =
**IMPORTANT UPDATE** - This version includes full compatibility with WordPress 6.8.2, Contact Form 7 5.9+, and PHP 8.3. We strongly recommend updating to this version for optimal performance, security, and compatibility with the latest WordPress ecosystem.

= 3.0.1 =
This update includes minor bug fixes and compatibility improvements. Safe to update.

= 3.0.0 =
Major update with Tag Generator v2 support and enhanced features. Recommended for all users.

== Premium Features ==

**Upgrade to Pro for Advanced Features:**

- 🎯 **Multiple Upload Buttons** - Add multiple file upload fields in the same form
- 📊 **File Limits** - Set minimum and maximum file count limits
- 🎨 **Custom Positioning** - Change the location of the file list display
- 🗑️ **Individual File Removal** - Remove files one by one even when selected together
- 🚀 **Priority Support** - Get faster response times and dedicated support
- 🔧 **Advanced Customization** - More styling and configuration options

[Get Pro Version Now](https://1.envato.market/9W6qL4)


**Need Help?**

- 📧 **Email Support**: Contact us through the WordPress.org support forums
- 🐛 **Bug Reports**: Report issues on our GitHub repository
- 💡 **Feature Requests**: Suggest new features via our support channels


== Privacy Policy ==

This plugin does not collect, store, or transmit any personal data. All file uploads are handled locally on your server and are not sent to any third-party services. Files are temporarily stored during form submission and are automatically cleaned up after processing.

== Credits ==

Developed by [Zluck Solutions](https://profiles.wordpress.org/zluck) with ❤️ for the WordPress community.

== Donate ==

If you find this plugin helpful, please consider [buying us a coffee](https://www.buymeacoffee.com/zluck) to support continued development and maintenance.

