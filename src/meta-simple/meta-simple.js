const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;
const { useSelect } = wp.data;
const { useEntityProp } = wp.coreData;
const { useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import metadata from "./meta-simple.json";

const metaField = metadata.metaField;

registerBlockType(metadata, {
  edit() {
    const blockProps = useBlockProps();

    const postType = useSelect(
      (select) => select("core/editor").getCurrentPostType(),
      []
    );

    const [meta, setMeta] = useEntityProp("postType", postType, "meta");
    const metaFieldValue = meta[metaField];

    function updateMetaValue(newValue) {
      setMeta({ ...meta, [metaField]: newValue });
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
