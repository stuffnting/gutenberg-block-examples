# block-categories

## Description

This code demonstrates how to manipulate the block categories that appear in the Inserter. Including adding, removing and reordering categories, as well as moving blocks between categories.

A test block, `myprefix/change-inserter-test-block`, is also added to the inserter.

## In this code

**`block-categories.php`**

- Registers a test block: `myprefix/change-inserter-test-block`.

- Adds a new block category `custom-category-php` using the `block_categories_all` filter.

- Filters which blocks are allowed in the `widget` category. The other widgets are remove from the editor completely.

**`block-categories.index.js`**

- Adds a new block category `custom-category-js`.

- Reorders the categories in the inserter.

- Moves core/spacer to the `custom-category-php` category.

- Unregisters the blocks the `theme` category. `theme` is then removed from the inserter, because empty categories are omitted.

- Unregisters the block variations of core/embed, but leave core/embed itself.

**`block-categories-test-block.js`**

- Registers a new block `myprefix/block-categories-test-block` to test the `custom-category-js` (empty categories are not shown in the inserter).

## Notes

### Core categories

- `text`

- `media`

- `design`

- `widgets`

- `theme`

- `embed`

- `reusable`

(Last checked WP 6.2.)

The only block in `embed` is core/embed. The other blocks under "embeds" in the inserter are block variations of core/embed.

Confusingly, all the category names are the same as their titles in the inserter, apart from `embed`, which appears as "EMBEDS".

### Enqueue JS

The test block JS, and category related JS all end up in the `index.js` file. The test block is registered using `block.json`, which takes care of enqueueing the JS file containing the block; therefore, the category related JS does not need to be enqueued separately.

### The `dom-ready` dependency problem

If the JS file imports `@wordpress/dom-ready`, `wp-edit-post` is needed as a dependency in the `index.asset.php` file. However, `wp-scripts` does not add it, therefore, the addition needs to be forced.

To force `wp-scripts` to add `wp-edit-post` to `index.asset.php`, add the following, unused, import to the JS file:

```
import { PluginSidebar } from "@wordpress/edit-post";
```

### `getCategories`

[`wp.blocks.getCategories()`](https://developer.wordpress.org/block-editor/reference-guides/data/data-core-blocks/#getcategories) fetches a list of core categories and any custom categories registered server-side with PHP.

## Also see

The [`block-collection`](../block-collection/) example.

Also, look at the other filter examples.

- [`filter-block-settings`](../filter-block-settings/)

- [`filter-core-block-controls`](../filter-core-block-controls/)

- [`filter-core-block-supports`](../filter-core-block-supports/)

- [`block-styles`](../block-styles/)

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`wp_list_pluck`](https://developer.wordpress.org/reference/functions/wp_list_pluck/)

- [`WP_Block_Type_Registry::get_all_registered`](https://developer.wordpress.org/reference/classes/wp_block_type_registry/get_all_registered/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**PHP WP filters**

- [`block_categories_all`](https://developer.wordpress.org/reference/hooks/block_categories_all/)

- [`allowed_block_types_all`](https://developer.wordpress.org/reference/hooks/allowed_block_types_all/)

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/dom-ready` ](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dom-ready/)

  - `domReady`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `getBlockTypes`

  - `unregisterBlockType`

  - `getBlockVariations`

  - `unregisterBlockVariation`

  - `getCategories`

  - `setCategories`

- [`@wordpress/edit-post`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-edit-post/)

  - `PluginSidebar`

**JS WP filters**

- [`blocks.registerBlockType`](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#blocks-registerblocktype)
