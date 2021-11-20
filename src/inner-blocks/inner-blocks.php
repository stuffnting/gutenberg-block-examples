<?php

add_action( 'init', 'myprefix_inner_blocks' );

function myprefix_inner_blocks() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_register_script(
    'myprefix-inner-blocks-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 

  register_block_type( __DIR__ );
}


