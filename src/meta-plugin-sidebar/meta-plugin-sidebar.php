<?php

/******************************************************************************
 * 
 * Register the meta field
 * 
 *****************************************************************************/

/**
 * Fetch the meta key from the meta-simple.metafield.json file.
 */
if ( file_exists( __DIR__ . '/meta-plugin-sidebar.metafield.json' ) ) {
  
  $block_json = file_get_contents( 'meta-plugin-sidebar.metafield.json', true );
  
  $json_array = $block_json 
    ? json_decode( $block_json, true ) 
    : false;
  
  $meta_field = is_array( $json_array ) && array_key_exists('metaField', $json_array) 
    ? $json_array['metaField'] 
    : 'pants';
  
} else {
  error_log( "ERROR: meta-plugin-sidebar.metafield.json file not found. Logged from line" . __LINE__ . " in " . __FILE__ );
}

// Define a constant to make it easily available across functions
define( 'MYPREFIX_META_PLUGIN_SIDEBAR_FIELD', $meta_field );

/**
 * Register the meta field
 */
add_action( 'init', 'myprefix_register_meta_plugin_sidebar_field' );

function myprefix_register_meta_plugin_sidebar_field() {
  register_post_meta( 
    'post', 
    MYPREFIX_META_PLUGIN_SIDEBAR_FIELD, 
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

/******************************************************************************
 * 
 * Use the meta value in a post
 * 
 *****************************************************************************/

  if ( !is_admin() ) {
    add_filter( 'the_content', 'myprefix_meta_plugin_sidebar_content_filter' );
  }
  
  function myprefix_meta_plugin_sidebar_content_filter( $content ) {
    if ( !is_singular() || !in_the_loop() || !is_main_query() ) {
      return $content;
    }
    
    // Get a flattened array
    $meta = array_merge([], ...get_post_meta( get_the_ID(), MYPREFIX_META_PLUGIN_SIDEBAR_FIELD, false ));

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

/******************************************************************************
 * 
 * Enqueue the script file.
 * 
 *****************************************************************************/
  
add_action( 'enqueue_block_editor_assets', 'myprefix_meta_plugin_sidebar' );
  
function myprefix_meta_plugin_sidebar() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  /**
   * Include the assets file, which is generated by wp-scripts
   */
  $asset_file = include( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.asset.php' );  
  
  wp_enqueue_script(
    'myprefix-meta-plugin-sidebar-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    $asset_file['dependencies'],
    $asset_file['version']
  ); 
}
  
