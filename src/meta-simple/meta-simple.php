<?php

/**
 * Register the meta field.
 * 
 * The meta field name is set in the JSON file.
 * It is also possible to set the meta name in the PHP file,
 * and make it available to the JS script using wp_add_inline_script().
 * For examples of how to do this, see the dynamic-meta-block example.
 * 
 * *** NOTE *** Because metaField is not in the schema for block.json file,
 * its presence will be flagged as an error when using 
 * "$schema": "https://schemas.wp.org/trunk/block.json"
 */
if ( file_exists( __DIR__ . '/block.json' ) ) {
  
  $block_json = file_get_contents( 'block.json', true );

  $json_array = $block_json 
    ? json_decode( $block_json, true ) 
    : false;
    
  $meta_field = is_array( $json_array ) && array_key_exists('metaField', $json_array) 
    ? $json_array['metaField'] 
    : 'pants';
  
} else {
  error_log( "ERROR: block.json file not found. Logged from line" . __LINE__ . " in " . __FILE__ );
}

define( 'META_SIMPLE_FIELD', $meta_field );

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

/**
 * Use the meta value in a post
 */
add_filter( 'the_content', 'myprefix_meta_simple_content_filter' );

function myprefix_meta_simple_content_filter( $content ) {
  $value = get_post_meta( get_the_ID(), META_SIMPLE_FIELD, true );

  if ( $value ) {
    return sprintf( "%s \n <h4> Here is the META from the simple block</h4> \n <p>%s</p>", 
      $content, 
      esc_html( $value )
    );
  } else {
      return $content;
  }
}

function myprefix_meta_simple_cb( $attributes ) {
  //Get a flattened array
  $meta = get_post_meta( get_the_ID() );
  $meta_string = $meta[META_SIMPLE_FIELD][0] ?? 'pants';

  $meta_out = '<h4>Simple meta block callback:</h4>';
  $meta_out .= $meta_string ? "<p>$meta_string</p>" : "";

  return $meta_out;
}


add_action( 'init', 'myprefix_meta_simple' );

function myprefix_meta_simple() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_register_script(
    'myprefix-meta-simple-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  );

  // Register the call_back for rendering on the front end
  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_meta_simple_cb'        
  ) );
}



