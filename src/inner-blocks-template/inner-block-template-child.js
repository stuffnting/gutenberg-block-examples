import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";
/**
 * ***NOTE*** This block does not use a block.json file.
 */
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
