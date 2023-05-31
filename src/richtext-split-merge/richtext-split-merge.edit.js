/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Local dependencies
 */
import metadata from './richtext-split-merge.block.json';

/******************************************************************************
 *
 * This function is called by mergeBlocks, see below. Given the attributes of
 * both blocks, it returns new attributes for the merged block.
 *
 * @see {@link https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/store/actions.js}
 *
 * `attributes` is the attributes from the first block.
 * `attributesToMerge` is the attributes of the second block to be merged with it.
 *
 * The function merges the contents of the two blocks, and deletes any classNames
 * that might have been added to either block.
 *
 * Not documented.
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

  // onSplit is called twice, once for the string on each side of the split
  const onSplit = (value) => {
    /**
     * If `value` is empty make a new paragraph block.
     * This happens if the split is at the beginning or end of the block's content.
     */
    if (!value) {
      return createBlock('core/paragraph');
    }

    // If the `value` is not empty create a new myprefix/richtext-split-merge block containing the string.
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
