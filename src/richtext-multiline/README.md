# RichText Multiline

## Description

By default, hitting enter when inside a [`RichText`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/rich-text/README.md) component, produces a line break by inserting a `<br>` tag. This behaviour can be changed, so that, hitting enter will produce a new paragraph.

Note, sine WP 6.1, this method of adding multiple paragraphs to a `RichText` block has been depreciated in favour of using inner blocks. See [here](https://github.com/WordPress/gutenberg/blob/wp/6.1/packages/block-editor/src/components/rich-text/index.js#L119).

## In this code

**`richtext-multiline.php`**

- Registers the `myprefix/richtext-multiline` block.

**`richtext-multiline.index.js`**

- Imports the block metadata from `richtext-multiline.block.json`
- Imports the `edit` function from `richtext-multiline.edit.js`
- Imports the `save` function from `richtext-multiline.save.js`
- Registers the `myprefix/richtext-multiline` block.

**`richtext-multiline.edit.js`**

- Handles the block in the editor, adding a `RichText` which includes a `multiline` attribute.

**`richtext-multiline.save.js`**

- Returns the markup for the block, that is saved in the database.

**`richtext-multiline.block.json`**

- Adds the `content` attribute.

## Notes

### Multiline

When used with the `multiline` attribute, the `RichText` component uses its `tag` as the outer-warper for the block, and the tag which is assigned to `multiline` as the multiple lines.

for example,

```
<RichText
  identifier="content"
  tagName="div"
  multiline="p"
  value={content}
  onChange={(value) => setAttributes({ content: value })}
  placeholder={__("Write a line…", "textDomain")}
  {...blockProps}
/>
```

will use `div` tag as block's outer-wrapper, and the `p` tag for the multiple lines.

The `multiline` tag must be added to the attribute definition within the `block.json` file, _and_ the `RichText` component in the `edit` function.

Note, the `edit` function can use a different outer-wrapper tag to the `save` function.

In this example, the `edit` function used a `div` tag as the outer-wrapper, and allows multiple `p` tags within it. The `save` function uses a `section` tag as the outer-wrapper.

Hitting enter _without_ `multiline` defined produces:

```
<!-- wp:myprefix/richtext-multiline -->
<section class="wp-block-myprefix-richtext-multiline">Line 1<br>Line 2</section>
<!-- /wp:myprefix/richtext-multiline -->
```

Hitting enter _without_ `multiline` defined produces:

```
<!-- wp:myprefix/richtext-multiline -->
<section class="wp-block-myprefix-richtext-multiline"><p>Line 1</p><p>Line1 </p></section>
<!-- /wp:myprefix/richtext-multiline -->
```

### Attributes

For the basic usage of a `content` attribute see the `richtext-basic` example.

The `richtext-multiline.block.json` defines the `content attribute with:

```
"attributes": {
  "content": {
    "type": "string",
    "default": "",
    "source": "html",
    "selector": "section",
    "multiline": "p"
  }
},
```

Note, the `type` is set to string, so that the multiple paragraphs will be stored as a single string, including the `p` tags. `type` could be set to `array`, to store each paragraph as an array element. The `selector` used is the `section` tag, which is used int the `save` function, not the `div` tag used in the `edit` function. `multiline` defines which tag will be used for the multiple lines within the block, this should match the `multiline` attribute inside the `RichText` component in the `edit` function.

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

For a basic example of how to use block attributes, see `richtext-basic`.

For the basic use of `RichText` see [documentation on GitHub](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/rich-text/README.md)

For the `multiline` depreciation notice, see the `RichText` code on [GitHub](https://github.com/WordPress/gutenberg/blob/wp/6.1/packages/block-editor/src/components/rich-text/index.js#L119).