# templates

## Description

Templates offer the change to create a sequence of block, that have their attributes preset, and can be locked. This example contains several templates that will populate a new 'post', each with different types of lock. Uncomment each action, one at a time, to try out the templates.

Note, these examples apply to new 'posts', and no new blocks are registered.

**Note,this block soe not register any blocks.**

## In this code

**`templates.php`**

- Adds the templates attached to the `init` action hook. The templates only show up when a new post is loaded in the editor.

## Notes

### Locking levels

There are three levels of locking:

- **`contentOnly`**Prevents moving, removal, and inserting new blocks, only allows text and media to be edited. Inner blocks are hidden from List View, which only shows the parent block; the Block Inspector only shows a list of blocks, and not block settings; and, the 3-dot menu is removed from the block's toolbar.

- **`all`**—Prevents moving, removal, and inserting new blocks.

- **`insert`**—Prevents inserting or removing blocks, but allows moving existing blocks.

- **`false`**—Prevents locking.

### Locking methods

There are three locking methods:

- **Lock individual blocks**—See Template 1 in this example, and for more about this, see the `block-lock` example. This type of locking can be used on any block which has `supports:lock` enabled in the `block.json` file, then using the 3-dot menu on the block's toolbar. However, in this example is set using the post-type object, via the `init` action hook.

- **Use `templateLock` on core column, cover and group block**—See Template 2 of this example, and below. For the core blocks that support this, the `templateLock` can be set via the block's toolbar 3-dot menu. In this example, it is set using the post-type object, via the `init` action hook.

- **The `template_lock` property of the post-type object**—See Template 1 of this example. This is set using the post-type object, via the `init` action hook.

**`templateLock`**

Core column, cover, and group blocks have the `templateLock` attribute.

From the `core/group` block's `block.json` file:

```
"templateLock": {
  "type": [ "string", "boolean" ],
  "enum": [ "all", "insert", "contentOnly", false ]
},
```

With one of these core blocks selected in the editor: 3-dot menu in toolbar -> Lock. When Lock All is ticked, and apply to all blocks inside is activated, the `templateLock` is set to `all`. For a paragraph block, contained within a group, this would yield:

```
<!-- wp:group {"templateLock":"all","lock":{"move":true,"remove":true},"layout":{"type":"constrained"}} -->
  <div class="wp-block-group">
    <!-- wp:paragraph -->
      <p>Paragraph text</p>
    <!-- /wp:paragraph -->
  </div>
<!-- /wp:group -->
```

The `templateLock` attribute can be set using the post-type template (as in this example).

`useInnerBlockProps` can also make use of `templateLock`, see the `inner-blocks-template` for more details.

```
const innerBlockProps = useInnerBlocksProps(blockProps, {
  allowedBlocks: ALLOWED,
  template: TEMPLATE,
  templateLock: false,
});
```

**More on `contentOnly`**

The `contentOnly` lock can be applied to the core column, cover, and group blocks, using their `templateLock` attribute. The lock is then applied to their inner blocks. Or, `contentOnly` can be applied to a post-type template file using the `template_lock` property of the post-type object. Both of these methods are used in this example, where they are used from the `init` action hook.

Note, with the whole template locked as `contentOnly`, the inserter is disabled, and no other blocks can be added to the post. Also, 'Modify' does not work. If individual blocks, or groups are locked using `contentOnly`, the inserter is not disabled.

> With WordPress 6.1, a new experimental type of locking has been added called “contentOnly”. This locking method can be used by any pattern or block. When enabled, the users can only change the nested content inside the block/pattern. The block structure starts behaving as a single unit where the block hierarchy is entirely hidden. The user can only change text and media URLs in the blocks.

> Additionally, block types without content are hidden from the List View and are unable to gain focus within the block list. This makes it harder to break the expected layout.

> In locked mode, the inspector controls of the blocks are also disabled. Instead, the sidebar only shows a list of content blocks a user can change.

> For now, users still have the freedom to leave this locked mode by pressing modify. When modify is pressed, the block editor shows the hierarchy, and the user has complete control. For now, any user can press the modify button. In the future, it may depend on the capabilities of the user.

Quoted from [here](https://make.wordpress.org/core/2022/10/11/content-locking-features-and-updates/).

### The examples

The three templates in the PHP file, are:

1. The whole template is locked with `contentOnly`, using the `template_lock` property of the post-type object.

2. The second group is locked `contentOnly`, using the `templateLock` attribute of `core/group` block.

3. Only the heading block is locked, using a `lock` attribute.

### Template structure

```
array( $outer_block_name, $out_block_atts_array, $inner_blocks_array )
```

Then each block within $inner_block_array follows the same pattern.

```
array( $block_name, $block_atts_array, $inner_blocks_array )
```

## Also see

The Gutenberg Handbook's section on [templates and locks](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/).

fullsiteediting.com page on [templates and locking](https://fullsiteediting.com/how-to-lock-blocks-and-templates/#h-how-to-lock-a-single-block-in-a-template-or-block-pattern).

The [`block-lock`](../block-lock/) example.

The [`inner-blocks-template`](../inner-blocks-template/) example.

## Uses

**PHP WP functions**

- [`get_post_type_object`](https://developer.wordpress.org/reference/functions/get_post_type_object/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)
