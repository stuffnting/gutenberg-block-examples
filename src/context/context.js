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

  // Because provides_context is defined in the PHP file this line is not needed here
  /*   providesContext: {
    "myprefix/myNumber": "myNumber",
  }, */

  edit: (props) => {
    const MY_TEMPLATE = [["myprefix/context-child", {}]];

    const blockProps = useBlockProps();

    const {
      attributes: { myNumber },
      setAttributes,
    } = props;

    return (
      <div {...blockProps}>
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
        <p>My Number Is: {props.attributes.myNumber}</p>
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

  // Because uses_context is defined in the PHP file this line is not needed here
  //usesContext: ["myprefix/myNumber"],

  // Only allow the child block to be an innerblock for the parent. Child will not show in the inserter.
  parent: ["test/parent-block"],

  edit(props) {
    const { context } = props;
    return "My Number IS: " + context["myprefix/myNumber"];
  },

  save() {
    return null;
  },
});
