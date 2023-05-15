/**
 * Wordpress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Local dependencies
 */
import metadata from "./richtext-basic.block.json";
import { edit } from "./richtext-basic.edit";
import { save } from "./richtext-basic.save";

registerBlockType(metadata.name, {
  edit,
  save,
});
