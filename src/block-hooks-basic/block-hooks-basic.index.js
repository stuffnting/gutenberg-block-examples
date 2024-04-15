/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/}
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see {@link https://www.npmjs.com/package/@wordpress/scripts#using-css}
 */
import './block-hooks-basic.style.scss';

/**
 * Internal dependencies
 */
import Edit from './block-hooks-basic.edit';
import metadata from './block-hooks-basic.block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/}
 */
registerBlockType(metadata.name, {
  /**
   * @see ./edit.js
   */
  edit: Edit,
});
