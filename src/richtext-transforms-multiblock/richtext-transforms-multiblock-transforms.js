import { createBlock } from "@wordpress/blocks";

import metadata from "./richtext-transforms-multiblock.json";

export const transforms = {
  /**
   * `from` transformations appear in the transform menu
   * (first button in the block toolbar) of the block type that
   * transforms to this block type.
   */

  from: [
    {
      type: "block",
      isMultiBlock: true, // transforms with multiple blocks selected.
      blocks: ["core/paragraph"],
      transform: (attributes) =>
        // `attributes` contains an array, with one element per selected block.
        attributes.map(({ content, className }) =>
          // `map` returns an array. One new block created per selected block.
          createBlock(metadata.name, {
            content,
            className: `${className} transformed-from-paragraph`,
          })
        ),
    },
  ],
  /**
   * `to` transformations appear in the transform menu
   * (first button in the block toolbar) of this block type.
   */
  to: [
    {
      type: "block",
      isMultiBlock: true,
      blocks: ["core/paragraph"],
      transform: (attributes) =>
        // `attributes` contains an array, with one element per selected block.
        attributes.map(({ content, className }) =>
          // `map` returns an array. One new block created per selected block.
          createBlock("core/paragraph", {
            content,
            className,
          })
        ),
    },
  ],
};
