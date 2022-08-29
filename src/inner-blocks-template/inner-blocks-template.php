<?php

add_action( 'init', 'myprefix_inner_blocks_template' );

function myprefix_inner_blocks_template() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__ );
}