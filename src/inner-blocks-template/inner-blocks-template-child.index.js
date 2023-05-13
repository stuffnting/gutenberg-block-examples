/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Local dependencies
 */
import metadata from "./inner-blocks-template-child.block.json";

registerBlockType(metadata.name, {
  edit: () => {
    const blockProps = useBlockProps();
    return (
      <div {...blockProps}>
        <p>I am a child</p>
      </div>
    );
  },
  save: () => {
    const blockProps = useBlockProps.save();

    return (
      <div {...blockProps}>
        <p>I am a child</p>
      </div>
    );
  },
});
