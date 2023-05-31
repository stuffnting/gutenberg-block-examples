/**
 * External dependencies
 */
import { assign, merge } from 'lodash';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * Local dependencies
 */
import { myprefixExtraQueryControls } from './extra-inspector-controls';
import metadata from './variations-query-block.data.json';

const perPageMeta = metadata.per_page;
const namespaceMeta = metadata.namespace;

/******************************************************************************
 *
 * Register a variation of the core/query block.
 *
 * @see{@link https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/extending-the-query-loop-block/}
 *
 * The new `attributes` is used to alter the existing default values.
 *
 *****************************************************************************/

registerBlockVariation('core/query', {
  name: namespaceMeta,
  title: 'Post list variation',
  description: 'A variation of the core/query block',
  isActive: ['namespace'],
  icon: 'lightbulb',
  attributes: {
    namespace: namespaceMeta,
    query: {
      commentCount: { value: 4, compare: '>=' },
      perPage: perPageMeta,
      postType: 'post',
      order: 'asc',
      orderBy: 'title',
    },
  },
  allowedControls: ['inherit', 'order'], // Limit controls
  scope: ['inserter'],
  innerBlocks: [
    [
      'core/post-template',
      {},
      [
        ['core/post-title', { isLink: true }],
        ['core/post-excerpt', { moreText: 'Read more ...' }],
      ],
    ],
    ['core/query-pagination'],
    ['core/query-no-results'],
  ],
});

function myprefixAddAttributes(settings, name) {
  if (name === 'core/query') {
    const newObj = assign({}, settings.attributes.query.default, {
      commentCount: {
        value: 0,
        compare: '>=',
      },
    });
    const newSet = merge(settings, {
      attributes: merge(settings.attributes, {
        query: {
          default: newObj,
        },
      }),
    });

    return newSet;
  }
  return settings;
}

addFilter('blocks.registerBlockType', 'myprefix/core-query/add-attributes', myprefixAddAttributes);
