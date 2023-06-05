/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import domReady from '@wordpress/dom-ready';
import {
  getBlockTypes,
  unregisterBlockType,
  getBlockVariations,
  unregisterBlockVariation,
  getCategories,
  setCategories,
} from '@wordpress/blocks';

/**
 * This dependency is not used, but is included to force wp-scripts to
 * add wp-edit-post to the dependencies in index.assets.php. Without
 * this extra dependency, @wordpress/wp-dom does not work.
 */
import { PluginSidebar } from '@wordpress/edit-post';

/**
 * Local dependencies
 */
import './block-categories-test-block';

/******************************************************************************
 *
 * Register a category with JS, and reorder the categories.
 *
 *****************************************************************************/

/**
 * Define a custom category.
 */
const customCategory = {
  slug: 'custom-category-js',
  title: __('A custom block category registered with JS', 'textDomain'),
  icon: 'lightbulb',
};

/**
 * An array to specify the new category order.
 *
 * To remove a category, omit it from this array.
 *
 * Note: embed appears as EMBEDS in the inserter.
 * custom-category-php is registered in the PHP file.
 */
const orderArray = [
  'custom-category-php',
  'media',
  'custom-category-js',
  'text',
  'design',
  'widgets',
  'embed',
  'reusable',
  'theme',
];

/**
 * Make a new array containing the reordered categories.
 * custom-category-php is in the array returned by getCategories,
 * with the core categories.
 */
const newCategories = [...getCategories(), customCategory].reduce((acc, category) => {
  let newKey = orderArray.findIndex((el) => el === category.slug);
  if (newKey !== -1) {
    acc[newKey] = category;
  }
  return acc;
}, []);

// Apply the changes
setCategories([...newCategories]);

/******************************************************************************
 *
 * Use a filter to move core blocks between categories.
 *
 *****************************************************************************/

/**
 * Move core/spacer to the custom-category-php category,
 * which is registered in the PHP file.
 */
function myprefixFilterSpacerCategory(settings, name) {
  if (name === 'core/spacer') {
    return {
      ...settings,
      category: 'custom-category-php',
    };
  }
  return settings;
}

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'myprefix/filter-spacer-category',
  myprefixFilterSpacerCategory
);

/******************************************************************************
 *
 * Remove all blocks from the `theme` category.
 * The empty category will be removed from the inserter.
 *
 *****************************************************************************/

/**
 * Use domReady so that we know all the block types are loaded into the editor.
 */
domReady(() => {
  // Remove all blocks from the 'theme' category.
  getBlockTypes().forEach((block) => {
    if (block.category === 'theme') {
      unregisterBlockType(block.name);
    }
  });

  /**
   * Remove all variations of core/embed, these appear under embeds in the inserter.
   * Note: core/embed itself, will remain.
   */
  getBlockVariations('core/embed').forEach((variation) =>
    unregisterBlockVariation('core/embed', variation.name)
  );
});
