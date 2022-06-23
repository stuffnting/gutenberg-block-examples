<?php

add_action( 'init', 'myprefix_block_lock' );

function myprefix_block_lock() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }
  
  wp_register_script(
    'myprefix-block-lock',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array(),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    true
  ); 

  register_block_type( __DIR__ );
}

/**
 * Control how the block lock is used.
 * 
 * This code conditionally removes the lock from the block option menu.
 */

add_filter( 'block_editor_settings_all', 'myprefix_control_block_lock', 10, 2 );

function myprefix_control_block_lock( $settings, $context ) {
  // Allow for the Editor role and above - https://wordpress.org/support/article/roles-and-capabilities/.
  $settings['canLockBlocks'] = current_user_can( 'delete_others_posts' );

  // Only enable for specific user(s).
  $user = wp_get_current_user();
  if ( in_array( $user->user_email, [ 'user@example.com' ], true ) ) {
      $settings['canLockBlocks'] = false;
  }

  // Disable for posts/pages.
  if ( $context->post && $context->post->post_type === 'page' ) {
      $settings['canLockBlocks'] = false;
  }

  // Totally remove the ability to lock any blocks.
  // $settings['canLockBlocks'] = false;

  return $settings;
}