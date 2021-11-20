const { registerBlockType } = wp.blocks;
const { useBlockProps } = wp.blockEditor;

/* 
  React component names must start with a capital letter.
  Hence wp.serverSideRender must be renamed ServerSideRender 
*/
const ServerSideRender = wp.serverSideRender;

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
