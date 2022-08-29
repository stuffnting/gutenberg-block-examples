import { registerBlockType } from "@wordpress/blocks";
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import metadata from "./inner-blocks.json";

const allowedBlocks = ["core/paragraph", "core/heading", "core/quote"];

const style = {
  color: "white",
  padding: "20px",
  background: "midnightblue",
  border: "5px solid yellow",
};

registerBlockType(metadata.name, {
  edit: () => {
    const blockProps = useBlockProps({ style });
    const innerBlockProps = useInnerBlocksProps(blockProps, { allowedBlocks });

    return <div {...innerBlockProps} />;

    /**
     * Old way, without useInnerBlocksProps
     * 
        <div {...blockProps}>
          <InnerBlocks
            allowedBlocks={allowedBlocks}
          />
        </div>
     */
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
