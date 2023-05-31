import { createBlock } from '@wordpress/blocks';
import {
  __UNSTABLE_LINE_SEPARATOR,
  create,
  join,
  replace,
  split,
  toHTMLString,
} from '@wordpress/rich-text';

/**
 * Local dependencies
 */
import metadata from './richtext-transforms-multiblock.block.json';

export const transforms = {
  /**
   * `from` transformations appear in the transform menu
   * (first button in the block toolbar) of the block type that
   * transforms to this block type.
   */

  from: [
    {
      type: 'block',
      isMultiBlock: true, // transforms with multiple blocks selected.
      blocks: ['core/paragraph'],
      transform: (attributes) =>
        // `attributes` contains an array, with one element per selected block.
        attributes.map(({ content, className }) =>
          // `map` returns an array. One new block created per selected block.
          createBlock(metadata.name, {
            content,
            className: `${className} transformed-from-paragraph`,
          })
        ),
    },
  ],
  /**
   * `to` transformations appear in the transform menu
   * (first button in the block toolbar) of this block type.
   */
  to: [
    {
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/paragraph'],
      transform: (attributes) => {
        console.log(attributes);
        // `attributes` contains an array, with one element per selected block.
        return attributes.map(({ content, className }) =>
          // `map` returns an array. One new block created per selected block.
          createBlock('core/paragraph', {
            content,
            className,
          })
        );
      },
    },
    {
      // Lifted from core/list Gutenberg version 12.8
      // Change to include core/block-item when included in WP Gutenberg >= 12.9
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/list'],
      transform: (blockAttributes) => {
        return createBlock('core/list', {
          values: toHTMLString({
            value: join(
              blockAttributes.map(({ content }) => {
                const value = create({ html: content });

                if (blockAttributes.length > 1) {
                  return value;
                }

                // When converting only one block, transform
                // every line to a list item.
                return replace(value, /\n/g, __UNSTABLE_LINE_SEPARATOR);
              }),
              __UNSTABLE_LINE_SEPARATOR
            ),
            multilineTag: 'li',
          }),
          anchor: blockAttributes.anchor,
        });
      },
    },
  ],
};
