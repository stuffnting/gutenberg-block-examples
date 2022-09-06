import { registerBlockType } from "@wordpress/blocks";

import metadata from "./richtext-custom-toolbar-buttons.block.json";
import { edit } from "./richtext-custom-toolbar-buttons.edit";
import { save } from "./richtext-custom-toolbar-buttons.save";

registerBlockType(metadata.name, {
  edit,
  save,
});
