import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";

/*
  React component names must start with a capital letter.
  Hence wp.serverSideRender must be renamed ServerSideRender.
*/
import ServerSideRender from "@wordpress/server-side-render";

import metadata from "./dynamic-serverside-render.block.json";

registerBlockType(metadata, {
  edit: ({ attributes }) => {
    const blockProps = useBlockProps();

    return (
      <div {...blockProps}>
        <ServerSideRender block={metadata.name} attributes={attributes} />
      </div>
    );
  },
  save: () => {
    return null;
  },
});
