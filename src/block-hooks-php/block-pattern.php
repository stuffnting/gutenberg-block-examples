<?php
/**
   * myprefix/image-and-text
   * 
   * See README.md for details
   */

function myprefix_register_test_block_patterns() {
  $pattern_escaped_html_1 = "<!-- wp:group {\"align\":\"full\"} -->\r\n<div class=\"wp-block-group alignfull\"><div class=\"wp-block-group__inner-container\"><!-- wp:columns {\"verticalAlignment\":\"top\",\"align\":\"full\"} -->\r\n<div class=\"wp-block-columns alignfull are-vertically-aligned-top\"><!-- wp:column {\"verticalAlignment\":\"top\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-top\"><!-- wp:image {\"sizeSlug\":\"large\"} -->\r\n<figure class=\"wp-block-image size-large\"><img src=\"https://www.stuffnting.com/wp-content/uploads/2017/08/D-R_test_DSC00280_sml.jpg\" alt=\"\"/><figcaption>Caption number one</figcaption></figure>\r\n<!-- /wp:image -->\r\n\r\n<!-- wp:paragraph {\"className\":\"is-style-default\"} -->\r\n<p class=\"is-style-default\">One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy.</p>\r\n<!-- /wp:paragraph --></div>\r\n<!-- /wp:column -->\r\n\r\n<!-- wp:column {\"verticalAlignment\":\"top\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-top\"><!-- wp:image {\"sizeSlug\":\"large\"} -->\r\n<figure class=\"wp-block-image size-large\"><img src=\"https://www.stuffnting.com/wp-content/uploads/2017/08/D-R_test_DSC00280_sml.jpg\" alt=\"\"/><figcaption>Caption number 3</figcaption></figure>\r\n<!-- /wp:image -->\r\n\r\n<!-- wp:paragraph {\"className\":\"is-style-default\"} -->\r\n<p class=\"is-style-default\">Folly words widow one downs few age every seven. If miss part by fact he park just shew. Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly. Easy mind life fact with see has bore ten. Parish any chatty can elinor direct for former. Up as meant widow equal an share least.</p>\r\n<!-- /wp:paragraph --></div>\r\n<!-- /wp:column -->\r\n\r\n<!-- wp:column {\"verticalAlignment\":\"top\"} -->\r\n<div class=\"wp-block-column is-vertically-aligned-top\"><!-- wp:image {\"sizeSlug\":\"large\"} -->\r\n<figure class=\"wp-block-image size-large\"><img src=\"https://www.stuffnting.com/wp-content/uploads/2017/08/D-R_test_DSC00280_sml.jpg\" alt=\"\"/><figcaption>Caption number three</figcaption></figure>\r\n<!-- /wp:image -->\r\n\r\n<!-- wp:paragraph {\"className\":\"is-style-default\"} -->\r\n<p class=\"is-style-default\">Village did removed enjoyed explain nor ham saw calling talking. Securing as informed declared or margaret. Joy horrible moreover man feelings own shy. Request norland neither mistake for yet. Between the for morning assured country believe. On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common. My little garret repair to desire he esteem.</p>\r\n<!-- /wp:paragraph --></div>\r\n<!-- /wp:column --></div>\r\n<!-- /wp:columns --></div></div>\r\n<!-- /wp:group -->";
    
  register_block_pattern('myprefix/image-and-text-php-hook-test', [
    'title' => __('Images and text in columns to test PHP Block Hooks', 'textDomain'),
    'description' => __('My nice block pattern', 'textDomain'),
    'keywords' => ['columns', 'pictures'],
    'categories' => ['columns', 'buttons', 'team'],
    'postTypes' => [ 'post' ],
    'viewportWidth' => 840,
    'source ' => 'plugin',
    'content' => $pattern_escaped_html_1,
  ]);
}
add_action( 'init', 'myprefix_register_test_block_patterns' );



add_filter( 'the_content', 'myprefix_list_block_patterns', 1);

function myprefix_list_block_patterns($content) {
  // Don't let this code break versions of WP < 5.5
  if ( is_admin() || !is_main_query() || !class_exists( 'WP_Block_Patterns_Registry' ) ) {
      return $content;
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

 $out =  "<pre>" . print_r($pattern_list, true) . print_r($pattern_cats_list, true) . "</pre>";

  return $out . $content;
}