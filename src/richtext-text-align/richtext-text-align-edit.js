import {
  RichText,
  useBlockProps,
  BlockControls,
  AlignmentToolbar,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

// classnames is an external dependency installed by @wordpress/block-editor
import classnames from "classnames";

export const edit = (props) => {
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
};
