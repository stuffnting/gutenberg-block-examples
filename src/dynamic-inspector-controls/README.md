# Dynamic Inspector Controls

## Description

This example creates a dynamic block that lists the most recent posts. A panel is added to the Block Inspector, which controls the appearance of the block's title.

Note, this block does not control the dynamic aspect of the block, i.e. how many recent posts are displayed. For an example of controlling a dynamic block's query, see the [`dynamic-inspector-query-terms`](../dynamic-inspector-query-terms/) example.

## In this code

**`dynamic-inner-blocks.php`**

- Registers the `myprefix/dynamic-inspector-controls` block.

- Adds a callback function to render the block on the front-end, which utilizes the block's attribute values.

**`dynamic-inspector-controls.index.js`**

- Registers the `myprefix/dynamic-inspector-controls` block.

- Imports the `GetPosts` component form `get-posts.js`.

- Imports the `PostListTitle` component from `post-list-title.js`.

- imports the `TheInspectorControls` from `the-inspector-controls.js`.

**`get-posts.js`**

- Adds the `GetPosts` component, which uses `useEntityRecords` to get the most recent posts.
- Renders the fetched posts into a list to display in the editor.

**`post-list-title.js`**

- Adds the `PostListTitle` component, which uses the block's attributes to format the block title.

**`the-inspector-controls.js`**

- Adds the `TheInspectorControls` component, which adds and manages the Block Inspector controls.

**`dynamic-inspector-controls.block.js`**

- Adds the block's four attributes:

  - `attribute.showTitle`&mdash;whether the block title is displayed.

  - `attribute.title`&mdash;the title shown in the block.

  - `attribute.font`&mdash;which style of font to use for the title.

  - `attribute.underline`&mdash;whether to underline the title.

```
"attributes": {
  "showTitle": {
    "type": "boolean",
    "default": true
  },
  "title": {
    "type": "string",
    "default": "A list of posts"
  },
  "font": {
    "type": "string",
    "default": "sans-serif"
  },
  "underline": {
    "type": "boolean",
    "default": false
  }
},
```

## Notes

### `React.memo`

The `GetPosts` component uses [`React.memo`](https://legacy.reactjs.org/docs/react-api.html#reactmemo) to prevent the list of recent posts re-rendering when `perPage` has not changed.

In this example `perPage` does not actually. For an example where `perPage` can be changed from the Block Inspector, see the [`dynamic-inspector-query-terms`](../dynamic-inspector-query-terms/) example.

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

## Also see

For an example of controlling a dynamic block's query, see the [`dynamic-inspector-query-terms`](../dynamic-inspector-query-terms/) example.

The `inspector-control-tabs` demonstrates how to place the Inspector controls in specific tabs. The tabs were introduced in WP 6.2.

For an example of how to include inner blocks within the dynamic block, see the [`dynamic-inner-blocks`](../dynamic-inner-blocks/) example.

As well as rendering dynamic blocks using a callback function in the PHP file, it is also possible to use a PHP template file. For an example of how to do this, see the [`render-PHP-template`](../render-php-template/) example.

## Uses

**JS WP dependencies**

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`wp_get_recent_posts`](https://developer.wordpress.org/reference/functions/wp_get_recent_posts/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/element`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/)

  - `memo`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`PanelBody`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)

  - [`PanelRow`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)

  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)

  - [`ToggleControl`](https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/)

  - [`SelectControl`](https://developer.wordpress.org/block-editor/reference-guides/components/select-control/)

  - [`CheckboxControl`](https://developer.wordpress.org/block-editor/reference-guides/components/checkbox-control/)

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `InspectorControls`

- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)

  - `useEntityRecords`
