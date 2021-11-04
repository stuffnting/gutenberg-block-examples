<?php

function myprefix_dynamic_meta_block_cb( $attributes, $inner_blocks ) {
  // Format the meta values as HTML
  $meta_out = '<h2 style="margin-top: 0">Meta save test with inner blocks</h2>';

  //Get a flattened array
  $meta = array_merge( [], get_post_meta( get_the_ID(), META_FIELD_OBJECT_NAME, true ) );

  $meta_out .= $meta ? sprintf( "<p>Field 1: %s</p>\n<p>Field 2: %s</p>",
    esc_html( $meta['field1'] ?? '' ),
    esc_html( $meta['field2'] ?? '' )
  ) : "";

  /**
   * The block's meta values can not be used in its `save` function,
   * whereas, the block's inner-blocks are included. This means that
   * the meta values need to be added back into the HTML from 
   * the `save` function.
   * 
   * $meta_out is placed into the div wrapper added by the inner-block
   * by the `save` function.
   */ 
  $re = '@(<div[\w\W\r\t\n]*>)@mU';
  $subst = "$1\n$meta_out";

  $final_out = preg_replace($re, $subst, $inner_blocks);

  return $final_out;
}

add_action( 'init', 'myprefix_enqueue_dynamic_meta_block_editor_assets' );

function myprefix_enqueue_dynamic_meta_block_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  // Your Gutenberg Block JS code
  wp_register_script( 
    'myprefix-dynamic-meta-block-script', 
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  );

  // Register the call_back for rendering on the front end
  register_block_type( 'myprefix/dynamic-meta-block', array(
    'api_version' => 2,    
    'editor_script'   => 'myprefix-dynamic-meta-block-script',
    'render_callback' => 'myprefix_dynamic_meta_block_cb'
  ) );
}

define('META_FIELD_OBJECT_NAME', '_myprefix_dynamic_meta_block_object');

// register custom meta data field
add_action( 'init', 'myprefix_register_dynamic_meta_block_meta' );

function myprefix_register_dynamic_meta_block_meta() {
  register_post_meta( 
    'post', 
    META_FIELD_OBJECT_NAME, 
    array(
      'type'          => 'object',
      'single'        => true,
      'show_in_rest'  => array(
        'schema' => array(
          'type'       => 'object',
          'properties' => array(
            'field1' => array(
              'type' => 'string',
            ),
            'field2' => array(
              'type' => 'string',
            ),
          ),
        ),
      ),
      'auth_callback' => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
}