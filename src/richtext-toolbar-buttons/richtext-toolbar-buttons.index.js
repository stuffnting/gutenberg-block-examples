/**
 * Local dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Local dependencies
 */
import { MyprefixSmallTextButton, MyprefixBigTextButton } from './extra-inline-format-buttons';
import { ExtraToolbarButtons } from './extra-toolbar-buttons';

import metadata from './richtext-toolbar-buttons.block.json';

registerBlockType(metadata.name, {
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { content } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <ExtraToolbarButtons attributes={attributes} setAttributes={setAttributes} />
        <RichText
          identifier='content'
          tagName='h2'
          value={content}
          onChange={(value) => setAttributes({ content: value })}
          placeholder={__('Write heading…', 'textDomain')}
          allowedFormats={[
            'core/bold',
            'core/italic',
            'core/code',
            'myprefix/small-tag',
            'myprefix/big-tag',
          ]}
          {...blockProps}
        />
      </>
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
