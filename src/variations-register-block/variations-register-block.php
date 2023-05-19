<?php

/**
 * Register the block
 */ 

add_action( 'init', 'myprefix_variations_register_block' );

function myprefix_variations_register_block(){
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__ );
}