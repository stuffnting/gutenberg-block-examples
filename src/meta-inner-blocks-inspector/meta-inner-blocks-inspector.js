const { registerBlockType } = wp.blocks;
const { DateTimePicker, PanelBody } = wp.components;
const { useSelect } = wp.data;
const { useEntityProp } = wp.coreData;
const { useBlockProps, InspectorControls, InnerBlocks } = wp.blockEditor;
const { __ } = wp.i18n;

import metadata from "./meta-inner-blocks-inspector.json";

const metaField = metadata.metaField;

const allowedBlocks = ["core/paragraph", "core/heading"];

registerBlockType(metadata, {
  edit: () => {
    const blockProps = useBlockProps();

    const postType = useSelect(
      (select) => select("core/editor").getCurrentPostType(),
      []
    );

    const [meta, setMeta] = useEntityProp("postType", postType, "meta");
    const date = meta[metaField] || "";

    function updateMetaValue(newDate) {
      setMeta({ ...meta, [metaField]: newDate });
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
          <InnerBlocks allowedBlocks={allowedBlocks} />
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
