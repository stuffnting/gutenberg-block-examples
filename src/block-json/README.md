# Block JSON

**_NOTE: This code needs PHP 7+._**

## Description

This code demonstrates how to register blocks using a block metadata JSON file; both ith the default filename of `block.json`, and a custom JSON filename.

The code also shows how to register two block contained within the same `index.js` file.

## In this code

**`block-json.php`**

- Registers two blocks, one with the default `block.json` file, and the other with `another-block-json.block.json`.

- Demonstrates the filters `block_type_metadata` and `block_type_metadata_settings filter`, with a function that sends their output to the browser console.

When registering the second block, the file path to its JSON file needs to be used in `register_block_type()`.

**`block-json.index.js`**

- Registers the `myprefix/block-json`, and imports its `edit` and `save` functions.

- Imports `another-block-json.index.js`.

- Imports the SCSS file.

**`another-block-json.index.js`**

- Registers `myprefix/another-block-json`.

**`block-json.block.json`**

- Contains the settings for `myprefix/block-json`.

**`block-json.block.json`**

- Contains the settings for `myprefix/another-block-json`.

## Notes

### Transpiled file names

The `src` JSON file names are `block-json.block.json` and `another-block-json.block.json`. These are transpiled to `block.json` and `another-block-json.block.json` respectively.

The PHP file uses the transpiled names, whereas the `src` JS files uses the file names as they are before transpiling.

For example the `src/block-name/block-name.index.js` file would use:

`import metadata from "./block-name.block.json";`

### PHP 7+

The function `myprefix_print_metadata_to_console()` contains a neat bit of code to print the filters' parameters to the browser console. In order to pass the an extra parameter to the action callback, it uses an anonymous function stored in a variable in, which requires PHP 7+.

## Also see

For an example of how to register blocks to old way, without using a `block.json` file, see `meta-attribute`.

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

- [`wp_print_footer_scripts`](https://developer.wordpress.org/reference/functions/wp_print_footer_scripts/)

- [`admin_footer`](https://developer.wordpress.org/reference/hooks/admin_footer/)

**PHP WP Filters**

- [`block_type_metadata`](https://developer.wordpress.org/reference/hooks/block_type_metadata/)

- [`block_type_metadata_settings`](https://developer.wordpress.org/reference/hooks/block_type_metadata_settings/)

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

  - `createBlock`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `RichText`
