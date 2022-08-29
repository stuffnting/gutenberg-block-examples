import { useBlockProps, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export const edit = (props) => {
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
};
