/**
 * This code adds a meta box to the Document Settings sidebar.
 * The values entered in the box are saved in a meta field.
 * It does not register a block type.
 */

/********************************************************************
 *
 * Importing @wordpress packages.
 *
 ********************************************************************/

import { TextControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import { registerPlugin } from "@wordpress/plugins";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";

import metadata from "./meta-document-settings.json";

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
 * Document Settings Panel metabox
 *
 ********************************************************************/

registerPlugin("myprefix-meta-document-settings", {
  icon: "lightbulb",
  render: () => {
    return (
      <>
        <PluginDocumentSettingPanel
          name="myprefix-meta-document-settings-panel"
          title="Meta Document Settings Panel"
          icon="lightbulb"
        >
          <DocPanelMetaFields />
        </PluginDocumentSettingPanel>
      </>
    );
  },
});
