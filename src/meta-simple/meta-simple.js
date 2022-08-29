import { registerBlockType } from "@wordpress/blocks";
import { TextControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

import metadata from "./meta-simple.json";

const metaField = metadata.metaField;

registerBlockType(metadata.name, {
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
