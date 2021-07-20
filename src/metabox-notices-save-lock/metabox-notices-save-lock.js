const { useEffect } = wp.element;
const { useSelect, select, dispatch } = wp.data;
const { useEntityProp } = wp.coreData;
const { registerBlockType } = wp.blocks;
const { DateTimePicker, PanelBody } = wp.components;
const { useBlockProps, InspectorControls } = wp.blockEditor;
const { __ } = wp.i18n;

const MYPREFIX_META_KEY = "_myprefix_notices_save_lock_meta";

registerBlockType("myprefix/metabox-notices-save-lock", {
  apiVersion: 2,
  title: __("Meta Notices and Save-Lock", "textDomain"),
  description: __(
    "A block with a meta field, including a warning notice and a save-lock",
    "textDomain"
  ),
  icon: "lightbulb",
  category: "text",
  edit: () => {
    const blockProps = useBlockProps();

    const postType = useSelect(
      (select) => select("core/editor").getCurrentPostType(),
      []
    );

    const [meta, setMeta] = useEntityProp("postType", postType, "meta");
    const date = meta[MYPREFIX_META_KEY] || "";

    function updateMetaValue(newDate) {
      setMeta({ ...meta, [MYPREFIX_META_KEY]: newDate });
    }

    useEffect(() => {
      const createErrorNotice = wp.data.dispatch("core/notices")
        .createErrorNotice;
      const removeErrorNotice = wp.data.dispatch("core/notices").removeNotice;
      const getNotices = select("core/notices").getNotices();

      if (!date) {
        console.warn("No date was picked.");
        dispatch("core/editor").lockPostSaving("myprefix-no-date-meta");

        if (
          !getNotices.some(
            (notice) => notice.id === "myprefix-missing-date-meta"
          )
        ) {
          createErrorNotice(
            "You need to pick-a-date before you can save this post.",
            {
              id: "myprefix-missing-date-meta", // Unique ID
              type: "default", // `default` is normal top bar, `snackbar` is small and at bottom
              actions: [
                {
                  label: __("Learn more.", "textDomain"),
                  url: "https://www.timeanddate.com/worldclock/",
                  className: "pants-class",
                },
              ],
            }
          );
        }
      } else if (date) {
        dispatch("core/editor").unlockPostSaving("myprefix-no-date-meta");
        removeErrorNotice("myprefix-missing-date-meta");
      }

      return () => {
        dispatch("core/editor").unlockPostSaving("myprefix-no-date-meta");
        removeErrorNotice("myprefix-missing-date-meta");
      };
    });

    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__("Pick-a-Date", "textDomain")}
            initialOpen={false}
            icon="calendar-alt"
          >
            <DateTimePicker
              currentDate={date}
              onChange={updateMetaValue}
              is12Hour={false}
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          <p>{date || __("Enter a date...", "textDomain")}</p>
        </div>
      </>
    );
  },
  save: () => null,
});
