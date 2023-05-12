<div <?php echo get_block_wrapper_attributes(); ?>>
<p class="has-text-align-center"><?php esc_html_e( 'A block rendered by a PHP template file!', 'textDomain' ); ?></P>
    <?php 
      // The block's saved content.
      echo $content;
      // $attributes and $block (the whole block instance) can also be used
    ?>
</div>