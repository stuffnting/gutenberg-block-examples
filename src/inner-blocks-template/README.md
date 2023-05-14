# Inner Blocks Template

## Description

This example adds a parent block, `myprefix/inner-blocks-template-parent`, which uses a template so that it initially contains three core blocks: `core/heading`, `core/image` and `core/paragraph`. Extra blocks that can be added are limited to `core/paragraph` and `myprefix/inner-blocks-template-child`.

## In this code

**`inner-blocks-template.php`**

- Registers the parent and child block

**`inner-blocks-template.index.js`**

- Imports `inner-blocks-template-parent.index.js` and `inner-blocks-template-child.index.js`

**`inner-blocks-template-parent.index.js`**

- Registers `myprefix/inner-blocks-template-parent`.
- Defines the template used to add initial blocks to the parent block.
- Defined which extra blocks may be added to the parent.

**`inner-blocks-template-child.index.js`**

- Registers `myprefix/inner-blocks-template-child`, which has a simple message as its content.

**`inner-blocks-template-child.block.json`**

- Contains `"parent": ["myprefix/inner-blocks-template-parent"]`, which means the child block may only be added to the parent, and can not otherwise be added to the editor.

## Notes

### Template locking and allowed

In this example `templateLock` is set to `false`, meaning that blocks can be added, removed, and moved. However, only blocks in the `ALLOWED` constant can be added to the parent in the editor, that's: `core/paragraph` and `myprefix/inner-blocks-template-child`.

To add extra block to the parent, with the parent selected, click on the plus button ("Add Blocks"). You will see just the two blocks available.

The `block.json` file for `myprefix/inner-blocks-template-child` states `"parent": ["myprefix/inner-blocks-template-parent"]`, therefore, it can only be added to the parent block, and can't be used in other circumstances.

See [here](https://fullsiteediting.com/how-to-lock-blocks-and-templates/) for more on locking template.

### `useBlockProps` and `useInnerBlockProps`

Both `useBlockProps` and `useInnerBlockProps` are React hooks. They generate the information needed by the outermost wrapper tags of the block, and in the case of `useInnerBlockProps`, generates the inner `children` blocks.

In this example there is a single wrapper for the block itself and the inner blocks it contains. This is because the block itself only contains the inner blocks. Sometimes, the block will contain inner blocks and other content, for an example see the `dynamic-inner-blocks` example.

See here for more details about [`useInnerBlockProps`](https://make.wordpress.org/core/2021/12/28/take-more-control-over-inner-block-areas-as-a-block-developer/)

## Uses

**JS WP dependencies**

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)
  - `useBlockProps`
  - `InnerBlocks`
- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)
  - `registerBlockType`

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

## Also see

For a simple example of inner blocks without using a template see `inner-blocks`.

For an example that uses block `context` to pass values from a parent block to a child block see `inner-blocks-context`.

The `dynamic-inner-blocks` example demonstrates using inner blocks with other content.