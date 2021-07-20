<?php

add_action( 'enqueue_block_editor_assets', 'myprefix_enqueue_metabox_document_settings_editor_assets' );

function myprefix_enqueue_metabox_document_settings_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix-metabox-document-settings-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 
}


// register custom meta data field

define('METABOX_DOCUMENT_SETTING_META', '_myprefix_metabox_document_settings_meta');

add_action( 'init', 'myprefix_register_metabox_document_settings_meta' );

function myprefix_register_metabox_document_settings_meta() {
  register_meta( 
    'post', 
    METABOX_DOCUMENT_SETTING_META, 
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


/**
 * Use the meta value in a post
 */
add_filter( 'the_content', 'myprefix_meta_document_settings_content_filter' );

function myprefix_meta_document_settings_content_filter( $content ) {
  $value = get_post_meta( get_the_ID(), METABOX_DOCUMENT_SETTING_META, true );

  if ( $value ) {
      return sprintf( "%s \n <h4> Here is the META from the useSelect Document Settings </h4> \n <p>%s</p>", 
        $content, 
        esc_html( $value )
      );
  } else {
      return $content;
  }
}