# filter-core-block-controls

## Description

This example adds new controls to the Block Inspector of the core/list block, so that, the `list-style-type` can be set to `disc`, `circle`, or `square` for unordered lists. The `list-style-type` is applied by adding a classname to the block's existing `attributes.className`.

The `list-style-type` is also stored in `attributes.listType`, which is a new attributes added to the core/list block type. The attribute is then used to demonstrates how to add an extra class to a core block in the editor, and front-end.

## In this code

**`list-style-type.php`**

- Registers the `myprefix/list-style-type` block.

- Registers the stylesheet on the front- and back-end.

- Uses `render_block_core/list` the filter, to add an extra classname on the front-end only. This new classname dictates the background colour on the front-end

**`list-style-type.index.js`**

- Uses the `blocks.registerBlockType` filter to add a `listStyle` attribute to the core/list block type.

- Uses the `editor.BlockEdit` filter to add extra controls to the core/list block's Block Inspector controls. These allow a `list-style-type` to be chosen, and stored in `attributes.listType`. Also, a classname is added to `attributes.className`, which appears in the editor, and saved content.

- Uses the `editor.BlockListBlock` filter to add and extra classname to the editor only. The new classname dictates the background colour in the editor.

## Notes

### Adding classnames

This example demonstrates three methods of adding classnames to a core block.

1. Using the `editor.BlockEdit`. A new classname is added so that the list's maker will change to the selected type. This classname is stored in `attributes.className`. It gets used in the editor, and well as in the saved content, and therefore, the front-end.

2. Using the `editor.BlockListBlock` filter. This makes uses of `attributes.listType` to select a background colour based on the selected list marker. The classname used here, does not get passed on to the saved content.

3. Using `render_block_core/list`. This also makes uses of `attributes.listType` to select a background colour based on the selected list marker.

Note, `attributes.listType` stores the value from the select control, although, it is not needed to apply the `list-style-type` to the front- or back-end, because this is done by adding a classname to `attributes.className`.

The role of `attributes.listType` is to pass the select control's value on to `editor.BlockListBlock` and `render_block_core/list`, which apply extra classnames.

## Uses

**JS WP dependencies**

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `InspectorControls`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`PanelBody`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)

  - [`SelectControl`](https://developer.wordpress.org/block-editor/reference-guides/components/select-control/)

- [`@wordpress/hooks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/)

  - `addFilter`

- [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)

  - `select`

- [`@wordpress/compose`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/)

  - `createHigherOrderComponent`

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

**JS WP filters**

- [`blocks.registerBlockType`](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#blocks-registerblocktype)

- [`editor.BlockEdit`](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blockedit)

- [`editor.BlockListBlock`](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blocklistblock)

**JS external dependencies**

- [`classnames`](https://www.npmjs.com/package/classnames)

- [`lodash`](https://www.npmjs.com/package/lodash)

**PHP WP functions**

- [`wp_enqueue_script`](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)

- [`wp_enqueue_style`](https://developer.wordpress.org/reference/functions/wp_enqueue_style/)

**PHP WP actions**

- [`enqueue_block_editor_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/)

- [`enqueue_block_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_assets/)

**PHP WP filter**

- [`render_block_{$this->name}`](https://developer.wordpress.org/reference/hooks/render_block_this-name/)

## Also see

The Gutenberg's Handbook [section on hooks](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/).