/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { TextControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { registerPlugin } from "@wordpress/plugins";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";

/**
 * Local dependencies
 */
// This is not a block.json file. It stores the meta field name,so that it is accessible to JS and PHP
import metadata from "./block-binding-meta-box.metafield.json";

// The meta field name is defined in the JSON file
const metaField = metadata.metaField;

/********************************************************************
 *
 * React components that adds a meta field
 *
 ********************************************************************/

const DocPanelMetaFields = () => {
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
    <TextControl
      label={__("Meta Block Field", "textDomain")}
      placeholder={__("Enter some metadata...", "textDomain")}
      value={metaFieldValue}
      onChange={updateMetaValue}
    />
  );
};

/********************************************************************
 *
 * Register the plugin to create the sidebar and the
 * Document Settings Panel meta box
 *
 ********************************************************************/

registerPlugin("myprefix-block-binding-meta-box", {
  icon: "lightbulb",
  render: () => {
    return (
      <>
        <PluginDocumentSettingPanel
          name="myprefix-block-binding-meta-box"
          title="Block Binding Meta Box"
          icon="lightbulb">
          <DocPanelMetaFields />
        </PluginDocumentSettingPanel>
      </>
    );
  },
});
