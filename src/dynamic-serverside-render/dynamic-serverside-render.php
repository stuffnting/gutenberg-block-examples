<?php

/**
 * Code for laying out a simple dynamic block that contains the 3 latest posts.
 */
function myprefix_dynamic_serverside_render_cb( $attributes, $content ) {

  $recent_posts = wp_get_recent_posts( array(
      'numberposts' => 3,
      'post_status' => 'publish',
  ) );

  if ( count( $recent_posts ) === 0 ) {
      return 'No posts';
  }

  $out = '<h2 class="has-text-align-center">Server Side Rendering</h2>';

  foreach ( $recent_posts as $a_post ) {
    $out .= sprintf( '<p class="has-text-align-center"><a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a></p>',
      esc_url( get_permalink( $a_post['ID'] ) ),
      esc_html( get_the_title( $a_post['ID'] ) )
    );
  }

  $extra_class = isset( $attributes['className'] ) ? " {$attributes['className']}" : '';

  return "<div class='my-dynamic-block{$extra_class}'>$out</div>";
}

add_action( 'init', 'myprefix_dynamic_serverside_render' );

function myprefix_dynamic_serverside_render() {

  if ( ! function_exists( 'register_block_type' ) ) {
      // Gutenberg is not active.
      return;
  }

  // Register the call_back for rendering on the front end
  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_dynamic_serverside_render_cb'        
  ) );
}
