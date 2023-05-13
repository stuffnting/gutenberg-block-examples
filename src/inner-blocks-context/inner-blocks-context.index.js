/**
 * Wordpress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
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
    const innerBlocksProps = useInnerBlocksProps(
      {},
      {
        template: MY_TEMPLATE,
        templateLock: "all",
      }
    );

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
        <div {...innerBlocksProps} />
      </div>
    );
  },

  save: ({ attributes }) => {
    const blockProps = useBlockProps.save();
    const innerBlocksProps = useInnerBlocksProps.save();

    return (
      <div {...blockProps}>
        <p>My Number Is (Rendered from parent): {attributes.myNumber}</p>
        {innerBlocksProps.children}
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
  save(props) {
    // Rendered by the parent
    return "Content from child save function";
  },
});
