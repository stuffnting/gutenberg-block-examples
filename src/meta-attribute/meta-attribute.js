const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;
const { __ } = wp.i18n;

const MYPREFIX_METABOX_ATTRIBUTE_META = "_myprefix_meta_attribute";

registerBlockType("myprefix/meta-attribute", {
  title: "Metabox Attribute",
  description: __(
    "A simple metabox in a block that uses an 'attribute' with 'source: meta', rather than useEntityProp.",
    "textDomain"
  ),
  icon: "lightbulb",
  category: "text",
  attributes: {
    content: {
      type: "string",
      source: "meta",
      // The meta field name, as registered in the PHP file
      meta: MYPREFIX_METABOX_ATTRIBUTE_META,
    },
  },
  edit: ({ attributes, setAttributes }) => {
    // Destructure props object to attributes, className, isSelected, setAttributes

    return (
      <div>
        <TextControl
          label="Text"
          help={__("Enter some text", "textDomain")}
          value={attributes.content}
          onChange={(value) => setAttributes({ content: value })}
        />
      </div>
    );
  },
  save: () => {
    // Value saved as meta data, so, return null
    return null;
  },
});
