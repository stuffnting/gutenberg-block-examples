<?php
/******************************************************************************
 * 
 * Register the meta key
 * 
 *****************************************************************************/
define('MYPREFIX_META_CB_OBJECT', '_myprefix_meta_callback_object');

// register custom meta data field
add_action( 'init', 'myprefix_register_meta_callback_meta' );

function myprefix_register_meta_callback_meta() {
  register_post_meta( 
    'post', 
    MYPREFIX_META_CB_OBJECT, 
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

function myprefix_meta_callback_cb( $attributes, $content, $block_object ) {
  // Format the meta values as HTML
  $title = '<h2 style="margin-top: 0">Dynamic Meta Block</h2>';

  //Get a flattened array
  $meta_raw = get_post_meta( get_the_ID(), MYPREFIX_META_CB_OBJECT, true );

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

add_action( 'init', 'myprefix_meta_callback' );

function myprefix_meta_callback() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  // Register the call_back for rendering on the front end
  register_block_type( __Dir__, array(
    'render_callback' => 'myprefix_meta_callback_cb'
  ) );

  // Make the meta key available to index.js. The script handle (1st param), is set by WP, as block.json registers index.js.
  wp_localize_script( 'myprefix-meta-callback-editor-script', 'localizeObject', array(
    "MYPREFIX_META_CB_OBJECT" => MYPREFIX_META_CB_OBJECT
  ) );
}