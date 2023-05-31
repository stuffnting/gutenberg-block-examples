<?php

/******************************************************************************
 * 
 * Callback to render the child
 * 
 *****************************************************************************/

function myprefix_inner_blocks_context_child( $attributes, $content, $block ) {
  $my_number = array_key_exists( 'myprefix/myNumber', $block->context ) 
    ?  $block->context['myprefix/myNumber'] 
    : "No number";

    $wrapper_attributes = get_block_wrapper_attributes();

  return sprintf('<div %1$s><p>My Number Is (from child\'s render_callback): %2$s</p><p> %3$s</p></div>',
    $wrapper_attributes,
    $my_number,
    $content
   );
}

/******************************************************************************
 * 
 * Register the parent and child blocks
 * 
 *****************************************************************************/

add_action( 'init', 'myprefix_inner_blocks_context' );

function myprefix_inner_blocks_context() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__ . '/inner-blocks-context-parent.block.json' );

  register_block_type( __DIR__ . '/inner-blocks-context-child.block.json', array(
    'render_callback' => 'myprefix_inner_blocks_context_child',
  ));
}

/**
 * Old way of registering blocks that use context, before block.json
 * the recommended method of registering blocks.
 * 
 * Note, the init hook should be used.
 */
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