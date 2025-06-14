/**
 * Wordpress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Local dependencies
 */
import metadata from './richtext-multiline-OLD.block.json';
import { edit } from './richtext-multiline-OLD.edit';
import { save } from './richtext-multiline-OLD.save';

registerBlockType(metadata.name, {
  edit,
  save,
});
