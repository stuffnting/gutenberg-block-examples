<?php

/******************************************************************************
 * 
 * Register the block
 * 
 *****************************************************************************/

add_action( 'init', 'myprefix_block_lock' );

function myprefix_block_lock() {

  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  register_block_type( __DIR__ );
}

/******************************************************************************
 * 
 * Control how the block lock is used.
 * 
 * This code conditionally removes the lock from the block option menu.
 * It allows editor-users to lock blocks on posts, but not pages, and 
 * not if their email address is `user@example.com`.
 * 
 * To prevent a block type from being locked, or initially setting a block as locked,
 * see this block's JSON file.
 * 
 ******************************************************************************/

add_filter( 'block_editor_settings_all', 'myprefix_control_block_lock', 10, 2 );

function myprefix_control_block_lock( $settings, $context ) {
  // Allow locking by the Editor role and above - https://wordpress.org/support/article/roles-and-capabilities/.
  $settings['canLockBlocks'] = current_user_can( 'delete_others_posts' );

  // Only enable for specific user(s).
  $user = wp_get_current_user();
  if ( in_array( $user->user_email, [ 'user@example.com' ], true ) ) {
      $settings['canLockBlocks'] = false;
  }

  // Disable for posts/pages, in this case disabled for pages.
  if ( $context->post && $context->post->post_type === 'page' ) {
      $settings['canLockBlocks'] = false;
  }

  // Totally remove the ability to lock any blocks. Uncomment next line.
  // $settings['canLockBlocks'] = false;

  return $settings;
}