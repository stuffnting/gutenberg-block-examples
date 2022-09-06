import { registerBlockType } from "@wordpress/blocks";

import metadata from "./richtext-basic.block.json";
import { edit } from "./richtext-basic.edit";
import { save } from "./richtext-basic.save";

registerBlockType(metadata.name, {
  edit,
  save,
});
