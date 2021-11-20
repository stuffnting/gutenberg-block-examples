// classnames is an external dependency installed by @wordpress/block-editor
import classnames from "classnames";

const { registerBlockType } = wp.blocks;
const { RichText, useBlockProps, BlockControls, AlignmentToolbar } =
  wp.blockEditor;
const { __ } = wp.i18n;

import metadata from "./richtext-text-align.json";

registerBlockType(metadata, {
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { content, textAlign } = attributes;

    const blockProps = useBlockProps({
      className: classnames({
        [`has-text-align-${textAlign}`]: textAlign,
      }),
    });

    return (
      <>
        <BlockControls>
          <AlignmentToolbar
            value={textAlign}
            onChange={(nextAlign) => {
              setAttributes({ textAlign: nextAlign });
            }}
          />
        </BlockControls>
        <RichText
          identifier="content"
          tagName="h2"
          value={content}
          onChange={(value) => setAttributes({ content: value })}
          placeholder={__("Write heading…", "textDomain")}
          textAlign={textAlign}
          {...blockProps}
        />
      </>
    );
  },
  save: ({ attributes }) => {
    const { content, textAlign } = attributes;

    const blockProps = useBlockProps.save({
      className: classnames({
        [`has-text-align-${textAlign}`]: textAlign,
      }),
    });

    return (
      <h2 {...blockProps}>
        <RichText.Content value={content} />
      </h2>
    );
  },
});
