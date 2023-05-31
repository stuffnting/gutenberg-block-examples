# meta-callback

## Description

This example adds a block that has two meta fields. The metadata is entered via the Block Inspector, and stored using a meta key registered in the PHP file.

The metadata is displayed on the front end via a callback function in the PHP file. The metadata thus appears at the point in the post where the block as inserted.

For more about metadata see [here](https://developer.wordpress.org/plugins/metadata/managing-post-metadata/).

## In this code

**`meta-callback.php`**

- Registers the `myprefix/meta-callback` block.

- Adds a callback function to render the block on the front-end, which utilizes the block's attribute values.

- Registers the meta key `MYPREFIX_META_CB_OBJECT`.

- Makes the meta key available to JS.

**`meta-callback.index.js`**

- Imports the metadata, the `edit` function, the `save` function, and the `scss` file.

**`meta-callback.edit.js`**

- Deals with the metadata using `useEntityProp`.
- Adds the Block Inspector controls, which contain the inputs for the metadata.

**`meta-callback.save.js`**

- Since this block only uses metadata, and there are no inner blocks, the `save` function returns `null`.

## Notes

### `useEntityProp`

`useEntityProp`is a custom React hook and is defined [here](https://github.com/WordPress/gutenberg/blob/trunk/packages/core-data/src/entity-provider.js#L85). It has four parameters, three of which are used in this example: `entityKind` (e.g. postType), `entityType` (e.g. post), `propertyName` (e.g. meta). It returns and array: [ value, setValue, fullValue ], the value, setter function and the full value of the meta field (object from REST API containing more information like raw, rendered and protected props).

### Metadata object

In this example there are two meta fields, which are stored in a single metadata object.

The object is registered with the [`register_post_meta()`](https://developer.wordpress.org/reference/functions/register_post_meta/) function, which also makes the metadata available through the REST API. Because the metadata is stored as an object, a `schema` is provided to describe the object.

It is also possible to register two meta keys, one for each field.

### The meta key

In this example the meta key is registered in the PHP file, using `register_post_meta()`. The key's name is then made available to the JS code via [`wp_localize_script()`](https://developer.wordpress.org/reference/functions/wp_localize_script/). The WordPress documentation says that [`wp_add_inline_script()`](https://developer.wordpress.org/reference/functions/wp_add_inline_script/), but the `wp_localize_script()` method seems neater.

It is also possible to set the meta key using [`wp_add_inline_script()`](https://developer.wordpress.org/reference/functions/wp_add_inline_script/), or a JSON file. These methods are demonstrated in [`meta-attribute`](../meta-attribute/) and [`meta-simple`](../meta-simple/) respectively.

The code is:

    wp_localize_script( 'myprefix-meta-callback-editor-script',  'localizeObject', array(
      "MYPREFIX_META_CB_OBJECT" => MYPREFIX_META_CB_OBJECT
    ) );

where, `myprefix-meta-callback-editor-script-js` is the handle assigned, by WordPress, to the block's `index.js` file.

It is possible to name the meta key in the JSON file. For examples of how to do this, see the other meta block examples.

### Meta values and the `save` function

The meta data is not available to the `save` function, and can not be used there. In fact, no React hooks are useable in a `save` function. To find out more, see [here](https://github.com/WordPress/gutenberg/issues/36265#issuecomment-962684758).

In this example, because the block is rendered by a callback function on the front-end, and because there are no inner blocks, there is nothing for the `save` function to process, therefore, `null` is returned.

### Meta field keys starting with an underscore

Meta data field names that begin with an underscore are private. Private fields will not appear in the editor's Custom Fields section. To update a private field, `auth_callback` must return `true`.

To see the Custom Fields in the editor, 3-dot menu (top-right) -> Preferences -> Panels -> Additional -> Custom Fields.

## Also see

The Gutenberg Handbook's section on [Meta Boxes](https://developer.wordpress.org/block-editor/how-to-guides/metabox/)

The dynamic block examples contain other blocks that use callbacks.

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`wp_localize_script`](https://developer.wordpress.org/reference/functions/wp_localize_script/)

- [`register_post_meta`](https://developer.wordpress.org/reference/functions/register_post_meta/)

- [`get_post_meta`](https://developer.wordpress.org/reference/functions/get_post_meta/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)

  - `useSelect`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`PanelBody`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)

  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `InspectorControls`

- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)

  - `useEntityProp`
