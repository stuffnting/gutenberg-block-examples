<?php

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

define( 'METABOX_WITH_MEDIA_FIELD', $meta_field );

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
    $img_src = wp_get_attachment_image_url( intval($value), 'medium' );
    $img_srcset = wp_get_attachment_image_srcset( intval($value), 'medium' );
    
    $img_out = printf("<img src='%s' srcset='%s' sizes='(max-width: 50em) 87vw, 680px' alt='Foo Bar' style='margin: 0 auto'>",
      esc_url( $img_src ),
      esc_attr( $img_srcset )
    );

    return $content . $img_out;
  } else {
      return $content;
  }
}