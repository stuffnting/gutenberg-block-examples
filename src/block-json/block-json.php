<?php

if ( ! function_exists( 'register_block_type' ) ) {
  // Gutenberg is not active.
  return;
}

add_action( 'init', 'myprefix_block_json' );

function myprefix_block_json() {
  register_block_type( __DIR__ . "/named.json" );
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