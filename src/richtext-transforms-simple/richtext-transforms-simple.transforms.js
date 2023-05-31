/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Local dependencies
 */
import metadata from './richtext-transforms-simple.block.json';

export const transforms = {
  /**
   * `from` transformations appear in the transform menu
   * (first button in the block toolbar) of the block type that
   * transforms to this block type.
   */
  from: [
    {
      type: 'block',
      blocks: ['core/paragraph'],
      transform: ({ content, className }) => {
        return createBlock(metadata.name, {
          content,
          className: `${className} transformed-from-paragraph`,
        });
      },
    },
    {
      type: 'block',
      blocks: ['core/heading'],
      transform: ({ content, className }) => {
        return createBlock(metadata.name, {
          content,
          className: `${className} transformed-from-paragraph`,
        });
      },
    },
  ],
  /**
   * `to` transformations appear in the transform menu
   * (first button in the block toolbar) of this block type.
   */
  to: [
    {
      type: 'block',
      blocks: ['core/paragraph'],
      transform: ({ content, className }) => {
        return createBlock('core/paragraph', {
          content,
          className,
        });
      },
    },
    {
      type: 'block',
      blocks: ['core/heading'],
      transform: ({ content, className }) => {
        return createBlock('core/heading', {
          content,
          className,
          level: 2,
        });
      },
    },
  ],
};
