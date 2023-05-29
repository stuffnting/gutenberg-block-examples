# dynamic-inner-blocks

## Description

This block has a dynamic section, which lists the latest posts, and also allows inner blocks to be added. The allowed inner blocks are limited to the core paragraph, heading, and list blocks. This example demonstrates how `innerBlockProps.children` can be used to add the inner blocks, without a wrapper tag.

## In this code

**`dynamic-inner-blocks.php`**

- Registers the `myprefix/dynamic-inner-blocks` block.

- Adds a callback function to render the block on the front-end. It renders both the list of recent posts, and the inner blocks.

**`dynamic-inner-blocks.index.js`**

- Registers the `myprefix/dynamic-inner-blocks` block.

- Imports the `GetPosts` component form `get-posts.js`.

- imports the stylesheet.

**`get-posts.js`**

- Adds the `GetPosts` component, which uses `useEntityRecords` to get the most recent posts.

- Renders the fetched posts into a list to display in the editor.

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

### `edit` and `save` functions

In `dynamic-inner-blocks.index.js` the `edit` function renders the block in the editor. It adds an outer wrapper for the whole block, using `useBlockProps` to add the correct classname (`wp-block-myprefix-dynamic-inner-blocks`) to the `div` tag.

In both the `edit` and `save` functions, `useInnerBlockProps` is used to insert the inner blocks without a wrapper tag. This is achieved using `innerBlockProps.children`.

Normally, the `save` functions of dynamic blocks return `null`, because the callback function in the PHP file renders the block on the front end. In this case however, the `save` function needs to return the inner blocks, otherwise they will not be "remembered".

There is no need to have `useBlockProps` in the `save` function, because the outer dynamic part of the block is not stored in the post. For the front-end, the dynamic part is rendered by the callback function in the PHP file, where `get_block_wrapper_attributes()` is used to add the correct classname for the outer wrapper.

### Front-end block wrapper

The callback function uses [`get_block_wrapper_attributes()`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/) to generate the HTML attributes for the block's wrapping tag. In this case it adds the `wp-block-myprefix-dynamic-inner-blocks` classname.

## Also see

For more ways to use `useInnerBlockProps`, including using it with a wrapper tag, see the other inner block examples.

For an example where `perPage` can be changed from the Block Inspector, see the [`dynamic-inspector-query-terms`](../dynamic-inspector-query-terms/) example.

As well as rendering dynamic blocks using a callback function in the PHP file, it is also possible to use a PHP template file. For an example of how to do this, see the [`render-PHP-template`](../render-php-template/) example.

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`wp_get_recent_posts`](https://developer.wordpress.org/reference/functions/wp_get_recent_posts/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/element`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/)

  - `memo`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `useInnerBlocksProps`

  - `InnerBlocks`

- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)

  - `useEntityRecords`
