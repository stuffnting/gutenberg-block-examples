<?php

add_action( 'init', 'myprefix_enqueue_variations_register_blocks_assets' );

function myprefix_enqueue_variations_register_blocks_assets(){
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  // Your Gutenberg Block JS code
  wp_register_script( 
    'myprefix-variations-register-blocks-script', 
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  );

  wp_register_style(
    'myprefix-variations-existing-blocks-style',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/styles.css',
    array( 'wp-edit-blocks' ),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/styles.css' )
  );

  register_block_type( 'myprefix/variations-register-blocks', array(
    'apiVersion' => 2,
    'editor_script' => 'myprefix-variations-register-blocks-script', // Editor only
    'style' => 'myprefix-variations-register-blocks-style', // Editor and frontend
  ) );
}