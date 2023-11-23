# block-hooks-json

## Description

This example uses a block hook to prepend the `myprefix/block-hook-json` block to any `core/column` block contained within any pattern or template. The hook is added in the `block.json` file. More conditional use of hooks is possible using the `hooked_block_types` PHP hook.

## In this code

**`block-hook-json.php`**

- Registers the `myprefix/block-hook-json` block.

- Defines a callback function, which is used to render the block on the front-end.

**`block-pattern.php`**

- Registers the `myprefix/image-and-text-hook-test` which can be used to test the hook.

**`block-hook-json.index.js`**

- Registers the `myprefix/block-hook-json` block. Note, since the block is dynamic, and is rendered by a callback function on the front-end, the `save` function returns `null`.

**`block-hook-json.json`**

- Uses the `blockHooks` to define the block hook.

## Notes

### Dynamic content and callback

See the [`dynamic-simple`](../dynamic-simple/README.md) example.

### Block hooks

Block hooks were introduced in WP 6.4 (see [here](https://make.wordpress.org/core/2023/10/15/introducing-block-hooks-for-dynamic-blocks/)). They act a little like hooks in PHP, and allow for a plugin or block theme to insert a block before or after specified blocks.

Block hooks can be implemented in two ways:

- via the block.json file—unconditional attachment.

- via the hooked_block_types PHP filter—unconditional and conditional attachment .

This example uses the former.

There are four ways of using the hook to attach a block:

- `before` the target block;

- `after` the target block;

- as the `first-child` of a parent block block, e.g. `core/column`;

- as the `last-child` of a parent block, e.g. `core/column`.

## Also see

The [`block-hooks-php`](../block-hooks-php/) example.

The [`dynamic-simple`](../dynamic-simple/) example.

The [`block-patterns`](../block-patterns/) example.

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

- [`register_block_pattern`](https://developer.wordpress.org/reference/functions/register_block_pattern/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`
