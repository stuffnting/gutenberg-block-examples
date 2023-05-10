<?php

/******************************************************************************
 * 
 * Callback function
 * 
 * Code for laying out a simple dynamic block that contains the 3 latest posts,
 * as well as the inner blocks ($content)
 * 
 *****************************************************************************/
function myprefix_dynamic_inner_blocks_cb( $attributes, $content ) {
  snt_dump($content);
  $recent_posts = wp_get_recent_posts( array(
      'numberposts' => 5,
      'post_status' => 'publish',
  ) );

  if ( count( $recent_posts ) === 0 ) {
      return 'No posts';
  }

  $out = '<h2>Dynamic with inner blocks</h2>';
  $out .= '<ul>';
  
  foreach ( $recent_posts as $a_post ) {
    $out .= sprintf( '<li><a href="%1$s">%2$s</a></li>',
    esc_url( get_permalink( $a_post['ID'] ) ),
    esc_html( get_the_title( $a_post['ID'] ) )
  );
}

$out .= '</ul>';

  /**
   * Get the class, style and id attributes for the block currently being rendered.
   * In this case, the outer block.
   * @see {@link https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/}
   */
  $wrapper_attributes = get_block_wrapper_attributes();

  return sprintf( '<div %1$s>%2$s %3$s %4$s</div>',
          $wrapper_attributes,
          $out,
          "\n",
          $content
        );
}

/******************************************************************************
 * 
 * Register the block
 * 
 *****************************************************************************/

add_action( 'init', 'myprefix_dynamic_inner_blocks' );

function myprefix_dynamic_inner_blocks() {

  if ( ! function_exists( 'register_block_type' ) ) {
      // Gutenberg is not active.
      return;
  }

  // Register the call_back for rendering on the front end
  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_dynamic_inner_blocks_cb'        
  ) );
}
