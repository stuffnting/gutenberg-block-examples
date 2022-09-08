<?php
/**
 * 
 */

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

  register_block_type( __DIR__ );

  register_block_type( __DIR__ . '/context-json-child.block.json', array(
    'render_callback' => function( $attributes, $content, $block ) {
      $my_number = array_key_exists( 'myprefix/myNumber', $block->context ) 
        ?  $block->context['myprefix/myNumber'] 
        : "No number";
      return "<p>My Number Is (from render_callback): $my_number</p>";
    },
  ));
}
/* 
register_block_type( './context-parent.json', array(
  'api_version'       => 2,  
  'editor_script'     => 'myprefix-context-script',
  'provides_context'  => ['myprefix/myNumber' => 'myNumber'],
));

register_block_type( './context-child.json', array(
  'api_version'     => 2,  
  'editor_script'   => 'myprefix-context-script',
  'uses_context'    => ['myprefix/myNumber'],
  'render_callback' => function( $attributes, $content, $block ) {
    $my_number = array_key_exists( 'myprefix/myNumber', $block->context ) 
      ?  $block->context['myprefix/myNumber'] 
      : "No number";
    return "<p>My Number Is (from render_callback): $my_number</p>";
  },
)); */