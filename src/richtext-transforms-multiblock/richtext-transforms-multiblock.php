<?php

add_action( 'init', 'myprefix_richtext_transforms_multiblock' );

function myprefix_richtext_transforms_multiblock() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__ );
  
}