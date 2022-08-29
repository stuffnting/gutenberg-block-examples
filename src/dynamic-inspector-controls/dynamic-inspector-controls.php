<?php

/**
 * Code for laying out a more complex dynamic block.
 * This used attributes saved from the Block Inspector.
 */
function myprefix_dynamic_inspector_controls_cb( $attributes, $content ) {

  $recent_posts = wp_get_recent_posts( array(
      'numberposts' => 3,
      'post_status' => 'publish',
  ) );

  if ( count( $recent_posts ) === 0 ) {
      return 'No posts';
  }

  $style = sprintf( 'text-decoration: %1$s; font-family: %2$s;',
    isset( $attributes['underline'] ) ? 'underline' : 'none',
    isset( $attributes['font'] ) ? esc_attr( $attributes['font'] ) : 'inherit'
  );

  $out = isset( $attributes['showTitle'] ) 
    ? "<h2 style='$style'>{$attributes['title']}</h2>" 
    :  '';

  foreach ( $recent_posts as $a_post ) {
    $out .= sprintf( '<p><a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a></p>',
      isset( $a_post['ID'] ) ? esc_url( get_permalink( $a_post['ID'] ) ) : '',
      isset( $a_post['ID'] ) ? esc_html( get_the_title( $a_post['ID'] ) ) : ''
  );
  }

  $extra_class = isset( $attributes['className'] ) ? " {$attributes['className']}" : '';

  return "<div class='my-dynamic-block{$extra_class}'>$out</div>";
}

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
