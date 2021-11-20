<?php

if ( ! function_exists( 'register_block_type' ) ) {
  // Gutenberg is not active.
  return;
}

add_action( 'init', 'myprefix_block_json_block' );

function myprefix_block_json_block() {
  wp_register_script( 
    'myprefix-block-json-block-script', // This handle used in block.json to identify main block script
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  );

  register_block_type( __DIR__ );
}

/**
 * block_type_metadata_settings filter
 * 
 * @param array   $settings   Array of determined settings for registering a block type.
 * @param array   $metadata   Metadata provided for registering a block type.
 */
// add_filter( 'block_type_metadata_settings', 'filter_metadata_registration', 10, 2 );

function filter_metadata_registration( $settings, $metadata ) {
	echo "<p>Settings</p>";
  echo "<pre>";
  print_r($settings);
  echo "</pre>";
	echo "<p>Metadata</p>";
  echo "<pre>";
  print_r($metadata);
  echo "</pre>";
  echo "<p>##########################################</p>";
	return $settings;
};