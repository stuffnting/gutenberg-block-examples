import { registerBlockType } from "@wordpress/blocks";
import { DateTimePicker, PanelBody } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import {
  useBlockProps,
  InspectorControls,
  InnerBlocks,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

import metadata from "./meta-inner-blocks-inspector.block.json";

const metaField = metadata.metaField;

const allowedBlocks = ["core/paragraph", "core/heading"];

registerBlockType(metadata.name, {
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
