const { registerBlockType } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

registerBlockType("myprefix/richtext-basic-block", {
  apiVersion: 2,
  title: "RichText Basic Block",
  description: __("A very simple RichText block.", "textDomain"),
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
