# Inner Blocks Context

## Description

This code demonstrates the use of `context` to pass attribute values from a parent block to a child block.

For more one block context, see [here](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/).

## In this code

**`inner-blocks-context.php`**

- Registers two blocks: `myprefix/context-parent` and `myprefix/context-child`. On transpiling, neither block's JSON file ends up named `block.json`, therefore, both are registered using `__DIR__` and the file name.
- The registration of the child block includes a callback to render the child, including the value inherited from the parent block, on the front-end.

**`inner-blocks-context.index.js`**

- Registers two blocks: `myprefix/context-parent` and `myprefix/context-child`.

**`context-parent.json`**

Contains the settings to define context, and the attribute used by the context.

    "attributes": {
      "myNumber": {
        "type": "number"
      }
    },
    "providesContext": {
      "myprefix/myNumber": "myNumber"
    },

**`context-child.json`**

Contains the settings that define the context which is inherited, as well as the parent block.

    "parent": ["myprefix/context-parent"],
    "usesContext": ["myprefix/myNumber"],

## Notes

### React warning from the `TextControl` component

`value={myNumber || ""}` is used to prevent the warning:

> Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen.

[See here](https://stackoverflow.com/a/47012342)

## Uses

**JS WP dependencies**

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)
  - `useBlockProps`
  - `InnerBlocks`
- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)
  - `registerBlockType`
  - `createBlock`
- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)
  - ['TextControl'](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)
