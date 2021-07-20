const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

const STYLE = {
  color: "white",
  padding: "20px",
  background: "midnightblue",
  border: "5px solid yellow",
};

registerBlockType("myprefix/inner-blocks", {
  apiVersion: 2,
  title: "Inner Blocks",
  category: "layout",
  icon: "lightbulb",
  edit: () => {
    const blockProps = useBlockProps({ style: STYLE });

    return (
      <>
        <div {...blockProps}>
          <InnerBlocks
            allowedBlocks={["core/paragraph", "core/heading", "core/quote"]}
          />
        </div>
      </>
    );
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
