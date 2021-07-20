const { registerBlockType, createBlock } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

registerBlockType("myprefix/richtext-formatting-options", {
  apiVersion: 2,
  title: "RichText Formatting Options",
  icon: "lightbulb",
  category: "text",
  attributes: {
    content: {
      type: "string",
      source: "html", // Not 'text'
      selector: "h2",
      default: "",
    },
  },
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
        allowedFormats={["core/bold", "core/italic", "core/code"]}
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
