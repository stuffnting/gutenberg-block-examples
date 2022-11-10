<?php

/**
 * Code for laying out a simple dynamic block that contains the 3 latest posts,
 * as well as the inner blocks ($content)
 */
function myprefix_dynamic_inner_blocks_cb( $attributes, $content ) {

  $recent_posts = wp_get_recent_posts( array(
      'numberposts' => 5,
      'post_status' => 'publish',
  ) );

  if ( count( $recent_posts ) === 0 ) {
      return 'No posts';
  }

  $out = '<h2 class="has-text-align-center">Dynamic with inner blocks</h2>';

  foreach ( $recent_posts as $a_post ) {
    $out .= sprintf( '<p class="has-text-align-center"><a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a></p>',
      esc_url( get_permalink( $a_post['ID'] ) ),
      esc_html( get_the_title( $a_post['ID'] ) )
    );
  }

  return "<div class='my-dynamic-block'>$out \n $content</div>";
}

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
