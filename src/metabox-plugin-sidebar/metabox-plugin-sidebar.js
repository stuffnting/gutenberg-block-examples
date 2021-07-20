/********************************************************************
 *
 * wp destructuring and constants
 *
 ********************************************************************/

const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { DateTimePicker, ColorPicker, PanelRow, PanelBody } = wp.components;
const { useSelect } = wp.data;
const { useEntityProp } = wp.coreData;
const { __ } = wp.i18n;

// This meta field is two strings stored as an array
const META_FIELD_OBJECT_NAME = "_myprefix_metabox_plugin_sidebar_meta";

/********************************************************************
 *
 * React components that adds a meta field
 *
 ********************************************************************/

function PluginSidebarMetaFields() {
  const postType = useSelect(
    (select) => select("core/editor").getCurrentPostType(),
    []
  );

  const [meta, setMeta] = useEntityProp("postType", postType, "meta");

  const colour = meta[META_FIELD_OBJECT_NAME].colour || "";
  const datetime = meta[META_FIELD_OBJECT_NAME].datetime || "";

  // Ths key is which item in the meta field array to use
  function updateMetaValue(newValue, fieldName) {
    const newMetaObj = Object.assign({}, meta[META_FIELD_OBJECT_NAME], {
      [fieldName]: newValue,
    });

    setMeta({ ...meta, [META_FIELD_OBJECT_NAME]: newMetaObj });
  }

  return (
    <>
      <PanelBody
        title={__("A colour picker", "textDomain")}
        icon="lightbulb"
        initialOpen={true}
      >
        <ColorPicker
          color={colour}
          label={__("Colour Meta", "textDomain")}
          onChangeComplete={(newValue) =>
            updateMetaValue(newValue.hex, "colour")
          }
          disableAlpha
        />
      </PanelBody>
      <PanelBody
        title={__("A DateTime picker", "textDomain")}
        icon="lightbulb"
        initialOpen={true}
      >
        <DateTimePicker
          currentDate={datetime}
          onChange={(newValue) => updateMetaValue(newValue, "datetime")}
          is12Hour={false}
        />
      </PanelBody>
    </>
  );
}

/******************************************************************************
 * Register the plugin with Gutenberg and create the sidebar.
 * `PluginSidebarMoreMenuItem` adds an item in
 * Gutenberg's 3-dot menu (top-right).
 * `PluginSidebar` creates the sidebar and puts a button in the toolbar,
 * next to Gutenberg's cog (top-right), to toggle the sidebar.
 * See SlotFills in Gutenberg documentation:
 * https://developer.wordpress.org/block-editor/developers/slotfills/plugin-sidebar/
 * and
 * https://developer.wordpress.org/block-editor/packages/packages-plugins/
 *****************************************************************************/
registerPlugin("myprefix-sidebar", {
  icon: "lightbulb",
  render: () => {
    return (
      <>
        <PluginSidebarMoreMenuItem target="myprefix-sidebar">
          {__("Meta Options", "textDomain")}
        </PluginSidebarMoreMenuItem>
        <PluginSidebar
          name="myprefix-sidebar"
          title={__("Meta Options", "textDomain")}
        >
          <PluginSidebarMetaFields />
        </PluginSidebar>
      </>
    );
  },
});
