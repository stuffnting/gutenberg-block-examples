<?php

add_action( 'init', 'myprefix_richtext_custom_toolbar_buttons' );

function myprefix_richtext_custom_toolbar_buttons() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__ );
}