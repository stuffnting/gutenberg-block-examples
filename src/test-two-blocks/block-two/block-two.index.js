/**
 * Wordpress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Local dependencies
 */
import metadata from "./block-two.block.json";
import { edit } from "./block-two.edit.js";
import { save } from "./block-two.save.js";

registerBlockType(metadata.name, {
  edit,
  save,
});
