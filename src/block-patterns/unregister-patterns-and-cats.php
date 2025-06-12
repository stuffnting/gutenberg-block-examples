<?php

/******************************************************************************
 * 
 * Unregister patterns and pattern categories
 * 
 ******************************************************************************/

add_action('init', 'myprefix_unregister_block_patterns');

function myprefix_unregister_block_patterns() {

  // Don't let this code break versions of WP < 5.5
  if (!class_exists('WP_Block_Patterns_Registry')) {
    return;
  }

  $patterns_instance = WP_Block_Patterns_Registry::get_instance();

  // Unregister some core patterns
  if ($patterns_instance->is_registered('core/query-medium-posts')) {
    unregister_block_pattern('core/query-medium-posts');
  }

  if ($patterns_instance->is_registered('core/query-small-posts')) {
    unregister_block_pattern('core/query-small-posts');
  }

  if ($patterns_instance->is_registered('core/query-grid-posts')) {
    unregister_block_pattern('core/query-grid-posts');
  }

  // Unregister a whole core category
  $categories_instance = WP_Block_Pattern_Categories_Registry::get_instance();

  if ($categories_instance->is_registered('text')) {
    unregister_block_pattern_category('text');
  }
}
