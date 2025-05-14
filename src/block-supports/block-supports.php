<?php

/******************************************************************************
 * 
 * Register the block type
 * 
 *****************************************************************************/

add_action('init', 'myprefix_block_supports');

function myprefix_block_supports() {

  if (! function_exists('register_block_type')) {
    // Gutenberg is not active.
    return;
  }
  register_block_type(__DIR__ . '/supports-single-blocks');
  register_block_type(__DIR__ . '/supports-inner-blocks');
}

/******************************************************************************
 * 
 * Add support to test `supports` attribute of registerBlockType
 * 
 * Line-height support added in in WP 5.6
 * 
 *****************************************************************************/

//add_action( 'after_setup_theme', 'myprefix_block_supports_extra_theme_setup' );

function myprefix_block_supports_extra_theme_setup() {
  add_theme_support('custom-line-height');
  add_theme_support('custom-spacing');
  add_theme_support('editor-font-sizes');
}

/******************************************************************************
 * 
 * Styles for testing
 * 
 *****************************************************************************/

add_action('init', 'myprefix_add_block_supports_styles');

function myprefix_add_block_supports_styles() {
  // Use inline style
  register_block_style(
    'myprefix/supports-single-blocks',
    array(
      'name'         => 'dodgerblue', // Adds class name .is-style-dodgerblue
      'label'        => __('Dodger Blue', 'textDomain'),
      'inline_style' => '.is-style-dodgerblue { color: dodgerblue; }'
    )
  );

  // This will be removed with PHP below
  register_block_style(
    'myprefix/supports-single-blocks',
    array(
      'name'         => 'pink',  // Adds class name is-style-pink
      'label'        => __('Pink', 'textDomain'),
      'inline_style' => '.is-style-pink { color: pink; }'
    )
  );
}
