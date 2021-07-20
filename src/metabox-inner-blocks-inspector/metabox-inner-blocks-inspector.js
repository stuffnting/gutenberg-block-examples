const { registerBlockType } = wp.blocks;
const { DateTimePicker, PanelBody } = wp.components;
const { useSelect } = wp.data;
const { useEntityProp } = wp.coreData;
const { useBlockProps, InspectorControls, InnerBlocks } = wp.blockEditor;
const { __ } = wp.i18n;

const MYPREFIX_META_KEY = "_myprefix_inner_blocks_inspector_meta";
const MYPREFIX_ALLOWED_BLOCKS = ["core/paragraph", "core/heading"];

registerBlockType("myprefix/metabox-inner-blocks-inspector", {
  apiVersion: 2,
  title: __("Meta with inner-blocks and inspector controls", "textDomain"),
  description: __(
    "A block with a meta field in the Inspector and inner-blocks",
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
          <InnerBlocks allowedBlocks={MYPREFIX_ALLOWED_BLOCKS} />
        </div>
      </>
    );
  },
  save: () => {
    const blockProps = useBlockProps.save();

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
