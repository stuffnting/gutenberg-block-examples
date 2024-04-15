<?php
/**
 * @see {@link https://developer.wordpress.org/news/2024/03/25/exploring-the-block-hooks-api-in-wordpress-6-5/#context-and-block-attributes-example-2}
 * @see {@link https://developer.wordpress.org/block-editor/getting-started/tutorial/}
 */

/******************************************************************************
 * 
 * Register the block
 * 
 ******************************************************************************/
add_action( 'init', 'myprefix_block_hooks_context' );

function myprefix_block_hooks_context() {
	register_block_type( __DIR__ );
}

/******************************************************************************
 * 
 * 
 * 
 *****************************************************************************/
add_filter( 'hooked_block_types', 'myprefix_hooks_copyright_block', 10, 4 );

function myprefix_hooks_copyright_block( $hooked_block_types, $relative_position, $anchor_block_type, $context ) {

	if ( 
      // Hook the block in footer patterns.
      ( 
        is_array( $context ) 
        && isset( $context[ 'blockTypes' ] ) 
        && in_array( 'core/template-part/footer', $context[ 'blockTypes' ] ) 
      ) 
      // Hook the block in footer template parts.
      || ( 
        $context instanceof WP_Block_Template 
        && property_exists( $context, 'slug' ) 
        && 'footer' === $context->area 
      )
	) {
		if ( 
			'core/site-title' === $anchor_block_type &&
			'after' === $relative_position
		) {
			$hooked_block_types[] = 'myprefix/block-hooks-context';
		}
	}

	return $hooked_block_types;
}