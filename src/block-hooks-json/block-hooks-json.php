<?php

require_once('block-pattern.php');

/******************************************************************************
 * 
 * Callback function
 * 
 *****************************************************************************/
function myprefix_block_hooks_json_cb( $attributes, $content, $block_object ) {
  $wrapper_attributes = get_block_wrapper_attributes();
  $out = '<h2>Added by the hook via JSON CB!</h2>';

  return sprintf( '<div %1$s>%2$s</div>',
    $wrapper_attributes,
    $out
  );
}

/******************************************************************************
 * 
 * Register the block
 * 
 *****************************************************************************/

add_action( 'init', 'myprefix_block_hooks_json' );

function myprefix_block_hooks_json() {

  if ( ! function_exists( 'register_block_type' ) ) {
      // Gutenberg is not active.
      return;
  }

  // Register the call_back for rendering on the front end
  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_block_hooks_json_cb'        
  ) );
}
