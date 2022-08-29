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

// register custom meta data field

define('MYPREFIX_META_ATTRIBUTE_FIELD', '_myprefix_meta_attribute_field');

add_action( 'init', 'myprefix_meta_attribute_field' );

function myprefix_meta_attribute_field() {
  register_meta( 
    'post', 
    MYPREFIX_META_ATTRIBUTE_FIELD, 
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

add_action( 'enqueue_block_editor_assets', 'myprefix_meta_attribute' );

function myprefix_meta_attribute() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix-meta-attribute-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  );

  wp_add_inline_script( 'myprefix-meta-attribute-script', 
  'const MYPREFIX_META_ATTRIBUTE_FIELD = "' . MYPREFIX_META_ATTRIBUTE_FIELD . '"', 
  'before' );
}

/**
 * Use the meta value in a post
 */
add_filter( 'the_content', 'myprefix_meta_attribute_content_filter' );

function myprefix_meta_attribute_content_filter( $content ) {
  $value = get_post_meta( get_the_ID(), MYPREFIX_META_ATTRIBUTE_FIELD, true );

  if ( $value ) {
      return sprintf( "%s \n <h4> Here is the META from the metabox attribute block</h4> \n <p>%s</p>", 
        $content, 
        esc_html( $value )
      );
  } else {
      return $content;
  }
}
