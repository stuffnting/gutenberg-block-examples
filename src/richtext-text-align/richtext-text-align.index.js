/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Local Dependencies
 */
import metadata from "./richtext-text-align.block.json";
import { edit } from "./richtext-text-align.edit";
import { save } from "./richtext-text-align.save";

registerBlockType(metadata.name, {
  edit,
  save,
});
