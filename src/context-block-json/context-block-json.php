<?php

/**
 * The init action hook must be used when adding a render callback function,
 * Using enqueue_block_editor_assets will not work.
 */
add_action( 'init', 'myprefix_enqueue_context_block_json_editor_assets' );

function myprefix_enqueue_context_block_json_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_register_script(
    'myprefix-context-block-json-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 

  register_block_type( __DIR__ . '/context-parent.json');

  register_block_type( __DIR__ . '/context-child.json', array(
    'render_callback' => function( $attributes, $content, $block ) {
      $my_number = array_key_exists( 'myprefix/myNiceNumber', $block->context ) 
        ?  $block->context['myprefix/myNiceNumber'] 
        : "No number";
      return "<p>The current record ID is: $my_number</p>";
    },
  ));
}