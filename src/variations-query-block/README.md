# variations-query-block

## Description

This example adds a block variation to the `core/query` block, that sets a default value for the `perPage` query var, and adds a `commentCount` query var to the `core/query` block type's `query` attribute

The default `perPage` value is set in a JSON file, and an extra control is added to the Block Inspector, into which the number of comments can be entered.

Note, this example does not register a block type, only a variation for a core block type.

## In this code

**`variations-query-block.php`**

- Registers the script file.

- Fetches data from the JSON file.

- Uses the `pre_render_block` filter to make the query variation work on the front-end.

- USes the `rest_post_query` filter to add `commentCount` to the REST API.

**`variations-query-block.index.js`**

- Registers the variation for the `core/query` block-type.

- Defines defaults for the `query` attribute, including the extra `commentCount` query var.

**`extra-inspector-controls.js`**

- Adds a an extra control to the Block Inspector, into which the `commentCount` can be entered.

**`variations-query-block.data.json`**

- Contains the value for the `namespace` of the variation.

- Contains the default value for the `perPage` query var.

## Notes

### The `core/query` block type attribute

The `core/query` block type registers with a `query` attribute, which is an object (see [GitHub](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/query/block.json)). This object contains the query vars used to fetch the posts for the block to display. Because `attributes.query` is an object, extra properties can be added to it, without having to add them using the `blocks.registerBlockType` filter (see the [filter-core-block-controls](../filter-core-block-controls/)).

In this example, a `commentCount` property is added to `attributes.query`, allowing the posts to be queried on how many comments they have.

### `isActive`

This is used to test whether a block instance is this variation, or not.

`isActive` can be a function, that must return `true` or `false`, or, an array of attributes. The `core/query` block registers with a `namespace` attribute, which is added to make testing variations easy. In this example, the `namespace` is set to `myprefix/variations-query-block`, and defined in the JSON file.

The `namespace` in the JSON file is also used by the PHP filter `pre_render_block` to determine which variation is being processed.

## Also see

Gutenberg Handbook's [documentation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/).

This article on the [Make blog](https://make.wordpress.org/core/2022/10/10/extending-the-query-loop-block/)

The `core/query` block on [GitHub](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/query/block.json).

## Uses

**PHP WP functions**

- [`wp_enqueue_script`](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)

**PHP WP actions**

- [`enqueue_block_editor_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/)

**PHP WP filter**

- [`pre_render_block`](https://developer.wordpress.org/reference/hooks/pre_render_block/)

- [`rest_post_query`]()

**JS WP dependencies**

- [`@wordpress/hooks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/)

  - `addFilter`

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/compose`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/)

  - `createHigherOrderComponent`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`PanelBody`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)

  - [`PanelRow`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelrow)

  - [`__experimentalNumberControl`](https://developer.wordpress.org/block-editor/reference-guides/components/number-control/) as NumberControl

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `InspectorControls`

**JS WP filters**

- [`blocks.registerBlockType`](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#blocks-registerblocktype)

- [`editor.BlockEdit`](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blockedit)
