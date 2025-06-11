/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	registerBlockStyle,
	unregisterBlockStyle,
	registerBlockType,
} from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';
import { addFilter } from '@wordpress/hooks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Local dependencies
 */
import metadata from './block-styles.block.json';
import styles from './block-styles.style.scss';

/**
 * Register block style variations for core/paragraph.
 */
registerBlockStyle('core/paragraph', [
	/**
	 * *** NOTE ***
	 * Since there are no style variations defined for the
	 * paragraph block, we first define a default style for a
	 * vanilla paragraph.
	 */
	{
		name: 'default',
		label: __('Default', 'textDomain'),
		isDefault: true,
	},
	{
		name: 'aquamarine', // The class name will be `is-style-aquamarine`
		label: __('Aquamarine', 'textDomain'), // Styling in stylesheet
	},
]);

/**
 * Unregister styles
 */

/**
 * ***NOTE*** This is the Block Editor Handbook recommend way.
 * However, the a extra dependency needs adding in the PHP file.
 */
domReady(() => {
	unregisterBlockStyle('core/image', 'rounded');
	// This one added in the PHP file block-styles.php (index.php in start/build)
	unregisterBlockStyle('core/paragraph', ['remove-gold']);
});

/**
 * This is another method.
 * It removes all styles for the image block.
 */
addFilter(
	'blocks.registerBlockType',
	'my-plugin/unregister-block-style',
	function (settings, name) {
		if (name === 'core/button') {
			return Object.assign({}, settings, {
				// Or leave only certain styles.
				styles: [],
			});
		}
		return settings;
	}
);

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
