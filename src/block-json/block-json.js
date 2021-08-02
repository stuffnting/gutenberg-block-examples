const { registerBlockType, createBlock } = wp.blocks;
const { useBlockProps, RichText } = wp.blockEditor;
const { __ } = wp.i18n;

registerBlockType("myprefix/test-block-json", {
  merge: (attributes, attributesToMerge) => {
    return {
      content: (attributes.content || "") + (attributesToMerge.content || ""),
    };
  },
  edit: (props) => {
    const { attributes, setAttributes, onReplace, mergeBlocks } = props;
    const { content } = attributes;

    const blockProps = useBlockProps();

    return (
      <RichText
        tagName="p"
        value={content}
        onChange={(value) => setAttributes({ content: value })}
        onSplit={(value) => {
          if (!value) {
            return createBlock("core/paragraph");
          }
          return createBlock(BLOCK_NAME, {
            ...attributes,
            content: value,
          });
        }}
        onReplace={onReplace}
        onMerge={mergeBlocks}
        onRemove={onReplace}
        placeholder={__("Enter text...", "textDomain")}
        keepPlaceholderOnFocus={true}
        {...blockProps}
      />
    );
  },
  save: ({ attributes }) => {
    const { content } = attributes;
    const blockProps = useBlockProps.save();

    return <RichText.Content tagName="p" value={content} {...blockProps} />;
  },
});
