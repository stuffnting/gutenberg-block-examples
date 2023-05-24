# richtext-formatting-options

## Description

This example limits the formatting buttons that appear in a `RichText` component's toolbar to `core/bold`, `core/italic`, and `core/code`.

## In this code

**`richtext-formatting-options.php`**

- Registers the `myprefix/richtext-formatting- options` block.

**`richtext-formatting-options.edit.js`**

- Adds the `RichText` component, and specifies `allowedFormats`.

## Notes

### `allowedFormats`

This `attribute` of the `RichText` component can be used to elect which formatting buttons appear in the block's toolbar.

The available buttons are:

- `core/bold`—(`strong`)

- `core/code`—(`code`) inline code

- `core/image`—(`img`) inline image

- `core/italic`—(`em`)

- `core/link`—(`a`)

- `core/strikethrough`—(`s`)

- `core/underline`—(`span`)

- `core/text-color`—(`mark`) highlight text

- `core/subscript`—(`sub`)

- `core/superscript`—(`sup`)

- `core/keyboard`—(`kbd`) [keyboard input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd)

- `core/unknown`—clear unknown formatting. This is a button with a `?` on it, which only appears when the text is wrapped in unknown tags. To try is, edit the HTML of a block and wrap the text in a made up tag, e.g. `<mytag></mytag>`.

### `withoutInteractiveFormatting`

This attribute removes buttons from the toolbar that would make the block interactive. In effect, this means removing the link button.

## Uses

**JS WP dependencies**

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `RichText`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

## Also see

The Gutenberg's Handbook section on the [Formatting Toolbar API](https://developer.wordpress.org/block-editor/how-to-guides/format-api/).

The `richtext-custom-toolbar-buttons` example, for examples of adding extra formatting buttons.
