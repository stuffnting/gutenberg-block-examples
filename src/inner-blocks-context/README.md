# inner-blocks-context

## Description

This code demonstrates the use of block context to pass attribute values from a parent block to a child block.

For more on block context, see [here](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/).

## In this code

**`inner-blocks-context.php`**

- Registers two blocks: `myprefix/context-parent` and `myprefix/context-child`. On transpiling neither block's JSON file ends up named `block.json`, therefore, both are registered using `__DIR__` _and_ the file name.
- The registration of the child block includes a callback to render the child, including its contents and the value inherited from the parent block.

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

Contains the settings that define the parent block, as well as the context to be inherited.

    "parent": ["myprefix/context-parent"],
    "usesContext": ["myprefix/myNumber"],

## Notes

### `save` functions and hooks

You might be thinking that it should be possible to access the context data in the child's save function, perhaps using the `useSelect` hook. However, hooks can only be used with function components, which are asynchronous code; whereas, the save function generates a string to store in the database, which is synchronous code.

See [here](https://github.com/WordPress/gutenberg/issues/36265#issuecomment-962684758) for more.

### The child `save` function

In this example, the child's `save` function returns some arbitrary text to demonstrate how the child's render-callback works. However, if there is no content needed from the chid, the `save` function can return `null`.

### The parent `save` function

The parent's `save` function includes the content from the child block using `innerBlocksProps.children`. This is done to avoid adding an extra wrapping tag. The child's classname is added in the callback, using `get_block_wrapper_attributes()`, to a wrapper that contains the context value and the content.

Even if there is no content returned by the child, child must be included by the parent (as inner blocks), otherwise, the callback function used to render it on the front-end is not triggered; an empty block must be saved in the editor:

```
<!-- wp:myprefix/context-parent -->
  <div class="wp-block-myprefix-context-parent">
    <p>My Number Is (Rendered from parent): </p>
    <!-- wp:myprefix/context-child /-->
  </div>
<!-- /wp:myprefix/context-parent -->
```

### Template and lock

The constant `MY_TEMPLATE` contains the inner blocks that will initially populate the parent. In this case the only allowed block, is the child block.

To start with the child block is locked, using: `templateLock: "all"`. The lock can be released, and the child deleted, from the Document Overview in the editor (top-left 3-line menu button).

See [here](https://fullsiteediting.com/how-to-lock-blocks-and-templates/) for more on locking template.

## Also see

For another example of inner block templates, see [`inner-blocks-template`](../inner-blocks-template/).

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `innerBlocksProps`
