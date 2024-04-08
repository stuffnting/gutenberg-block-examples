<?php

/******************************************************************************
 * 
 * Callback function
 * 
 *****************************************************************************/
function myprefix_block_hooks_php_cb( $attributes, $content, $block_object ) {
  $wrapper_attributes = get_block_wrapper_attributes();
  $out = '<h2>Added by the hook via PHP!</h2>';

  return sprintf( '<div %1$s>%2$s</div>',
          $wrapper_attributes,
          $out
        );
}

/******************************************************************************
 * 
 * Register the block
 * 
 *****************************************************************************/

add_action( 'init', 'myprefix_block_hooks_php' );

function myprefix_block_hooks_php() {

  if ( ! function_exists( 'register_block_type' ) ) {
      // Gutenberg is not active.
      return;
  }

  // Register the call_back for rendering on the front end
  register_block_type( __DIR__, array(
    'render_callback' => 'myprefix_block_hooks_php_cb'        
  ) );
}

/******************************************************************************
 * 
 * Add the block hook
 * 
 *****************************************************************************/
add_filter( 'hooked_block_types', 'example_block_hooks', 10, 4 );

function example_block_hooks( $hooked_blocks, $position, $anchor_block, $context ) {
  // Template/Template Part hooks.
  
  if ( $context instanceof WP_Block_Template ) {
    /**
     * Hooks myprefix/block_hooks_php before core/post-title in the single.html 
     * template of twentytwentyfour theme.
     * 
     * Note: if the user has modified the single template, this will not work.
     * Existing templates and template parts in the editor will have the hooked block added.
     * If hooked blocks have already been added, and the hook is removed, the 
     * hooked blocks will be removed from the editor.
     */
    if ( 
      'twentytwentyfour' === $context->theme &&
      'single' === $context->slug &&
      'core/post-title' === $anchor_block &&
      'before' === $position
      ) {
        $hooked_blocks[] = 'myprefix/block-hook-php';
    }
  }
  
	// Pattern hooks.
	if ( is_array( $context ) && isset( $context['slug'] ) ) {
		/**
     * Hooks myprefix/block_hooks_php to the twentytwentyfour/text-feature-grid-3-col pattern.
     * 
     * Note: the hooked block will only be added to the editor when the pattern is first added. 
     * Existing patterns in the editor will not have the hooked block added.
     * If hooked blocks have already been added to the pattern, and the hook is removed, the 
     * hooked blocks will remain in the editor.
     */
		if ( 
			'core/column' === $anchor_block && 
			'first_child' === $position  && 
			'twentytwentyfour/text-feature-grid-3-col' === $context['slug']
		) {
			$hooked_blocks[] = 'myprefix/block-hook-php';
		}
	}

	return $hooked_blocks;
}
