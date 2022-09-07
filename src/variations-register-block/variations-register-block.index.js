import { registerBlockType } from "@wordpress/blocks";

import metadata from "./variations-register-block.block.json";
import { edit } from "./variations-register-block.edit";
import { save } from "./variations-register-block.save";
import { variations } from "./variations-register-block.variations";
import scss from "./variations-register-block.style.scss";

registerBlockType(metadata.name, {
  variations,
  edit,
  save,
});
