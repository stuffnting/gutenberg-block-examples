import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
  __experimentalNumberControl as NumberControl,
  PanelBody,
  TextControl,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  // The product price and name can be entered in the editor.
  const { productPrice = 0.0, productName = "" } = attributes;

  // The Interactivity API is not accessible in the editor (backend), so example numbers are used to preview the block.
  const exampleNumItems = 2;
  const exampleSalesTax = 10;

  const total = productPrice * exampleNumItems * (1 + exampleSalesTax / 100);

  // Ensure value in the number input is always 2 d.p.
  const productPriceRounded = productPrice.toFixed(2);

  // Format the display price and total as currency, and the sales tax as a percentage.
  const productPriceFormatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(productPrice);

  const exampleSalesTaxFormatted = Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(exampleSalesTax / 100);

  const totalFormatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(total);

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody title={__("Product settings")}>
          <TextControl
            label={__("Set the product name.", "wp-i-api-state-context-demo")}
            value={productName}
            onChange={(value) =>
              setAttributes({
                productName: value,
              })
            }
          />
          <NumberControl
            label={__("Set the product price.", "wp-i-api-state-context-demo")}
            help={__(
              "The price is set per product (block). Min price = 1.00",
              "wp-i-api-state-context-demo"
            )}
            value={productPriceRounded}
            min={0.05}
            step={0.05}
            shiftStep={1}
            onChange={(value) =>
              setAttributes({
                productPrice: Number(value),
              })
            }
          />
        </PanelBody>
      </InspectorControls>
      <div className="product">
        <div className="product-name">{productName}</div>
        <form className="product-form">
          <label for="number-items" className="product-label">
            {__("Number of items:", "wp-i-api-state-context-demo")}
          </label>
          <div class="product-number-items">
            <input
              disabled
              value={exampleNumItems}
              className="product-number-items-form"
              type="number"
              id="number-items"
            />
          </div>
          <output className="product-output">
            {[
              __("The total of your ", "wp-i-api-state-context-demo"),
              <span>{exampleNumItems}</span>,
              __(" items @ ", "wp-i-api-state-context-demo"),
              <span>{productPriceFormatted}</span>,
              __(" is ", "wp-i-api-state-context-demo"),
              <span>{totalFormatted}</span>,
              __(" inc. sales tax @ ", "wp-i-api-state-context-demo"),
              <span>{exampleSalesTaxFormatted}</span>,
            ]}
          </output>
        </form>
      </div>
    </div>
  );
}
