<?php

if( ! class_exists('EssentialBlocks\Dependencies\WPNotice\Utils\Base') ) {
    require_once __DIR__ . DIRECTORY_SEPARATOR . 'Utils/Base.php';
}
if( ! class_exists('EssentialBlocks\Dependencies\WPNotice\Utils\Helper') ) {
    require_once __DIR__ . DIRECTORY_SEPARATOR . 'Utils/Helper.php';
}
if( ! class_exists('EssentialBlocks\Dependencies\WPNotice\Utils\Storage') ) {
    require_once __DIR__ . DIRECTORY_SEPARATOR . 'Utils/Storage.php';
}
if( ! class_exists('EssentialBlocks\Dependencies\WPNotice\Dismiss') ) {
    require_once __DIR__ . DIRECTORY_SEPARATOR . 'Dismiss.php';
}
if( ! class_exists('EssentialBlocks\Dependencies\WPNotice\Notice') ) {
    require_once __DIR__ . DIRECTORY_SEPARATOR . 'Notice.php';
}
if( ! class_exists('EssentialBlocks\Dependencies\WPNotice\Notices') ) {
    require_once __DIR__ . DIRECTORY_SEPARATOR . 'Notices.php';
}
