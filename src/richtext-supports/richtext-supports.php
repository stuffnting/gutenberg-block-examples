<?php

add_action( 'enqueue_block_editor_assets', 'myprefix_enqueue_richtext_supports_editor_assets' );

function myprefix_enqueue_richtext_supports_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix-richtext-supports-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 
}


/**
 * Add support to test `supports` attribute of registerBlockType
 * 
 * Line-height support added in in WP 5.6
 * 
 */
add_action( 'after_setup_theme', 'myprefix_extra_theme_setup' );

function myprefix_extra_theme_setup() {
  add_theme_support( 'custom-line-height' );
}