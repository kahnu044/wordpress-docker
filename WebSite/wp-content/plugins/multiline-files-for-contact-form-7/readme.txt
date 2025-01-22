=== Multiline files upload for contact form 7 ===
Contributors: zluck, divyeshk71
Donate link: https://www.buymeacoffee.com/zluck
Tags: contact form, multiple file upload for contact form 7, contact form 7, add multiple files through contact form 7, multiple files send
Requires at least: 5.6
Tested up to: 6.7.1
Requires PHP: 5.6
Stable tag: 3.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Multiline files upload for contact form 7 allows user to attach unlimited files to upload to Contact Form 7 in wordpress website.

== Description ==

Multiline files upload for contact form 7 allows user to attach unlimited files to upload to Contact Form 7 in wordpress website, User can upload unlimited files one by one, selected files will be displayed nicely on the screen. User can even delete the already selected file. Admin can set to send all attached files via email. All files will be combined into one ZIP file. This plugin is configurable. You can change the style of the buttons and files list.

== Installation ==

= Installation via Wordpress plugin installer =

1. Extract the plugin package on your machine that you downloaded from CodeCanyon.
2. Hover over the plugins menu item on your left sidebar in your WordPress admin area and select "Add New".
3. In the new page click on the "Upload" menu item on top of the page.
4. Choose the multiline-files-upload-for-contact-form-7.zip file that you extracted from the downloaded package and click "Install Now".
5. The plugin is now installed, click on the "Activate Plugin" button.
6. Now, you can go to contact form 7 and  configure the plugin.

= Installation via FTP =

1. Extract the plugin package on your machine that you downloaded from CodeCanyon.
2. Find the multiline-files-upload-for-contact-form-7.zip file in the extracted content and extract it also.
3. Open your favourite FTP application and connect and navigate to your "/wp-content/plugins/" folder
4. Copy over the folder extracted from multiline-files-upload-for-contact-form-7.zip file
5. Navigate to your plugins page on your WordPress admin area and click the "Activate" button
6. Now, you can go to contact form 7 and  configure the plugin.

== Features ==

* Receive multiple files via email
* Accept (Documents, Audio, Video, Music, and Others)
* Allow different MIME (File Types) that are not directly accepted by Wordpress
* Frontend upload button to select file easily
* Upload files one by one
* See list of selected files
* Delete any individual file
* Responsive design, uploader works well with Mobile, Tablets, Laptop and Desktop
* Compatible with Latest Wordpress
* Very Easy Installation & Config

== Requirements ==

* [Contact Form 7](https://wordpress.org/plugins/contact-form-7/) Plugin
* ZipArchive() extension enabled on your hosting server
* Wordpress (Ofcourse!)

== How to Use Multiline files upload for contact form 7 ==

1. Go To **Contact form 7** -> Edit your form -> Click **multilinefile** to open one dialog box that contain diffrent types of options (Screenshot 1):
	* File size limit(bytes)- It allows you to add your custom file size in bytes format.
	* Allowed file types - It allows you to define allowed file formats, just add your filetypes code. Seprate them with '|'(pipe) sign when you set multiple file types.
2. Fill dialog box options as per your requirement then click **Insert Tag** button to generate one shortcode. Now place this shortcode where you want to display **Add File** button.(Screenshot 2, Screenshot 3)
3. Once shortcode is inserted you can see **Add File** button in your contact form, refer screenshot below.(4)
4. Now go to the mail panel and copy your **multilinefile** uploading tag and paste into **File Attachements** box and click on save buton. (screenshot 5)
5. Now click on **Add File** button and select your document, audio, video or any type of file. By default, uploaded files list will show up before Add File button. (Screentshot 6)
6. User can delete any selected files by clicking respective X icon beside filename.
7. Once all files are selected, click send to submit the form. Its very easy and quick.
8. If you have configured to receive files, This plugin will send your uploaded files as single ZIP file.

== Premium Features - Premium Plugin ==
* **Can I add two `Add files` button on same page or same form?** - This feature is available in our [premium plugin](https://1.envato.market/9W6qL4)
* **can we set min/max file upload limit?** - This feature is available in our [premium plugin](https://1.envato.market/9W6qL4)
* **How to change location of file list? (Screenshot 7)** - If you want to change location of file list, try our [premium plugin](https://1.envato.market/9W6qL4)
* **How to remove one file if more than one files selected in batch?** - This feature is available in our [premium plugin](https://1.envato.market/9W6qL4)

== How to change style? ==
If you want to change our plugin button or others file listing style and apply your custom style please add your custom css in your theme's css file. Adding style in child theme is recommended. Here I have shown style guide for button and listing. so, you can easily update style of the elements.

1. Buttton style: #mfcf7_zl_add_file { background-color: #004834; }

2. 'X' icon style: .mfcf7_zl_multifilecontainer p .mfcf7_zl_delete_file i { color: azure; }

3. Selected file name style: .mfcf7-zl-multifile-name { color: black; }

== Frequently Asked Questions ==

=  Will it work with other form plugins except from Contact Form 7? = 

No

= I am not getting files attached in email = 

Make sure, you followed instructions to setup attachment in contact form 7 Mail option, refer screenshot 5.

= How can I get seperate files instead of one zip file as attachment? = 

You can not, sorry!

== Screenshots ==

1. how to add multiline field.
2. set various parameters in popup
3. put generated shortcode in contactform, best place to put is before submit button
4. this is how *Add File* Button will appear.
5. set field name in Mail - File attachments field
6. This is how your files list will appear
7. Change placement of files list - Premium Feature

== Changelog ==

= 3.0.0 =
* Implement support for the [Tag Generator v2](https://contactform7.com/2024/11/03/contact-form-7-60/#tag-generator-v2)

= 2.9.1 =
* Fix the undefined variable error when upgrading plugin in WordPress version 6.6.2

= 2.9 =
* Fix the Wordfence security issues. Props to [Tieu Pham Trong Nhan](https://www.wordfence.com/threat-intel/vulnerabilities/researchers/tieu-nhan)

= 2.8.1 =
* Warning fixes 

= 2.8 =
* Added feedbacks popup when deactivate the plugin
* Changes to be compatible with Latest Wordpress

= 2.7 =
* Changes to be compatible with Latest Wordpress
* Minor improvements

= 2.6 =
* Updated banner and style

= 2.5 =
* Added notice and some style

= 2.4 =
* Minor improvements & Bug fixing 

= 2.3 =
* Changes to be compatible with Latest Wordpress
* Minor improvements & Bug fixing

= 2.2 =
* Changes to be compatible with Latest Wordpress
* Minor improvements

= 2.1 =
* Changes to be compatible with Latest Wordpress
* File Type Restriction bug fixed

= 2.0 =
* Changes to be compatible with Contact Form 7 v5.4

= 1.9 =
* Safari Ajax issue fixed,
* If one file is uploaded, it won't be zipped
* Latest Wordpress compatibility checked

= 1.8 =
* Minor warning fix and Latest Wordpress compatibility checked

= 1.7 =
* Safari Compatability issues fixes and UI/UX improvements

= 1.6.3 =
* hot fix for admin notices.

= 1.6.2 =
* hot fix.

= 1.6.1 =
* Bug hot fix.

= 1.6 =
* UI/UX Improvements.

= 1.5 =
* fixed minor bugs about admin notices, safe to update.

= 1.4 =
* Safari 11 on Mac bug fixed, IE and Edge support added

= 1.3 =
* Safari Compatability issues fixes and UI/UX improvements

= 1.2 =
* Bug fixes and UI/UX improvement

= 1.1 =
* Bug fix for older IE browsers
* Added ability to change upload button name

= 1.0 =
* Initial Release
