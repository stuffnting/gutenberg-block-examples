<?php

add_action( 'init', 'myprefix_richtext_multi_instance' );

function myprefix_richtext_multi_instance() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__ );
}