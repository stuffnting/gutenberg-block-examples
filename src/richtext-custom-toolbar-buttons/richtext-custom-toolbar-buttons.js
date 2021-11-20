const { registerBlockType } = wp.blocks;
const { RichText, useBlockProps, BlockControls } = wp.blockEditor;
const { Toolbar, ToolbarGroup, ToolbarButton, ToolbarDropdownMenu } =
  wp.components;
const { __ } = wp.i18n;

import metadata from "./richtext-custom-toolbar-buttons.json";

registerBlockType(metadata, {
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { content } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <BlockControls group="block">
          <ToolbarButton
            label={__("Look in the console!!!")}
            onClick={() => console.log("PANTS!")}
          >
            {__("My button")}
          </ToolbarButton>
          <ToolbarDropdownMenu
            icon="move"
            label={__("Select a direction. Check console.")}
            controls={[
              {
                title: "Up",
                icon: "arrowUp",
                onClick: () => console.log("up"),
              },
              {
                title: "Right",
                icon: "arrowRight",
                onClick: () => console.log("right"),
              },
              {
                title: "Down",
                icon: "arrowDown",
                onClick: () => console.log("down"),
              },
              {
                title: "Left",
                icon: "arrowLeft",
                onClick: () => console.log("left"),
              },
            ]}
          />
        </BlockControls>
        <BlockControls group="inline">
          <ToolbarButton
            label={__("A custom button that deletes the content", "textDomain")}
            icon="dismiss"
            className="myprefix-custom-button-1"
            onClick={() => setAttributes({ content: null })}
          />
        </BlockControls>
        <BlockControls group="other">
          <ToolbarButton
            label={__(
              "A custom button that changes the content to Pants",
              "textDomain"
            )}
            icon="edit-large"
            className="myprefix-custom-button-2"
            onClick={() => setAttributes({ content: "Pants" })}
          />
        </BlockControls>

        <RichText
          identifier="content"
          tagName="h2"
          value={content}
          onChange={(value) => setAttributes({ content: value })}
          placeholder={__("Write heading…", "textDomain")}
          {...blockProps}
        />
      </>
    );
  },
  save: ({ attributes }) => {
    const { content } = attributes;
    const blockProps = useBlockProps.save();

    return (
      <h2 {...blockProps}>
        <RichText.Content value={content} />
      </h2>
    );
  },
});
