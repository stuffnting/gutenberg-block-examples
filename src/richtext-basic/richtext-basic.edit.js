import { RichText, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export const edit = (props) => {
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
};
