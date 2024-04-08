<?php

/******************************************************************************
 * 
 * Register the block
 * 
 ******************************************************************************/

add_action( 'init', 'myprefix_block_lock_editor_mode_block' );

function myprefix_block_lock_editor_mode_block() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__ );
}