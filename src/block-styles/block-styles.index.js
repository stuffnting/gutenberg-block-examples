/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle, unregisterBlockStyle } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';
import { addFilter } from '@wordpress/hooks';
/**
 * This dependency is not used, but is included to force wp-scripts to
 * add wp-edit-post to the dependencies in index.assets.php. Without
 * this extra dependency, @wordpress/wp-dom does not work.
 */
import '@wordpress/edit-post';

/**
 * Local dependencies
 */
import './block-styles-test-block.index';
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
