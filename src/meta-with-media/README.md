# meta-with-media

## Description

This example adds a [meta box](https://developer.wordpress.org/plugins/metadata/custom-meta-boxes/) containing a media uploader to the Document Settings sidebar.

**Note, this example does not register a block.**

## In this code

**`meta-with-media.php`**

- Enqueues the script file. Note, there is no block to register for this example.

- Fetches the meta key from `meta-with-select-doc-settings.metafield.json`.

- Registers the meta field.

- Adds a `the_content` filter to use the meta on the front-end.

**`meta-with-media.php.index.js`**

- Registers the plugin.

- Defines the `MetaImagePanel` component, that adds the media uploader.

**`meta-with-media.metafield.json`**

- Contains the meta field key.

## Notes

### `useEntityProp`

`useEntityProp`is a custom React hook and is defined [here](https://github.com/WordPress/gutenberg/blob/trunk/packages/core-data/src/entity-provider.js#L85). It has four parameters, three of which are used in this example: `entityKind` (e.g. postType), `entityType` (e.g. post), `propertyName` (e.g. meta). It returns and array: [ value, setValue, fullValue ], the value, setter function and the full value of the meta field (object from REST API containing more information like raw, rendered and protected props).

### The meta key

The meta field name is defined only once, in `meta-document-settings.metafield.json` file, making it easily available to JS and PHP code.

The meta key is not set in `meta-document-settings-simple.block.json`, because `metaField` (or, equivalent) is not in the schema for the `block.json` file. Thus, its presence will be flagged as an error when using `"$schema": "https://schemas.wp.org/trunk/block.json"`.

It is also possible to set the meta name in the PHP file, and make it available to the JS script using `wp_localize_script()`, or `wp_add_inline_script()`. These methods are demonstrated in `meta-callback` and `meta-attribute` respectively.

### Meta field keys starting with an underscore

Meta data field names that begin with an underscore are private. Private fields will not appear in the editor's Custom Fields section. To update a private field, `auth_callback` must return `true`.

To see the Custom Fields in the editor, 3-dot menu (top-right) -> Preferences -> Panels -> Additional -> Custom Fields.

## Also see

The documentation for [`MediaUpload`](https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md) and [`MediaUploadCheck`](https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md) on GitHub.

The [`meta-document-settings`](../meta-document-settings/) example gives a more basic run through of adding meta boxes to the Document Settings sidebar.

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

- [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)

  - `useSelect`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`Button`](https://developer.wordpress.org/block-editor/reference-guides/components/button/)

  - [`ResponsiveWrapper`](https://developer.wordpress.org/block-editor/reference-guides/components/responsive-wrapper/)

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - [`MediaUpload`](https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md)

  - [`MediaUploadCheck`](https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md)

- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)

  - `useEntityProp`

- [`@wordpress/plugins`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-plugins/)

  - `registerPlugin`

- [`@wordpress/edit-post`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-edit-post/)

  - `PluginDocumentSettingPanel`

**JS WP data module**

- [`core/editor`](https://developer.wordpress.org/block-editor/reference-guides/data/data-core-editor/)

  - `getCurrentPostType`
