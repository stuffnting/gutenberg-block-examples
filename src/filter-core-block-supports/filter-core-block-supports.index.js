/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/******************************************************************************
 *
 *  1. Restrict `align` support of `full`, or `none` to the core/cover block type.
 *
 *****************************************************************************/

function myprefixFilterCoverBlockAlignments(settings, name) {
  if (name === 'core/cover') {
    return {
      ...settings,
      supports: {
        ...settings.supports,
        align: ['full'],
      },
    };
  }
  return settings;
}

addFilter(
  'blocks.registerBlockType',
  'myprefix/filter-cover-block-alignment-settings',
  myprefixFilterCoverBlockAlignments
);

/******************************************************************************
 *
 * 2. Adds `align` support for `wide` and `full`, to the core/code block type.
 *
 *****************************************************************************/

function myprefixFilterButtonsBlockSupportsAlignWide(settings, name) {
  if (name === 'core/code') {
    return {
      ...settings,
      supports: {
        ...settings.supports,
        align: ['full', 'wide'],
      },
    };
  }
  return settings;
}

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'myprefix/filter-buttons-block-supports-align-wide',
  myprefixFilterButtonsBlockSupportsAlignWide
);

/******************************************************************************
 *
 * 3. Adds support for `color.background`, to the core/spacer block type.
 *
 *****************************************************************************/

function myprefixFilterSpacerBlockSupportsColour(settings, name) {
  if (name === 'core/spacer') {
    return {
      ...settings,
      supports: {
        ...settings.supports,
        color: {
          background: true,
          text: false,
        },
      },
    };
  }
  return settings;
}

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'myprefix/filter-spacer-block-supports-colour',
  myprefixFilterSpacerBlockSupportsColour
);
