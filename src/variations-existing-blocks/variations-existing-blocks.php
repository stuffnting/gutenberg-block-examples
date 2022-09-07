<?php

/**
 * Only enqueue the index.js in the editor.
 */
add_action( 'enqueue_block_editor_assets', 'myprefix_variations_existing_blocks_editor' );

function myprefix_variations_existing_blocks_editor() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not activemy.
    return;
  }

  wp_enqueue_script( 
    'myprefix-variations-existing-blocks-script', 
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array( 'wp-block-editor', 'wp-blocks', 'wp-element', 'wp-i18n' ),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
  );
}

/**
 * Enqueue the stylesheet
 */
add_action( 'init', 'myprefix_variations_existing_blocks' );

function myprefix_variations_existing_blocks() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_style(
    'myprefix-variations-existing-blocks-style',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/style.css',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/style.css' )
  );
}