/**
 * WordPress dependencies
 */

import { registerBlockBindingsSource } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

/**
 * Define which bound post-fields can be edited by the user.
 */
const readOnlyAttributes = ["permalink"];
const editableAttributes = ["title", "excerpt"];

/**
 * Register the block binding source.
 */
registerBlockBindingsSource({
  name: "myprefix/bind-post-data", // Must match the name in the PHP file
  //label: __('Bind Post Data', 'myprefix'), // This is set in the PHP file, and does not need to be reset here
  usesContext: ["postType"], // postId is set the in PHP file, and should not be reset here
  getValues({ select, bindings }) {
    const values = {};

    /**
     * Note, each binding `key` in the editor HTML has been set to the correct value to use
     * with getEditedPostAttribute()
     */
    for (const [attributeName, source] of Object.entries(bindings)) {
      if (
        editableAttributes.includes(source.args.key) ||
        readOnlyAttributes.includes(source.args.key)
      ) {
        values[attributeName] = select("core/editor").getEditedPostAttribute(
          source.args.key
        );
      }
    }

    return values;
  },
  setValues({ dispatch, bindings }) {
    const values = {};

    /**
     * Note, each binding `key` in the editor HTML has been set to the correct value to use
     * with getEditedPostAttribute()
     */
    for (const [attributeName, source] of Object.entries(bindings)) {
      values[source.args.key] = source.newValue;
    }

    if (Object.keys(values).length > 0) {
      dispatch("core/editor").editPost(values);
    }
  },
  canUserEditValue({ context, args }) {
    return "post" === context.postType && editableAttributes.includes(args.key);
  },
});
