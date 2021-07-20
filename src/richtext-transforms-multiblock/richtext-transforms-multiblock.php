<?php

add_action( 'enqueue_block_editor_assets', 'myprefix_enqueue_richtext_transforms_multiblock_editor_assets' );

function myprefix_enqueue_richtext_transforms_multiblock_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix-richtext-transforms-multiblock-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 
}