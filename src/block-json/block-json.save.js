/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export const save = ({ attributes }) => {
  const { content } = attributes;
  const blockProps = useBlockProps.save();

  return <RichText.Content tagName='p' value={content} {...blockProps} />;
};
