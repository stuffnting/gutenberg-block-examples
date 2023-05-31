# meta-attributes

## Description

This example adds a block with a `TexControl` component, where, the entered text is stored as post meta. Unlike the other meta examples, this block uses the older method, which uses and attribute with `source: meta`, rather than `useEntityProp`.

Note, this code also uses the old way of registering blocks, using the `enqueue_block_editor_assets` action hook, rather than a `block.json` file.

## In this code

**`meta-attribute.php`**

- Registers the block without using a `block.json` file and the `init` action hook, instead using the
  `enqueue_block_editor_assets` action hook.

- Registers the met field.

- Makes the meta field key available to JS code using `wp_add_inline_script()`.

- Displays the meta field on the front-end using the `the_content` filter.

**`meta-attribute.index.js`**

- Registers the block without using a `block.json` file.
- Uses an block attribute to store the meta field value in the editor.

```
attributes: {
  content: {
    type: "string",
    source: "meta",
    meta: MYPREFIX_META_ATTRIBUTE_FIELD,
  },
}
```

## Notes

### The current favoured method using `useEntityProp`

The method described in this example is no longer the preferred method, according to the [WordPress documentation](https://developer.wordpress.org/block-editor/how-to-guides/metabox/). The other meta examples use the more modern method.

### Meta values and the `save` function

The meta data is not available to the `save` function, and can not be used there. In fact, no React hooks are useable in a `save` function. To find out more, see [here](https://github.com/WordPress/gutenberg/issues/36265#issuecomment-962684758).

In this example, because the block is rendered by a callback function on the front-end, and because there are no inner blocks, there is nothing for the `save` function to process, therefore, `null` is returned.

### Sharing the meta key

The meta field name is defined only once, in `meta-attribute.php` file. It is made available to JS code using `wp_add_inline_script()`.

It is also possible to make the meta field key available to the JS script using `wp_localize_script()`, or a JSON file. `meta-callback` `wp_localize_script()`, whereas, all the other meta example use A JSON file.

### Meta field keys starting with an underscore

Meta data field names that begin with an underscore are private. Private fields will not appear in the editor's Custom Fields section. To update a private field, `auth_callback` must return `true`.

To see the Custom Fields in the editor, 3-dot menu (top-right) -> Preferences -> Panels -> Additional -> Custom Fields.

## Also see

Compare with the [`meta-simple`](../meta-simple/) example, which uses the newer `useEntityProp` method.

## Uses

**PHP WP functions**

- [`wp_enqueue_script`](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)

- [`wp_add_inline_script`](https://developer.wordpress.org/reference/functions/wp_add_inline_script/)

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`register_post_meta`](https://developer.wordpress.org/reference/functions/register_post_meta/)

- [`get_post_meta`](https://developer.wordpress.org/reference/functions/get_post_meta/)

**PHP WP actions**

- [`enqueue_block_editor_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/)

**PHP WP filters**

- [`the_content`](https://developer.wordpress.org/reference/functions/the_content/)

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)
