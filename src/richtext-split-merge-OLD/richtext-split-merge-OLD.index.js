/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Local dependencies
 */
import metadata from './richtext-split-merge-OLD.block.json';
import { edit, merge } from './richtext-split-merge-OLD.edit';
import { save } from './richtext-split-merge.-OLDsave';

registerBlockType(metadata.name, {
  merge,
  edit,
  save,
});
