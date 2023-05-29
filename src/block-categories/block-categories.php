<?php

/******************************************************************************
 * 
 * Enqueue the script file and the test block.
 *  
 * Note, the block JS, and category related JS all end up in index.js. This file is 
 * enqueued by block.json, and so the category related JS does not need to be
 * enqueued separately.
 * 
 *****************************************************************************/
add_action( 'init', 'myprefix_block_categories' );

function myprefix_block_categories() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  // Register the block type with a JSON file not named block.json
  register_block_type( __DIR__ . "/block-categories-test-block.block.json" );
}

/******************************************************************************
 * 
 * Add a new block category.
 * 
 *****************************************************************************/
 
 /**
 * The core/spacer block is added to this custom category in the JS file.
 * Similar code can be used to remove block categories.
 * 
 * @see {@link https://developer.wordpress.org/reference/hooks/block_categories_all/}
 * @see {@link https://developer.wordpress.org/reference/functions/wp_list_pluck/}
 */
add_filter( 'block_categories_all', 'myprefix_block_categories_add_custom', 10, 2 );

function myprefix_block_categories_add_custom( $block_categories, $block_editor_context ) {
  // Extract all the block category slug into a new array.
  $category_slugs = wp_list_pluck( $block_categories, 'slug' );

  // Only do this for 'post' post-type
  if ( $block_editor_context->post->post_type === 'post' ) {
    /**
     * If 'custom-category-php' is already registered return the $block_categories unchanged,
     * otherwise, add it to the $block_categories array.
     */ 
    return in_array( 'custom-category-php', $category_slugs, true ) 
      ? $block_categories 
      : array_merge(
      $block_categories,
        array(
          array(
              'slug'  => 'custom-category-php',
              'title' => __( 'A custom block category registered with PHP', 'textDomain' ),
              'icon'  => null,
          ),
        )
    );
  } else {
    return $block_categories;
  }
}

/******************************************************************************
 * 
 * Filter which blocks are in a category.
 * 
 *****************************************************************************/

/**
 * Filter which blocks are allowed in the 'widgets' block category.
 * 
 * To remove all blocks in a category, make $allowed_blocks an empty array.
 * Empty categories will not show in the inserter.
 */
add_filter( 'allowed_block_types_all', 'myprefix_black_list_blocks', 10, 2 );

function myprefix_black_list_blocks( $allowed_block_types, $block_editor_context ) {
  
  $all_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

  if ( empty( $all_blocks ) ) {
    return $allowed_block_types;
  }
  
  $cats_black_list = ['widgets'];

  $allowed_blocks = ['core/calendar', 'core/html', 'core/rss'];

  foreach ( $all_blocks as $block ) {
    if ( !in_array( $block->category, $cats_black_list )  ) {
      $allowed_blocks[] = $block->name;
    }
  }
  
  return $allowed_blocks;
}