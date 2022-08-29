<?php

add_action( 'enqueue_block_editor_assets', 'myprefix_block_collection' );

function myprefix_block_collection() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix-block-collection-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 
}


/**
 * Filter block categories.
 */
//add_filter("block_categories_all", "myprefix_inserter_order", 99, 2);

function myprefix_inserter_order($block_categories, $block_editor_context) {
  echo "<pre>";
  print_r($block_categories);
  echo "</pre>";

  return $block_categories;
}