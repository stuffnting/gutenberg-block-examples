# RichText Split Merge

## Description

When enter is hit with the cursor in the middle of the text in a `RichText` block, the block can be made to split into two of the same type of block. Similarly, two adjacent instances of the same type of block, can be made to merge into a single block using the delete, or backspace keys.

This example demonstrates how to add `split` and `merge` to a `RichText` component.

## In this code

**`richtext-split-merge.php`**

- Registers the `myprefix/richtext-split-merge` block.

**`richtext-split-merge.index.js`**

- Imports the block metadata from `richtext-split-merge.block.json`

- Imports the `edit` function from `richtext-split-merge.edit.js`

- Imports the `save` and `merge` functions from `richtext-split-merge.save.js`

- Registers the `myprefix/richtext-split-merge` block.

**`richtext-split-merge.edit.js`**

- Handles the block in the editor, adding a `RichText` which includes a `multiline` attribute.

**`richtext-split-merge.save.js`**

- Returns the markup for the block, that is saved in the database.

**`richtext-split-merge.block.json`**

- Adds the `content` attribute.

## Notes

### The merge function

The `merge` function, which is exported from `richtext-split-merge`, defines how the attributes form each of the two blocks should be merged. This includes the block's contents.

It has two parameters: `attributes` is the attributes from the first block; and, `attributesToMerge` is the attributes of the second block to be merged with it.

In this example, `merge` combines the `content` attributes of the two blocks, and deletes any classNames that might have been added to either block.

The function is used by `mergeBlock`, which is an action added to the block's `props`. The source code is [here](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/store/actions.js#L1020), although there seems to be little documentation.

## Also see

For a basic example of how to use block attributes, see [`richtext-basic`](../richtext-basic/).

For the basic use of `RichText` see [documentation on GitHub](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/rich-text/README.md)

For the source code for `mergeBlocks`, see [GitHUb](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/store/actions.js#L1020).

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

  - `creteBlock`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `RichText`
