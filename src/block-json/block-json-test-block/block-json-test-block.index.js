/**
 * Wordpress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Local dependencies
 */
import metadata from './block-json-test-block.block.json';
import { edit } from './block-json-test-block.edit';
import { save } from './block-json-test-block.save';

import './block-json-test-block.style.scss';

/**
 * Register the main block: myprefix/block-json.
 */
registerBlockType(metadata.name, {
	merge: (attributes, attributesToMerge) => {
		return {
			content:
				(attributes.content || '') + (attributesToMerge.content || ''),
		};
	},
	edit,
	save,
});
