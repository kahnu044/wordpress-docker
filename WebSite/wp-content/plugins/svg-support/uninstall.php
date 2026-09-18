<?php if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

$bodhi_options_on_deletion = get_option( 'bodhi_svgs_settings' );

if ( isset($bodhi_options_on_deletion[ 'del_plugin_data' ]) && $bodhi_options_on_deletion[ 'del_plugin_data' ] === 'on' ) {
    // Delete plugin options
    delete_option( 'bodhi_svgs_plugin_version' );
    delete_option( 'bodhi_svgs_settings' );
    
    // Delete all post meta related to SVG Support
    global $wpdb;
    // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.SlowDBQuery.slow_db_query_meta_key -- One-off cleanup on uninstall; object caching is irrelevant here and there is no core API for bulk meta deletion by key.
    $wpdb->delete($wpdb->postmeta, array('meta_key' => 'inline_featured_image'));
}