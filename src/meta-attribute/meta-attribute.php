<?php

/******************************************************************************
 * 
 * Register the meta field
 * 
 *****************************************************************************/

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

/******************************************************************************
 * 
 * Use the post meta on the font-end
 * 
 *****************************************************************************/
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

/******************************************************************************
 * 
 * Enqueue the script file and make the meta field key available to the JS code
 * 
 *****************************************************************************/

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


