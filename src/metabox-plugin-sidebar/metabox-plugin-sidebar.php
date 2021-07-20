<?php

add_action( 'enqueue_block_editor_assets', 'myprefix_enqueue_metabox_plugin_sidebar_editor_assets' );

function myprefix_enqueue_metabox_plugin_sidebar_editor_assets() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix-metabox-plugin-sidebar-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 
}


/**
 * Register custom meta data field
 * 
 * Details of JSON compatible show_in_rest can be found here
 * https://make.wordpress.org/core/2019/10/03/wp-5-3-supports-object-and-array-meta-types-in-the-rest-api/
 */ 

define('METABOX_PLUGIN_SIDEBAR_META', '_myprefix_metabox_plugin_sidebar_meta');

add_action( 'init', 'myprefix_register_metabox_plugin_sidebar_meta' );

function myprefix_register_metabox_plugin_sidebar_meta() {
  register_post_meta( 
    'post', 
    METABOX_PLUGIN_SIDEBAR_META, 
    array(
      'type'          => 'object',
      'single'        => true,
      'show_in_rest' => array(
        'schema' => array(
          'type'       => 'object',
          'properties' => array(
            'colour'  => array(
              'type' => 'string',
            ),
            'datetime'=> array(
              'type' => 'string',
            ),
          ),
        ),
      ),
      'auth_callback'   => function() { 
        return current_user_can('edit_posts');
      }
    )
  );
}


/**
 * Use the meta value in a post
 */
if ( !is_admin() ) {
  add_filter( 'the_content', 'myprefix_meta_plugin_sidebar_content_filter' );
}

function myprefix_meta_plugin_sidebar_content_filter( $content ) {
  if ( !is_singular() || !in_the_loop() || !is_main_query() ) {
    return $content;
  }

  // Get a flattened array
  $meta = array_merge([], ...get_post_meta( get_the_ID(), METABOX_PLUGIN_SIDEBAR_META, false ));

  if ( $meta ) {
      return sprintf( "%s \n <h4> Here is the META from the plugin sidebar </h4> \n <p>Colour: %s</p> \n <p>Date and time: %s</p>", 
        $content, 
        esc_html( $meta['colour'] ?? '' ),
        esc_html( $meta['datetime'] ?? '' )
      );
  } else {
      return $content;
  }
}