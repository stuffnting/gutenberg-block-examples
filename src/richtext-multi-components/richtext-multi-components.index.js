/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Local dependencies
 */
import metadata from './richtext-multi-components.block.json';
import { edit } from './richtext-multi-components.edit';
import { save } from './richtext-multi-components.save';

registerBlockType(metadata.name, {
  edit,
  save,
});
