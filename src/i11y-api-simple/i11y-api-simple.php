<?php

add_action('init', 'myprefix_block_i11y_api_simple_block_init');

function myprefix_block_i11y_api_simple_block_init() {
  register_block_type_from_metadata(__DIR__);
}
