# block-patterns

## Description

This code demonstrates how to register/unregister block patterns and pattern categories.

**Note, this example does not register any blocks.**

***NOTE: This code needs PHP 7+.***

## In this code

**`block-patterns.php`**

- Enables/disables the core block patterns.

- Unregisters some core patterns and pattern categories

- Register custom patterns and pattern categories

- Adds the ability to disable the Page Construction Pattern modal by removing `core/post-content` from all patterns registered by the theme and plugins. There are no core patterns that use `core/post-content`.

- Logs a list of registered patters and pattern categories to the console.

## Notes

### What are block patterns

Block patterns are groups of blocks that make a reusable layout elements. They are defined server-side using PHP by theme and plugin developers, differing from "reusable blocks", which are defined on the editor by users.

The registered patters can appear in the inserter, a specified block's transform menu, as well as the pattern modal when a new post is created.

### Enable/disable core patterns

`add_theme_support('core-block-patterns')` adds support for the core patterns added by WordPress.

`remove_theme_support('core-block-patterns')` removes support for the core patterns, but leaves patterns added by the theme and plugins.

### The registered patterns

**`myprefix/image-and-text`**

This pattern appears in the inserter, the transform menu for `core/paragraph` and `core/image blocks`, as well as the pattern modal when a new post is created. Inclusion in the modal is achieved by adding `core/post-content` to the `blockTypes` array. `postTypes` is used to limit the pattern to the 'post' post-type only, it will not appear on pages or custom post-types.

**`myprefix/heading-example`**

This pattern appears in the inserter, the transform menu for the core/heading block, but not the 'page creation pattern' modal.

**`myprefix/lock-example`**

This pattern has [`templateLock: contentOnly`](https://make.wordpress.org/core/2022/10/11/content-locking-features-and-updates/) set on the outer-group block. Only the text within this pattern can be changed, unless 'modify' is clicked in the groups's toolbar. Note how the blocks with in the previous two examples can be moved within the containing group, but with this example, the heading and paragraph blocks can not be move.

### Disable the Page Construction Pattern modal

If `core/post-content` is added to the patterns `blockTypes` array, the pattern will show in the "Page Construction Pattern" modal, which is displayed when a new post is made. The modal can be disabled by removing `core/post-content` from the `blockTypes` array of all patterns. Since no core patterns use `blockTypes`, the only patterns that might have it set will have been added by the theme or a plugin.

### PHP 7+

The function `myprefix_print_list_to_console()` contains a neat bit of code to print the filters' parameters to the browser console. In order to pass the an extra parameter to the action callback, it uses an anonymous function stored in a variable in, which requires PHP 7+.

## Also see

[Block Editor Handbook - Patterns](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/)

[Full Site Editing With WordPress - Introduction to Block Patterns](https://fullsiteediting.com/lessons/introduction-to-block-patterns/)

## Uses

**PHP WP function**

- [`add_theme_support`](https://developer.wordpress.org/reference/functions/add_theme_support/)

- [`register_block_pattern`](https://developer.wordpress.org/reference/functions/register_block_pattern/)

- [`unregister_block_pattern`](https://developer.wordpress.org/reference/functions/unregister_block_pattern/)

- [`register_block_pattern_category`](https://developer.wordpress.org/reference/functions/register_block_pattern_category/)

- [`unregister_block_pattern_category`](https://developer.wordpress.org/reference/functions/unregister_block_pattern_category/)

- [`WP_Block_Patterns_Registry::get_all_registered`](https://developer.wordpress.org/reference/classes/wp_block_patterns_registry/get_all_registered/)

- [`WP_Block_Pattern_Categories_Registry::get_all_registered`](https://developer.wordpress.org/reference/classes/wp_block_pattern_categories_registry/get_all_registered/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

- [`wp_loaded`](https://developer.wordpress.org/reference/hooks/wp_loaded/)

- [`after_setup_theme`](https://developer.wordpress.org/reference/hooks/after_setup_theme/)

- [`wp_print_footer_scripts`](https://developer.wordpress.org/reference/functions/wp_print_footer_scripts/)

- [`admin_footer`](https://developer.wordpress.org/reference/hooks/admin_footer/)
