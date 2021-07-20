<?php

add_action( 'enqueue_block_editor_assets', 'myprefix_enqueue_metabox_with_media_editor_assets' );

function myprefix_enqueue_metabox_with_media_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix_metabox_with_media_script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 
}

add_action('init', 'myprefix_register_metabox_with_media_meta');

define( 'METABOX_WITH_MEDIA_META', '_myprefix_metabox_with_media_meta');

function myprefix_register_metabox_with_media_meta() {
  register_meta(
    'post', 
    METABOX_WITH_MEDIA_META, 
    array(
      'show_in_rest' => true,
      'type' => 'integer',
      'single' => true,
      'sanitize_callback' => function($val, $key, $obj_type) {
        return intval($val);
      },
      'auth_callback' => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
}