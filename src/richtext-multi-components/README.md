# richtext-multi-components

## Description

This example adds a block that contains three `RichText` components. They one uses a `h1` tag, and the other two use `p` tags, with each having its own attribute to store the value.

In the editor the three components are wrapped in a `div` tag, while in the `save` function, they are wrapped in an `article` tag, and formatted using `header`, `section` and `footer` tags.

## In this code

**`richtext-multi-components.php`**

- Registers the `myprefix/richtext-multi-components` block.

**`richtext-multi-components.index.js`**

- Imports the JSON file, `edit` function, and the `save` function.

**`richtext-multi-components.edit.js`**

- Adds the three `RichTex` components to the editor.

**`richtext-multi-components.save.js`**

- Processes the three `RichTex` components to format the saved data.

**`richtext-multi-components.block.json`**

- Defines the three attributes used to store the values: `header`, `content`, and `footer`. All three use `html` sources, but each has a different selector.

## Notes

### Attributes

This example demonstrates how several attributes can use difference selectors within the same block. In this case the selectors are `header h1`, `section p`, and `footer p`. The selectors act like CSS selectors, and refer to the content saved by the `save` function. When the post loads in the editor, the selectors are used to identify the content for each component, and store it in the relevant attribute.

Find out more about attributes in the Gutenberg [Handbook](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/).

## Also see

The Attributes section in the Gutenberg [Handbook](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/).

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
