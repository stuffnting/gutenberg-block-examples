<?php
/******************************************************************************
 * 
 * Register the meta key
 * 
 *****************************************************************************/
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

/******************************************************************************
 * 
 * Callback function
 * 
 *****************************************************************************/

function myprefix_dynamic_meta_block_cb( $attributes, $content, $block_object ) {
  // Format the meta values as HTML
  $title = '<h2 style="margin-top: 0">Dynamic Meta Block</h2>';

  //Get a flattened array
  $meta_raw = get_post_meta( get_the_ID(), MYPREFIX_DYNAMIC_META_BLOCK_OBJECT, true );

  $meta = is_array( $meta_raw ) ? array_merge( [], $meta_raw ) : false;

  $meta_out = $meta ? sprintf( "<p>Field 1: %s</p>\n<p>Field 2: %s</p>",
    esc_html( $meta['field1'] ?? '' ),
    esc_html( $meta['field2'] ?? '' )
  ) : "";

  /**
   * Get the class, style and id attributes for the block currently being rendered.
   * @link https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/
   */
  $wrapper_attributes = get_block_wrapper_attributes();

  return sprintf( '<div %1$s>%2$s%3$s</div>',
          $wrapper_attributes,
          $title,
          $meta_out
        );
}

/******************************************************************************
 * 
 * Register the block and make the meta key available to JS
 * 
 *****************************************************************************/

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