import { RichText, useBlockProps } from "@wordpress/block-editor";

export const save = ({ attributes }) => {
  const { content } = attributes;

  const blockProps = useBlockProps.save();

  return (
    <h2 {...blockProps}>
      <RichText.Content value={content} />
    </h2>
  );
};
