# render-php-template

## Description

This example demonstrates the use of a PHP template file to render the block on the front-end.

The block is a simple `RichText` block, although dynamic blocks can be rendered in this way too.

## In this code

**`render-php-template.php`**

- Registers the `myprefix/render-php-template` block.

**`render.php`**

- Provides a template for rendering the block on the front-end.

**`render-php-template.index.js`**

- Registers the `myprefix/render-php-template` block. Note, since the block is dynamic, and is rendered by a callback function on the front-end, the `save` function returns `null`.

- Uses the `ServerSideRender` component to render the block in the editor.

**`render-php-template.block.json`**

- Adds `supports`:

  - `color`

  - `typography`

  - `spacing`

- Specifies the render template file, as `"render": "file:./render.php"`

## Notes

### Template files and callback functions

In the dynamic block examples, the blocks are rendered on the front-end by a callback function in the PHP file. In this example, however, a PHP template file is used.

The callback function has three parameters:

- `$attributes` (array).

- `$content` (string).

- `$block` (WP_Block).

These are also available as variables within the template file.

Dynamic content is content that will change, and is generated in the moment, such as a list of recent posts. As such it is not saved within the editor, but rendered by code.

In a block with dynamic content, `$content` will refer to any allowed inner blocks, since the dynamic content is not saved. In a static (normal) block, the `save` function needs to save the block's contents, it is then this saved content that will be available via the `$content` parameter, or variable.

It is worth noting that any block can be rendered on the front-end using a PHP callback function, or template file. However, using PHP rendering is more usual for dynamic blocks, and is generally not used for static content.

### Block wrapper

The callback function uses [`get_block_wrapper_attributes()`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/) to generate the HTML attributes for the block's wrapping tag.

## Uses

## Also see

The dynamic block examples, which all use a callback function, rather than a template file; for example, [`dynamic-simple`](../dynamic-simple/).

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`wp_get_recent_posts`](https://developer.wordpress.org/reference/functions/wp_get_recent_posts/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `RichText`
