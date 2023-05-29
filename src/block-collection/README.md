# block-collections

## Description

Creates a block collection for the namespace `myprefix`. When active, any of the blocks in these examples will be placed in this collection.

**Note, no blocks are registered by this example.**

## In this code

**`block-collection.php`**

- Enqueues the JS file. Note, there is no block to register in this example.

**`block-collection.index.js`**

- Adds a block collection for the namespace `myprefix`.

## Notes

### What is a block collection?

A 'block collection' is a set of block that all have the same namespace (block types are named namespace/block-name). They allow all the blocks in a namespace to be grouped together in the Inserter, as well as appearing in their designated categories.

## ALso see

The [`block-categories`](../block-categories/) example.

## Uses

**PHP WP function**

- [`wp_enqueue_script`](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)

**PHP WP actions**

- [`enqueue_block_editor_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/)

**JS WP dependencies**

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockCollection`
