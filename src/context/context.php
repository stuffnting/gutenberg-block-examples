<?php

/**
 * The init action hook must be used when adding a render callback function,
 * Using enqueue_block_editor_assets will not work.
 */
add_action( 'init', 'myprefix_context' );

function myprefix_context() {

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
    'api_version'       => 2,  
    'editor_script'     => 'myprefix-context-script',
    'provides_context'  => ['myprefix/myNumber' => 'myNumber'],
  ));

  register_block_type( 'myprefix/context-child', array(
    'api_version'     => 2,  
    'editor_script'   => 'myprefix-context-script',
    'uses_context'    => ['myprefix/myNumber'],
    'render_callback' => function( $attributes, $content, $block ) {
      $my_number = array_key_exists( 'myprefix/myNumber', $block->context ) 
        ?  $block->context['myprefix/myNumber'] 
        : "No number";
      return "<p>My Number Is (from render_callback): $my_number</p>";
    },
  ));
}