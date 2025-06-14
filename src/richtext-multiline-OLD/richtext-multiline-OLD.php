<?php

/******************************************************************************
 * 
 * Register the block
 * 
 *****************************************************************************/

add_action('init', 'myprefix_richtext_multiline_OLD');

function myprefix_richtext_multiline_OLD() {

  if (! function_exists('register_block_type')) {
    // Gutenberg is not active.
    return;
  }

  register_block_type(__DIR__);
}
