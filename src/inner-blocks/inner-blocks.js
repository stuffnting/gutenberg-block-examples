const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps, useInnerBlocksProps } = wp.blockEditor;

import metadata from "./inner-blocks.json";

const allowedBlocks = ["core/paragraph", "core/heading", "core/quote"];

const STYLE = {
  color: "white",
  padding: "20px",
  background: "midnightblue",
  border: "5px solid yellow",
};

registerBlockType(metadata, {
  edit: () => {
    const blockProps = useBlockProps({ style: STYLE });
    const innerBlockProps = useInnerBlocksProps(blockProps, { allowedBlocks });

    return <div {...innerBlockProps} />;

    /**
     * Old way, without useInnerBlocksProps
     * 
        <div {...blockProps}>
          <InnerBlocks
            allowedBlocks={["core/paragraph", "core/heading", "core/quote"]}
          />
        </div>
     */
  },
  save: () => {
    const blockProps = useBlockProps.save({ style: STYLE });

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
