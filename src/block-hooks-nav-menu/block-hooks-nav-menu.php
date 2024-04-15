<?php
/**
 * @see {@link https://developer.wordpress.org/news/2024/03/25/exploring-the-block-hooks-api-in-wordpress-6-5/#navigation-menus-example-4}
 */

add_filter( 'hooked_block_types', 'myprefix_add_loginout_to_menu', 10, 4 );

function myprefix_add_loginout_to_menu( $hooked_block_types, $relative_position, $anchor_block_type, $context ) {

	// Is $context a Navigation menu?
	if ( ! $context instanceof WP_Post || 'wp_navigation' !== $context->post_type ) {
		return $hooked_block_types;
	}
	
	if ( 'last_child' === $relative_position && 'core/navigation' === $anchor_block_type ) {
		$hooked_block_types[] = 'core/loginout';
	}

	return $hooked_block_types;
}