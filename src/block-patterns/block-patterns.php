<?php

/******************************************************************************
 * 
 * Enable/disable the core block patterns.
 * 
 * This still leaves patterns registered by themes and plugins.
 * 
 ******************************************************************************/

add_action( 'after_setup_theme', 'myprefix_block_patterns_setup' );

function myprefix_block_patterns_setup() {
  if ( !current_theme_supports( 'core-block-patterns' ) ) {
    add_theme_support('core-block-patterns');
  }
  if ( current_theme_supports( 'core-block-patterns' ) ) {
    // remove_theme_support('core-block-patterns');
  }
}


/******************************************************************************
 * 
 * Unregister patterns and pattern categories
 * 
 ******************************************************************************/

add_action('init', 'myprefix_unregister_block_patterns');

function myprefix_unregister_block_patterns() {

  // Don't let this code break versions of WP < 5.5
  if ( !class_exists( 'WP_Block_Patterns_Registry' ) ) {
    return;
  }
  
  $patterns_instance = WP_Block_Patterns_Registry::get_instance();
  
  // Unregister some core patterns
  if ( $patterns_instance->is_registered( 'core/query-medium-posts' ) ) {
    unregister_block_pattern('core/query-medium-posts');
  }
  
  if ( $patterns_instance->is_registered( 'core/query-small-posts' ) ) {
    unregister_block_pattern('core/query-small-posts');
  }
  
  if ( $patterns_instance->is_registered( 'core/query-grid-posts' ) ) {
    unregister_block_pattern('core/query-grid-posts');
  }
  
  // Unregister a whole core category
  $categories_instance = WP_Block_Pattern_Categories_Registry::get_instance();
  
  if ( $categories_instance->is_registered('text') ) {
    unregister_block_pattern_category('text');   
  }
  
}


/******************************************************************************
 * 
 * Register patterns and pattern categories
 * 
 ******************************************************************************/

add_action('init', 'myprefix_register_block_patterns');

function myprefix_register_block_patterns() {
  
  // Don't let this code break versions of WP < 5.5
  if ( !class_exists( 'WP_Block_Patterns_Registry' ) ) {
    return;
  }
  
  // Register a new block pattern category. If the category is empty it will not appear in the inserter.
  register_block_pattern_category('myprefix-patterns', 
    ['label' => __('Some patterns by myprefix', 'textDomain')]
  );
  
  /**
   * myprefix/image-and-text
   * 
   * See README.md for details
   */
  $pattern_escaped_html_1 = "<!-- wp:group {\"align\":\"full\"} -->\r\n<div class=\"wp-block-group alignfull\"><div class=\"wp-block-group__inner-container\"><!-- wp:columns {\"verticalAlignment\":\"top\",\"align\":\"full\"} -->\r\n<div class=\"wp-block-columns alignfull are-vertically-aligned-top\"><!-- wp:column {\"verticalAlignment\":\"top\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-top\"><!-- wp:image {\"sizeSlug\":\"large\"} -->\r\n<figure class=\"wp-block-image size-large\"><img src=\"https://www.stuffnting.com/wp-content/uploads/2017/08/D-R_test_DSC00280_sml.jpg\" alt=\"\"/><figcaption>Caption number one</figcaption></figure>\r\n<!-- /wp:image -->\r\n\r\n<!-- wp:paragraph {\"className\":\"is-style-default\"} -->\r\n<p class=\"is-style-default\">One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy.</p>\r\n<!-- /wp:paragraph --></div>\r\n<!-- /wp:column -->\r\n\r\n<!-- wp:column {\"verticalAlignment\":\"top\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-top\"><!-- wp:image {\"sizeSlug\":\"large\"} -->\r\n<figure class=\"wp-block-image size-large\"><img src=\"https://www.stuffnting.com/wp-content/uploads/2017/08/D-R_test_DSC00280_sml.jpg\" alt=\"\"/><figcaption>Caption number 3</figcaption></figure>\r\n<!-- /wp:image -->\r\n\r\n<!-- wp:paragraph {\"className\":\"is-style-default\"} -->\r\n<p class=\"is-style-default\">Folly words widow one downs few age every seven. If miss part by fact he park just shew. Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly. Easy mind life fact with see has bore ten. Parish any chatty can elinor direct for former. Up as meant widow equal an share least.</p>\r\n<!-- /wp:paragraph --></div>\r\n<!-- /wp:column -->\r\n\r\n<!-- wp:column {\"verticalAlignment\":\"top\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-top\"><!-- wp:image {\"sizeSlug\":\"large\"} -->\r\n<figure class=\"wp-block-image size-large\"><img src=\"https://www.stuffnting.com/wp-content/uploads/2017/08/D-R_test_DSC00280_sml.jpg\" alt=\"\"/><figcaption>Caption number three</figcaption></figure>\r\n<!-- /wp:image -->\r\n\r\n<!-- wp:paragraph {\"className\":\"is-style-default\"} -->\r\n<p class=\"is-style-default\">Village did removed enjoyed explain nor ham saw calling talking. Securing as informed declared or margaret. Joy horrible moreover man feelings own shy. Request norland neither mistake for yet. Between the for morning assured country believe. On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common. My little garret repair to desire he esteem.</p>\r\n<!-- /wp:paragraph --></div>\r\n<!-- /wp:column --></div>\r\n<!-- /wp:columns --></div></div>\r\n<!-- /wp:group -->";
    
  register_block_pattern('myprefix/image-and-text', [
    'title' => __('Images and text in columns', 'textDomain'),
    'description' => __('My nice block pattern', 'textDomain'),
    'keywords' => ['columns', 'pictures'],
    'categories' => array('columns', 'myprefix-patterns'),
    'blockTypes' => ['core/paragraph', 'core/image', 'core/post-content'],
    'postTypes' => [ 'post' ],
    'viewportWidth' => 840,
    'content' => $pattern_escaped_html_1,
  ]);

  /**
   * myprefix/heading-example
   * 
   * See README.md for details
   */

  $pattern_single_quote_html_1 = ' <!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
  <figure class="wp-block-image size-large"><img src="https://www.stuffnting.com/wp-content/uploads/2017/08/D-R_test_DSC00280_sml.jpg" alt=""/></figure>
  <!-- /wp:image --><!-- wp:heading {"level":3,"backgroundColor":"black","textColor":"white"} -->
  <h3 class="has-white-color has-black-background-color has-text-color has-background">My most excellent heading</h3>
  <!-- /wp:heading -->';

  register_block_pattern(
    'myprefix/heading-example', [
        'title'         => __( 'Black heading with a nice image' ),
        'categories'    => array( 'myprefix-patterns' ),
        'blockTypes'    => array( 'core/heading' ), // These are the block for which this pattern will be suggested
        'viewportWidth' => 500,
        'content'       => $pattern_single_quote_html_1,
    ]);

/**
 * myprefix/lock-example
 * 
 * See README.md for details
 */
$pattern_single_quote_html_2 = '<!-- wp:group {"templateLock":"contentOnly", "layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading {"backgroundColor":"pale-pink","textColor":"base"} -->
<h2 class="has-base-color has-pale-pink-background-color has-text-color has-background">A heading here</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>A paragraph here</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->';

register_block_pattern(
  'myprefix/lock-example', [
      'title'         => __( 'Template lock tester' ),
      'categories'    => array( 'myprefix-patterns' ),
      'blockTypes'    => array( 'core/heading' ), // These are the block for which this pattern will be suggested
      'viewportWidth' => 500,
      'content'       => $pattern_single_quote_html_2,
  ]);
}


/******************************************************************************
 * 
 * Disable the Page Construction Pattern modal by removing core/post-content
 * from all patterns registered by the theme and plugins. There are no core
 * patterns that use core/post-content.
 * 
 ******************************************************************************/

//add_action('init', 'myprefix_disable_page_constructor_modal', 99);

function myprefix_disable_page_constructor_modal() {
  $patterns = WP_Block_Patterns_Registry::get_instance()->get_all_registered();
  foreach ( $patterns as $pattern ) {
      if (
          ! empty($pattern['blockTypes'] ) &&
          in_array('core/post-content', $pattern['blockTypes'] )
      ) {
          unregister_block_pattern( $pattern['name'] );
          $pattern['blockTypes'] = array_diff( $pattern['blockTypes'], array( 'core/post-content' ) );
          register_block_pattern( $pattern['name'], $pattern );
      }
  }
}


/******************************************************************************
 * 
 * List registered patterns and pattern categories
 *
 * ***NOTE*** Needs PHP 7+
 * 
 ******************************************************************************/

add_filter( 'wp_loaded', 'myprefix_list_block_patterns' );

function myprefix_list_block_patterns() {
  // Don't let this code break versions of WP < 5.5
  if ( !class_exists( 'WP_Block_Patterns_Registry' ) ) {
      return;
  }

  $pattern_array = WP_Block_Patterns_Registry::get_instance()->get_all_registered();

  $pattern_list = [];

  foreach ( $pattern_array as $pattern ) {
    $pattern_list[] = $pattern['name'];
  }

  $pattern_cats_array = WP_Block_Pattern_Categories_Registry::get_instance()->get_all_registered();

  $pattern_cats_list = [];

  foreach ( $pattern_cats_array as $cat ) {
    $pattern_cats_list[] = $cat['name'];
  }

  myprefix_print_patterns_to_console( $pattern_list, "Pattern List" );
  myprefix_print_patterns_to_console( $pattern_cats_list, "Pattern Cats List" );

}

/**
 * Log a filter parameters to the browser console.
 * 
 * ***NOTE*** This function needs PHP 7+.
 * 
 * @param array $list A list of registered patterns or pattern categories.
 * @param string $list_name The list name. 
 */
function myprefix_print_patterns_to_console( $list, $list_name ) {

  $myprefix_print_to_console = function() use ( $list, $list_name ) {

    $string =  print_r( $list, true );
    echo '<script>';
    echo "console.log( '*****$list_name*****' );";
    echo 'console.log( `'. addslashes( $string ) . '` );';
    echo '</script>';
  
  };

  add_action( 'wp_print_footer_scripts', $myprefix_print_to_console );
  add_action( 'admin_footer', $myprefix_print_to_console );

}