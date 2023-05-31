/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

export const edit = (props) => {
  const { attributes, setAttributes } = props;
  const { heading, content, footer } = attributes;
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      {/* Wrapper block in editor is <div>, in save <section> */}
      <RichText
        tagName='h1'
        className='myprefix-heading'
        value={heading}
        onChange={(value) => setAttributes({ heading: value })}
        placeholder={__('Write heading…', 'textDomain')}
      />
      <RichText
        tagName='p'
        className='myprefix-content'
        value={content}
        onChange={(value) => setAttributes({ content: value })}
        placeholder={__('Write some content…', 'textDomain')}
      />
      <RichText
        tagName='p'
        className='myprefix-footer'
        value={footer}
        onChange={(value) => setAttributes({ footer: value })}
        placeholder={__('Write a footer…', 'textDomain')}
      />
    </div>
  );
};
