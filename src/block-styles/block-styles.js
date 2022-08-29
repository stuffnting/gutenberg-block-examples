/**
 * This code adds and removes block styles.
 *
 * Also see ../block-styles.php for more style related code.
 */

import domReady from "@wordpress/dom-ready";
import { registerBlockStyle, unregisterBlockStyle } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

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
      label: __("Default", "textDomain"),
      isDefault: true,
    },
    {
      name: "aquamarine", // The class name will be `is-style-aquamarine`
      label: __("Aquamarine", "textDomain"), // Styling in stylesheet
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
// This one added in the PHP file block-styles.php (index.php in start/build)
domReady(() => unregisterBlockStyle("core/paragraph", "remove-gold"));
