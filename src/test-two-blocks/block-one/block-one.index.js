/**
 * Wordpress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Local dependencies
 */
import metadata from "./block-one.block.json";
import { edit } from "./block-one.edit.js";
import { save } from "./block-one.save.js";

registerBlockType(metadata.name, {
  edit,
  save,
});
