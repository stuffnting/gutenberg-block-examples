/**
 * WordPress dependencies
 */
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
      // Add new comment count query var
      commentCount: { value: 0, compare: '>=' },
      // Set defaults for existing query vars
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
