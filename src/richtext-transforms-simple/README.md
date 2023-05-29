# richtext-transforms-simple

## Description

This example demonstrates a block being transformed from another block type, and to another block type. The `myprefix/richtext-transforms-simple` block can be transformed to a `core/heading`. or `core/paragraph` block. Also, the reverse transformation are possible, with `core/heading`. or `core/paragraph` blocks able to transform to `richtext-transforms-simple`.

The transformations are accessed by clicking on the block's icon, at the right-hand side of the block's toolbar.

## In this code

**`richtext-transforms-simple.php`**

- Registers the `myprefix/richtext-transforms-simple` block.

**`richtext-transforms-simple.index.js`**

- Imports the `edit` function from `richtext-transforms-simple.edit.js`.

- Imports the `save` function from `richtext-transforms-simple.save.js`.

- Imports the `transforms` object from `richtext-transforms-simple.transforms.js`.

- Registers the `myprefix/richtext-transforms-simple` block.

**`richtext-transforms-simple.transforms.js`**

- Contains an transforms object that describes the transformations.

## Notes

### The transforms object

The details of the transformation object can be found in the [Gutenberg Handbook](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-transforms/#block)

In this example the transformation are simple. The `transform` method creates a new block of the specified type, copies across the content and className, and adds a new classname containing a description of the transformation.

## Also see

The Gutenberg Handbook's [documentation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-transforms/#block)

The [`richtext-transforms-multiblock`](../richtext-transforms-multiblock/) example.

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

  - `createBlock`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `RichText`
