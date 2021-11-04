<?php
add_action( 'init', 'myprefix_enqueue_metabox_inner_blocks_inspector_editor_assets' );

function myprefix_enqueue_metabox_inner_blocks_inspector_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  // Your Gutenberg Block JS code
  wp_register_script( 
    'myprefix-metabox-inner-blocks-inspector-script', 
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  );

  // Register the call_back for rendering on the front end
  register_block_type( 'myprefix/metabox-inner-blocks-inspector', array(
    'api_version' => 2,    
    'editor_script'   => 'myprefix-metabox-inner-blocks-inspector-script',
    'render_callback' => 'myprefix_metabox_inner_blocks_inspector_cb'        
  ) );
}


// register custom meta data field

define('MYPREFIX_METABOX_INNER_BLOCKS_INSPECTOR_META', '_myprefix_inner_blocks_inspector_meta');

add_action( 'init', 'myprefix_register_metabox_inner_blocks_inspector_meta' );

function myprefix_register_metabox_inner_blocks_inspector_meta() {
  register_meta( 
    'post', 
    MYPREFIX_METABOX_INNER_BLOCKS_INSPECTOR_META, 
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

function myprefix_metabox_inner_blocks_inspector_cb( $attributes, $inner_blocks ) {
  //Get a flattened array
  $meta = get_post_meta( get_the_ID() );
  $date_string = $meta[MYPREFIX_METABOX_INNER_BLOCKS_INSPECTOR_META][0] ?? '';

  $meta_out = '<p>From date meta</p>';
  $meta_out .= $date_string ? "<p>$date_string</p>" : "";

  /**
   * The block's meta values can not be used in its `save` function,
   * whereas, the block's inner-blocks are included. This means that
   * the meta values need to be added back into the HTML from 
   * the `save` function.
   * 
   * $meta_out is placed into the div wrapper added by the inner-block
   * by the `save` function.
   */ 
  $re = '@(<div[\w\W\r\t\n]*>)@mU';
  $subst = "$1\n$meta_out";

  $final_out = preg_replace($re, $subst, $inner_blocks);

  return $final_out;
}