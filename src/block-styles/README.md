# block-styles

## Description

This code demonstrates adding and removing [block styles](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-styles/) vis PHP and JS.

**Note, this example does not register any blocks.**

## In this code

**`block-styles.php`**

- Enqueues the script file.

- Registers 4 new styles for the `core/paragraph` block. Then, unregisters one of them. Another of the new styles is unregistered in the JS file.

**`block-styles.index.js`**

- Import the SCSS file, so that webpack will process it.

- Registers a new style.

- Unregisters one of the new styles added in the PHP file.

- Unregisters two core styles used by the `core/image` block type.

## Notes

### Block styles

Block styles provide a fancy way to add custom classes to a block, so that the appearance of the blocks can be changed. Block variations can do this too, as well as applying initial values to attributes and specify inner blocks. See the variation block examples.

Note, block styles are sometime called style variations, but should not be confused with block variations. For examples of block variations, see the [`variations-existing-blocks`](../variations-existing-blocks/) and [`variations-register-block`](../variations-existing-blocks/) examples.

### Registering via PHP

`register_block_style()` can be top-level plugin code, and does not need to be called from an action hook. It is called here using `init` for neatness.

### Unregister via PHP

Here, `unregister_block_style` and is called from the `wp_loaded` action hook to make sure any styles it needs to unregister have been registered.

`unregister_block_style()` can only unregister styles registered with PHP. For all styles registered with JS, including all of the built-in core styles, use the JS code in `block-styles.index.js`.

### Unregister via JS

All styles, even those registered server-side with PHP, can be unregistered with JS.

> To make sure all styles are loaded in the editor before `wp.blocks.unregister.BlockStyle()` is called, use `wp.domReady()`.

This is the Block Editor Handbook recommended method, but it currently doesn't work (WP 6.2).

See this [issue](https://github.com/WordPress/gutenberg/issues/25330) for more details.

The work around, used in `block-styles.index.js` is to use the blocks.`registerBlockType` filter.

**Note: All the core styles are registered using JS.**

### The `dom-ready` dependency problem

If the JS file imports `@wordpress/dom-ready`, `wp-edit-post` is needed as a dependency in the `index.asset.php` file. However, `wp-scripts` does not add it, therefore, the addition needs to be forced.

To force `wp-scripts` to add `wp-edit-post` to `index.asset.php`, add the following, unused, import to the JS file:

```
import { PluginSidebar } from "@wordpress/edit-post";
```

## Also see

[Block Editor Handbook - Styles](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-styles/)

[Full Site Editing with WordPress - Custom Block Styles](https://fullsiteediting.com/lessons/custom-block-styles/)

To compare "block style" to "block variations" see the variation examples: [`variations-existing-blocks`](../variations-existing-blocks/) and [`variations-register-block`](../variations-existing-blocks/).

Also, look at the other filter examples.

- [`filter-block-settings`](../filter-block-settings/)

- [`filter-core-block-controls`](../filter-core-block-controls/)

- [`filter-core-block-supports`](../filter-core-block-supports/)

- [`block-categories`](../block-categories/)

## Uses

**PHP WP functions**

- [`wp_enqueue_style`](https://developer.wordpress.org/reference/functions/wp_enqueue_style/)

- [`register_block_style`](https://developer.wordpress.org/reference/functions/register_block_style/)

- [`unregister_block_style`](https://developer.wordpress.org/reference/functions/unregister_block_style/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

- [`enqueue_block_editor_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/)

- [`enqueue_block_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_assets/)

- [`wp_loaded`](https://developer.wordpress.org/reference/hooks/wp_loaded/)

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/hooks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/)

  - `addFilter`

- [`@wordpress/dom-ready`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dom-ready/)

  - `domReady`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockStyle`

  - `unregisterBlockStyle`

**JS WP filters**

- [`blocks.registerBlockType`](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#blocks-registerblocktype)
