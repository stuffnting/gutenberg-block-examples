/**
 * Wordpress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Local dependencies
 */
import "./another-block-json.index";
import metadata from "./block-json.block.json";
import { edit } from "./block-json.edit";
import { save } from "./block-json.save";
import css from "./block-json.style.scss";

/**
 * Register the main block: myprefix/block-json.
 */
registerBlockType(metadata.name, {
  merge: (attributes, attributesToMerge) => {
    return {
      content: (attributes.content || "") + (attributesToMerge.content || ""),
    };
  },
  edit,
  save,
});
