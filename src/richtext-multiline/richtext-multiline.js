const { registerBlockType, createBlock } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import metadata from "./richtext-multiline.json";

registerBlockType(metadata, {
  edit: (props) => {
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
  },
  save: ({ attributes }) => {
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
  },
});
