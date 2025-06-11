/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Local dependencies
 */
import metadata from './block-styles-test-block.block.json';

/**
 * Register a block to test the style variations registered from block.json.
 */
registerBlockType(metadata.name, {
	edit: () => {
		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<p>Hello chunky!</p>
			</div>
		);
	},
	save: () => {
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<p>Hello chunky!</p>
			</div>
		);
	},
});
