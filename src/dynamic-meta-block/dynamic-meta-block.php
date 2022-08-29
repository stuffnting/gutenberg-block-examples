<?php
/**
 * In this example the meta field is named here, 
 * and wp_localize_script() is used to make the name available to the JS script.
 * It is possible to name the meta field in the JSON file.
 * For examples of how to do this, see the other meta block examples.
 */
define('MYPREFIX_DYNAMIC_META_BLOCK_OBJECT', '_myprefix_dynamic_meta_block_object');

// register custom meta data field
add_action( 'init', 'myprefix_register_dynamic_meta_block_meta' );

function myprefix_register_dynamic_meta_block_meta() {
  register_post_meta( 
    'post', 
    MYPREFIX_DYNAMIC_META_BLOCK_OBJECT, 
    array(
      'type'          => 'object',
      'single'        => true,
      'show_in_rest'  => array(
        'schema' => array(
          'type'       => 'object',
          'properties' => array(
            'field1' => array(
              'type' => 'string',
            ),
            'field2' => array(
              'type' => 'string',
            ),
          ),
        ),
      ),
      'auth_callback' => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
}

function myprefix_dynamic_meta_block_cb( $attributes, $inner_blocks ) {
  // Format the meta values as HTML
  $meta_out = '<h2 style="margin-top: 0">Meta save test with inner blocks</h2>';

  //Get a flattened array
  $meta_raw = get_post_meta( get_the_ID(), MYPREFIX_DYNAMIC_META_BLOCK_OBJECT, true );

  $meta = is_array( $meta_raw ) ? array_merge( [], $meta_raw ) : false;

  $meta_out .= $meta ? sprintf( "<p>Field 1: %s</p>\n<p>Field 2: %s</p>",
    esc_html( $meta['field1'] ?? '' ),
    esc_html( $meta['field2'] ?? '' )
  ) : "";

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

add_action( 'init', 'myprefix_dynamic_meta_block' );

function myprefix_dynamic_meta_block() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  // Register the call_back for rendering on the front end
  register_block_type( __Dir__, array(
    'render_callback' => 'myprefix_dynamic_meta_block_cb'
  ) );

  // Make the meta key available to index.js. The script handle (1st param), is set by WP, as block.json registers index.js.
  wp_localize_script( 'myprefix-dynamic-meta-block-editor-script', 'localizeObject', array(
    "MYPREFIX_DYNAMIC_META_BLOCK_OBJECT" => MYPREFIX_DYNAMIC_META_BLOCK_OBJECT
  ) );
}