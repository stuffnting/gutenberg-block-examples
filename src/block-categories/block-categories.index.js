/**
 * This code:
 * * adds a new block category 'custom-category-js'
 * * registers a new block to test the '-js' (empty categories are not shown in the inserter);
 * * reorders the categories;
 * * move core/spacer to the custom-category-php category, which is registered in the PHP file;
 * * unregisters the blocks the 'theme' category;
 * * unregisters the block variations of core/embed.
 */
import lodash from "lodash";

import { __ } from "@wordpress/i18n";
import domReady from "@wordpress/dom-ready";
import {
  getBlockTypes,
  unregisterBlockType,
  getBlockVariations,
  unregisterBlockVariation,
  getCategories,
  setCategories,
} from "@wordpress/blocks";

import testBlock from "./block-categories.test-block";

/**
 * ***NOTE*** The core categories are:
 * text
 * media
 * design
 * widgets
 * theme
 * embed
 * reusable
 *
 * The only block in embed is core/embed.
 * The other blocks under "embeds" in the inserter are block variations of core/embed.
 * Confusingly, all the category names are the same as their titles in the inserter,
 * apart from embed, which appears as "EMBEDS".
 */

/**
 * Define a custom category.
 */
const customCategory = {
  slug: "custom-category-js",
  title: __("A custom block category registered with JS", "textDomain"),
  icon: "lightbulb",
};

/**
 * An array to specify the new category order.
 * Note: embed appears as EMBEDS in the inserter.
 * custom-category-php is registered in the PHP file.
 */
const orderArray = [
  "custom-category-php",
  "media",
  "text",
  "design",
  "widgets",
  "embed",
  "reusable",
  "theme",
];
// Make a new array reordered core categories
const newCategories = [...getCategories(), customCategory].reduce(
  (acc, category) => {
    let newKey = orderArray.findIndex((el) => el === category.slug);
    if (newKey !== -1) {
      acc[newKey] = category;
    }
    return acc;
  },
  []
);

// Add in the new custom category, in the desired position.
newCategories.splice(0, 0, customCategory);

// Apply the changes
setCategories([...newCategories]);

/**
 * Move core/spacer to the custom-category-php category, which is registered in the PHP file.
 */
function myprefixFilterSpacerCategory(settings, name) {
  if (name === "core/spacer") {
    // Object.assign can also be used instead of lodash.assign
    return lodash.assign({}, settings, {
      category: "custom-category-php",
    });
  }
  return settings;
}

wp.hooks.addFilter(
  "blocks.registerBlockType",
  "myprefix/filter-spacer-category",
  myprefixFilterSpacerCategory
);

/**
 * Use domReady so that we know all the block types are loaded into the editor.
 */
domReady(() => {
  // Remove all blocks from the 'theme' category. Empty categories don't appear in the inserter.
  getBlockTypes().forEach((block) => {
    if (block.category === "theme") {
      unregisterBlockType(block.name);
    }
  });

  // Remove all variations of core/embed, these appear under embeds in the inserter. Note: core/embed itself, will remain.
  getBlockVariations("core/embed").forEach((variation) =>
    unregisterBlockVariation("core/embed", variation.name)
  );
});
