const { registerBlockType, createBlock } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import metadata from "./richtext-transforms-multiblock.json";

// This is set here because it is used several time below.
const BLOCK_NAME = metadata.name;

registerBlockType(metadata, {
  transforms: {
    /**
     * `from` transformations appear in the transform menu
     * (first button in the block toolbar) of the block type that
     * transforms to this block type.
     */

    from: [
      {
        type: "block",
        isMultiBlock: true, // transforms with multiple blocks selected.
        blocks: ["core/paragraph"],
        transform: (attributes) =>
          // `attributes` contains an array, with one element per selected block.
          attributes.map(({ content, className }) =>
            // `map` returns an array. One new block created per selected block.
            createBlock(BLOCK_NAME, {
              content,
              className: `${className} transformed-from-paragraph`,
            })
          ),
      },
    ],
    /**
     * `to` transformations appear in the transform menu
     * (first button in the block toolbar) of this block type.
     */
    to: [
      {
        type: "block",
        isMultiBlock: true,
        blocks: ["core/paragraph"],
        transform: (attributes) =>
          // `attributes` contains an array, with one element per selected block.
          attributes.map(({ content, className }) =>
            // `map` returns an array. One new block created per selected block.
            createBlock("core/paragraph", {
              content,
              className,
            })
          ),
      },
    ],
  },
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { content } = attributes;
    const blockProps = useBlockProps();

    return (
      <RichText
        identifier="content"
        tagName="h2"
        value={content}
        onChange={(value) => setAttributes({ content: value })}
        placeholder={__("Write heading…", "textDomain")}
        {...blockProps}
      />
    );
  },
  save: ({ attributes }) => {
    const { content } = attributes;
    const blockProps = useBlockProps.save();

    return (
      <h2 {...blockProps}>
        <RichText.Content value={content} />
      </h2>
    );
  },
});
