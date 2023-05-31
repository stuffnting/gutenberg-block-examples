# meta-block-inspector

## Description

This example adds a block that displays the date-time, entered via a date-picker in the Block Inspector. The chosen date-time is saved as post meta, and displayed on the front-end using a callback function.

## In this code

**`meta-block-inspector.php`**

- Registers the block.
- Fetches the meta key from `meta-block-inspector.metafield.json`.
- Registers the meta filed.
- Adds a callback to render the block on the front-end.

**`meta-block-inspector.index.js`**

- Registers the block.
- Adds the Block Inspector controls for the date-picker.
- Handles the post meta using `useEntityProp`.
- The `save` function returns `null`, as the meta values are not available to it.

**`meta-block-inspector.metafield.json`**

- Contains the meta filed key.

## Notes

### The meta key

The meta field name is defined only once, in `meta-document-settings.metafield.json` file, making it easily available to JS and PHP code.

The meta key is not set in `meta-document-settings-simple.block.json`, because `metaField` (or, equivalent) is not in the schema for the `block.json` file. Thus, its presence will be flagged as an error when using `"$schema": "https://schemas.wp.org/trunk/block.json"`.

It is also possible to set the meta name in the PHP file, and make it available to the JS script using `wp_localize_script()`, or `wp_add_inline_script()`. These methods are demonstrated in `meta-callback` and `meta-attribute` respectively.

### `useEntityProp`

`useEntityProp`is a custom React hook and is defined [here](https://github.com/WordPress/gutenberg/blob/trunk/packages/core-data/src/entity-provider.js#L85). It has four parameters, three of which are used in this example: `entityKind` (e.g. postType), `entityType` (e.g. post), `propertyName` (e.g. meta). It returns and array: [ value, setValue, fullValue ], the value, setter function and the full value of the meta field (object from REST API containing more information like raw, rendered and protected props).

### Meta values and the `save` function

The meta data is not available to the `save` function, and can not be used there. In fact, no React hooks are useable in a `save` function. To find out more, see [here](https://github.com/WordPress/gutenberg/issues/36265#issuecomment-962684758).

In this example, because the block is rendered by a callback function on the front-end, and because there are no inner blocks, there is nothing for the `save` function to process, therefore, `null` is returned.

### Meta field keys starting with an underscore

Meta data field names that begin with an underscore are private. Private fields will not appear in the editor's Custom Fields section. To update a private field, `auth_callback` must return `true`.

To see the Custom Fields in the editor, 3-dot menu (top-right) -> Preferences -> Panels -> Additional -> Custom Fields.

## Also see

The [`inspector-control-tabs`](../inspector-control-tabs/) example which demonstrates how to use the settings and style tabs.

The [`dynamic-inspector-controls`](../dynamic-inspector-controls/) and [`dynamic-inspector-query-terms`](../dynamic-inspector-query-terms/).

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

- [`register_post_meta`](https://developer.wordpress.org/reference/functions/register_post_meta/)

- [`get_post_meta`](https://developer.wordpress.org/reference/functions/get_post_meta/)

**PHP WP actions**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)

  - `useSelect`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`DateTimePicker`](https://developer.wordpress.org/block-editor/reference-guides/components/date-time/)

  - [`PanelBody`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)

  - [`useEntityProp`](https://github.com/WordPress/gutenberg/blob/trunk/packages/core-data/src/entity-provider.js#L85)

**JS WP data module**

- [`core/editor`](https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/)

  - `getCurrentPostType`
