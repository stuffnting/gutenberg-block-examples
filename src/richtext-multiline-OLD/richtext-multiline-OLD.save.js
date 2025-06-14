/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from "@wordpress/block-editor";

export const save = ({ attributes }) => {
  const { content } = attributes;
  const blockProps = useBlockProps.save();

  return <RichText.Content tagName="section" value={content} {...blockProps} />;
};
