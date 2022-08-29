import { registerBlockType } from "@wordpress/blocks";

import metadata from "./richtext-transforms-multiblock.json";
import { edit } from "./richtext-transforms-multiblock-edit";
import { save } from "./richtext-transforms-multiblock-save";
import { transforms } from "./richtext-transforms-multiblock-transforms";

registerBlockType(metadata.name, {
  transforms,
  edit,
  save,
});
