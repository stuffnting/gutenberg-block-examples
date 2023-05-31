/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Local dependencies
 */
import metadata from './richtext-transforms-multiblock.block.json';

/******************************************************************************
 *
 * Merge function
 *
 *****************************************************************************/

export const merge = (attributes, attributesToMerge) => {
  return {
    content: (attributes.content || '') + (attributesToMerge.content || ''),
    className: '',
  };
};

/******************************************************************************
 *
 * The edit function
 *
 *****************************************************************************/

export const edit = (props) => {
  const { attributes, setAttributes, onReplace, mergeBlocks } = props;
  const { content } = attributes;
  const blockProps = useBlockProps();

  const onSplit = (value) => {
    if (!value) {
      return createBlock('core/paragraph');
    }

    return createBlock(metadata.name, {
      ...attributes,
      content: value,
    });
  };

  return (
    <RichText
      identifier='content'
      tagName='h2'
      value={content}
      onChange={(value) => setAttributes({ content: value })}
      onMerge={mergeBlocks}
      onSplit={onSplit}
      onReplace={onReplace}
      onRemove={() => onReplace([])}
      placeholder={__('Write heading…', 'textDomain')}
      {...blockProps}
    />
  );
};
