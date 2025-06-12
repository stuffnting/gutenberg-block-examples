<?php

/**
 * Uncomment to remove access to the block lock settings on posts.
 */
//add_filter('block_editor_settings_all', 'myprefix_limit_block_lock_access', 10, 2);

function myprefix_limit_block_lock_access($settings, $context) {

  // Disable for posts/pages.
  if ($context->post && $context->post->post_type === 'post') {
    $settings['canLockBlocks'] = false;
  }

  return $settings;
}
