# filter-core-block-supports

## Description

This example adds three `blocks.registerBlockType` filters to alter the [`supports`](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/) of three core blocks.

1. Restrict `align` support of `full`, or `none` to the core/cover block type.

2. Adds `align` support for `wide` and `full`, to the core/code block type.

3. Adds support for `color.background`, to the core/spacer block type.

**Note, no blocks are registered in this example.**

## In this code

**`filter-core-block-supports.php`**

- registers the script file.

**`filter-core-block-supports.index.js`**

- Adds the three `blocks.registerBlockType` filters.

## Notes

### `supports`

for a full list of `supports` see the [`Gutenberg Handbook`](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/)

Changing the default `supports` for core block types is a straight forward process. The necessary `attributes`, that are used to store values for the supported features, are handled automatically.

## Also see

The `richtext-supports` example.

Also, look at the other filter examples.

- [`filter-block-settings`](../filter-block-settings/)

- [`filter-core-block-controls`](../filter-core-block-controls/)

- [`block-categories`](../block-categories/)

- [`block-styles`](../block-styles/)

## Uses

**PHP WP actions**

- [`enqueue_block_editor_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/)

**JS WP dependencies**

- [`@wordpress/hooks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/)

  - `addFilter`

**JS external dependencies**

- [`classnames`](https://www.npmjs.com/package/classnames)

**JS WP filters**

- [`blocks.registerBlockType`](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#blocks-registerblocktype)
