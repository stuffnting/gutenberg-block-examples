# Meta Simple

## Description

This example adds a block that contains a `TextControl` component, which is used to enter a value for the post meta. The meta is then used on the front-end, using the `the_content` filter.

## In this code

**`meta-simple.php`**

- Registers the block.
- Fetches the meta key from `meta-simple.metafield.json`.
- Registers the meta filed.
- Adds a `the_content` filter to use the meta on the front-end.

**`meta-simple.index.js`**

- Registers the block.
- Fetches the meta key from `meta-simple.metafield.json`.
- Processes the metadata using `useEntityProp`.

**`meta-simple.block.json`**

- Uses `supports.multiple` to only allow a single instance of the block in the editor. Thus, the metadata can only be set from a single block.

      "supports": {
        "multiple": false
      },

**`meta-simple.metafield.json`**

- Contains the key for the meta field.

## Note

### The meta key

The meta field name is defined only once, in `meta-simple.metafield.json` file, making it easily available to JS and PHP code.

The meta key is not set in `meta-simple.block.json`, because `metaField` (or, equivalent) is not in the schema for the `block.json` file. Thus, its presence will be flagged as an error when using `"$schema": "https://schemas.wp.org/trunk/block.json"`.

It is also possible to set the meta name in the PHP file, and make it available to the JS script using `wp_localize_script()`, or `wp_add_inline_script()`. These methods are demonstrated in `meta-callback` and `meta-attribute` respectively.

### Meta field keys starting with an underscore

Meta data field names that begin with an underscore are private. Private fields will not appear in the editor's Custom Fields section. To update a private field, `auth_callback` must return `true`.

To see the Custom Fields in the editor, 3-dot menu (top-right) -> Preferences -> Panels -> Additional -> Custom Fields.

### `useEntityProp` vs `source: meta`

The old method for dealing with metadata in blocks was to use an attribute with `source` set to meta. For example:

    attributes: {
      content: {
        type: "string",
        source: "meta",
        meta: MYPREFIX_META_KEY,
      },
    }

The `meta-attribute` block contains an example of this method.

Since WordPress 5.4, the recommended method is to use the `useEntityProp` hook. This returns the meta fields for the post and a function for changing them.

### Meta values and the `save` function

The meta data is not available to the `save` function, and can not be used there. In this example, because the block is rendered by a callback function on the front-end, and because there are no inner blocks, there is nothing for the `save` function to process, therefore, `null` is returned.

## Uses

**JS WP dependencies**

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)
  - `useBlockProps`
- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)
  - `registerBlockType`
- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)
  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)
- [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)
  - `useSelect`
- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)
  - `useEntityProp`
- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)
  - `__`

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)
- [`register_post_meta`](https://developer.wordpress.org/reference/functions/register_post_meta/)
- [`get_post_meta`](https://developer.wordpress.org/reference/functions/get_post_meta/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**PHP WP filters**

- [`the_content`](https://developer.wordpress.org/reference/functions/the_content/)

## Also see

The Gutenberg Handbook's section on [Meta Boxes](https://developer.wordpress.org/block-editor/how-to-guides/metabox/)
