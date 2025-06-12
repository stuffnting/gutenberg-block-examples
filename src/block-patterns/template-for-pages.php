<?php

add_action('init', 'myprefix_register_template');

function myprefix_register_template() {
  $post_type_object = get_post_type_object('page');
  $post_type_object->template = array(
    array('core/group', array(), array(
      array('core/heading', array(
        'level' => '2',
        'textAlign' => 'center',
        'placeholder' => 'Enter a heading…'
      )),
      array('core/paragraph', array(
        'dropCap' => 'true',
        'placeholder' => 'Enter some text…'
      )),
    ))
  );
  $post_type_object->template_lock = 'contentOnly';
}
