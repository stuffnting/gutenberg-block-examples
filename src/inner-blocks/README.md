# inner-blocks

## Description

Tis example adds a block which allows `core/paragraph`, `core/heading`, and `core/quote` to be placed inside it.

## In this code

**`inner-blocks.php`**

- Registers the `myprefix/dynamic-inner-blocks` block.

**`inner-blocks.index.js`**

- Registers the `myprefix/dynamic-inner-blocks` block.

- Specifies which blocks can be used as inner blocks.

## Notes

### `useBlockProps` and `useInnerBlockProps`

Both `useBlockProps` and `useInnerBlockProps` are React hooks. They generate the information needed by the outermost wrapper tags of the block, and in the case of `useInnerBlockProps`, generates the inner `children` blocks.

In this example there is a single wrapper for the block itself and the inner blocks it contains. This is because the block itself only contains the inner blocks. Sometimes, the block will contain inner blocks and other content, for an example see the [`dynamic-inner-blocks`](../dynamic-inner-blocks/) example. In these cases, there are several other ways in which `useInnerBlockProps` can be used.

If there is other content in within the block, apart from the inner blocks, the `save` function will look like:

    save() => {
        const blockProps = useBlockProps.save();
        const innerBlocksProps = useInnerBlocksProps.save();

        return (
          <section {...blockProps}>
            <!-- Other content -->
            <div {...innerBlocksProps} />
          </section>
        );
    }

See here for more details about [`useInnerBlockProps`](https://make.wordpress.org/core/2021/12/28/take-more-control-over-inner-block-areas-as-a-block-developer/)

### The `InnerBlocks` component

`useInnerBlockProps` was introduced in WP 5.9. Before this The `InnerBlocks` component was needed to generate the child blocks.

The code for the `edit` function looked like:

    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={allowedBlocks}
      />
    </div>

And the `save` function:

    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>

## Also see

For an example that uses a block template for the inner blocks see [`inner-blocks-template`](../inner-blocks-template/).

For an example that uses block `context` to pass values from a parent block to a child block see [`inner-blocks-context`](../inner-blocks-context/).

The `[dynamic-inner-blocks`](../dynamic-inner-blocks/) example demonstrates using inner blocks with other content.

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**JS WP dependencies**

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `InnerBlocks`
