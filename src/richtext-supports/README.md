# richtext-supports

## Description

This example demonstrates the different `supports` that can be added to a block.

For more details of which supports are available, see the [Gutenberg Handbook](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/).

## In this code

**`richtext-supports.php`**

- Registers the `myprefix/richtext-supports` block.

- Adds an action that will add theme support for UI controls that are opt-in.

**`richtext-supports.index.js`**

- Registers the `myprefix/richtext-supports` block.

**`richtext-supports.block.json`**

- Contains all of teh `supports` settings.

## Notes

**`supports`**

Full details of `supports` can be found in the [Gutenberg Handbook](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/).

**`Theme Support`**

Some UI controls used by several `supports` features need the theme to opt in. There is a list [here](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/#opt-in-into-ui-controls).

If the theme does not opt in, the PHP file adds an action that will take care of it.

## Also see

The Gutenberg Handbook's documentation on [attributes](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/).

For details of adding text alignment buttons to `RichText` components, see the [`richtext-text-align`](../richtext-text-align/) example.

The [`filter-core-block-supports`](../filter-core-block-supports/) example.

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

- [`after_setup_theme`](https://developer.wordpress.org/reference/hooks/after_setup_theme/)

**JS WP dependencies**

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `RichText`
