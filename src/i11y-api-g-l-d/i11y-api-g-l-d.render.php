<?php
// Populates the initial global state values. This data will apply to all instances of the block.
wp_interactivity_state('product-calculator', array(
  'salesTax' => 15,
));

/**
 * Local context Values. These apply to each instance of the block separately.
 * `productPrice` is entered in the editor and not changed on the front-end. 
 * `numItems` is what the front-end user enters.
 */
$context = array(
  'productPrice' => $attributes['productPrice'] ?? 0,
  'numItems' => 0
);
?>

<div
  <?php echo get_block_wrapper_attributes(); ?>
  data-wp-interactive="product-calculator"
  <?php echo wp_interactivity_data_wp_context($context); ?>>
  <form aria-label="<?php esc_attr_e('Calculate the impact of your donation.'); ?>" class="product">
    <div class="product-name"><?php echo $attributes['productName'] ?? '' ?> <span data-wp-text="state.formattedPrice"></span></div>
    <label for="number-items" class="product-label"><?php esc_html_e('Enter the number of items you want to buy:'); ?></label>
    <div class="product-number-items">
      <input
        data-wp-on--input="actions.calculate"
        placeholder="0"
        min="0"
        type="number"
        id="number-items"
        class="product-number-items-form">
    </div>
    <label for="sales-tax" class="product-label"><?php esc_html_e('Enter your local sales tax (%):'); ?></label>
    <div class="product-sales-tax">
      <input
        data-wp-on--input="actions.upDateSalesTax"
        data-wp-bind--value="state.salesTax"
        value=""
        min="0"
        type="number"
        id="sales-tax"
        class="product-sales-tax-form"> %
    </div>
    <output
      class="product-output"
      data-wp-class--show="state.show">
      <?php
      echo sprintf(
        esc_html__('The total of your %s item%s @ %s is %s inc. tax @ %s.'),
        '<span data-wp-text="context.numItems"></span>',
        '<span data-wp-text="state.plural" class="items-plural"></span>',
        '<span data-wp-text="state.formattedPrice"></span>',
        '<span data-wp-text="state.formattedTotal"></span>',
        '<span data-wp-text="state.formattedSalesTax"></span>'
      ); ?>
    </output>
  </form>
</div>