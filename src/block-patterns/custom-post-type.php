<?php
add_action('init', 'myprefix_custom_post_type', 0);

// Register Custom Post Type
function myprefix_custom_post_type() {
  $custom_post_type_template = array(
    array(
      'core/group',
      array(
        'layout' => array(
          'type' => 'constrained'
        )
      ),
      array(
        array(
          'core/heading',
          array(
            'placeholder' => 'Enter your title here',
            'textAlign' => 'center',
            'style' => array(
              'elements' => array(
                'link' => array(
                  'color' => array(
                    'text' => 'var:preset|color|accent-1'
                  )
                )
              )
            ),
            'backgroundColor' => 'contrast',
            'textColor' => 'accent-1',
            'fontSize' => 'x-large'
          ),
          array()
        ),
        array(
          'core/image',
          array(
            'id' => 760,
            'sizeSlug' => 'large',
            'linkDestination' => 'none'
          ),
          array()
        ),
        array(
          'core/paragraph',
          array('placeholder' => 'Enter some text about cheese here...'),
          array()
        ),
      )
    ),
  );

  $labels = array(
    'name'                  => _x('Template Tests', 'Post Type General Name', 'text_domain'),
    'singular_name'         => _x('Template Test', 'Post Type Singular Name', 'text_domain'),
  );
  $args = array(
    'label'                 => __('Template Test', 'text_domain'),
    'description'           => __('A post type to test the template_lock feature', 'text_domain'),
    'labels'                => $labels,
    'supports'              => array('title', 'editor'),
    'taxonomies'            => array('category', 'post_tag'),
    'hierarchical'          => false,
    'public'                => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'menu_position'         => 5,
    'show_in_admin_bar'     => true,
    'show_in_nav_menus'     => true,
    'can_export'            => true,
    'has_archive'           => true,
    'exclude_from_search'   => false,
    'publicly_queryable'    => true,
    'capability_type'       => 'post',
    'show_in_rest'          => true,
    // TEMPLATE
    'template'              => $custom_post_type_template,
    'template_lock'         => 'contentOnly'
  );
  register_post_type('test-template-lock', $args);
}
