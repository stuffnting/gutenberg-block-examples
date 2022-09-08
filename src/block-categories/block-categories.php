<?php
add_action( 'init', 'myprefix_change_inserter' );

function myprefix_change_inserter() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script(
    'myprefix-change-inserter-script',
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array( 'wp-blocks', 'wp-dom-ready', 'wp-i18n', 'wp-element', 'wp-edit-post' ),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    false
  ); 

  register_block_type( __DIR__ );
}

/**
 * Add a new block category.
 * 
 * The core/spacer block is added to this category in the JS file.
 * 
 * Similar code can be used to remove block categories.
 * 
 * @see {@link https://developer.wordpress.org/reference/functions/wp_list_pluck/}
 */
add_filter( 'block_categories_all', 'myprefix_block_categories', 10, 2 );

function myprefix_block_categories( $block_categories, $block_editor_context ) {
  $category_slugs = wp_list_pluck( $block_categories, 'slug' );

  if ( $block_editor_context->post->post_type === 'post' ) {
    return in_array( 'custom-category-php', $category_slugs, true ) ? $block_categories : array_merge(
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