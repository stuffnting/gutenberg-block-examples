<?php

if ( ! function_exists( 'register_block_type' ) ) {
  // Gutenberg is not active.
  return;
}

add_action( 'init', 'myprefix_enqueue_block_json_block_assets' );

function myprefix_enqueue_block_json_block_assets() {
  wp_register_script( 
    'myprefix-block-json-block-script', // This handle used in block.json to identify main block script
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  );

  register_block_type( __DIR__ );
}


//add_filter( 'block_type_metadata_settings', 'filter_metadata_registration', 10, 2 );

function filter_metadata_registration( $settings, $metadata ) {
	echo "<pre>";
  print_r($settings);
  print_r($metadata);
  echo "</pre>";
	return $settings;
};