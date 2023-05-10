# Dynamic Meta Block

## Description

This example adds a block that has two metadata fields, as well as allowing inner blocks. The metadata is entered via the Block Inspector, and stored using meta keys registered in the PHP file.

For more about metadata see [here].

## In this code

**`dynamic-inner-blocks.php`**

- Registers the `myprefix/dynamic-meta-block` block.
- Adds a callback function to render the block on the front-end, which utilizes the block's attribute values.
- Registers the meta key `MYPREFIX_DYNAMIC_META_BLOCK_OBJECT`.
- Makes the meta key available to JS.

* In this example the meta field is named here,
* and wp_localize_script() is used to make the name available to the JS script.
* It is possible to name the meta field in the JSON file.
* For examples of how to do this, see the other meta block examples.

  - The block's meta values can not be used in its `save` function,
  - whereas, the block's inner-blocks are included. This means that
  - the meta values need to be added back into the HTML from
  - the `save` function.
  -
  - $meta_out is placed into the div wrapper added by the inner-block
  - by the `save` function.
    \*/
