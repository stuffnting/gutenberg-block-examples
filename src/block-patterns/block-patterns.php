<?php

include_once 'register-patterns-and-cats.php';
include_once 'unregister-patterns-and-cats.php';
include_once 'custom-post-type.php';
include_once 'log-patterns-and-cats.php';
include_once 'template-for-pages.php';
include_once 'limit-block-lock-assess.php';

/******************************************************************************
 * 
 * Enable/disable the core block patterns.
 * 
 * This still leaves patterns registered by themes and plugins.
 * 
 ******************************************************************************/

add_action('after_setup_theme', 'myprefix_block_patterns_setup');

function myprefix_block_patterns_setup() {
  if (!current_theme_supports('core-block-patterns')) {
    add_theme_support('core-block-patterns');
  }
  if (current_theme_supports('core-block-patterns')) {
    // remove_theme_support('core-block-patterns');
  }
}


/******************************************************************************
 * 
 * Disable the Page Construction Pattern modal by removing core/post-content
 * from all patterns registered by the theme and plugins. There are no core
 * patterns that use core/post-content.
 * 
 ******************************************************************************/

//add_action('init', 'myprefix_disable_page_constructor_modal', 99);

function myprefix_disable_page_constructor_modal() {
  $patterns = WP_Block_Patterns_Registry::get_instance()->get_all_registered();
  foreach ($patterns as $pattern) {
    if (
      ! empty($pattern['blockTypes']) &&
      in_array('core/post-content', $pattern['blockTypes'])
    ) {
      unregister_block_pattern($pattern['name']);
      $pattern['blockTypes'] = array_diff($pattern['blockTypes'], array('core/post-content'));
      register_block_pattern($pattern['name'], $pattern);
    }
  }
}
