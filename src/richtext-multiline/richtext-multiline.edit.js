/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

export const edit = (props) => {
  const { attributes, setAttributes } = props;
  const { content } = attributes;
  const blockProps = useBlockProps();

  /**
   * Note, here tagName="div", whereas is in the save function, tagName="section".
   * Also, multiline="p", must match the value of multiline in the JSON file.
   */
  return (
    <RichText
      identifier='content'
      tagName='div'
      multiline='p'
      value={content}
      onChange={(value) => setAttributes({ content: value })}
      placeholder={__('Write a line…', 'textDomain')}
      {...blockProps}
    />
  );
};
