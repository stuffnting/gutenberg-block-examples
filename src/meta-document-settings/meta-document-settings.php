<?php

/**
 * Register the meta field.
 * 
 * The meta field name is set in the JSON file.
 * It is also possible to set the meta name in the PHP file,
 * and make it available to the JS script using wp_add_inline_script().
 * For examples of how to do this, see the dynamic-meta-block example.
 */
if ( file_exists( __DIR__ . '/meta-document-settings.metafield.json' ) ) {
  
  $block_json = file_get_contents( 'meta-document-settings.metafield.json', true );
  
  $json_array = $block_json 
    ? json_decode( $block_json, true ) 
    : false;
  
  $meta_field = is_array( $json_array ) && array_key_exists('metaField', $json_array) 
    ? $json_array['metaField'] 
    : 'pants';
  
} else {
  error_log( "ERROR: meta-document-settings.metafield.json file not found. Logged from line" . __LINE__ . " in " . __FILE__ );
}

// Define a constant to make it easily available across functions
define( 'MYPREFIX_METABOX_DOCUMENT_SETTING_FIELD', $meta_field );

add_action( 'init', 'myprefix_meta_document_settings_field' );

function myprefix_meta_document_settings_field() {
  register_meta( 
    'post', 
    MYPREFIX_METABOX_DOCUMENT_SETTING_FIELD, 
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

add_action( 'enqueue_block_editor_assets', 'myprefix_meta_document_settings' );

function myprefix_meta_document_settings() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix-meta-document-settings-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 
}


/**
 * Use the meta value in a post
 */
add_filter( 'the_content', 'myprefix_meta_document_settings_content_filter' );

function myprefix_meta_document_settings_content_filter( $content ) {
  $value = get_post_meta( get_the_ID(), MYPREFIX_METABOX_DOCUMENT_SETTING_FIELD, true );

  if ( $value ) {
      return sprintf( "%s \n <h4> Here is the META from the useSelect Document Settings </h4> \n <p>%s</p>", 
        $content, 
        esc_html( $value )
      );
  } else {
      return $content;
  }
}