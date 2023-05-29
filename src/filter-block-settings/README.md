# filter-block-settings

## Description

This example adds two filters using the `blockEditor.useSetting.before` filter, which:

1.  limit the width units available to the `core/column` block to `px`;

2.  remove the text colour control from `core/heading` blocks, but only when they are within the `core/media-text` block.

This example is taken form [here](https://make.wordpress.org/core/2023/02/28/custom-settings-wordpress-6-2/).

**Note, no blocks are registered in this example.**

## In this code

**`filter-block-settings.php`**

- Registers the script file.

**`filter-block-settings.index.js`**

- Adds the `myprefix/filter-column-space-units` filter.

- Adds the `myprefix/filter-heading-text-colour` filter.

## Notes

### `blockEditor.useSetting.before`

The `blockEditor.useSetting.before` filter supplies 4 parameters to the callback:

1. `settingValue`

2. `settingName`

3. `clientId`

4. `blockName`

The second filter uses `blockName` to check which type of block the setting being filtered is for. Then, `clientId` to get the parents of the heading block, and `settingName` to find the setting that is to be changed.

### `core/block-editor`

Gutenberg uses several data stores, one of which is `core/block-editor`.

> Some WordPress production packages define data stores to handle their state. These stores can also be used by third-party plugins and themes to retrieve data and to manipulate it. The name of these data stores is also normalized following this format core/package-name (E.g. the @wordpress/block-editor package defines and uses the core/block-editor data store).

From [here](https://developer.wordpress.org/block-editor/explanations/architecture/modularity/#packages-with-data-stores)

The second filter example uses `core/block-editor`, which deals with data relating the block instances that are currently in the editor.

`select` from `@wordpress/data` is used to access `core/block-editor`. It then uses `getBlockParents`, which is a method from the object returned my `select`, to find a block's parents, given the block's ID (that's the ID of the block in the editor).

## Also see

Keep and eye on [here](https://docs.google.com/document/d/1ktyuo4BHOeN3YzIpgoR83tmFGFTZIviKpC-NG2oabpA/edit#) and [here](https://github.com/WordPress/developer-blog-content/issues/85)

Also, look at the other filter examples.

- [`filter-core-block-controls`](../filter-core-block-controls/)

- [`filter-core-block-supports`](../filter-core-block-supports/)

- [`block-categories`](../block-categories/)

- [`block-styles`](../block-styles/)

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/hooks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/)

  - `addFilter`

- [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)

- `select`

**JS WP data module**

- [`core/block-edit`](https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/)

  - `getBlockParents`

  - `getBlockName`

**JS WP filters**

- [`blockEditor.useSetting.before`](https://make.wordpress.org/core/2023/02/28/custom-settings-wordpress-6-2/)
