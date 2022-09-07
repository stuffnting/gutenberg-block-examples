import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";

import metadataParent from "./context-json.block.json";
import metadataChild from "./context-json-child.block.json";

registerBlockType(metadataParent.name, {
  edit: (props) => {
    const MY_TEMPLATE = [["myprefix/context-json-child", {}]];

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

registerBlockType(metadataChild.name, {
  edit(props) {
    const { context } = props;
    return "My Number IS: " + context["myprefix/myNumber"];
  },
  save() {
    // Dynamically rendered to no save function needed.
    return null;
  },
});
