<?php

/**
 * The init action hook must be used when adding a render callback function,
 * Using enqueue_block_editor_assets will not work.
 */
add_action( 'init', 'myprefix_enqueue_context_editor_assets' );

function myprefix_enqueue_context_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_register_script(
    'myprefix-context-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 

  register_block_type( 'myprefix/context-parent', array(
    'api_version' => 2,  
    'editor_script'   => 'myprefix-context-script',
  ));

  register_block_type( 'myprefix/context-child', array(
    'api_version' => 2,  
    'editor_script'   => 'myprefix-context-script',
    'render_callback' => function( $attributes, $content, $block ) {
      echo "<pre>";
      print_r($block);
      echo "</pre>";
      return '<p>The current record ID is: ' . $block->context['myprefix/myNumber'] . '</p>';
    },
  ));
}