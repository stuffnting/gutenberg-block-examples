import { registerBlockType } from "@wordpress/blocks";

import metadata from "./block-json.block.json";
import { edit } from "./block-json.edit";
import { save } from "./block-json.save";

import css from "./block-json.style.scss";

registerBlockType(metadata.name, {
  merge: (attributes, attributesToMerge) => {
    return {
      content: (attributes.content || "") + (attributesToMerge.content || ""),
    };
  },
  edit,
  save,
});
