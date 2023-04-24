<?php

add_action( 'init', 'myprefix_dynamic_attribute' );

function myprefix_dynamic_attribute() {
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_dynamic_attribute_cb'        
  ) );
}


/**
 * The second parameter will not be used, because there are no inner-blocks, therefore, there is no content.
 */
function myprefix_dynamic_attribute_cb( $attributes, $content, $block_object ) {
  
  $out = "<h2>{$attributes['content']}</h2>";
  
  /**
   * Get the class, style and id attributes for the block currently being rendered.
   * @link https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/
   */
  $wrapper_attributes = get_block_wrapper_attributes();

  return sprintf( '<div %1$s>%2$s</div>',
          $wrapper_attributes,
          $out
        );
}