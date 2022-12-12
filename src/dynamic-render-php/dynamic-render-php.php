<?php

add_action( 'init', 'myprefix_dynamic_render_php' );

function myprefix_dynamic_render_php() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__ );
}
