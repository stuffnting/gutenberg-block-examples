<?php

/**
 * Override theme.json.
 * 
 * There are 4 filters that can alter theme settings at different steps of the data stream:
 ** wp_theme_json_data_default—Hooks into the default data provided by WordPress.
 ** wp_theme_json_data_blocks—Hooks into the data provided by blocks.
 ** wp_theme_json_data_theme—Hooks into the data provided by the current theme.
 ** wp_theme_json_data_user—Hooks into the data provided by the user, i.e. changes the user has made in the theme editor.
 * 
 * It is the last one that can be used to override all steps.
 */
add_filter('wp_theme_json_data_user', 'snt_filter_theme_json_data_user');

function snt_filter_theme_json_data_user($theme_json) {

  // Conditional on users permissions
  $is_administrator = current_user_can('edit_theme_options');

  if ($is_administrator) {
    $new_data = array(
      'version'  => 3,
      'settings' => array(
        // Disable color controls for all users except Administrators.
        'color' => array(
          'custom'           => false,
          'background'       => false,
          'customDuotone'    => false,
          'customGradient'   => false,
          'defaultGradients' => false,
          'defaultPalette'   => false,
          'text'             => false,
        ),
        // Restrict the unite allowed for padding and margins.
        'spacing' => array(
          'units' => ['px']
        )
      ),
    );
  }

  return $theme_json->update_with($new_data);
}
