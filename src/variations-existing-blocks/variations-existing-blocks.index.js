/**
 * WordPress dependencies
 * */

import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * Local dependencies
 */
import scss from './variations-existing-blocks.style.scss';

/********************************************************************
 *
 * Register variations for existing core block types. (They don't
 * have to be core, but they do need to be registered before this
 * code runs).
 *
 * This example replaces the default core/preformatted with a
 * variation that has pink text. The variation appears in the
 * Inserter, and not the Transformer.
 *
 ********************************************************************/

registerBlockVariation('core/preformatted', [
  {
    name: 'myprefix-pink-preformatted',
    title: __('Pink preformatted', 'textDomain'),
    description: __(
      'A preformatted block that has a class added to make the text pink.',
      'textDomain'
    ),
    icon: 'lightbulb',
    // Replace the core block with this variation in the inserter
    isDefault: true,
    attributes: {
      // Don't forget to add class CSS rule to editor stylesheet
      className: 'is-variation-pink',
    },
    scope: ['inserter'],
  },
]);

/********************************************************************
 *
 * Add multiple variations for a core block in one go.
 * These appear in the Variation Transformer only (top of inspector).
 *
 * The first variation resets the core/heading block's attribute, to
 * how they are in the block.json file.
 *
 *******************************************************************/

registerBlockVariation('core/heading', [
  {
    name: 'myprefix-default-heading',
    title: __('Heading', 'textDomain'),
    description: __('Default heading settings.', 'textDomain'),
    icon: 'lightbulb',
    isDefault: true,
    attributes: {
      placeholder: __('Add some text...', 'textDomain'),
      level: 2,
      textAlign: 'left',
      align: undefined,
      fontSize: '',
      lineHeight: 1.5,
      style: {},
      className: 'is-reset-variation',
    },
    scope: ['transform', 'inserter'],
    isActive: (blockAttributes, variationAttributes) =>
      blockAttributes.level === variationAttributes.level &&
      blockAttributes.placeholder === variationAttributes.placeholder,
  },
  {
    name: 'myprefix-pink-heading',
    title: __('A pink heading', 'textDomain'),
    description: __('An H2 heading, with pink centered text.', 'textDomain'),
    icon: 'lightbulb',
    attributes: {
      level: 2,
      textAlign: 'center',
      placeholder: __('Add some pink text...', 'textDomain'),
      // Don't forget to add class CSS rule to editor stylesheet
      className: 'is-variation-pink',
    },
    scope: ['transform'],
    isActive: (blockAttributes, variationAttributes) =>
      blockAttributes.level === variationAttributes.level &&
      blockAttributes.placeholder === variationAttributes.placeholder,
  },
  {
    name: 'myprefix-green-heading',
    title: __('A green heading', 'textDomain'),
    description: __('An H3 heading, with green centered text.', 'textDomain'),
    icon: 'lightbulb',
    attributes: {
      level: 3,
      textAlign: 'right',
      placeholder: __('Default paragraph text...', 'textDomain'),
      // Don't forget to add class CSS rule to editor stylesheet
      className: 'is-variation-green',
    },
    scope: ['transform'],
    isActive: (blockAttributes, variationAttributes) =>
      blockAttributes.level === variationAttributes.level &&
      blockAttributes.placeholder === variationAttributes.placeholder,
  },
]);

/********************************************************************
 *
 * Register variations for a block type that has InnerBlocks,
 * in this case core/columns.
 *
 * Appears in the variation picker, displayed when the core/column
 * block is first inserted into the post.
 *
 ********************************************************************/

registerBlockVariation('core/columns', {
  name: 'myprefix-three-columns',
  title: __('My Three Columns of stuff', 'textDomain'),
  description: __('Three columns of stuff.', 'textDomain'),
  icon: 'lightbulb',
  /* Make the variation appear in the Placeholder, where you chose the
     starting column format when inserting the columns. */
  scope: ['block'],
  attributes: {
    align: 'full',
    className: 'is-my-three-columns',
  },
  isActive: (blockAttributes, variationAttributes) =>
    blockAttributes.className
      ? blockAttributes.className.includes(variationAttributes.className)
      : false && blockAttributes.align === variationAttributes.align,
  innerBlocks: [
    [
      'core/column',
      {},
      [
        [
          'core/heading',
          {
            level: 2,
            placeholder: __('Three columns', 'textDomain'),
            className: 'is-variation-pink',
          },
        ],
      ],
    ],
    [
      'core/column',
      {},
      [
        ['core/heading', { level: 3, content: __('Stuff', 'textDomain') }],
        ['core/paragraph', { placeholder: __('Enter stuff here...', 'textDomain') }],
      ],
    ],
    [
      'core/column',
      {},
      [
        ['core/heading', { level: 3, content: __('More stuff', 'textDomain') }],
        ['core/paragraph', { placeholder: __('Add a bit more stuff here...', 'textDomain') }],
      ],
    ],
  ],
});
