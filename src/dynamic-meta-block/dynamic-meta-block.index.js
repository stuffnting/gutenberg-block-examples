import { registerBlockType } from "@wordpress/blocks";

import metadata from "./dynamic-meta-block.block.json";
import { edit } from "./dynamic-meta-block.edit";
import { save } from "./dynamic-meta-block.save";

registerBlockType(metadata.name, {
  edit,
  save,
});
