import { useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import { DateTimePicker, PanelBody } from "@wordpress/components";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

import metadata from "./meta-notices-save-lock.block.json";
import { notices } from "./meta-notices-save-lock-notices";

const metaField = metadata.metaField;

export const edit = () => {
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

  useEffect(notices(date));

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
};
