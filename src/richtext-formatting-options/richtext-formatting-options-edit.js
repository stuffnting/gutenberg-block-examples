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
      allowedFormats={["core/bold", "core/italic", "core/code"]} // Allows bold, italic and code only
      /* For complete list of formats paste wp.data.select('core/rich-text').getFormatTypes() into console */
      /* RichText default, missing out allowedFormats, is to include all */
      /* To miss out links only, use withoutInteractiveFormatting={true} */
      {...blockProps}
    />
  );
};
