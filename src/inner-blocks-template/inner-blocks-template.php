<?php

/******************************************************************************
 * 
 * Register the parent and child blocks.
 * 
 *****************************************************************************/

add_action( 'init', 'myprefix_inner_blocks_template' );

function myprefix_inner_blocks_template() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__ . "/inner-blocks-template-parent.block.json" );
  register_block_type( __DIR__ . "/inner-blocks-template-child.block.json" );

}
