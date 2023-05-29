# richtext-transforms-multiblock

## Description

This example is similar to [`richtext-transforms-simple`](../richtext-transforms-simple/), but the transformations to apply to multiple blocks. Multiple `core/paragraph` blocks can be transformed into multiple `richtext-transforms-multiblock` blocks, and multiple `richtext-transforms-multiblock` blocks can be transformed into multiple paragraphs, or a list.

## In this code

**`richtext-transforms-multiblock.php`**

- Registers the `myprefix/richtext-transforms-multiblock` block.

**`richtext-transforms-multiblock.index.js`**

- Imports the `edit` function from `richtext-transforms-multiblock.edit.js`.

- Imports the `save` function from `richtext-transforms-multiblock.save.js`.

- Imports the `transforms` object from `richtext-transforms-multiblock.transforms.js`.

- Registers the `myprefix/richtext-transforms-multiblock` block.

**`richtext-transforms-multiblock.transforms.js`**

- Contains an transforms object that describes the transformations.

## Notes

### The transforms object

The details of the transformation object can be found in the [Gutenberg Handbook](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-transforms/#block)

In this example `isMultiBlock` is set to `true`, and whereas, [`richtext-transforms-simple`](../richtext-transforms-simple/) deals with a single block's `attributes`, this block deals with an array of `attributes` from multiple blocks.

## Also see

The Gutenberg Handbook's [documentation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-transforms/#block)

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

  - `createBlock`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `RichText`
