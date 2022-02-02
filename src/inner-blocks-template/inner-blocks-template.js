const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps, useInnerBlocksProps } = wp.blockEditor;

import metadata from "./inner-blocks-template.json";

// Initial child blocks populating parent
const innerBlocksTemplate = [
  ["core/image", {}],
  ["core/paragraph", { placeholder: "Image Details" }],
];

// Other blocks that can be added. "myprefix/inner-blocks-child" is registered below
const allowedBlocks = ["core/paragraph", "myprefix/inner-blocks-child"];

const STYLE = {
  color: "white",
  padding: "20px",
  background: "midnightblue",
  border: "5px solid yellow",
};

registerBlockType(metadata, {
  edit: () => {
    const blockProps = useBlockProps({ style: STYLE });

    // Experimental in WP 5.8
    const innerBlockProps = useInnerBlocksProps(blockProps, {
      allowedBlocks,
      template: innerBlocksTemplate,
      templateLock: false,
    });

    return <div {...innerBlockProps} />;

    /**
     * Old way, without useInnerBlocksProps
     * 
    return (
      <div {...blockProps}>
        <InnerBlocks
          template={BLOCKS_TEMPLATE}
          allowedBlocks={ALLOWED_BLOCKS}
        />
      </div>
    ); */
  },
  save: ({ className }) => {
    const blockProps = useBlockProps.save({ style: STYLE });

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    );
  },
});

registerBlockType("myprefix/inner-blocks-child", {
  apiVersion: 2,
  title: "Inner Blocks Child",
  category: "design",
  icon: "lightbulb",
  parent: ["myprefix/inner-blocks-template"], // This block must be listed in parent's allowedBlocks
  edit: () => {
    const blockProps = useBlockProps();
    return (
      <div {...blockProps}>
        <p>I am a child</p>
      </div>
    );
  },
  save: ({ className }) => {
    const blockProps = useBlockProps.save();

    return (
      <div {...blockProps}>
        <p>I am a child</p>
      </div>
    );
  },
});
