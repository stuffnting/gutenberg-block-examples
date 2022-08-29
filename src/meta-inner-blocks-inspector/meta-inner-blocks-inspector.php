<?php

/**
 * Register the meta field.
 * 
 * The meta field name is set in the JSON file.
 * It is also possible to set the meta name in the PHP file,
 * and make it available to the JS script using wp_localize_script().
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

define( 'MYPREFIX_META_INNER_BLOCKS_INSPECTOR_FIELD', $meta_field );


add_action( 'init', 'myprefix_metabox_inner_blocks_inspector_field' );

function myprefix_metabox_inner_blocks_inspector_field() {
  register_meta( 
    'post', 
    MYPREFIX_META_INNER_BLOCKS_INSPECTOR_FIELD, 
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

add_action( 'init', 'myprefix_meta_inner_blocks_inspector' );

function myprefix_meta_inner_blocks_inspector() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }
  
  // Register the call_back for rendering on the front end
  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_meta_inner_blocks_inspector_cb'        
  ) );
}

function myprefix_meta_inner_blocks_inspector_cb( $attributes, $inner_blocks ) {
  //Get a flattened array
  $meta = get_post_meta( get_the_ID() );
  $date_string = $meta[MYPREFIX_META_INNER_BLOCKS_INSPECTOR_FIELD][0] ?? '';

  $meta_out = '<p>From date meta</p>';
  $meta_out .= $date_string ? "<p>$date_string</p>" : "";

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