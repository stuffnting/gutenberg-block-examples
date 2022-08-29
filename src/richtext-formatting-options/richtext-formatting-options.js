import { registerBlockType } from "@wordpress/blocks";

import metadata from "./richtext-formatting-options.json";
import { edit } from "./richtext-formatting-options-edit";
import { save } from "./richtext-formatting-options-save";

registerBlockType(metadata.name, {
  edit,
  save,
});
