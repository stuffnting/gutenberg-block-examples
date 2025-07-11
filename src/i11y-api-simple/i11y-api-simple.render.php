<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Generates a unique id for aria-controls.
$unique_id = wp_unique_id('p-');

// Adds the global state.
wp_interactivity_state(
  'myprefix-simple-store',
  array(
    'isDark'    => false,
    'darkText'  => esc_html__('Switch to Light', 'i11y-api-simple'),
    'lightText' => esc_html__('Switch to Dark', 'i11y-api-simple'),
    'themeText'  => esc_html__('Switch to Dark', 'i11y-api-simple'),
  )
);
?>

<div
  <?php echo get_block_wrapper_attributes(); ?>
  data-wp-interactive="myprefix-simple-store"
  <?php echo wp_interactivity_data_wp_context(array('isOpen' => false)); ?>
  data-wp-watch="callbacks.logIsOpen"
  data-wp-class--dark-theme="state.isDark">
  <button
    data-wp-on--click="actions.toggleTheme"
    data-wp-text="state.themeText"></button>

  <button
    data-wp-on--click="actions.toggleOpen"
    data-wp-bind--aria-expanded="context.isOpen"
    aria-controls="<?php echo esc_attr($unique_id); ?>">
    <?php esc_html_e('Toggle', 'i11y-api-simple'); ?>
  </button>

  <p
    id="<?php echo esc_attr($unique_id); ?>"
    data-wp-bind--hidden="!context.isOpen">
    <?php
    esc_html_e('I11y Api Simple - hello from an interactive block!', 'i11y-api-simple');
    ?>
  </p>
</div>