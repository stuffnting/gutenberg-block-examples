/**
 * Wordpress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";

/**
 * Local dependencies
 */
import metadataParent from "./context-parent.block.json";
import metadataChild from "./context-child.block.json";

/******************************************************************************
 *
 * Parent block
 *
 *****************************************************************************/

registerBlockType(metadataParent.name, {
  edit: (props) => {
    // Only allow the child block as an inner block.
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
          value={myNumber || ""}
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

/******************************************************************************
 *
 * Child block
 *
 *****************************************************************************/

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
