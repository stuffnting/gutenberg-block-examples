/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Local dependencies
 */
import metadata from './render-php-template.block.json';

registerBlockType(metadata.name, {
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { content } = attributes;

    const blockProps = useBlockProps();

    return (
      <RichText
        identifier='content'
        tagName='h2'
        value={content}
        onChange={(value) => setAttributes({ content: value })}
        placeholder={__('Write heading…', 'textDomain')}
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
