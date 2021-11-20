<?php


add_action( 'enqueue_block_editor_assets', 'myprefix_metabox_notices_save_lock' );

function myprefix_metabox_notices_save_lock() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  // Your Gutenberg Block JS code
  wp_register_script( 
    'myprefix-meta-notices-save-lock-script', 
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  );

  // Register the call_back for rendering on the front end
  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_metabox_notices_save_lock_cb'        
  ) );
}


// register custom meta data field
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

function myprefix_metabox_notices_save_lock_cb( $attributes, $inner_blocks ) {
  //Get a flattened array
  $meta = get_post_meta( get_the_ID() );
  $date_string = $meta[MYPREFIX_META_NOTICES_SAVE_LOCK_FIELD][0] ?? '';

  $meta_out = '<p>From date meta</p>';
  $meta_out .= $date_string ? "<p>$date_string</p>" : "";

  return $meta_out;
}