<?php

/******************************************************************************
 * 
 * Register the blocks
 * 
 *****************************************************************************/

add_action('init', 'myprefix_block_json');

function myprefix_block_json() {
  if (! function_exists('register_block_type')) {
    // Gutenberg is not active.
    return;
  }

  register_block_type(__DIR__ . '/block-json-test-block');
  register_block_type(__DIR__ . '/block-json-another-block');
}

/******************************************************************************
 * 
 * Explore the metadata using filters
 * 
 *****************************************************************************/

/**
 * block_type_metadata filter
 * 
 * This filter is applied before the JSON block metadata has been parsed into PHP.
 * 
 * @param array $metadata Metadata for registering a block type.
 */

add_filter('block_type_metadata', 'myprefix_filter_metadata');

function myprefix_filter_metadata($metadata) {

  if ($metadata['name'] !== "myprefix/block-json-test-block") {
    return $metadata;
  }

  // Declared below
  myprefix_print_metadata_to_console($metadata, 'block_type_metadata');

  return $metadata;
};

/**
 * block_type_metadata_settings filter
 * 
 * This filter is applied after the JSON block metadata has been parsed into PHP.
 * 
 * @param array   $settings   Array of determined settings for registering a block type.
 * @param array   $metadata   Metadata provided for registering a block type.
 */

add_filter('block_type_metadata_settings', 'myprefix_filter_metadata_settings', 10, 2);

function myprefix_filter_metadata_settings($settings, $metadata) {
  if ($metadata['name'] !== "myprefix/block-json-test-block") {
    return $settings;
  }

  // Declared below
  myprefix_print_metadata_to_console($metadata, 'block_type_metadata_settings');

  return $settings;
};

/**
 * Log a filter parameters to the browser console.
 * 
 * ***NOTE*** This function needs PHP 7+.
 * 
 * @param array $metadata Block metadata supplied to the filter.
 * @param string $filter_name The filter name. 
 */
function myprefix_print_metadata_to_console($metadata, $filter_name) {

  $myprefix_print_to_console = function () use ($metadata, $filter_name) {

    $string =  print_r($metadata, true);
    echo '<script>';
    echo "console.log( '*****$filter_name*****' );";
    echo 'console.log( `' . addslashes($string) . '` );';
    echo '</script>';
  };

  add_action('wp_print_footer_scripts', $myprefix_print_to_console);
  add_action('admin_footer', $myprefix_print_to_console);
}
