<?php

/**
 * 
 * *** NOTE ***
 * Meta data field names that begin with an underscore are private.
 * This means the will not appear in WordPress' Custom Fields.
 * To update a private field, `auth_callback` must return `true`.
 * 
 * the callback function sanitize_textarea_field is a built-in WP function.
 */

add_action( 'init', 'myprefix_enqueue_metabox_simple_block_editor_assets' );

function myprefix_enqueue_metabox_simple_block_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_register_script(
    'myprefix-metabox-simple-block-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  );

  // Register the call_back for rendering on the front end
  register_block_type( 'myprefix/meta-simple-block', array(
    'apiVersion' => 2,    
    'editor_script'   => 'myprefix-metabox-simple-block-script',
    'render_callback' => 'myprefix_metabox_simple_block_cb'        
  ) );
}


// register custom meta data field

define('METABOX_SIMPLE_BLOCK_META', '_myprefix_metabox_simple_block_meta');

add_action( 'init', 'myprefix_register_metabox_simple_block_meta' );

function myprefix_register_metabox_simple_block_meta() {
  register_meta( 
    'post', 
    METABOX_SIMPLE_BLOCK_META, 
    array(
      'show_in_rest'       => true,
      'type'               => 'string',
      'default'            => '',
      'single'             => true,
      'sanitize_callback'  => 'sanitize_textarea_field',
      'auth_callback'      => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
}

/**
 * Use the meta value in a post
 */
add_filter( 'the_content', 'myprefix_meta_simple_block_content_filter' );

function myprefix_meta_simple_block_content_filter( $content ) {
  $value = get_post_meta( get_the_ID(), METABOX_SIMPLE_BLOCK_META, true );

  if ( $value ) {
      return sprintf( "%s \n <h4> Here is the META from the simple block</h4> \n <p>%s</p>", 
        $content, 
        esc_html( $value )
      );
  } else {
      return $content;
  }
}

function myprefix_metabox_simple_block_cb( $attributes ) {
  //Get a flattened array
  $meta = get_post_meta( get_the_ID() );
  $meta_string = $meta[METABOX_SIMPLE_BLOCK_META][0] ?? 'panst';

  $meta_out = '<h4>Simple meta block callback:</h4>';
  $meta_out .= $meta_string ? "<p>$meta_string</p>" : "";

  return $meta_out;
}