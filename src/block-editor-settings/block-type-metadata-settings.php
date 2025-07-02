<?php

/**
 * Edit block settings.
 * 
 * Note, the settings in theme.json trump these settings.
 */

add_filter('block_type_metadata_settings', function ($settings, $metadata) {

  // change per-block type
  if ($settings['name'] === 'core/image' && isset($settings['supports']['align'])) {
    //Remove completely
    //unset($settings['supports']['align']);

    // Change available options
    $settings['supports']['align'] = ['wide'];
  }

  // Remove for all block types. Not all blocks have this set
  if (isset($settings['supports']['align'])) {
    //Remove completely
    //unset($settings['supports']['align']);

    // Change available options
    //$settings['supports']['align'];
  }
  return $settings;
}, 10, 2);
