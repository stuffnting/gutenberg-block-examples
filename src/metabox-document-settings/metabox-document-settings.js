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

const META_FIELD_NAME = "_myprefix_metabox_document_settings_meta";

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
  const metaFieldValue = meta[META_FIELD_NAME];

  function updateMetaValue(newValue) {
    setMeta({ ...meta, [META_FIELD_NAME]: newValue });
  }

  return (
    <TextControl
      label={__("Metabox Block Field", "textDomain")}
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

registerPlugin("myprefix-use-select", {
  icon: "lightbulb",
  render: () => {
    return (
      <>
        <PluginDocumentSettingPanel
          name="myprefix-use-select-panel"
          title="useSelect Panel"
          icon="lightbulb"
        >
          <DocPanelMetaFields />
        </PluginDocumentSettingPanel>
      </>
    );
  },
});
