<?php
/**
 * @see {@link https://developer.wordpress.org/news/2024/03/25/exploring-the-block-hooks-api-in-wordpress-6-5/#the-basics-example-1}
 * @see {@link https://github.com/ockham/like-button/tree/trunk}
 */


/******************************************************************************
 * 
 * Register the like button block, myprefix/block-hooks-basic.
 * 
 *****************************************************************************/
add_action( 'init', 'myprefix_block_hooks_basic' );

function myprefix_block_hooks_basic() {
	register_block_type( __DIR__ );
}

/******************************************************************************
 * 
 * Add the like button after the core/post-content block using the 
 * `hooked_block_types` filter.
 * 
 *****************************************************************************/
add_filter( 'hooked_block_types', 'myprefix_add_like_button_block_after_post_content_block', 10, 4 );

function myprefix_add_like_button_block_after_post_content_block( $hooked_block_types, $relative_position, $anchor_block_type, $context ) {
	if ( ! $context instanceof WP_Block_Template || ! property_exists( $context, 'slug' ) || 'single' !== $context->slug ) {
		return $hooked_block_types;
	}

	if ( 'after' === $relative_position && 'core/post-content' === $anchor_block_type ) {
		$hooked_block_types[] = 'myprefix/block-hooks-basic';
	}

	return $hooked_block_types;
}

/******************************************************************************
 * 
 * Set the like button layout attribute to be the same as the adjacent block. 
 * Row, stack flex etc.
 * 
 *****************************************************************************/
add_filter( 'hooked_block_myprefix/block-hooks-basic', 'myprefix_like_button_block_layout_attribute', 10, 4 );

function myprefix_like_button_block_layout_attribute( $hooked_block, $hooked_block_type, $relative_position, $anchor_block ) {
	// Is the hooked block adjacent to the anchor block? Before, or after, not first- or last-child.
	if ( 'before' !== $relative_position && 'after' !== $relative_position ) {
		return $hooked_block;
	}

	// Does the anchor block have a layout attribute?
	if ( isset( $anchor_block['attrs']['layout'] ) ) {
		// Copy the anchor block's layout attribute to the hooked block.
		$hooked_block['attrs']['layout'] = $anchor_block['attrs']['layout'];
	}

	return $hooked_block;
}

/******************************************************************************
 * 
 * Uncomment the filter to remove the like button block that 
 * is hooked to the content block.
 * 
 *****************************************************************************/
// add_filter( 'hooked_block_myprefix/block-hooks-basic', 'myprefix_remove_hooked_like_button_block_after_post_content', 15, 5 );

function myprefix_remove_hooked_like_button_block_after_post_content( $parsed_hooked_block, $hooked_block_type, $relative_position, $parsed_anchor_block, $context  ) {
	
	// Has the hooked block been suppressed by a previous filter?
	if ( is_null( $parsed_hooked_block ) ) {
		return $parsed_hooked_block;
	}

	// Remove any Like Button blocks hooked after Post Content.
	if ( 'core/post-content' === $parsed_anchor_block['blockName'] ) {
		return null;
	}

	return $parsed_hooked_block;
}