<?php

/**
 * Code for laying out a simple dynamic block that contains the 3 latest posts,
 * as well as the inner blocks ($content)
 */
function myprefix_dynamic_block_inner_blocks_cb( $attributes, $content ) {

  $recent_posts = wp_get_recent_posts( array(
      'numberposts' => 3,
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

add_action( 'init', 'myprefix_enqueue_dynamic_block_inner_blocks_editor_assets' );

function myprefix_enqueue_dynamic_block_inner_blocks_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
      // Gutenberg is not active.
      return;
  }

  // Your Gutenberg Block JS code
  wp_register_script( 
    'myprefix-dynamic-block-inner-blocks-script', 
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  );

  // Register the call_back for rendering on the front end
  register_block_type( 'myprefix/dynamic-block-inner-blocks', array(
    'apiVersion' => 2,    
    'editor_script'   => 'myprefix-dynamic-block-inner-blocks-script',
    'render_callback' => 'myprefix_dynamic_block_inner_blocks_cb'        
  ) );
}
