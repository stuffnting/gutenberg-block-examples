<?php

require_once('block-pattern.php');

/******************************************************************************
 * 
 * Callback function
 * 
 *****************************************************************************/
function myprefix_block_hooks_php_cb( $attributes, $content, $block_object ) {
  $wrapper_attributes = get_block_wrapper_attributes();
  $out = '<h2>Added by the hook!</h2>';

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

 function example_block_hooks( $hooked_blocks, $position, $anchor_block, $context ) {
	// Template/Template Part hooks.
	if ( $context instanceof WP_Block_Template ) {

    // Hooks the "Like" button block before the Post Title in the Single template.
		if ( 
      'core/post-title' === $anchor_block &&
			'before' === $position &&
			'single' === $context->slug
      ) {
        $hooked_blocks[] = 'myprefix/block-hook-php';
		}
    
		// Hooks the Login/Logout link block after the Navigation block if the context of the template part is a header.
		if ( 
      'core/group' === $anchor_block &&
			'last_child' === $position &&
			'header' === $context->area
      ) {
        $hooked_blocks[] = 'core/loginout';
      }
	}
  
	// Pattern hooks.
	if ( is_array( $context ) && isset( $context['slug'] ) ) {
		// Hooks into the Post Meta pattern in the Twenty Twenty-Four theme.
		if ( 
			'core/columns' === $anchor_block && 
			'before' === $position && 
			'twentytwentyfour/team-4-col' === $context['slug']
		) {
      snt_dump("pants");
			$hooked_blocks[] = 'myprefix/block-hook-php';
		}
	}

	return $hooked_blocks;
}
add_filter( 'hooked_block_types', 'example_block_hooks', 100, 4 );