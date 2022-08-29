<?php

add_action( 'init', 'myprefix_richtext_text_align' );

function myprefix_richtext_text_align() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__ );
}