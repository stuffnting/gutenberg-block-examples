<?php

/**
 * Interactivity API with Global State, Local Context and Derived State 
 */

function i11y_api_g_l_d_block_init() {
  register_block_type_from_metadata(__DIR__);
}
add_action('init', 'i11y_api_g_l_d_block_init');
