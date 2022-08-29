const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
const { TextControl } = wp.components;
const { withSelect, withDispatch } = wp.data;

import metadata from "./meta-with-select-doc-settings.json";

const metaField = metadata.metaField;

let DocPanelMetaFields = (props) => {
  return (
    <>
      <TextControl
        value={props.doc_set_text_metafield}
        label={__("Some Text", "textDomain")}
        onChange={(value) => props.onPanelTextMetaFieldChange(value)}
      />
    </>
  );
};

DocPanelMetaFields = withSelect((select) => {
  return {
    doc_set_text_metafield:
      select("core/editor").getEditedPostAttribute("meta")[metaField],
  };
})(DocPanelMetaFields);
DocPanelMetaFields = withDispatch((dispatch) => {
  return {
    onPanelTextMetaFieldChange: (value) => {
      dispatch("core/editor").editPost({
        meta: { [metaField]: value },
      });
    },
  };
})(DocPanelMetaFields);

registerPlugin("myprefix-with-select", {
  icon: "lightbulb",
  render: () => {
    return (
      <>
        <PluginDocumentSettingPanel
          name="myprefix-with-select-panel"
          title="withSelect Panel"
          icon="lightbulb"
        >
          <DocPanelMetaFields />
        </PluginDocumentSettingPanel>
      </>
    );
  },
});
