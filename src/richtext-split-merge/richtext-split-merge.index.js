/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Local dependencies
 */
import metadata from "./richtext-split-merge.block.json";
import { edit, merge } from "./richtext-split-merge.edit";
import { save } from "./richtext-split-merge.save";

registerBlockType(metadata.name, {
  merge,
  edit,
  save,
});
