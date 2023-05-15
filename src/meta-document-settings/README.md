# Meta Document Settings

## Description

This example adds a [meta box](https://developer.wordpress.org/plugins/metadata/custom-meta-boxes/) to the Document Settings sidebar. The metadata is then used on the front-end, using the `the_content` filter.

## In this code

**`meta-document-settings.php`**

- Enqueues the script file. Note, there is no block to register for this example.
- Fetches the meta key from `meta-simple.metafield.json`.
- Registers the meta filed.
- Adds a `the_content` filter to use the meta on the front-end.

**`meta-document-settings.index.js`**

- Registers a plugin to add the meta box.
- Adds the `DocPanelMetaFields` component that deals with the post meta.

**`meta-document-settings.metafield.json`**

- Contains the key for the meta field.

## Notes

### The meta key

The meta field name is defined only once, in `meta-document-settings.metafield.json` file, making it easily available to JS and PHP code.

The meta key is not set in `meta-document-settings-simple.block.json`, because `metaField` (or, equivalent) is not in the schema for the `block.json` file. Thus, its presence will be flagged as an error when using `"$schema": "https://schemas.wp.org/trunk/block.json"`.

It is also possible to set the meta name in the PHP file, and make it available to the JS script using `wp_localize_script()`, or `wp_add_inline_script()`. These methods are demonstrated in `meta-callback` and `meta-attribute` respectively.

### `useEntityProp`

The meta values are managed using the `useEntityProp` React hook.

### Meta field keys starting with an underscore

Meta data field names that begin with an underscore are private. Private fields will not appear in the editor's Custom Fields section. To update a private field, `auth_callback` must return `true`.

To see the Custom Fields in the editor, 3-dot menu (top-right) -> Preferences -> Panels -> Additional -> Custom Fields.

## Uses

**JS WP dependencies**

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)
  - [`PanelBody`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)
  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)
- [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)
  - `useSelect`
- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)
  - `useEntityProp`
- [`@wordpress/plugins`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-plugins/)
  - `registerPlugin`
- [`@wordpress/edit-post`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-edit-post/)
  - `PluginDocumentSettingPanel`
- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)
  - `__`

**PHP WP functions**

- [`register_post_meta`](https://developer.wordpress.org/reference/functions/register_post_meta/)
- [`get_post_meta`](https://developer.wordpress.org/reference/functions/get_post_meta/)
- [`wp_enqueue_script`](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)
- [`enqueue_block_editor_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/)

**PHP WP filters**

- [`the_content`](https://developer.wordpress.org/reference/functions/the_content/)

## Also see

The Gutenberg Handbook's section on [Meta Boxes](https://developer.wordpress.org/block-editor/how-to-guides/metabox/)
