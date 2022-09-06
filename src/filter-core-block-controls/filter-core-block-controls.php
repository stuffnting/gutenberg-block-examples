<?php

add_action( 'enqueue_block_editor_assets', 'myprefix_filter_core_block_controls' );

function myprefix_filter_core_block_controls() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix-filter-core-block-controls-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 
}

add_action( 'enqueue_block_assets', 'myprefix_filter_core_block_controls_styles' );

function myprefix_filter_core_block_controls_styles() {
  wp_enqueue_style(
    'myprefix-filter-core-block-controls-style',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/style.css',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/style.css' ) // *** Dev only
  );
}