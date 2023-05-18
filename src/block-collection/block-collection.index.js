/**
 * Wordpress dependencies
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/#registerblockcollection}
 */
import { registerBlockCollection } from "@wordpress/blocks";

// The collection is registered for the "myprefix" namespace.
registerBlockCollection("myprefix", {
  title: "MyPrefix Blocks",
  icon: "lightbulb",
});
