<?php

/******************************************************************************
 * 
 * Register the meta field
 * 
 *****************************************************************************/

/**
 * Fetch the meta key from the meta-simple.metafield.json file.
 */
if ( file_exists( __DIR__ . '/meta-simple.metafield.json' ) ) {
  
  $block_json = file_get_contents( 'meta-simple.metafield.json', true );

  $json_array = $block_json 
    ? json_decode( $block_json, true ) 
    : false;
    
  $meta_field = is_array( $json_array ) && array_key_exists('metaField', $json_array) 
    ? $json_array['metaField'] 
    : 'pants';
  
} else {
  error_log( "ERROR: meta-simple.metafield.json file not found. Logged from line" . __LINE__ . " in " . __FILE__ );
}

// Define a constant to make it easily available across functions
define( 'META_SIMPLE_FIELD', $meta_field );

/**
 * Register the meta field
 */
add_action( 'init', 'myprefix_meta_simple_field' );

function myprefix_meta_simple_field() {
  register_meta( 
    'post', 
    META_SIMPLE_FIELD, 
    array(
      'show_in_rest'       => true,
      'type'               => 'string',
      'default'            => '',
      'single'             => true,
      'sanitize_callback'  => 'sanitize_textarea_field',
      'auth_callback'      => function() { 
        return current_user_can( 'edit_posts' );
      }
    )
  );
}

/******************************************************************************
 * 
 * Use the meta value in a post
 * 
 *****************************************************************************/

add_filter( 'the_content', 'myprefix_meta_simple_content_filter' );

function myprefix_meta_simple_content_filter( $content ) {
  $value = get_post_meta( get_the_ID(), META_SIMPLE_FIELD, true );

  if ( $value ) {
    return sprintf( "%s \n <h2> Here is the META from the simple block</h2> \n <p>%s</p>", 
      $content, 
      esc_html( $value )
    );
  } else {
      return $content;
  }
}

/******************************************************************************
 * 
 * Register the block
 * 
 *****************************************************************************/
add_action( 'init', 'myprefix_meta_simple' );

function myprefix_meta_simple() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  // Register the call_back for rendering on the front end
  register_block_type( __DIR__ );
}



