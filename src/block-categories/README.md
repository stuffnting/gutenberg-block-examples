# Block Categories

## Description

This code demonstrates how to manipulate the block categories that appear in the Inserter. Including adding, removing and reordering categories, as well as moving blocks between categories.

## In this code

**`block-categories.php`**

- Adds a new block category `custom-category-php` using the `block_categories_all` filter.
- Filters which blocks are allowed in the `widget` category. The other widgets are remove from the editor completely.

**`block-categories.index.js`**

- Adds a new block category `custom-category-js`.
- Reorders the categories in the inserter.
- Moves core/spacer to the `custom-category-php` category.
- Unregisters the blocks the `theme` category. `theme` is then removed from the inserter, because empty categories are omitted;
- Unregisters the block variations of core/embed, but leave core/embed itself.

**`block-categories.test-block.js`**

- Registers a new block to test the `custom-category-js` (empty categories are not shown in the inserter).

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

The only block in embed is core/embed.

The other blocks under "embeds" in the inserter are block variations of core/embed.

Confusingly, all the category names are the same as their titles in the inserter, apart from `embed`, which appears as "EMBEDS".

### Of interest

[`wp.blocks.getCategories()`](https://developer.wordpress.org/block-editor/reference-guides/data/data-core-blocks/#getcategories) fetches a list of core categories and any custom categories registered server-side with PHP.

## Uses

**JS WP dependencies**

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)
  - `getBlockTypes`
  - `unregisterBlockType`
  - `getBlockVariations`
  - `unregisterBlockVariation`
  - `getCategories`
  - `setCategories`
- [`@wordpress/dom-ready` ](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dom-ready/)
  - `domReady`
- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)
  - `__`

**JS WP filters**

- [`blocks.registerBlockType`](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#blocks-registerblocktype)

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)
- [`wp_list_pluck`](https://developer.wordpress.org/reference/functions/wp_list_pluck/)
- [`WP_Block_Type_Registry::get_all_registered`](https://developer.wordpress.org/reference/classes/wp_block_type_registry/get_all_registered/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**PHP WP filters**

- [`block_categories_all`](https://developer.wordpress.org/reference/hooks/block_categories_all/)

- [`allowed_block_types_all`](https://developer.wordpress.org/reference/hooks/allowed_block_types_all/)