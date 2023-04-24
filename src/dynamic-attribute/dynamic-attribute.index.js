import { registerBlockType } from "@wordpress/blocks";
import { TextControl } from "@wordpress/components";
import { useBlockProps } from "@wordpress/block-editor";

import metadata from "./dynamic-attribute.block.json";

registerBlockType(metadata.name, {
  edit: (props) => {
    const blockProps = useBlockProps();

    const { attributes, setAttributes } = props;
    const { content } = attributes;
    const onChangeUrl = (value) => {
      setAttributes({ content: value });
    };

    return (
      <div {...blockProps}>
        <TextControl
          label="Enter some text"
          help="(Make it nice text.)"
          value={content}
          onChange={onChangeUrl}
        />
      </div>
    );
  },
  save: () => {
    // For dynamic blocks return null
    return null;
  },
});
