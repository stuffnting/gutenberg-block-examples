# meta-with-select-doc-settings

## Description

This example adds a [meta box](https://developer.wordpress.org/plugins/metadata/custom-meta-boxes/) to the Document Settings sidebar. The metadata is then used on the front-end, using the `the_content` filter.

**Note, this is the older method using [Higher Order Components (HOC)](https://legacy.reactjs.org/docs/higher-order-components.html), together with `withSelect`, and `withDispatch`. For the newer method, that uses the `useEntityProp` hook, see the [`meta-document-settings`](../meta-document-settings/) example.**

**Note, this example does not register a block.**

## In this code

**`meta-with-select-doc-settings.php`**

- Enqueues the script file. Note, there is no block to register for this example.

- Fetches the meta key from `meta-with-select-doc-settings.metafield.json`.

- Registers the meta field.

- Adds a `the_content` filter to use the meta on the front-end.

**`meta-with-select-doc-settings.index.js`**

- Registers the plugin.

- Defines the `DocPanelMetaFields` component, which adds a `TextControl` to the sidebar.

- Turns `DocPanelMetaFields` into an HOC, using `withSelect` and `withDispatch`.

**`meta-with-select-doc-settings.metafield.json`**

- Contains the meta field key.

## Notes

### `withSelect` and `withDispatch`

Since WP 5.4 the preferred method of using post meta data has been using the `useEntityProp` hook. The method described in this example is the older way, which uses [HOCs](https://legacy.reactjs.org/docs/higher-order-components.html) and `withSelect` and `withDispatch`.

In this method the component which is adds the meta box to the sidebar is turned into an HOC, using `withSelect` and `withDispatch`, so that it can fetch and dispatch the meta value.

### The meta key

The meta field name is defined only once, in `meta-document-settings.metafield.json` file, making it easily available to JS and PHP code.

The meta key is not set in `meta-document-settings-simple.block.json`, because `metaField` (or, equivalent) is not in the schema for the `block.json` file. Thus, its presence will be flagged as an error when using `"$schema": "https://schemas.wp.org/trunk/block.json"`.

It is also possible to set the meta name in the PHP file, and make it available to the JS script using `wp_localize_script()`, or `wp_add_inline_script()`. These methods are demonstrated in `meta-callback` and `meta-attribute` respectively.

### Meta field keys starting with an underscore

Meta data field names that begin with an underscore are private. Private fields will not appear in the editor's Custom Fields section. To update a private field, `auth_callback` must return `true`.

To see the Custom Fields in the editor, 3-dot menu (top-right) -> Preferences -> Panels -> Additional -> Custom Fields.

## Also see

The modern way of handling meta boxes, using the `useEntityProp` hook, is demonstrated in the [`meta-document-settings`](../meta-document-settings/) example.

A White Pixel's [tutorial on meta boxes](https://awhitepixel.com/blog/how-to-add-post-meta-fields-to-gutenberg-document-sidebar/).

## Uses

**PHP WP functions**

- [`register_post_meta`](https://developer.wordpress.org/reference/functions/register_post_meta/)

- [`get_post_meta`](https://developer.wordpress.org/reference/functions/get_post_meta/)

- [`wp_enqueue_script`](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

- [`enqueue_block_editor_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/)

**PHP WP filters**

- [`the_content`](https://developer.wordpress.org/reference/functions/the_content/)

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`PanelBody`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)

  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)

- [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)

  - `withSelect`

  - `withDispatch`

- [`@wordpress/plugins`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-plugins/)

  - `registerPlugin`

- [`@wordpress/edit-post`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-edit-post/)

  - `PluginDocumentSettingPanel`

**JS WP data module**

- [`core/editor`](https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/)

  - `editPost`

  - `getEditedPostAttribute`
