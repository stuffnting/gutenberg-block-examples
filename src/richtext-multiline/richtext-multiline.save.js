import { RichText, useBlockProps } from "@wordpress/block-editor";

export const save = ({ attributes }) => {
  const { content } = attributes;
  const blockProps = useBlockProps.save();

  return (
    <RichText.Content
      tagName="section"
      /*A section element wraps the multilines on the frontend*/
      value={content}
      {...blockProps}
    />
  );
};
