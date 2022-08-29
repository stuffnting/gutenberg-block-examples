import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";

import metadata from "./dynamic-serverside-render.json";

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
