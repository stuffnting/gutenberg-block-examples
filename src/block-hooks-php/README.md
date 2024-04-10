# block-hooks-json

## Description

This example uses a block hook to prepend the `myprefix/block-hook-php` block to any `core/post-title` block in the TwentyTwentyFour theme single template, and the `core/column` block in the contained within the `twentytwentyfour/text-feature-grid-3-col` pattern of the TwentyTwentyFour. The hook is added in the `block.json` file. 

Note, using PHP the hooks can be targeted at specific template files, template parts, or patterns registered by the theme (but, not patterns registered by plugins, the Pattern Directory, or a user).

## In this code

**`block-hook-php.php`**

- Registers the `myprefix/block-hook-php` dynamic block.

- Defines a callback function, which is used to render the block on the front-end.

- Adds the block hooks using the `hooked_block_types` filter.

**`block-hook-json.index.js`**

- Registers the `myprefix/block-hook-php` block. Note, since the block is dynamic, and is rendered by a callback function on the front-end, the `save` function returns `null`.

**`block-hook-json.json`**

- There is no `blockHooks` field, because the hooks are registered using PHP.

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

The [`block-hooks-json`](../block-hooks-json/) example.

The [`dynamic-simple`](../dynamic-simple/) example.

The [`block-patterns`](../block-patterns/) example.

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**PHP WP filters**

- [`hooked_block_types`](https://developer.wordpress.org/reference/hooks/hooked_block_types/)

**JS WP dependencies**

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`
