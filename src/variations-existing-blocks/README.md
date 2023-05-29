# variations-existing-blocks

## Description

This example registers several block variations for core blocks:

- A single variation of `core/preformatted` that replaces the original block in the Inserter, but does not appear in the Transformer.

- Three variations of the `core/heading` block, all of which appear in the Transformer, but not the Inserter. The first variation replaces the original heading block in the Inserter, as well as appearing in the Transformer.

- A variation of the `core/column` block. it appears in the modal with the column formats, when the column block is first inserted into the post.

**Note, this example does not register any blocks.**

## In this code

**variations-existing-blocks**

- Enqueues `index.js`, that contains the variations, back-end only.

- Enqueues the stylesheet on the front- and back-end.

**variations-existing-blocks.index.js**

- Registers the block variations

## Notes

### Variations

> Block variations are easily confused with block styles. With a block style, you can change how the block looks with CSS, and the style can be selected in the block’s settings sidebar in the editor. With a block variation, you change the block settings [including attributes] and create a variation with those presets.

From [here](https://fullsiteediting.com/lessons/block-variations/).

Unlike styles, variations can only be registered with JS, and not PHP.

### `scope`

There are three possible scopes:

- **`inserter`**—The block variation is shown on the Inserter.

- **`transform`**—The block variation appears in the Transformer (actually the BlockVariation component), at the top of the block settings in the Block Inspector.

- **`block`**—Appears in the variation picker, displayed when the block is first inserted into the post. For example, picking between column formats, when a `core/column` block is inserted into the post.

The `scope` parameter value is an array, and it can contain multiple elements. This allows the variation to appear in multiple locations.

### Reset to default and `isDefault`

If `isDefault` is `true` for a variation, that variation will become the default for the block-type in the locations specified by the `scope`. Therefore, if a variation's `isDefault` is `true`, and the `scope` array contains `inserter`, that variation will replace the original core block in the Inserter.

When variations are registered for a core block, such that they can be accessed via the Transformer, WP does not automatically add a variation to the Transformer that will return the block's original 'state'. In this example, the `myprefix-default-heading` variation is added to allow the attributes of the block, apart from `content`, to be reset to their defaults; thus, the variation in effect, reset.

### Styling variations

Styles can be added to variations by adding a classname to the attributes' `className` property.

**Note however, that 'block styles' are a better method of creating different styles for blocks, and variations should be used where control over the initial values of attribute, other than `className` are desired. These examples only use styles to make the transition between variations obvious.**

See the [`block-styles`](../block-styles/) example.

There is a problem when setting `className` for variations that can be transformed. The attribute values defined in the variation, replace the blocks current attribute values when one variation is transformed to another. If the new variation does not contain `className`, the `className` from the original variation will remain (in Block Inspector -> Advanced -> "Additional CSS class(es)"),

This problem of a classname being carried over between transformations, also happens in some block transformations. For example, with this example active: inset a heading block; transform it to the "A pink heading" variation, then transform the block to a paragraph. You will notice that the text stays pink, because the classname `is-variation-pink` has been carried across to the paragraph block. Whether this happens or not, depends on how the block transformations are defined.

## Also see

[fullsiteediting.com article](`https://fullsiteediting.com/lessons/block-variations/`).

Gutenberg Handbook's [documentation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/).

The [`variations-existing-blocks`](../variations-existing-blocks/).

## Uses

**PHP WP functions**

- [`wp_enqueue_script`](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)

- [`wp_enqueue_style`](https://developer.wordpress.org/reference/functions/wp_enqueue_style/)

**PHP WP actions**

- [`enqueue_block_editor_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/)

- [`enqueue_block_assets`](https://developer.wordpress.org/reference/hooks/enqueue_block_assets/)

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockVariation`
