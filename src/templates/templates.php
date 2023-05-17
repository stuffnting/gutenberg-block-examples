<?php
/**
 * This file contains several examples of templates with different types of lock.
 * 
 * Uncomment one at a time to test them by starting a new post.
 * 
 */


/******************************************************************************
 * 
 * 1. The template is locked as contentOnly
 * 
 ******************************************************************************/

add_action( 'init', 'myprefix_register_template_1' );

function myprefix_register_template_1() {
    $post_type_object = get_post_type_object( 'post' );
    $post_type_object->template = array(
      array( 'core/group', array(), array(
        array( 'core/heading', array( 
          'level' => '2', 
          'textAlign' => 'center', 
          'placeholder' => 'Enter a heading...' 
        )),
        array( 'core/media-text', array(
          
        )),
        array( 'core/paragraph', array( 
          'backgroundColor' => 'pale-pink',
          'placeholder' => 'Enter some text...' 
        )),
      ))
    );
    $post_type_object->template_lock = 'contentOnly';
}


/******************************************************************************
 * 
 * 2. Only the second group is locked as contentOnly
 * 
 ******************************************************************************/

// add_action( 'init', 'myprefix_register_template_2' );

function myprefix_register_template_2() {
    $post_type_object = get_post_type_object( 'post' );
    $post_type_object->template = array(
      array( 'core/group', array(), array(
        array( 'core/heading', array( 
          'level' => '2', 
          'textAlign' => 'center', 
          'placeholder' => 'Enter a heading...' 
        ))
      )),
      array( 'core/group', array(
        'templateLock' => 'contentOnly'
      ), array(
        array( 'core/heading', array( 
          'level' => '2', 
          'textAlign' => 'center', 
          'placeholder' => 'Enter a heading...' 
        )),
        array( 'core/media-text', array(
          
        )),
        array( 'core/paragraph', array( 
          'backgroundColor' => 'pale-pink',
          'placeholder' => 'Enter some text...' 
        )),
      )),      
    );
}


/******************************************************************************
 * 
 * 3. The heading block has the block lock set.
 * 
 ******************************************************************************/

//add_action( 'init', 'myprefix_register_template_3' );

function myprefix_register_template_3() {
  $post_type_object = get_post_type_object( 'post' );
  $post_type_object->template = array(
    array( 'core/group', array(), array(
      array( 'core/heading', array( 
        'level' => '2', 
        'textAlign' => 'center', 
        // Lock this block. Can be changed from toolbar.
        'lock' => ['move' => true, 'remove' => true],
        'placeholder' => 'Enter a heading...' 
      )),
      array( 'core/media-text', array(
        
      )),
      array( 'core/paragraph', array( 
        'backgroundColor' => 'pale-pink',
        'placeholder' => 'Enter some text...' 
      )),
    ))
  );
}