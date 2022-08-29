/**
 * As code adds a meta box to the Document Settings sidebar.
 * The values entered in the box are saved in a meta field.
 *
 */

/**
 * If installing @wordpress packages and using `import`
 * put the `import` statements here at the top before the
 * `export default` statement below
 */

/********************************************************************
 *
 * wp destructuring and constants
 *
 ********************************************************************/

const { TextControl } = wp.components;
const { useSelect } = wp.data;
const { useEntityProp } = wp.coreData;
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;

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
