<?php

/******************************************************************************
 * 
 * Register the block
 * 
 ******************************************************************************/

add_action('init', 'myprefix_test_two_blocks');

function myprefix_test_two_blocks() {

  if (! function_exists('register_block_type')) {
    // Gutenberg is not active.
    return;
  }

  register_block_type(__DIR__ . '/block-one');
  register_block_type(__DIR__ . '/block-two');
}
