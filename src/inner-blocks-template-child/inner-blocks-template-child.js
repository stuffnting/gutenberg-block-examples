const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

const BLOCKS_TEMPLATE = [
  ["core/image", {}],
  ["core/paragraph", { placeholder: "Image Details" }],
];

const ALLOWED_BLOCKS = ["core/paragraph"];

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
      <div {...blockProps}>
        <InnerBlocks
          template={BLOCKS_TEMPLATE}
          allowedBlocks={ALLOWED_BLOCKS}
        />
      </div>
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

registerBlockType("myprefix/inner-blocks-child", {
  apiVersion: 2,
  title: "Inner Blocks Child",
  category: "layout",
  icon: "lightbulb",
  parent: ["myprefix/inner-blocks-template"],
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
