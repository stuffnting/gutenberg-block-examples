const { registerBlockType, createBlock } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import metadata from "./richtext-formatting-options.json";

registerBlockType(metadata, {
  edit: (props) => {
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
