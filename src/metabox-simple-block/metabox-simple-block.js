const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;
const { useSelect } = wp.data;
const { useEntityProp } = wp.coreData;
const { useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

const META_FIELD_NAME = "_myprefix_metabox_simple_block_meta";

registerBlockType("myprefix/meta-simple-block", {
  apiVersion: 2,
  title: "Meta Simple Block",
  description:
    "A simple metabox in a block that stores a value as metadata, and not in the block itself",
  icon: "lightbulb",
  category: "text",
  supports: {
    multiple: false,
  },
  edit() {
    const blockProps = useBlockProps();

    const postType = useSelect(
      (select) => select("core/editor").getCurrentPostType(),
      []
    );

    const [meta, setMeta] = useEntityProp("postType", postType, "meta");
    const metaFieldValue = meta[META_FIELD_NAME];

    function updateMetaValue(newValue) {
      setMeta({ ...meta, [META_FIELD_NAME]: newValue });
    }

    return (
      <div {...blockProps}>
        <TextControl
          label={__("Metabox Block Field", "textDomain")}
          placeholder={__("Enter some metadata...", "textDomain")}
          value={metaFieldValue}
          onChange={updateMetaValue}
        />
      </div>
    );
  },

  // No information saved to the block
  // Data is saved to post meta via the hook
  save() {
    return null;
  },
});
