# Block Collections

## Description

Creates a block collection for the namespace `myprefix`. When active, any of the blocks in these examples will be placed in this collection.

## What is a block collection?

A 'block collection' is a set of block that all have the same namespace (block types are named namespace/block-name). They allow all the blocks in a namespace to be grouped together in the Inserter, as well as appearing in their designated categories.

## In this code

**`block-collection.index.js`**

- Adds a block collection for the namespace `myprefix`.

## Uses

**JS WP dependencies**

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)
  - `registerBlockCollection`

**PHP WP actions**

- [`enqueue_block_editor_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/)

**PHP WP function**

- [`wp_enqueue_script`](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)
