/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Local dependencies
 */
import metadata from "./dynamic-meta-block.block.json";
import { edit } from "./dynamic-meta-block.edit";
import { save } from "./dynamic-meta-block.save";
import css from "./dynamic-meta-block.style.scss";

registerBlockType(metadata.name, {
  edit,
  save,
});
