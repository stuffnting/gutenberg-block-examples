<?php

/****************************************************************************
 * 
 * This example registers a post meta that can be used in the custom fields
 * of a post. The entered custom field value can then be bound to the 
 * `content` attribute of a paragraph block.
 * 
 ****************************************************************************/

/****************************************************************************
 * 
 * Register custom field (a.k.a post meta)
 * 
 ****************************************************************************/

register_meta(
  'post',
  'myprefix_block_binding_basic', // Your meta key
  array(
    'show_in_rest'      => true, // Required
    'single'            => true, // Required
    'type'              => 'string',
    'sanitize_callback' => 'wp_strip_all_tags', // The name of the sanitization function
    'label'             => 'Block Binding Basic Custom Field'
  )
);
