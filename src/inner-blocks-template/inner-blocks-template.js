const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

const BLOCKS_TEMPLATE = [
  ["core/image", {}],
  ["core/paragraph", { placeholder: "Image Details" }],
];

const STYLE = {
  color: "white",
  padding: "20px",
  background: "midnightblue",
  border: "5px solid yellow",
};

registerBlockType("myprefix/inner-blocks-template", {
  apiVersion: 2,
  title: "Inner Blocks with a template",
  category: "layout",
  icon: "lightbulb",
  edit: () => {
    const blockProps = useBlockProps({ style: STYLE });
    return (
      <>
        <div {...blockProps}>
          <InnerBlocks template={BLOCKS_TEMPLATE} templateLock="all" />
        </div>
      </>
    );
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
