# Block JSON

**_NOTE:_** **This code needs PHP 7+.**

## Description

This code demonstrates how to register blocks using a block metadata JSON file; both ith the default filename of `block.json`, and a custom JSON filename.

The code also shows how to register two block contained within the same `index.js` file.

## In this code

**`block-json.php`**

- Registers two blocks, one with the default `block.json` file, and the other with `another-block-json.block.json`.
- Demonstrates the filters `block_type_metadata` and `block_type_metadata_settings filter`, with a function that sends their output to the browser console.

When registering the second block, the file path to its JSON file needs to be used in `register_block_type()`.

**`block-json.index.js`**

- Registers the two blocks&mdash; `myprefix/block-json` and `myprefix/another-block-json`&mdash;with via `@import`.
- Imports the SCSS file.

## Notes

### Transpiled file names

The `src` JSON file names are `block-json.block.json` and `another-block-json.block.json`. These are transpiled to `block.json` and `another-block-json.block.json` respectively.

The PHP file uses the transpiled names, whereas the `src` JS files uses the file names as they are before transpiling.

For example the `src/block-name/block-name.index.js` file would use:

    import metadata from "./block-name.block.json";

### The double enqueue problem

In this example, the two blocks are registered from a single PHP file and a single index.js file, but each block has its own JSON file. One of the JSON files has the normal name of `block.json`, the other has the name `another-block-json.block.json`.

Because two blocks are registered, WordPress enqueues a JS file for each one. However, because both blocks are contained within the same JS file, that file gets enqueued twice, which leads to an error in the console: Block `myprefix/block-name` is already registered.

There are two ways around this: use `wp_dequeue_script()` to dequeue the extra script file; or, omit the `editorScript` from the JSON file of the second block. This example block uses the former method.

### PHP 7+

The function `myprefix_print_metadata_to_console()` contains a neat bit of code to print the filters' parameters to the browser console. In order to pass the an extra parameter to the action callback, it uses an anonymous function stored in a variable in, which requires PHP 7+.

## Uses

**JS WP dependencies**

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)
  - `useBlockProps`
- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)
  - `registerBlockType`
  - `createBlock`
  - `RichText`
- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)
  - `__`

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)
- [`wp_print_footer_scripts`](https://developer.wordpress.org/reference/functions/wp_print_footer_scripts/)
- [`admin_footer`](https://developer.wordpress.org/reference/hooks/admin_footer/)

**PHP WP Filters**

- [`block_type_metadata`](https://developer.wordpress.org/reference/hooks/block_type_metadata/)
- [`block_type_metadata_settings`](https://developer.wordpress.org/reference/hooks/block_type_metadata_settings/)

**PHP WP functions**

[`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)
