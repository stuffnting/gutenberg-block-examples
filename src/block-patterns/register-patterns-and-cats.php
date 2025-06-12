<?php

/******************************************************************************
 * 
 * Register patterns and pattern categories
 * 
 ******************************************************************************/

add_action('init', 'myprefix_register_block_patterns');

function myprefix_register_block_patterns() {

  // Don't let this code break versions of WP < 5.5
  if (!class_exists('WP_Block_Patterns_Registry')) {
    return;
  }

  /**
   * Register a new block pattern category. 
   * If the category is empty it will not appear in the inserter.
   */
  register_block_pattern_category(
    'myprefix-patterns',
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
    'postTypes' => ['post'],
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
    'myprefix/heading-example',
    [
      'title'         => __('Black heading with a nice image'),
      'categories'    => array('myprefix-patterns'),
      'blockTypes'    => array('core/heading'), // These are the block for which this pattern will be suggested
      'viewportWidth' => 500,
      'content'       => $pattern_single_quote_html_1,
    ]
  );

  /**
   * template-lock-content-only-example
   * 
   * templateLock: contentOnly on containing block
   * 
   * See README.md for details
   */
  $pattern_single_quote_html_2 = '<!-- wp:group {"templateLock":"contentOnly","metadata":{"categories":["myprefix-patterns"],"patternName":"myprefix/lock-example","name":"Template lock tester"},"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading {"backgroundColor":"pale-pink","textColor":"base"} -->
<h2 class="wp-block-heading has-base-color has-pale-pink-background-color has-text-color has-background">A heading here</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>There is a spacer below here:</p>
<!-- /wp:paragraph -->

<!-- wp:spacer -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:paragraph -->
<p>Ice cream is a delightful frozen treat enjoyed by people of all ages. With its creamy texture and a wide variety of flavors, it offers a perfect way to cool down on a warm day or indulge in a moment of sweetness. From classic vanilla and rich chocolate to adventurous combinations like salted caramel or matcha, ice cream continues to evolve with new and exciting creations. Whether served in a cone, cup, or alongside desserts like brownies or fruit, it remains a beloved favorite across cultures.</p>
<!-- /wp:paragraph -->

<!-- wp:social-links {"openInNewTab":true,"showLabels":true,"layout":{"type":"flex","justifyContent":"center"}} -->
<ul class="wp-block-social-links has-visible-labels"><!-- wp:social-link {"service":"twitter"} /-->

<!-- wp:social-link {"service":"facebook"} /-->

<!-- wp:social-link {"service":"instagram"} /--></ul>
<!-- /wp:social-links --></div>
<!-- /wp:group -->';

  register_block_pattern(
    'myprefix/template-lock-content-only-example',
    [
      'title'         => __('templateLock tester', 'textDomain'),
      'description' => __('This pattern has templateLock: contentOnly', 'textDomain'),
      'categories'    => array('myprefix-patterns'),
      'blockTypes'    => array('core/heading', 'core/paragraph'), // These are the block for which this pattern will be suggested
      'viewportWidth' => 500,
      'content'       => $pattern_single_quote_html_2,
    ]
  );

  /**
   * template-lock-with-lock-example
   * 
   * templateLock: contentOnly on containing block, and the child blocks have the
   * lock attribute set separately (i.e. not applied from the containing block with 
   * 'Apply to all blocks inside')
   * 
   * See README.md for details
   */
  $pattern_single_quote_html_3 = '<!-- wp:group {"templateLock":"contentOnly","metadata":{"categories":["myprefix-patterns"],"patternName":"myprefix/lock-example","name":"Template lock tester"},"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading {"lock":{"move":true,"remove":true},"className":"has-base-color has-pale-pink-background-color has-text-color has-background"} -->
<h2 class="wp-block-heading has-base-color has-pale-pink-background-color has-text-color has-background">A heading here</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"lock":{"move":true,"remove":true}} -->
<p>There is a spacer below here:</p>
<!-- /wp:paragraph -->

<!-- wp:spacer -->
<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:paragraph {"lock":{"move":true,"remove":true}} -->
<p>Ice cream is a delightful frozen treat enjoyed by people of all ages. With its creamy texture and a wide variety of flavors, it offers a perfect way to cool down on a warm day or indulge in a moment of sweetness. From classic vanilla and rich chocolate to adventurous combinations like salted caramel or matcha, ice cream continues to evolve with new and exciting creations. Whether served in a cone, cup, or alongside desserts like brownies or fruit, it remains a beloved favorite across cultures.</p>
<!-- /wp:paragraph -->

<!-- wp:social-links {"openInNewTab":true,"showLabels":true,"className":"has-visible-labels","layout":{"type":"flex","justifyContent":"center"}} -->
<ul class="wp-block-social-links has-visible-labels"><!-- wp:social-link {"service":"twitter"} /-->

<!-- wp:social-link {"service":"facebook"} /-->

<!-- wp:social-link {"service":"instagram"} /--></ul>
<!-- /wp:social-links --></div>
<!-- /wp:group -->';

  register_block_pattern(
    'myprefix/template-lock-with-lock-example',
    [
      'title'         => __('templateLock with lock tester', 'textDomain'),
      'description' => __('This pattern has templateLock: contentOnly with the lock attribute set separately on the nested blocks', 'textDomain'),
      'categories'    => array('myprefix-patterns'),
      'blockTypes'    => array('core/heading', 'core/paragraph'), // These are the block for which this pattern will be suggested
      'viewportWidth' => 500,
      'content'       => $pattern_single_quote_html_3,
    ]
  );
}
