/**
 * classnames is an external dependency installed by @wordpress/block-editor
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

/**
 * Local dependencies
 */
import { TheInspectorControls } from './the-inspector-controls';

export const edit = (props) => {
  const { attributes, setAttributes } = props;
  const { content, textAlign } = attributes;

  /**
   * Add WP text alignment className
   */
  const blockProps = useBlockProps({
    className: classnames({
      [`has-text-align-${textAlign}`]: textAlign,
    }),
  });

  return (
    <>
      <TheInspectorControls />
      <BlockControls>
        <AlignmentToolbar
          value={textAlign}
          onChange={(nextAlign) => {
            setAttributes({ textAlign: nextAlign });
          }}
        />
      </BlockControls>
      <RichText
        identifier='content'
        tagName='h2'
        value={content}
        onChange={(value) => setAttributes({ content: value })}
        placeholder={__('Enter text...', 'custom-block')}
        {...blockProps}
      />
    </>
  );
};
