# RichText Basic

## Description

This example adds a block containing a very simple [`RichText`](https://developer.wordpress.org/block-editor/reference-guides/richtext/) component.

## In this code

**`richtext-basic.php`**

- Registers the `myprefix/richtext-basic` block.

**`richtext-basic.index.js`**

- Imports the block metadata from `richtext-basic.block.json`
- Imports the `edit` function from `richtext-basic.edit.js`
- Imports the `save` function from `richtext-basic.save.js`
- Registers the `myprefix/richtext-basic` block.

**`richtext-basic.edit.js`**

- Handles the block in the editor, adding a `RichText`.

**`richtext-basic.save.js`**

- Returns the markup for the block, that is saved in the database.

**`richtext-basic.block.json`**

- Adds the `content` attribute.

## Notes

### Attributes

Block's use [attributes](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/) to store data. This block uses the `content` attribute to store the text from the `RichText` component.

`content` is defined in the `richtext-basic.block.json` file:

```
"attributes": {
  "content": {
    "type": "string",
    "source": "html",
    "selector": "h2",
    "default": ""
  }
},
```

In this case, the data-type is a `string`, the value is sourced from the block's `html`, and the selector used to identify the value to be stored in `content` is `h2`.

When an instance of the block is placed in a post, it is in the database as:

```
<!-- wp:myprefix/richtext-basic -->
<h2 class="wp-block-myprefix-richtext-basic">My heading</h2>
<!-- /wp:myprefix/richtext-basic -->
```

So, when the post is reloaded in the editor, the value to place in the `content` attribute is found by looking in the stored `html`, and finding the `string` between the `h2` tags.

## Uses

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

The Gutenberg Handbook's documentation on [attributes](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/).