<?php

function myprefix_dynamic_inspector_query_terms_cb( $attributes, $content, $block_object ) {

  $recent_posts = wp_get_recent_posts( array(
      'numberposts' => $attributes['perPage'],
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

add_action( 'init', 'myprefix_dynamic_inspector_query_terms' );

function myprefix_dynamic_inspector_query_terms() {

  if ( ! function_exists( 'register_block_type' ) ) {
      // Gutenberg is not active.
      return;
  }

  // Register the call_back for rendering on the front end
  register_block_type( __dir__, array(
    'render_callback' => 'myprefix_dynamic_inspector_query_terms_cb',
  ) );
}
