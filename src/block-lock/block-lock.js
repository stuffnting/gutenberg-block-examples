import { registerBlockType } from "@wordpress/blocks";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

import metadata from "./block-lock.json";

registerBlockType(metadata.name, {
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
