import { useBlockProps, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export const save = ({ attributes }) => {
  const { content } = attributes;
  const blockProps = useBlockProps.save();

  return <RichText.Content tagName="p" value={content} {...blockProps} />;
};
