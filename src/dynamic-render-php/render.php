<p <?php echo get_block_wrapper_attributes(); ?>>
    <?php esc_html_e( 'Hello from a dynamic block!', 'textDomain' ); ?>
    <?php 
      // The block's saved content.
      echo $content;
      // $attributes and $block (the whole block instance) can also be used
    ?>
</p>