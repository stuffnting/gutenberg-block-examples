<?php

/******************************************************************************
 * 
 * Callback function
 * 
 * This used attributes saved from the Block Inspector. However, since there
 * are no inner blocks, the $content parameter is not used.
 * 
 *****************************************************************************/
function myprefix_dynamic_inspector_controls_cb( $attributes, $content, $block_object ) {

  $recent_posts = wp_get_recent_posts( array(
      'numberposts' => 5,
      'post_status' => 'publish',
  ) );

  if ( count( $recent_posts ) === 0 ) {
      return 'No posts';
  }

  // Make a string for the style HTML attribute
  $style = sprintf( 'text-decoration: %1$s; font-family: %2$s;',
    isset( $attributes['underline'] ) ? 'underline' : 'none',
    isset( $attributes['font'] ) ? esc_attr( $attributes['font'] ) : 'inherit'
  );

  // Show the title, or not.
  $out = isset( $attributes['showTitle'] ) 
    ? "<h2 style='$style'>{$attributes['title']}</h2>" 
    :  '';

  foreach ( $recent_posts as $a_post ) {
    $out .= sprintf( '<p><a href="%1$s">%2$s</a></p>',
      isset( $a_post['ID'] ) ? esc_url( get_permalink( $a_post['ID'] ) ) : '',
      isset( $a_post['ID'] ) ? esc_html( get_the_title( $a_post['ID'] ) ) : ''
    );
  }

  /**
   * Get the class, style and id attributes for the block currently being rendered,
   * and add in the extra style from the custom attributes for underline and font-family.
   * @link https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/
   */
  $wrapper_attributes = get_block_wrapper_attributes( array( "style" => $style ) );

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
add_action( 'init', 'myprefix_dynamic_inspector_controls' );

function myprefix_dynamic_inspector_controls() {

  if ( ! function_exists( 'register_block_type' ) ) {
      // Gutenberg is not active.
      return;
  }

  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_dynamic_inspector_controls_cb',  
  ) );
}
