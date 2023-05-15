/**
 * Wordpress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Local dependencies
 */
import metadata from "./richtext-multiline.block.json";
import { edit } from "./richtext-multiline.edit";
import { save } from "./richtext-multiline.save";

registerBlockType(metadata.name, {
  edit,
  save,
});
