<?php

/******************************************************************************
 * 
 * List registered patterns and pattern categories
 *
 * ***NOTE*** Needs PHP 7+
 * 
 ******************************************************************************/

add_filter('wp_loaded', 'myprefix_list_block_patterns');

function myprefix_list_block_patterns() {
  // Don't let this code break versions of WP < 5.5
  if (!class_exists('WP_Block_Patterns_Registry')) {
    return;
  }

  $pattern_array = WP_Block_Patterns_Registry::get_instance()->get_all_registered();

  $pattern_list = [];

  foreach ($pattern_array as $pattern) {
    $pattern_list[] = $pattern['name'];
  }

  $pattern_cats_array = WP_Block_Pattern_Categories_Registry::get_instance()->get_all_registered();

  $pattern_cats_list = [];

  foreach ($pattern_cats_array as $cat) {
    $pattern_cats_list[] = $cat['name'];
  }

  myprefix_print_patterns_to_console($pattern_list, "Pattern List");
  myprefix_print_patterns_to_console($pattern_cats_list, "Pattern Cats List");
}

/**
 * Log a filter parameters to the browser console.
 * 
 * ***NOTE*** This function needs PHP 7+.
 * 
 * @param array $list A list of registered patterns or pattern categories.
 * @param string $list_name The list name. 
 */
function myprefix_print_patterns_to_console($list, $list_name) {

  $myprefix_print_to_console = function () use ($list, $list_name) {

    $string =  print_r($list, true);
    echo '<script>';
    echo "console.log( '*****$list_name*****' );";
    echo 'console.log( `' . addslashes($string) . '` );';
    echo '</script>';
  };

  add_action('wp_print_footer_scripts', $myprefix_print_to_console);
  add_action('admin_footer', $myprefix_print_to_console);
}
