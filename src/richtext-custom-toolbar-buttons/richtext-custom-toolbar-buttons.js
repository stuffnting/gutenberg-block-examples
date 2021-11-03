const { registerBlockType } = wp.blocks;
const { RichText, useBlockProps, BlockControls } = wp.blockEditor;
const { Toolbar, ToolbarGroup, ToolbarButton } = wp.components;
const { __ } = wp.i18n;

registerBlockType("myprefix/richtext-custom-toolbar-buttons", {
  apiVersion: 2,
  title: "RichText Custom Toolbar Buttons",
  icon: "lightbulb",
  category: "text",
  attributes: {
    content: {
      type: "string",
      source: "html", // Not 'text'
      selector: "h2",
      default: "",
    },
  },
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { content } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <BlockControls group="block">
          <ToolbarButton onClick={() => console.log("PANTS!")}>
            {__("My button")}
          </ToolbarButton>
        </BlockControls>
        <BlockControls group="inline">
          <ToolbarButton
            label={__("A custom button that deletes the content", "textDomain")}
            icon="dismiss"
            className="myprefix-custom-button-1"
            onClick={() => setAttributes({ content: null })}
          />
        </BlockControls>
        <BlockControls>
          <Toolbar label={__("Custom Buttons", "textDomain")}>
            <ToolbarGroup>
              <ToolbarButton
                label={__(
                  "A custom button that changes the content to Pants",
                  "textDomain"
                )}
                icon="edit-large"
                className="myprefix-custom-button-2"
                onClick={() => setAttributes({ content: "Pants" })}
              />
            </ToolbarGroup>
          </Toolbar>
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
