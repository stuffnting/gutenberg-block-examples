<?php

add_action( 'init', 'myprefix_dynamic_with_save_function' );

function myprefix_dynamic_with_save_function() {

  if ( ! function_exists( 'register_block_type' ) ) {
      // Gutenberg is not active.
      return;
  }

  // Register the call_back for rendering on the front end
  register_block_type( __DIR__);
}