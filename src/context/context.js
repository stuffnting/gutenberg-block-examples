const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { TextControl } = wp.components;

registerBlockType("myprefix/context-parent", {
  apiVersion: 2,
  title: "Context parent",
  category: "widgets",
  icon: "lightbulb",

  attributes: {
    myNumber: {
      type: "number",
    },
  },

  providesContext: {
    "myprefix/myNumber": "myNumber",
  },

  edit: (props) => {
    const MY_TEMPLATE = [["myprefix/context-child", {}]];
    const {
      attributes: { myNumber },
      setAttributes,
    } = props;
    return (
      <div>
        <TextControl
          label="My Number:"
          value={myNumber}
          onChange={(val) => setAttributes({ myNumber: Number(val) })}
        />
        <InnerBlocks template={MY_TEMPLATE} templateLock="all" />
      </div>
    );
  },

  save: (props) => {
    const blockProps = useBlockProps.save();

    return (
      <div {...blockProps}>
        <p>The record ID: {props.attributes.myNumber}</p>
        <InnerBlocks.Content />
      </div>
    );
  },
});

registerBlockType("myprefix/context-child", {
  apiVersion: 2,
  title: "Context child",
  category: "widgets",
  icon: "lightbulb",

  usesContext: ["myprefix/myNumber"],

  edit(props) {
    const { context } = props;
    return "The record ID: " + context["myprefix/myNumber"];
  },

  save() {
    return null;
  },
});
