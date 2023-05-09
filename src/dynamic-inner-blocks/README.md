# Dynamic Inner Blocks

## Description

This block has a dynamic section, which lists the latest posts, and also allows inner blocks to be added.

## In this code

**`dynamic-inner-blocks.php`**

- Registers the `myprefix/dynamic-inner-blocks` block.
- Adds a callback function to render the block on the front-end. It renders both the list of recent posts, and the inner blocks.

**`dynamic-inner-blocks.index.js`**

- Registers the `myprefix/dynamic-inner-blocks` block.

**`get-posts.js`**

- Adds the `GetPosts` component, which uses `useEntityRecords` to get the most recent posts.
- Renders the fetched posts into a list to display in the editor.

## Notes

## `React.memo`

The `GetPosts` component uses [`React.memo`](https://legacy.reactjs.org/docs/react-api.html#reactmemo) to prevent the list of recent posts re-rendering when `perPage` has not changed.

In this example `perPage` does not actually. For an example where `perPage` can be changed from the Block Inspector, see the `dynamic-inspector-controls` example.

## `useEntityRecords`

The `GetPosts` component uses the `useEntityRecords` [hook](https://legacy.reactjs.org/docs/hooks-intro.html). It has 4 parameters:

- The kind of entity. In `GetPosts` the entity is a `postType`.
- The name of the entity. In `GetPosts` the `postType` is `posts`.
- Query arguments to use when getting the records. The only query arg used here is `perPage`.
- Hook options. Not used in this case.

The hook returns an object with three items, which are destructured to:

- `isResolving`: a boolean.
- `hasResolved`: a boolean.
- `records`: an array of the fetched posts.

## Uses

**JS WP dependencies**

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)
  - `useBlockProps`
  - `useInnerBlocksProps`
  - `InnerBlocks`
- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)
  - `registerBlockType`
- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)
  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)
- [`@wordpress/element`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/)
  - `memo`
- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)
  - `useEntityRecords`

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)
- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

## Also see

For an example where `perPage` can be changed from the Block Inspector, see the `dynamic-inspector-controls` example.
