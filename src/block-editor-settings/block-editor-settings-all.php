<?php

/**
 * Edit the editor default settings.
 */

add_filter('block_editor_settings_all', 'myprefix_restrict_code_editor', 10, 2);

function myprefix_restrict_code_editor($settings) {

  $can_active_plugins = current_user_can('activate_plugins');

  // Disable the Code Editor for users that cannot activate plugins (not Administrators).
  if (! $can_active_plugins) {
    $settings['codeEditingEnabled'] = false;
  }

  $settings['alignWide'] = false;
  //$settings['imageEditing'] = true;
  $settings['allowedBlockTypes'] = array(
    'core/paragraph',
    'core/list',
    'core/list-item',
    'core/buttons',
    'core/button',
    'core/image',
    'code/quote',
    'core/group'
  );

  return $settings;
}
