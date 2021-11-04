<?php


add_action( 'enqueue_block_editor_assets', 'myprefix_enqueue_metabox_notices_save_lock_editor_assets' );

function myprefix_enqueue_metabox_notices_save_lock_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
}

// Your Gutenberg Block JS code
wp_register_script( 
  'myprefix-metabox-notices-save-lock-script', 
  MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
  array(),
  filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
  true
);

// Register the call_back for rendering on the front end
register_block_type( 'myprefix/metabox-notices-save-lock', array(
  'api_version' => 2,    
  'editor_script'   => 'myprefix-metabox-notices-save-lock-script',
  'render_callback' => 'myprefix_metabox_notices_save_lock_cb'        
) );
}


// register custom meta data field

define('MYPREFIX_METABOX_NOTICES_SAVE_LOCK_META', '_myprefix_notices_save_lock_meta');

add_action( 'init', 'myprefix_register_metabox_notices_save_lock_meta' );

function myprefix_register_metabox_notices_save_lock_meta() {
  register_meta( 
    'post', 
    MYPREFIX_METABOX_NOTICES_SAVE_LOCK_META, 
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
  $date_string = $meta[MYPREFIX_METABOX_INNER_BLOCKS_INSPECTOR_META][0] ?? '';

  $meta_out = '<p>From date meta</p>';
  $meta_out .= $date_string ? "<p>$date_string</p>" : "";

  return $meta_out;
}