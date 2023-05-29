# richtext-toolbar-buttons

## Description

This example adds four buttons to the block toolbar. Two of the buttons interact with the content of the custom block that is registered by this example. The other two buttons add inline HTML tags around the selected text in core blocks using the [Formatting Toolbar API](https://developer.wordpress.org/block-editor/how-to-guides/format-api/).

The registered block also limits the inline formatting buttons available for its `RichText` component, using the `allowedFormats` attribute.

## In this code

**`richtext-toolbar-buttons.php`**

- Registers the `myprefix/richtext-toolbar-buttons` block.

**`richtext-toolbar-buttons.index.js`**

- Registers the `myprefix/richtext-toolbar-buttons` block.

- Imports the custom toolbar buttons, used by the registered block, as the component `ExtraToolbarButtons`.

- Imports the custom toolbar buttons used by core blocks as `MyprefixSmallTextButton` and `MyprefixBigTextButton`.

- Adds the `RichText` component, and specifies `allowedFormats`.

**`extra-toolbar-buttons.js`**

- Adds Button 1, a dropdown button, to the `block` group of the registered block's toolbar.

- Adds Button 2, a single button, to the `other` group of the registered block's toolbar.

**`extra-inline-format-buttons.js`**

- Registers Button 3, which adds `<small>` tags around the selected text, for core paragraph, heading, quote and list blocks, as well as the registered block.

- Registers Button 4, which adds `<big>` tags around the selected text, for all core blocks, as well as the registered block.

## Notes

### Positions in the toolbar

In WP 5.8 (July 2021) a group property was added to the `BlockControls` component. This allows custom buttons to be added at three predefined locations in the toolbar (see [here](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/block-toolbar/index.js#L152)):

- `block` - where the block align button goes, for blocks that support it.

- `inline` - where the bold and italic buttons go.

- `other` - between `inline` and the 'Options' 3-dot menu.

- `parent` - seems to add buttons to the same place as `block` (????)

Buttons can be added to these groups with (see Buttons 1, 2 and 3):

```
<BlockControls group='inline'>
  <ToolbarButton
    label={__('Who is it?', 'textDomain')}
    icon='superhero'
    className={null}
    onClick={/* Code here */}
  />
</BlockControls>
```

Buttons can also be added to the `inline` 'More' menu, with (see Button 4):

```
<RichTextToolbarButton
  icon='arrow-down'
  title='Small Text'
  onClick={ /_ Code here _/ }
  isActive={isActive}
/>
```

### Inline buttons

The buttons in the `inline` group, and the group's 'More' dropdown menu, add inline HTML tags to around the selected tags. For example, the bold button applied <strong> tags.

More inline buttons, using different tags, can be added using `registerFormatType`. Button 3 and Button 4 in `richtext-inline-format-buttons.js`, where Button 3 is added to specific blocks, and uses `<small>` tags; and Button 4 is added to all blocks, and uses `<big>` tags.

### `allowedFormats`

This `attribute` of the `RichText` component can be used to elect which inline formatting buttons appear in the block's toolbar.

The available core inline formatting buttons are:

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

Custom formatting buttons can also be allowed.

The `RichText` component in this example allows the core bold, italic, and code buttons; as well as `myprefix/small-tag` (Button 3), and `myprefix/big-tag` (Button 4), which are added as custom buttons.

### `withoutInteractiveFormatting`

This is another `RichText` attribute, that removes buttons from the toolbar that would make the block interactive. In effect, this means removing the link button.

### Buttons added to a custom block's `edit` function

Buttons 1 & 2 are added to the `edit` function of the custom block `myprefix/richtext-toolbar-buttons`. Therefore, they have access to the the block's `attributes`, and `setAttributes` function. This make it possible for teh buttons to set the content of the block.

Note, these two buttons are unaffected by their absence from the `allowedFormats` array of the `RichText` component.

## Also see

The Gutenberg Handbook's [Formatting Toolbar API](https://developer.wordpress.org/block-editor/how-to-guides/format-api/) section.

The [`richtext-text-align`](../richtext-text-align/) example demonstrates how to add text-align controls to the toolbar of a custom block.

## Uses

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)

  - `useSelect`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/rich-text`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-rich-text/)

  - `registerFormatType`

  - `toggleFormat`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`ToolbarButton`](https://developer.wordpress.org/block-editor/reference-guides/components/toolbar-button/)

  - [`ToolbarDropdownMenu`](https://developer.wordpress.org/block-editor/reference-guides/components/toolbar-dropdown-menu/)

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `RichText`

  - `BlockControls`

  - `RichTextToolbarButton`

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)
