<?php

/******************************************************************************
 * 
 * Register the meta field
 * 
 *****************************************************************************/

/**
 * Fetch the meta key from the meta-simple.metafield.json file.
 */
if ( file_exists( __DIR__ . '/meta-block-inspector.metafield.json' ) ) {
  
  $block_json = file_get_contents( 'meta-block-inspector.metafield.json', true );
  
  $json_array = $block_json 
    ? json_decode( $block_json, true ) 
    : false;
  
  $meta_field = is_array( $json_array ) && array_key_exists('metaField', $json_array) 
    ? $json_array['metaField'] 
    : 'pants';
  
} else {
  error_log( "ERROR: meta-block-inspector.metafield.json file not found. Logged from line" . __LINE__ . " in " . __FILE__ );
}

// Define a constant to make it easily available across functions
define( 'MYPREFIX_META_BLOCK_INSPECTOR_FIELD', $meta_field );

/**
 * Register the meta field
 */
add_action( 'init', 'myprefix_meta_block_inspector_field' );

function myprefix_meta_block_inspector_field() {
  register_meta( 
    'post', 
    MYPREFIX_META_BLOCK_INSPECTOR_FIELD, 
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
 * Callback Function
 * 
 *****************************************************************************/

function myprefix_meta_block_inspector_cb( $attributes, $content ) {
  //Get a flattened array
  $meta = get_post_meta( get_the_ID() );
  $date_string = $meta[MYPREFIX_META_BLOCK_INSPECTOR_FIELD][0] ?? '';

  $meta_out = '<p>From date meta</p>';
  $meta_out .= $date_string ? "<p>$date_string</p>" : "";

  /**
   * Get the class, style and id attributes for the block currently being rendered.
   * In this case, the outer block.
   * @see {@link https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/}
   */
  $wrapper_attributes = get_block_wrapper_attributes();

  return sprintf( '<div %1$s>%2$s</div>',
          $wrapper_attributes,
          $meta_out
        );
}

/******************************************************************************
 * 
 * Register the block
 * 
 *****************************************************************************/

add_action( 'init', 'myprefix_meta_block_inspector' );

function myprefix_meta_block_inspector() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }
  
  // Register the call_back for rendering on the front end
  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_meta_block_inspector_cb'        
  ) );
}

