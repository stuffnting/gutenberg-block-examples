# Meta Notices Save Lock

## Description

This example adds a block that displays the date-time, entered via a date-picker in the Block Inspector. If no date is entered, the post is locked, and it can not be updated/saved. Also, a notice is displayed, warning the the post can not be saved.

The chosen date-time is saved as post meta, and displayed on the front-end using a callback function.

## In this code

**`meta-notices-save-lock.php`**

- Registers the `myprefix/meta-notices-save-lock` block.
- Adds a callback function to render the block on the front-end.
- Fetches the meta field key from the `meta-notices-save-lock.metafield.js`.
- Registers the meta field.

**`meta-notices-save-lock.index.js`**

- Registered the block.
- Contains the block's `save` function that returns `null`.

**`meta-notices-save-lock.edit.js`**

- Adds the Block Inspector controls that contains the date-picker.
- Handles the meta field using `useEntityProp`.

**`notices.js`**

- Handles the save lock and notices.

**`meta-notices-save-lock.metafield.json`**

- Contains the meta field key name.

## Notes

### The meta key

The meta field name is defined only once, in `meta-document-settings.metafield.json` file, making it easily available to JS and PHP code.

The meta key is not set in `meta-document-settings-simple.block.json`, because `metaField` (or, equivalent) is not in the schema for the `block.json` file. Thus, its presence will be flagged as an error when using `"$schema": "https://schemas.wp.org/trunk/block.json"`.

It is also possible to set the meta name in the PHP file, and make it available to the JS script using `wp_localize_script()`, or `wp_add_inline_script()`. These methods are demonstrated in `meta-callback` and `meta-attribute` respectively.

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

### Meta field keys starting with an underscore

Meta data field names that begin with an underscore are private. Private fields will not appear in the editor's Custom Fields section. To update a private field, `auth_callback` must return `true`.

To see the Custom Fields in the editor, 3-dot menu (top-right) -> Preferences -> Panels -> Additional -> Custom Fields.

## Uses

**JS WP dependencies**

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)
  - `useBlockProps`
  - `InspectorControls`
- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)
  - `registerBlockType`
- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)
  - [`PanelBody`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)
  - [`DateTimePicker`](https://developer.wordpress.org/block-editor/reference-guides/components/date-time/)
- [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)
  - `useSelect`
  - `useSelect`
  - `select`
  - `dispatch`
- [`@wordpress/element`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/)
  - `useEffect`
- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)
  - `useEntityProp`
- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)
  - `__`

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)
- [`register_post_meta`](https://developer.wordpress.org/reference/functions/register_post_meta/)
- [`get_post_meta`](https://developer.wordpress.org/reference/functions/get_post_meta/)
- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

## Also see
