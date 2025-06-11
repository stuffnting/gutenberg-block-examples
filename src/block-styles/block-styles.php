<?php

/*****************************************************************************
 * 
 * Register the test block.
 * 
 * We don't need to register the styles JS because it all ends up in index.js
 * 
 ****************************************************************************/

add_action('init', 'myprefix_block_styles');

function myprefix_block_styles() {
  if (! function_exists('register_block_type')) {
    // Gutenberg is not active.
    return;
  }

  // Register the block type to test styles.
  register_block_type(__DIR__ . "/block-styles-test-block.block.json");
}

/*****************************************************************************
 * 
 * Enqueue the block stylesheets for the core/paragraph block, to which the
 * new block styles have been added. These styles will be added inline on pages
 * where the core/paragraph block is used.
 * 
 ****************************************************************************/

add_action('init', 'myprefix_add_block_stylesheet');

function myprefix_add_block_stylesheet() {

  wp_enqueue_block_style('core/paragraph', array(
    'handle' => 'myprefix-block-styles',
    'src'    => MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename(__DIR__) . '/style.css',
    'path'   => MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename(__DIR__) . '/style.css'
  ));
}

/******************************************************************************
 * 
 * Register block styles. More styles are registered in the JS file.
 * 
 *****************************************************************************/

add_action('init', 'myprefix_add_block_register_styles');

function myprefix_add_block_register_styles() {
  // Use stylesheet registered above
  register_block_style(
    'core/paragraph',
    array(
      'name'  => 'firebrick', // Adds class name .is-style-firebrick
      'label' => __('Fire Brick Red', 'textDomain'),
      'style_handle' => 'myprefix-block-styles-style'
    )
  );

  // Use inline style
  register_block_style(
    'core/paragraph',
    array(
      'name'         => 'dodgerblue', // Adds class name .is-style-dodgerblue
      'label'        => __('Dodger Blue', 'textDomain'),
      'inline_style' => '.is-style-dodgerblue{ color: dodgerblue; }'
    )
  );

  // This will be removed with PHP below
  register_block_style(
    'core/paragraph',
    array(
      'name'         => 'remove-pink',  // Adds class name is-style-remove-pink
      'label'        => __('Removed with php', 'textDomain'),
      'inline_style' => '.is-style-remove-pink{ color: pink; }'
    )
  );

  // This will be removed with JS
  register_block_style(
    'core/paragraph',
    array(
      'name'         => 'remove-gold', // Adds class name is-style-remove-gold
      'label'        => __('Removed with JS', 'textDomain'),
      'inline_style' => '.is-style-remove-gold{ color: gold; }'
    )
  );
}

/******************************************************************************
 * 
 * Unregister block styles.
 * 
 *****************************************************************************/

add_action('wp_loaded', 'myprefix_unregister_block_styles', 99);

function myprefix_unregister_block_styles() {
  // This one registered above
  unregister_block_style('core/paragraph', 'remove-pink');
}
