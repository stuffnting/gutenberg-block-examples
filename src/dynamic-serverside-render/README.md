# dynamic-serverside-render

## Description

This example adds a dynamic block that lists the three most recent posts. The block is rendered, both on the front- and back-ends, by the serverside callback function in the PHP file. This is essentially the same as [`dynamic-simple`](../dynamic-simple/), however, PHP is used to render both in the editor, and on the front-end.

## In this code

**`dynamic-serverside-render.php`**

- Registers the `myprefix/dynamic-serverside-render` block.

- Defines a callback function, which renders the block, both on the front- and back-end.

**`dynamic-serverside-render.index.js`**

- Registers the `myprefix/dynamic-serverside-render` block. Note, since the block is dynamic, and is rendered by a callback function on the front-end, the `save` function returns `null`.

- Uses the `ServerSideRender` component to render the block in the editor.

**`dynamic-serverside-render.block.json`**

- Adds `supports`:

  - `color`

  - `typography`

  - `spacing`

## Notes

### The `ServerSideRender` component

The [`ServerSideRender`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/) component has several attributes, including [`skipBlockSupportAttributes`](https://make.wordpress.org/core/2023/03/06/add-new-prop-to-serversiderender-component/), which prevents style attributes added by block `supports` being added twice in the editor.

For another example using [`ServerSideRender`](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/archives), see the core/archives block on GitHub.

### Block wrapper

The callback function uses [`get_block_wrapper_attributes()`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/) to generate the HTML attributes for the block's wrapping tag.

## Also see

The Gutenberg Handbook's section on [`@wordpress/server-side-render`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/).

As well as rendering dynamic blocks using a callback function in the PHP file, it is also possible to use a PHP template file. For an example of how to do this, see the [`render-PHP-template`](../render-php-template/) example.

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`wp_get_recent_posts`](https://developer.wordpress.org/reference/functions/wp_get_recent_posts/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

- [`@wordpress/server-side-render`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/)

  - `ServerSideRender`
