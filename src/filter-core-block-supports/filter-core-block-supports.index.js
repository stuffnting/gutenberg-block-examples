import { addFilter } from "@wordpress/hooks";
// lodash is added as a Webpack 'external' by @wordpress/scripts.
// `Object.assign` can also be used instead of `lodash.assign`.
import { assign, merge } from "lodash";

/**
 * Restrict supports.align to full or none for the core/cover block type.
 *
 * @see {@link https://css-tricks.com/a-crash-course-in-wordpress-block-filters/}
 *
 * @param {Object} settings The block type's default settings.
 * @param {string} name The name of the block type.
 *
 * @returns {Object} Modified settings wih supports.align restricted to `full`.
 */
function myprefixFilterCoverBlockAlignments(settings, name) {
  if (name === "core/cover") {
    return assign({}, settings, {
      supports: merge(settings.supports, {
        align: ["full"],
      }),
    });
  }
  return settings;
}

addFilter(
  "blocks.registerBlockType",
  "myprefix/filter-cover-block-alignment-settings",
  myprefixFilterCoverBlockAlignments
);

/**
 * Adds support for colour to the core/spacer block type.
 *
 * @param {Object} settings The block type's default settings.
 * @param {string} name The name of the block type.
 *
 * @returns {Object} Modified settings wih supports.color added.
 */
function myprefixFilterSpacerBlockSupportsColour(settings, name) {
  if (name === "core/spacer") {
    return assign({}, settings, {
      supports: merge(settings.supports, {
        color: {
          background: true,
          text: false,
        },
      }),
    });
  }
  return settings;
}

wp.hooks.addFilter(
  "blocks.registerBlockType",
  "myprefix/filter-spacer-block-supports-colour",
  myprefixFilterSpacerBlockSupportsColour
);

/**
 * Adds support for wide and full aligned core/code blocks.
 *
 * @param {Object} settings The block type's default settings.
 * @param {string} name The name of the block type.
 *
 * @returns {Object} Modified settings wih supports added for align.
 */
function myprefixFilterButtonsBlockSupportsAlignWide(settings, name) {
  if (name === "core/code") {
    return assign({}, settings, {
      supports: merge(settings.supports, {
        align: ["full", "wide"],
        // ... or only allow specific alignments
        // align: ['center,'full'],
      }),
    });
  }
  return settings;
}

wp.hooks.addFilter(
  "blocks.registerBlockType",
  "myprefix/filter-buttons-block-supports-align-wide",
  myprefixFilterButtonsBlockSupportsAlignWide
);
