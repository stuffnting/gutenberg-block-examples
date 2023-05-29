# richtext-align-text

## Description

By default [`RichText`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/rich-text/README.md) components don't get alignment controls. This example adds a `RichText` block, which has text [alignment controls](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/block-controls-toolbar-and-sidebar/) added to its toolbar. The current text alignment is stored in a block attribute.

Note, "text alignment" is the alignment of text within the block. Alignment of the block within the editor, is dealt with in the [`richtext-supports`](../richtext-supports/) example.

## In this code

**`richtext-text-align.php`**

- Registers the `richtext-text-align` block.

**`richtext-text-align.index.js`**

- Imports richtext-text-align.block.json.

- Imports the `edit` function from `richtext-text-align.edit.js`.

- Imports `save` from `richtext-text-align.save.js`.

- Registers the `richtext-text-align` block.

**`richtext-text-align.save.js`**

- Adds the `RichText` component, adding alignment tools to the toolbar.

**`richtext-text-align.save.js`**

- Returns the markup for the block, that is saved in the database.

**`richtext-basic.block.json`**

- Adds the `content` and `textAlign` attributes.

## Notes

Block's use [attributes](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/) to store data. This block uses the `content` attribute to store the text from the `RichText` component, and the `textAlign` attribute to store the block's text alignment (as `left`, `right`, `center`, or `none`).

For more about the `content` attribute, see the [`richtext-basic`](../richtext-basic/) example.

`textAlign` is defined in the `richtext-text-align.block.json` file:

```
"textAlign": {
  "type": "string",
  "default": "none"
}
```

Since there is no `source` specified, the editor looks to the HTML comment to find the `textAlign` value when the post containing this block is loaded the editor.

### The `save` function

When an instance of the block is placed in a post, it is in the database as:

```
<!-- wp:myprefix/richtext-text-align {"textAlign":"center"} -->
<h2 class="wp-block-myprefix-richtext-text-align has-text-align-center">My heading</h2>
<!-- /wp:myprefix/richtext-text-align -->
```

### `classnames`

`classnames` is an external dependency installed by `@wordpress/block-editor`.

Find out more [here](https://www.npmjs.com/package/classnames).

## Also see

For an example of how to deal with other toolbar buttons, see [`richtext-toolbar-buttons`](../richtext-toolbar-buttons/).

For an example of block alignment, as opposed to text alignment, see the [`richtext-supports`](../richtext-supports/).

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `RichText`

  - `BlockControls`

  - `AlignmentToolbar`

**JS external dependencies**

- [`classnames`](https://www.npmjs.com/package/classnames)
