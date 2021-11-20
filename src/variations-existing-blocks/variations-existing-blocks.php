<?php

add_action( 'init', 'myprefix_variations_existing_blocks' );

function myprefix_variations_existing_blocks() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_register_script( 
    'myprefix-variations-existing-blocks-script', 
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  );

  wp_register_style(
    'myprefix-variations-existing-blocks-style',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/styles.css',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/styles.css' )
  );

  /* 
    The myprefix/variations-existing-blocks block is non-existent. 
    This function call is a convenient way to register the script for the editor only, 
    and the stylesheet for the editor and front-end.
  */
  register_block_type( 'myprefix/variations-existing-blocks', array(
    'editor_script' => 'myprefix-variations-existing-blocks-script', // Editor only
    'style' => 'myprefix-variations-existing-blocks-style', // Editor and frontend
  ) );
}