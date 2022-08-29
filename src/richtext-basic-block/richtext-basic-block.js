import { registerBlockType } from "@wordpress/blocks";

import metadata from "./richtext-basic-block.json";
import { edit } from "./richtext-basic-block-edit";
import { save } from "./richtext-basic-block-save";

registerBlockType(metadata.name, {
  edit,
  save,
});
