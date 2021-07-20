/**
 * This code adds and removes block styles.
 *
 * Also see ../block-styles.php for more style related code.
 */

/**
 * If installing @wordpress packages and using `import`
 * put the `import` statements here at the top before the
 * `export default` statement below
 */

const { domReady } = wp;
const { registerBlockStyle, unregisterBlockStyle } = wp.blocks;

domReady(() => {
  registerBlockStyle("core/paragraph", [
    /**
     * *** NOTE ***
     * Note that, since there are no style variations defined for the
     * paragraph block, we must first define a default style for a
     * vanilla paragraph.
     */
    {
      name: "default",
      label: "Default",
      isDefault: true,
    },
    {
      name: "aquamarine", // The class name will be `is-style-aquamarine`
      label: "Aquamarine",
    },
  ]);
});

/**
 * *** NOTE ***
 * All styles, even those registered server-side with PHP, can be
 * unregistered with JS. All the core styles are registered using JS.
 */

// These two are core styles set with JS
domReady(() => unregisterBlockStyle("core/image", "rounded"));
domReady(() => unregisterBlockStyle("core/image", "default"));
// This one added in the PHP file php/block-styles.php
domReady(() => unregisterBlockStyle("core/paragraph", "remove-gold"));
