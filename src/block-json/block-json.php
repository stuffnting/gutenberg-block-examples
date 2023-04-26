<?php

add_action( 'init', 'myprefix_block_json' );

function myprefix_block_json() {
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }
  
  // Register the black type with the default name of block.JSON file.
  register_block_type( __DIR__ );

  // Register the block type with a JSON file not named block.json
  register_block_type( __DIR__ . "/another-block-json.block.json" );
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
 * @param array   $metadata Metadata for registering a block type.
 */

 add_filter( 'block_type_metadata', 'myprefix_filter_metadata' );

 function myprefix_filter_metadata( $metadata ) {
 
   if ( $metadata['name'] !== "myprefix/block-json" ) {
     return $metadata;
   }
 
   myprefix_print_metadata_to_console( $metadata, 'block_type_metadata' );
 
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

add_filter( 'block_type_metadata_settings', 'myprefix_filter_metadata_settings', 10, 2 );

function myprefix_filter_metadata_settings( $settings, $metadata ) {
  if ( $metadata['name'] !== "myprefix/block-json" ) {
    return $settings;
  }

  myprefix_print_metadata_to_console( $metadata, 'block_type_metadata_settings' );

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
function myprefix_print_metadata_to_console( $metadata, $filter_name ) {

  $myprefix_print_to_console = function() use ( $metadata, $filter_name ) {

    $string =  print_r( $metadata, true );
    echo '<script>';
    echo "console.log( '*****$filter_name*****' );";
    echo 'console.log( `'. addslashes( $string ) . '` );';
    echo '</script>';
  
  };

  add_action( 'wp_print_footer_scripts', $myprefix_print_to_console );
  add_action( 'admin_footer', $myprefix_print_to_console );

}



