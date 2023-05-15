<?php

/******************************************************************************
 * 
 * Register the block type
 * 
 *****************************************************************************/

add_action( 'init', 'myprefix_richtext_supports' );

function myprefix_richtext_supports() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }
  register_block_type( __DIR__ );
}

/******************************************************************************
 * 
 * Add support to test `supports` attribute of registerBlockType
 * 
 * Line-height support added in in WP 5.6
 * 
 *****************************************************************************/

 //add_action( 'after_setup_theme', 'myprefix_richtext_supports_extra_theme_setup' );

function myprefix_richtext_supports_extra_theme_setup() {
  add_theme_support( 'custom-line-height' );
  add_theme_support('custom-spacing');
  add_theme_support('editor-font-sizes');
}

