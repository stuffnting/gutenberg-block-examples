/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";

/**
 * Local dependencies
 */
import metadata from "./dynamic-serverside-render.block.json";

registerBlockType(metadata, {
  edit: ({ attributes }) => {
    const blockProps = useBlockProps();

    return (
      <div {...blockProps}>
        <ServerSideRender
          block={metadata.name}
          attributes={attributes}
          skipBlockSupportAttributes
        />
      </div>
    );
  },
  save: () => {
    return null;
  },
});
