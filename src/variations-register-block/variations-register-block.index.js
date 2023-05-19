/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Local dependencies
 */
import metadata from './variations-register-block.block.json';
import { edit } from './variations-register-block.edit';
import { save } from './variations-register-block.save';
import { variations } from './variations-register-block.variations';

registerBlockType( metadata.name, {
	variations,
	edit,
	save,
} );
