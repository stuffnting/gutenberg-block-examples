import { registerBlockType } from "@wordpress/blocks";
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import metadata from "./inner-blocks-template.block.json";

/*  Initial child blocks populating parent. 
    Each is an array containing the block name 
    and an object defining the initial attribute values. 
    The heading block is locked and can't be moved or removed.
*/
const innerBlocksTemplate = [
  [
    "core/heading",
    {
      level: 2,
      lock: { move: true, remove: true },
      placeholder: "Enter a locked heading",
    },
  ],
  ["core/image", {}],
  ["core/paragraph", { placeholder: "Image Details" }],
];

// Other blocks that can be added. "myprefix/inner-blocks-child" is registered below
const allowedBlocks = [
  "core/paragraph",
  "myprefix/inner-blocks-template-child",
];

const style = {
  color: "white",
  padding: "20px",
  background: "midnightblue",
  border: "5px solid yellow",
};

registerBlockType(metadata.name, {
  edit: () => {
    const blockProps = useBlockProps({ style });

    const innerBlockProps = useInnerBlocksProps(blockProps, {
      allowedBlocks,
      template: innerBlocksTemplate,
      templateLock: false,
    });

    return <div {...innerBlockProps} />;
  },
  save: () => {
    const blockProps = useBlockProps.save({ style });

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
