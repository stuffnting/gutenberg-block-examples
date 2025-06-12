/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Local dependencies
 */
import metadata from './block-json-another-block.block.json';

import './block-json-another-block.style.scss';

/**
 * Register the extra block: myprefix/block-json-another-block.
 */
registerBlockType(metadata.name, {
	edit: () => {
		const blockProps = useBlockProps();
		return (
			<div {...blockProps}>
				<p>I am a block</p>
			</div>
		);
	},
	save: () => {
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<p>I am a block</p>
			</div>
		);
	},
});
