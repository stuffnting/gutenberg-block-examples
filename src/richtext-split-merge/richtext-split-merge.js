const { registerBlockType, createBlock } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

// The block name is set here because it is used twice below.
const BLOCK_NAME = "myprefix/richtext-split-merge";

registerBlockType(BLOCK_NAME, {
  apiVersion: 2,
  title: "RichText Split Merge",
  icon: "lightbulb",
  category: "text",
  attributes: {
    content: {
      type: "string",
      source: "html",
      selector: "h2",
      default: "",
    },
  },
  // attributes is the attributes from the first block. attributesToMerge is the attributes of the second block to be merged with it. Not documented.
  merge: (attributes, attributesToMerge) => {
    return {
      content: (attributes.content || "") + (attributesToMerge.content || ""),
    };
  },
  edit: (props) => {
    const { attributes, setAttributes, onReplace, mergeBlocks } = props;
    const { content } = attributes;
    const blockProps = useBlockProps();

    // onSplit is called twice, once for the string on each side of the split
    const onSplit = (value) => {
      // If the string is empty make a new paragraph block. This happens if the split is at the beginning or end of the block's content.
      if (!value) {
        return createBlock("core/paragraph");
      }

      // If the string is not empty create a new myprefix/richtext-split-merge block containing the string.
      return createBlock(BLOCK_NAME, {
        ...attributes,
        content: value,
      });
    };

    return (
      <RichText
        identifier="content"
        tagName="h2"
        value={content}
        onChange={(value) => setAttributes({ content: value })}
        onMerge={mergeBlocks}
        onSplit={onSplit}
        onReplace={onReplace}
        onRemove={() => onReplace([])}
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
