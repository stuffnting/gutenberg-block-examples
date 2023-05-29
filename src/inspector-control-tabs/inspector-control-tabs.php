<?php

/******************************************************************************
 * 
 * The callback function
 * 
 *****************************************************************************/

function myprefix_inspector_control_tabs_cb( $attributes, $content ) {

  $recent_posts = wp_get_recent_posts( array(
      'numberposts' => 5,
      'post_status' => 'publish',
  ) );

  if ( count( $recent_posts ) === 0 ) {
      return 'No posts';
  }

  $style = sprintf( 'text-decoration: %1$s; font-family: %2$s;',
    isset( $attributes['underline'] ) ? 'underline' : 'none',
    isset( $attributes['font'] ) ? esc_attr( $attributes['font'] ) : 'inherit'
  );

  $out = isset( $attributes['showTitle'] ) 
    ? "<h2 style='$style'>{$attributes['title']}</h2>" 
    :  '';

  foreach ( $recent_posts as $a_post ) {
    $out .= sprintf( '<p><a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a></p>',
      isset( $a_post['ID'] ) ? esc_url( get_permalink( $a_post['ID'] ) ) : '',
      isset( $a_post['ID'] ) ? esc_html( get_the_title( $a_post['ID'] ) ) : ''
  );
  }

  /**
   * Get the class, style and id attributes for the block currently being rendered,
   * and add in the extra style from the custom attributes for underline and font-family.
   * @link https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/
   */
  $wrapper_attributes = get_block_wrapper_attributes( array( "style" => $style ) );

  return sprintf( '<div %1$s>%2$s</div>',
          $wrapper_attributes,
          $out
        );
}

/*****************************************************************************
 * 
 * Register the block
 * 
 *****************************************************************************/

add_action( 'init', 'myprefix_inspector_control_tabs' );

function myprefix_inspector_control_tabs() {

  if ( ! function_exists( 'register_block_type' ) ) {
      // Gutenberg is not active.
      return;
  }

  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_inspector_control_tabs_cb',  
  ) );
}

/******************************************************************************
 * 
 * Filters
 * 
 *****************************************************************************/

/**
 * Uncommenting to disable the Block Inspector control tabs for all blocks'.
 * The inspector controls will display as they did pre-WP 6.2
 */
//add_filter('block_editor_settings_all', 'myprefix_disable_tabs_by_default');

function myprefix_disable_tabs_by_default( $settings ) {
  $settings['blockInspectorTabs'] = array( 'default' => false );
  return $settings;
}

/**
 * Uncomment this filter to disable the Block Inspector control tabs
 * for this block.
 */
// add_filter('block_editor_settings_all', 'myprefix_disable_tabs_for_this_block');

function myprefix_disable_tabs_for_this_block( $settings ) {
  if ( !is_array($settings) ) {
    return;
  }

  $current_tab_settings = array_key_exists('blockInspectorTabs', $settings) 
    ? $settings['blockInspectorTabs'] 
    : array();
  $settings['blockInspectorTabs'] = array_merge(
    $current_tab_settings, 
    array('myprefix/inspector-control-tabs' => false)
  );
  return $settings;
}