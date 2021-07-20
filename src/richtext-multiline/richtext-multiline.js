const { registerBlockType, createBlock } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

registerBlockType("myprefix/richtext-multiline", {
  apiVersion: 2,
  title: "RichText Multiline",
  icon: "lightbulb",
  category: "text",
  attributes: {
    content: {
      type: "string", // Can use `array`, with `source: "children"`
      default: "", // If `source: "children"` use `[]`
      source: "html",
      selector: "section",
      multiline: "p",
    },
  },
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { content } = attributes;
    const blockProps = useBlockProps();

    return (
      <RichText
        identifier="content"
        tagName="section"
        multiline="p"
        value={content}
        onChange={(value) => setAttributes({ content: value })}
        placeholder={__("Write heading…", "textDomain")}
        {...blockProps}
      />
    );
  },
  save: ({ attributes }) => {
    const { content } = attributes;
    const blockProps = useBlockProps.save();

    return (
      <RichText.Content tagName="section" value={content} {...blockProps} />
    );
  },
});
