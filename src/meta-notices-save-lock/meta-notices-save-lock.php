<?php
/******************************************************************************
 * 
 * Deal with the Meta
 * 
 *****************************************************************************/
/**
 * Get the meta field key from the JSON file
 */
 if ( file_exists( __DIR__ . '/meta-notices-save-lock.metafield.json' ) ) {
  
  $block_json = file_get_contents( 'meta-notices-save-lock.metafield.json', true );

  $json_array = $block_json 
  ? json_decode( $block_json, true ) 
  : false;
  
  $meta_field = is_array( $json_array ) && array_key_exists('metaField', $json_array) 
    ? $json_array['metaField'] 
    : 'pants';
    
} else {
  error_log( "ERROR: block.json file not found. Logged from line" . __LINE__ . " in " . __FILE__ );
}

/**
 * Register the meta field
 */
define( 'MYPREFIX_META_NOTICES_SAVE_LOCK_FIELD', $meta_field );

add_action( 'init', 'myprefix_register_meta_notices_save_lock_meta' );

function myprefix_register_meta_notices_save_lock_meta() {
  register_meta( 
    'post', 
    MYPREFIX_META_NOTICES_SAVE_LOCK_FIELD, 
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
 * Callback function
 * 
 *****************************************************************************/

function myprefix_meta_notices_save_lock_cb( $attributes, $inner_blocks ) {
  //Get a flattened array
  $meta = get_post_meta( get_the_ID() );
  $date_string = $meta[MYPREFIX_META_NOTICES_SAVE_LOCK_FIELD][0] ?? '';
  
  $meta_out = '<p>From date meta</p>';
  $meta_out .= $date_string ? "<p>$date_string</p>" : "";
  
    /**
   * Get the class, style and id attributes for the block currently being rendered.
   * @link https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/
   */
  $wrapper_attributes = get_block_wrapper_attributes();

  return sprintf( '<div %1$s>%2$s</div>',
          $wrapper_attributes,
          $meta_out
        );;
}

/******************************************************************************
 * 
 * Register the block
 * 
 *****************************************************************************/

add_action( 'init', 'myprefix_meta_notices_save_lock' );
  
function myprefix_meta_notices_save_lock() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  // Register the call_back for rendering on the front-end
  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_meta_notices_save_lock_cb'        
  ) );
}