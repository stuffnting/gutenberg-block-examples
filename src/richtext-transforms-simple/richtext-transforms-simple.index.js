import { registerBlockType } from "@wordpress/blocks";

import metadata from "./richtext-transforms-simple.block.json";
import { edit } from "./richtext-transforms-simple.edit";
import { save } from "./richtext-transforms-simple.save";
import { transforms } from "./richtext-transforms-simple.transforms";

registerBlockType(metadata.name, {
  transforms,
  edit,
  save,
});
