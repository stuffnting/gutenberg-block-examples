/**
 * classnames is an external dependency installed by @wordpress/block-editor
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from "@wordpress/block-editor";

export const save = ({ attributes }) => {
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
};
