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

define( 'MYPREFIX_META_NOTICES_SAVE_LOCK_FIELD', $meta_field );

add_action( 'init', 'myprefix_register_metabox_notices_save_lock_meta' );

function myprefix_register_metabox_notices_save_lock_meta() {
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
  
add_action( 'init', 'myprefix_metabox_notices_save_lock' );
  
function myprefix_metabox_notices_save_lock() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  // Register the call_back for rendering on the front end
  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_metabox_notices_save_lock_cb'        
  ) );
}

function myprefix_metabox_notices_save_lock_cb( $attributes, $inner_blocks ) {
  //Get a flattened array
  $meta = get_post_meta( get_the_ID() );
  $date_string = $meta[MYPREFIX_META_NOTICES_SAVE_LOCK_FIELD][0] ?? '';
  
  $meta_out = '<p>From date meta</p>';
  $meta_out .= $date_string ? "<p>$date_string</p>" : "";
  
  return $meta_out;
}