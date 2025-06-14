<?php

/******************************************************************************
 * 
 * Register the block - OLD
 * 
 *****************************************************************************/

add_action('init', 'myprefix_richtext_split_merge_OLD');

function myprefix_richtext_split_merge_OLD() {

  if (! function_exists('register_block_type')) {
    // Gutenberg is not active.
    return;
  }

  register_block_type(__DIR__);
}
