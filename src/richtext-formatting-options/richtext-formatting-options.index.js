/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Local dependencies
 */
import metadata from "./richtext-formatting-options.block.json";
import { edit } from "./richtext-formatting-options.edit";
import { save } from "./richtext-formatting-options.save";

registerBlockType(metadata.name, {
  edit,
  save,
});
