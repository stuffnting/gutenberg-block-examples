<?php

/**
 * Use filter
 */ 

 add_filter( 'get_block_type_variations', 'myprefix_add_core_block_type_variations', 10, 2 );

 function myprefix_add_core_block_type_variations( $variations, $block_type ) {
 
  // This variation chooses 'Show media on right`, the default block is on left.
  if ( 'core/media-text' === $block_type->name ) {
    $variations[] = array(
      'name'       => 'myprefix-media-right',
      'title'      => __( 'Media & Text: Right', 'myprefix' ),
      'scope'      => 'transformer',
      'isActive'   => array(
        'mediaPosition' 
      ),
      'attributes' => array(
        'mediaPosition' => 'right'
      )
    );
  }

   return $variations;
 }