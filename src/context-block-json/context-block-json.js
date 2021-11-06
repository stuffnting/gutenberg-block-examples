const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { TextControl } = wp.components;

registerBlockType("myprefix/context-block-json-parent", {
  edit: (props) => {
    const MY_TEMPLATE = [["myprefix/context-child", {}]];

    const blockProps = useBlockProps();

    const {
      attributes: { myNiceNumber },
      setAttributes,
    } = props;

    return (
      <div {...blockProps}>
        <TextControl
          label="My Number:"
          value={myNiceNumber}
          onChange={(val) => setAttributes({ myNiceNumber: Number(val) })}
        />
        <InnerBlocks template={MY_TEMPLATE} templateLock="all" />
      </div>
    );
  },

  save: (props) => {
    const blockProps = useBlockProps.save();

    return (
      <div {...blockProps}>
        <p>The record ID: {props.attributes.myNiceNumber}</p>
        <InnerBlocks.Content />
      </div>
    );
  },
});

registerBlockType("myprefix/context-block-json-child", {
  edit(props) {
    const { context } = props;
    return "The record ID: " + context["myprefix/myNiceNumber"];
  },

  save() {
    return null;
  },
});
