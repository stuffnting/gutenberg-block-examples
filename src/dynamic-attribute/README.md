# Dynamic Attribute

## Description

This example block adds a `TextControl` component to the editor, and the value entered is stored in an attribute.

## In this code

**`dynamic-attribute.php`**

- Registers the `myprefix/dynamic-attribute` block.
- Defines a callback function, which is used to display the value stored in the `content` attribute on the front-end.

**`dynamic-attribute.index.js`**

- Registers the `myprefix/dynamic-attribute` block. Note, since the block is dynamic, and is rendered by a callback function on the front-end, the `save` function returns `null`.

**`dynamic-attribute.block.json`**

- Defines the `content` attribute.

      "attributes": {
        "content": {
          "type": "string",
          "default": ""
        }
      },

## Notes

### Attribute default value

Defining a default value of an empty string for the attribute prevents the React warning:

> Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen.

### Front-end block wrapper

The callback function uses [`get_block_wrapper_attributes()`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/) to generate the HTML attributes for the block's wrapping tag.

## Uses

**JS WP dependencies**

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)
  - `useBlockProps`
- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)
  - `registerBlockType`
  - `createBlock`
- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)
  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)
- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

## Also see

The `dynamic-meta-block` example similar to this one, however, it stores the value as using post metadata, rather than an block attribute.
