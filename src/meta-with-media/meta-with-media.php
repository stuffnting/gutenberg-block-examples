<?php
/**
 * This code does not register a block type.
 */

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

define( 'METABOX_WITH_MEDIA_FIELD', $meta_field );

add_action( 'enqueue_block_editor_assets', 'myprefix_metabox_with_media' );

function myprefix_metabox_with_media() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix_meta_with_media_script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 
}

add_action('init', 'myprefix_meta_with_media_field');



function myprefix_meta_with_media_field() {
  register_meta(
    'post', 
    METABOX_WITH_MEDIA_FIELD, 
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


/**
 * Use the meta value in a post
 */
add_filter( 'the_content', 'myprefix_meta_with_media_filter' );

function myprefix_meta_with_media_filter( $content ) {
  $value = get_post_meta( get_the_ID(), METABOX_WITH_MEDIA_FIELD, true );

  if ( $value ) {
    $atts = array(
      "alt" => "My metabox uploaded image."
    );

    $image = wp_get_attachment_image( $value, 'large', false, $atts );

    return $content . "<div id='meta-image'><figure class='wp-block-image size-full'>$image</figure></div>";
  } else {
      return $content;
  }
}