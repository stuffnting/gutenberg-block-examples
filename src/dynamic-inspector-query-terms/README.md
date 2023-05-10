# Dynamic Inspector Query Terms

## Description

This code creates a dynamic block that lists the most recent posts. The number of posts displayed can be controlled from the block inspector.

## In this code

**`dynamic-inspector-query-terms.php`**

- Registers the `myprefix/dynamic-inspector-query-terms` block.
- Adds a callback function to render the block on the front-end, which utilizes the block's attribute values.

**`dynamic-inspector-query-terms.index.js`**

- Registers the `myprefix/dynamic-inspector-query-terms` block.
- Imports the `GetPosts` component form `get-posts.js`.
- imports the `TheInspectorControls` from `the-inspector-controls.index.js`\*\*

**`get-posts.js`**

- Adds the `GetPosts` component, which uses `useEntityRecords` to get the most recent posts.
- Renders the fetched posts into a list to display in the editor.

**`the-inspector-controls.js`**

- Adds the `TheInspectorControls` component, which adds and manages the Block Inspector controls.

## Notes

### `React.memo`

The `GetPosts` component uses [`React.memo`](https://legacy.reactjs.org/docs/react-api.html#reactmemo) to prevent the list of recent posts re-rendering when `perPage` has not changed. When the Block Inspector controls change `perPage`, the `GetPosts` will re-render.

### `useEntityRecords`

The `GetPosts` component uses the `useEntityRecords` [hook](https://legacy.reactjs.org/docs/hooks-intro.html). It has 4 parameters:

- The kind of entity. In `GetPosts` the entity is a `postType`.
- The name of the entity. In `GetPosts` the `postType` is `posts`.
- Query arguments to use when getting the records. The only query arg used here is `perPage`.
- Hook options. Not used in this case.

The hook returns an object with three items, which are destructured to:

- `isResolving`: a boolean.
- `hasResolved`: a boolean.
- `records`: an array of the fetched posts.

### Front-end block wrapper

The callback function uses [`get_block_wrapper_attributes()`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/) to generate the HTML attributes for the block's wrapping tag.

## Uses

**JS WP dependencies**

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)
  - `useBlockProps`
  - `InspectorControls`
- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)
  - `registerBlockType`
- [`@wordpress/element`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/)
  - `memo`
- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)
  - [`PanelBody`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)
  - [`PanelRow`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)
  - [`__experimentalNumberControl`](https://developer.wordpress.org/block-editor/reference-guides/components/number-control/) as `NumberControl`
- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)
  - `useEntityRecords`
- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)
  - `__`

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)
- [`wp_get_recent_posts`](https://developer.wordpress.org/reference/functions/wp_get_recent_posts/)
- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

## Also see

For more BLock Inspector controls see the `dynamic-inspector-controls` example.
