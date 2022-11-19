<?php
/**
 * This code adds the ability to use the query var comment_count with
 * the core/query block, that doesn't usually support it.
 */

 // These constants are used in this file, and the JS file.
 define('MYPREFIX_VARIATIONS_QUERY_BLOCK_PER_PAGE', 4);
 define('MYPREFIX_VARIATIONS_QUERY_BLOCK_NAMESPACE', 'myprefix/variations-query-block');


/**
 * Only enqueue index.js in the editor.
 */
add_action( 'enqueue_block_editor_assets', 'myprefix_variations_query_block_editor' );

function myprefix_variations_query_block_editor() {
  
  if ( ! function_exists( 'register_block_type' ) ) {
    // Gutenberg is not active.
    return;
  }

  wp_enqueue_script( 
    'myprefix-variations-query-block-script', 
    MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
    array( 'lodash', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-element', 'wp-hooks', 'wp-i18n' ),
    filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
  );

  // Make the meta key available to index.js. The script handle (1st param), is set by WP, as block.json registers index.js.
  wp_localize_script( 'myprefix-variations-query-block-script', 'localizeObject', array(
    "MYPREFIX_VARIATIONS_QUERY_BLOCK_PER_PAGE"  => MYPREFIX_VARIATIONS_QUERY_BLOCK_PER_PAGE,
    "MYPREFIX_VARIATIONS_QUERY_BLOCK_NAMESPACE" => MYPREFIX_VARIATIONS_QUERY_BLOCK_NAMESPACE
  ) );
}


/**
 * Make the core/query block variation work on the front end. 
 * 
 * Use the pre_render_block filter to conditionally filter the blocks.
 * 
 * If the block is core/query with namespace equal to myprefix/variations-query-block
 * add a query_loop_block_vars filter to filter the query. This allows for extra 
 * query vars to be added, and existing ones to be changed.
 * 
 * Note, the default query vars are changed when the variation is registered in the JS file,
 * but PHP knows nothing about this. Therefore, make the changes to the defaults here too, 
 * as well as adding the new query vars.
 * 
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/extending-the-query-loop-block/
 * @see https://developer.wordpress.org/reference/hooks/pre_render_block/
 * @see https://developer.wordpress.org/reference/hooks/query_loop_block_query_vars/
 */

add_filter( 'pre_render_block', 'myprefix_query_variation_front_end', 10, 3);

function myprefix_query_variation_front_end($pre_render, $parsed_block, $parent_block) {

  if( isset( $parsed_block[ 'attrs' ][ 'namespace' ] ) && 
  MYPREFIX_VARIATIONS_QUERY_BLOCK_NAMESPACE === $parsed_block[ 'attrs' ][ 'namespace' ] ) {

    add_filter(
      'query_loop_block_query_vars',
      function( $query, $block, $page ) {
        // Add new
        $query['comment_count'] = array(
          'value' => $block->context['query']['commentCount'],
          'compare' => '>=', // Posts with greater than or equal to comment_count
        );

        // Change default
        $query['posts_per_page'] = MYPREFIX_VARIATIONS_QUERY_BLOCK_PER_PAGE;

        return $query;
      },
      10,
      3
    );
  }

  return null;
}

/**
 * Make the core/query block variation work in the editor.
 * 
 * This requires filtering the of the REST API arguments.
 * 
 * Since the REST API can use commentCount equal to, but not
 * >= etc., this code will result the return of posts with the 
 * number of comments equal to the commentCount, rather than >=.
 * 
 * @see https://developer.wordpress.org/reference/hooks/rest_this-post_type_query/
 */

add_filter( 'rest_post_query', 'myprefix_query_variation_editor', 10, 2 );
  
function myprefix_query_variation_editor( $args, $request ) {

  if ( $request->has_param( 'commentCount' ) ) {
    $args['comment_count'] = $request->get_param( 'commentCount' ); // Posts exactly comment_count
  }
  
  return $args;
};
