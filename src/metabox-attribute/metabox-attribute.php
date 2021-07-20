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

add_action( 'enqueue_block_editor_assets', 'myprefix_enqueue_metabox_attribute_editor_assets' );

function myprefix_enqueue_metabox_attribute_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix-metabox-attribute-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 
}


// register custom meta data field

define('METABOX_ATTRIBUTE_META', '_myprefix_metabox_attribute');

add_action( 'init', 'myprefix_register_metabox_attribute_meta' );

function myprefix_register_metabox_attribute_meta() {
  register_meta( 
    'post', 
    METABOX_ATTRIBUTE_META, 
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
add_filter( 'the_content', 'myprefix_meta_attribute_content_filter' );

function myprefix_meta_attribute_content_filter( $content ) {
  $value = get_post_meta( get_the_ID(), METABOX_ATTRIBUTE_META, true );

  if ( $value ) {
      return sprintf( "%s \n <h4> Here is the META from the metabox attribute block</h4> \n <p>%s</p>", 
        $content, 
        esc_html( $value )
      );
  } else {
      return $content;
  }
}
