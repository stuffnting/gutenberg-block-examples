import { RichText, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export const edit = (props) => {
  const { attributes, setAttributes } = props;
  const { content } = attributes;
  const blockProps = useBlockProps();

  return (
    <RichText
      identifier="content"
      tagName="div"
      /*A div element wraps the multilines in the editor, the save function can be different*/
      multiline="p"
      value={content}
      onChange={(value) => setAttributes({ content: value })}
      placeholder={__("Write a line…", "textDomain")}
      {...blockProps}
    />
  );
};
