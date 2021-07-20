function myprefixFilterSpacerBlockSupportsColour(settings, name) {
  if (name === "core/spacer") {
    // `Object.assign` can also be used instead of `lodash.assign`
    return lodash.assign({}, settings, {
      supports: lodash.assign({}, settings.supports, {
        color: {
          /* Adds a colour picker to the block inspector WP 5.6, 
              Supports background, text and gradient */
          background: true,
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

function myprefixFilterButtonsBlockSupportsAlignWide(settings, name) {
  if (name === "core/buttons") {
    // `Object.assign` can also be used instead of `lodash.assign`
    return lodash.assign({}, settings, {
      supports: lodash.assign({}, settings.supports, {
        // Enable the align-UI with all options...
        alignWide: true,
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
