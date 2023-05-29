# dynamic-simple

## Description

This example adds a dynamic block that lists the last three posts. The block is rendered on the front-end using a PHP callback function, but is rendered in the editor using JS. Essentially the same as [`dynamic-serverside-render`](../dynamic-serverside-render/), although that block uses PHP on the front- and back-ends.

## In this code

**`dynamic-simple.php`**

- Registers the `myprefix/dynamic-simple` block.

- Defines a callback function, which is used to render the block on the front-end.

**`dynamic-simple.index.js`**

- Registers the `myprefix/dynamic-simple` block. Note, since the block is dynamic, and is rendered by a callback function on the front-end, the `save` function returns `null`.

- Gets the most recent posts to render in the editor.

## Notes

### Dynamic content

Dynamic content is content that will change, and is generated in the moment, such as a list of recent posts. As such it is not saved within the editor, but rendered by code.

A dynamic block is rendered on the front-end using a callback function, which is specified when the block is registered in the PHP code, or, a PHP template file, which is specified in the `block.json` file as render (this latter method was introduced in WP 6.1).

In the editor, dynamic blocks are either rendered using JS in the browser, or they can be rendered sever-side using PHP (either the callback function, or a template file ). See [`dynamic-serverside-render`](../dynamic-serverside-render/) for an example.

While dynamic blocks have an `edit` function in the JS file, as normal, their `save` functions usually return null, unless inner blocks are allowed. See [`dynamic-inner-blocks`](../dynamic-inner-blocks/) for an example.

It is worth noting that any block can be rendered on the front-end using a PHP callback function, or template file. However, using PHP rendering is more usual for dynamic blocks, and is generally not used for static content.

### The callback function

The callback function has three parameters:

- `$attributes` (array).

- `$content` (string).

- `$block` (WP_Block).

In a block with dynamic content, `$content` will refer to any allowed inner blocks. In this example there aren't any inner blocks, and `$content` will be empty.

The callback function uses [`get_block_wrapper_attributes()`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/) to generate the HTML attributes for the block's wrapping tag.

## An older method

This example uses the newer `useEntityRecords` hook method. Before WP 6.1 the recent posts were fetched with `useSelect`:

    const posts = useSelect((select) => {
      return select("core").getEntityRecords("postType", "post");
    }, []);

## Also see

As well as rendering dynamic blocks using a callback function in the PHP file, it is also possible to use a PHP template file. For an example of how to do this, see the [`render-PHP-template`](../render-php-template/) example.

There is an example of using dynamic content with inner blocks in [`dynamic-inner-blocks`](../dynamic-inner-blocks/).

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)

  - `useEntityRecords`
