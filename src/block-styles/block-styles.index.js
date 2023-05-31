/**
 * WordPress dependencies
*/
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import domReady from '@wordpress/dom-ready';
import { registerBlockStyle, unregisterBlockStyle } from '@wordpress/blocks';
/**
 * This dependency is not used, but is included to force wp-scripts to
 * add wp-edit-post to the dependencies in index.assets.php. Without
 * this extra dependency, @wordpress/wp-dom does not work.
 */
import { PluginSidebar } from '@wordpress/edit-post';

/**
 * Local dependencies
 */
import styles from './block-styles.style.scss';

domReady(() => {
  registerBlockStyle('core/paragraph', [
    /**
     * *** NOTE ***
     * Since there are no style variations defined for the
     * paragraph block, we must first define a default style for a
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
});

/**
 * Unregister styles
 */

/**
 * ***NOTE*** This is the Block Editor Handbook recommend way.
 * But, it does not currently work (WP 6.2).
 */
domReady(() => {
  unregisterBlockStyle('core/image', 'rounded');
  // This one added in the PHP file block-styles.php (index.php in start/build)
  // domReady(() => unregisterBlockStyle("core/paragraph", ["remove-gold"]));
});

/**
 * This is another method that currently does work (WP 6.2)
 */
addFilter(
  'blocks.registerBlockType',
  'my-plugin/unregister-block-style',
  function (settings, name) {
    if (name === 'core/image') {
      return Object.assign({}, settings, {
        // Or leave only certain styles.
        styles: [],
      });
    }
    return settings;
  }
);
