# dynamic-attributes

## Description

This example adds a block that has a `TextControl` component, the value entered is stored in an attribute. The block uses a callback function, demonstrating how attributes stored by a block can be accessed via PHP when the page is rendered.

## In this code

**`dynamic-attribute.php`**

- Registers the `myprefix/dynamic-attribute` block.

- Defines a callback function, which is used to render the block on the front-end.

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

### Callback function

The callback function has three parameters:

- `$attributes`, the attributes used by the block.

- `$content`, the inner content of the block.

- `$block_object`, the block object for the instance in the editor.

In this example only `$attributes` is used, since the block has no content.

### Front-end block wrapper

The callback function uses [`get_block_wrapper_attributes()`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/) to generate the HTML attributes for the block's wrapping tag.

## Also see

The [`meta-callback`](../meta-callback/) example similar to this one, however, it stores the value as using post metadata, rather than an block attribute.

As well as rendering dynamic blocks using a callback function in the PHP file, it is also possible to use a PHP template file. For an example of how to do this, see the [`render-PHP-template`](../render-php-template/) example.

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`
