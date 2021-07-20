const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
const { TextControl } = wp.components;
const { withSelect, withDispatch } = wp.data;

const METABOX_WITH_SELECT_DOC_SETTINGS_META =
  "_myprefix_metabox_with_select_doc_settings_meta";

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
    doc_set_text_metafield: select("core/editor").getEditedPostAttribute(
      "meta"
    )[METABOX_WITH_SELECT_DOC_SETTINGS_META],
  };
})(DocPanelMetaFields);
DocPanelMetaFields = withDispatch((dispatch) => {
  return {
    onPanelTextMetaFieldChange: (value) => {
      dispatch("core/editor").editPost({
        meta: { [METABOX_WITH_SELECT_DOC_SETTINGS_META]: value },
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
