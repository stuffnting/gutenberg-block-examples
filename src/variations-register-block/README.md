# Variations Register Block

## Description

This example registers a block, along with two variations. It also demonstrates the use of `useBlockDisplayInformation` to get information about the block/variation.

## In this code

**`variations-register-block.php`**

- Registers the `myprefix/variations-register-block` block.

**`variations-register-block.index.js`**

- Registers the `myprefix/variations-register-block` block.

- Imports the `block.json` file.

- Imports the `edit` function,

- Imports the `save` function`,

- Imports the `variations`

**`variations-register-block.edit.js`**

- Deals with the `alignText` controls and classname.

- Imports the `TheInspectorControls` component.

- Adds a RichText component.

**`variations-register-block.save.js`**

- Deals with the `alignText` classname.

- Generates the saved HTML from the `RichText` component.

**`variations-register-block.variations.js`**

- Adds the `myprefix-default-heading` and `myprefix-centred-b-w-heading` variations.

**`the-inspector-controls.js`**

- Uses `useSelect` to get the block's ID, then uses `useBlockDisplayInformation` to get the info about the block.

- Returns inspector controls, which contains a panel that displays the data from `useBlockDisplayInformation`.

**`the-inspector-controls.block.json`**

- Adds `attributes`:

  - `isActiveName`—used to determine which variation an instance of a block is.

  - `content`—the blocks content text.

  - `placeholder`—the placeholder text, used before text is entered into the block.

  - `textAlign`—stores the value of the text align, works with `AlignmentToolbar`.

- Add [`supports`](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/):

  - `color.text`—when used adds `attributes.textColor`, if not used the attribute is absent.

  - `color.background`—when used adds `attributes.backgroundColor`, if not used the attribute is absent.

## Notes

> Block variations are easily confused with block styles. With a block style, you can change how the block looks with CSS, and the style can be selected in the block’s settings sidebar in the editor. With a block variation, you change the block settings [including attributes] and create a variation with those presets.

From [here](https://fullsiteediting.com/lessons/block-variations/).

Unlike styles, variations can only be registered with JS, and not PHP.

### `scope`

There are three possible scopes:

- **`inserter`**—The block variation is shown on the Inserter.

- **`transform`**—The block variation appears in the Transformer (actually the BlockVariation component), at the top of the block settings in the Block Inspector.

- **`block`**—Appears in the variation picker, displayed when the block is first inserted into the post. For example, picking between column formats, when a `core/column` block is inserted into the post.

The `scope` parameter value is an array, and it can contain multiple elements. This allows the variation to appear in multiple locations.

### `isActive`

This is used to test whether a block instance is this variation, or not. It also provides information about the variation via the `useBlockDisplayInformation` hook (see [here](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/)).

`isActive` can be a function, that must return `true` or `false`, or, an array of attributes.

In this example, `attributes.isActiveName` is used to provide an easy way to tell which variation the selected block is.

### Getting block information

The Block Inspector controls contain a panel, which displays information about the variation.

Retrieving the information is a two step process:

1. the ID of the block currently selected in the editor is obtained using the [`useSelect`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/#useselect) hook;

2. the block information is retrieved using the [`useBlockDisplayInformation`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockdisplayinformation) hook.

## Also see

The `variations-existing-blocks` example, where variations are added to core blocks.

[fullsiteediting.com article](`https://fullsiteediting.com/lessons/block-variations/`).

Gutenberg Handbook's [documentation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/).

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)

  - `useSelect`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`PanelBody`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `InspectorControls`

  - `useBlockDisplayInformation`

  - `RichText`

  - `BlockControls`

  - `AlignmentToolbar`

**JS WP data module**

- [`core/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/)

  - `getSelectedBlock`
