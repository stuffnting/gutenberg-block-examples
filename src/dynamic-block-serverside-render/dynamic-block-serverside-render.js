const { registerBlockType } = wp.blocks;
/* React component names must start with a capital letter.
     Hence wp.serverSideRender must be renamed ServerSideRender */
const ServerSideRender = wp.serverSideRender;
const { useBlockProps } = wp.blockEditor;

const BLOCK_NAME = "myprefix/dynamic-block-serverside-render";

registerBlockType(BLOCK_NAME, {
  apiVersion: 2,
  title: "Dynamic block serverside rendering",
  icon: "lightbulb",
  category: "widgets",

  edit: ({ attributes }) => {
    const blockProps = useBlockProps();

    return (
      <div {...blockProps}>
        <ServerSideRender block={BLOCK_NAME} attributes={attributes} />
      </div>
    );
  },
  save: () => {
    return null;
  },
});
