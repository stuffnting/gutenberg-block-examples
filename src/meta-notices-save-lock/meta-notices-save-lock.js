import { registerBlockType } from "@wordpress/blocks";

import metadata from "./meta-notices-save-lock.json";
import { edit } from "./meta-notices-save-lock-edit";

registerBlockType(metadata.name, {
  edit,
  save: () => null,
});
