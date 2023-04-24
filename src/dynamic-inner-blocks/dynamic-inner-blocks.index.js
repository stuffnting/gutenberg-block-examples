import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

import { GetPosts } from "./get-posts";
import metadata from "./dynamic-inner-blocks.block.json";

const allowedBlocks = ["core/paragraph", "core/heading", "core/list"];

registerBlockType(metadata.name, {
  edit: () => {
    const blockProps = useBlockProps();
    const innerBlockProps = useInnerBlocksProps(blockProps, { allowedBlocks });

    return (
      <div {...blockProps}>
        <h2>Last Posts</h2>
        <GetPosts />
        <div {...innerBlockProps} />
      </div>
    );
  },
  save: () => {
    const blockProps = useBlockProps.save();
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <div {...innerBlocksProps} />;
  },
});
