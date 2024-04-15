<?php

/******************************************************************************
 * 
 * Callback function
 * 
 *****************************************************************************/
function myprefix_block_hooks_php_cb( $attributes, $content, $block_object ) {
  /**
   * The second parameter ($content) will not be used, because there are no 
   * inner-blocks, therefore, there is no content.
   */
  $out = "<h2>{$attributes['content']} (from the CB!)</h2>";
  
  /**
   * Get the class, style and id attributes for the block currently being rendered.
   * @see {@link https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/}
   */
  $wrapper_attributes = get_block_wrapper_attributes();

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
add_filter( 'hooked_block_types', 'myprefix_block_hooks_php_add_block', 10, 4 );

function myprefix_block_hooks_php_add_block( $hooked_blocks, $position, $anchor_block, $context ) {
  // Template/Template Part hooks.

 // print_r($context);
  
  if ( $context instanceof WP_Block_Template ) {
    /**
     * Hooks myprefix/block_hooks_php before core/post-title in the single.html 
     * template of twentytwentyfour theme. Look on front-end.
     * 
     * Note: if the user has modified the single template, this will not work.
     * Existing templates and template parts in the editor will have the hooked block added.
     * If hooked blocks have already been added, and the hook is removed, the 
     * hooked blocks will be removed from the editor.
     */
    if ( 
      'TwentyTwentyFour' === $context->theme &&
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


//add_filter( 'hooked_block_myprefix/block-hook-php', 'set_block_layout_attribute_based_on_adjacent_block', 10, 4 );

function set_block_layout_attribute_based_on_adjacent_block( $hooked_block, $hooked_block_type, $relative_position, $anchor_block ) {
  snt_dump( $anchor_block );


    // Has the hooked block been suppressed by a previous filter?
    if ( is_null( $hooked_block ) ) {
      return $hooked_block;
    }
 
    // Is the hooked block adjacent to the anchor block?
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

/**
 * Test
 */

add_filter( 'hooked_block', 'myprefix_block_hooks_test', 10, 5 );

function myprefix_block_hooks_test( $parsed_hooked_block, $hooked_block_type, $relative_position, $parsed_anchor_block, $context ) {

  snt_dump( $parsed_hooked_block, '~', 'dumped' );
  //snt_dump( $hooked_block_type, false, 'dumped' );
  //snt_dump( $relative_position, false, 'dumped' );
  //snt_dump( $parsed_anchor_block, false, 'dumped' );
  //snt_dump( $context, false, 'dumped' );

 return $parsed_hooked_block;
}