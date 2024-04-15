<?php
/**
 * This example adds a `Back to the top` link after the core/post-content block.
 * It does this by adding core/paragraph block, which is wrapped in a core/group block
 * that allows setting `layout` and styles.
 * 
 * @see {@link https://developer.wordpress.org/news/2024/03/25/exploring-the-block-hooks-api-in-wordpress-6-5/#innercontent-and-innerblocks-example-3}
 */

/**
 * Add a core/paragraph block after the core/post-content block.
 */
add_filter( 'hooked_block_types', 'myprefix_add_paragraph_after_post_content', 10, 4 );

function myprefix_add_paragraph_after_post_content( $hooked_block_types, $relative_position, $anchor_block_type, $context ) {

  if ( 
    // Only hook the block on Single templates (posts).
    ( 
      $context instanceof WP_Block_Template 
      && property_exists( $context, 'slug' ) 
      && 'single' === $context->slug 
    )
  ) {
    if ( 
      'core/post-content' === $anchor_block_type &&
      'after' === $relative_position
    ) {
      $hooked_block_types[] = 'core/paragraph';
    }
  }

  return $hooked_block_types;
}


/**
 * Alter the hooked core/paragraph block to provide it with content, and wrap the content in an out core/group block.
 */
add_filter( 'hooked_block_core/paragraph', 'myprefix_modify_hooked_paragraph_block', 10, 5 );

function myprefix_modify_hooked_paragraph_block( $parsed_hooked_block, $hooked_block_type, $relative_position, $parsed_anchor_block, $context  ) {

  // Has the hooked block been suppressed by a previous filter?
  if ( is_null( $parsed_hooked_block ) ) {
    return $parsed_hooked_block;
  }

  // Only apply the updated attributes if the block is hooked after a Post Content block.
  if ( 
    'core/post-content' === $parsed_anchor_block['blockName'] &&
    'after' === $relative_position
  ) {

    // Set the font size and the alignment of the text in the Paragraph block.
    $parsed_hooked_block['attrs'] = array(
      'align'    => 'right',
      'fontSize' => 'small'
    );
    $parsed_hooked_block['innerContent'] = array( 
      '<p class="has-text-align-right has-small-font-size"><a href="#">' . __( 'Back to the very top' ) . '</a></p>' 
    );

    // Wrap the Paragraph block in a Group block with a constrained layout and top margin.
    return array(
      'blockName'    => 'core/group',
      'attrs'        => array(
        "layout" => array(
          "type" => "constrained"
        ),
        'style'  => array(
          'spacing' => array(
            'margin' => array(
              'top' => 'var:preset|spacing|40'
            )
          )
        )
      ),
      'innerBlocks'  => array( $parsed_hooked_block ),
      'innerContent' => array(
        '<div class="wp-block-group" style="margin-top:var(--wp--preset--spacing--40)">',
        null,
        '</div>'
      ),
    );
  }

  return $parsed_hooked_block;
}