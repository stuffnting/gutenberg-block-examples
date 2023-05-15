/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Local dependencies
 */
import metadata from "./meta-notices-save-lock.block.json";
import { edit } from "./meta-notices-save-lock.edit";

registerBlockType(metadata.name, {
  edit,
  save: () => null,
});
