const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;

import metadata from "./dynamic-attribute.json";

registerBlockType(metadata, {
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { content } = attributes;
    const onChangeUrl = (value) => {
      setAttributes({ content: value });
    };

    return (
      <TextControl
        label="Enter some text"
        help="(Make it nice text.)"
        value={content}
        onChange={onChangeUrl}
      />
    );
  },
  save: () => {
    // For dynamic blocks return null
    return null;
  },
});
