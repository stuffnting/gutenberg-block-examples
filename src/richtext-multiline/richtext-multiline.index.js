import { registerBlockType } from "@wordpress/blocks";

import metadata from "./richtext-multiline.block.json";
import { edit } from "./richtext-multiline.edit";
import { save } from "./richtext-multiline.save";

registerBlockType(metadata.name, {
  edit,
  save,
});
