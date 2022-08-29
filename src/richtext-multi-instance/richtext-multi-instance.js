import { registerBlockType } from "@wordpress/blocks";

import metadata from "./richtext-multi-instance.json";
import { edit } from "./richtext-multi-instance-edit";
import { save } from "./richtext-multi-instance-save";

registerBlockType(metadata.name, {
  edit,
  save,
});
