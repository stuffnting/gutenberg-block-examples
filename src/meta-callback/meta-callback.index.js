/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Local dependencies
 */
import metadata from "./meta-callback.block.json";
import { edit } from "./meta-callback.edit";
import { save } from "./meta-callback.save";
import css from "./meta-callback.style.scss";

registerBlockType(metadata.name, {
  edit,
  save,
});
