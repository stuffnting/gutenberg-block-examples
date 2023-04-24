import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";

import metadata from "./dynamic-serverside-render.block.json";

registerBlockType(metadata, {
  edit: ({ attributes }) => {
    const blockProps = useBlockProps();
    /*
     * If this block supports `anchor`, and an anchor is entered, it will break the block.
     * Therefore, remove `anchor` from the attributed before rendering,
     */
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
