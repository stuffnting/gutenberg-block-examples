/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Local dependencies
 */
import metadata from './richtext-multi-instance.block.json';
import { edit } from './richtext-multi-instance.edit';
import { save } from './richtext-multi-instance.save';

registerBlockType(metadata.name, {
  edit,
  save,
});
