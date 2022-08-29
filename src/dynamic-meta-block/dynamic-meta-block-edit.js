import {
  InnerBlocks,
  useBlockProps,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";

import { style } from "./dynamic-meta-block-style";

const allowedBlocks = ["core/paragraph", "core/heading", "core/list"];

// MYPREFIX_DYNAMIC_META_BLOCK_OBJECT is defined in the PHP file using wp_localize_script()
const MYPREFIX_DYNAMIC_META_BLOCK_OBJECT =
  localizeObject.MYPREFIX_DYNAMIC_META_BLOCK_OBJECT;

export const edit = () => {
  const blockProps = useBlockProps({ style });

  const postType = useSelect(
    (select) => select("core/editor").getCurrentPostType(),
    []
  );

  const [meta, setMeta] = useEntityProp("postType", postType, "meta");

  const metaFieldValue1 = meta[MYPREFIX_DYNAMIC_META_BLOCK_OBJECT].field1 || "";
  const metaFieldValue2 = meta[MYPREFIX_DYNAMIC_META_BLOCK_OBJECT].field2 || "";

  // Ths key is which item in the meta field array to use
  function updateMetaValue(newValue, fieldName) {
    const newMetaObj = Object.assign(
      {},
      meta[MYPREFIX_DYNAMIC_META_BLOCK_OBJECT],
      {
        [fieldName]: newValue,
      }
    );

    setMeta({ ...meta, [MYPREFIX_DYNAMIC_META_BLOCK_OBJECT]: newMetaObj });
  }

  return (
    <>
      <div {...blockProps}>
        <InspectorControls>
          <PanelBody title="Meta Values" initialOpen={false}>
            <TextControl
              label="Text 1"
              help="Enter some text"
              value={metaFieldValue1}
              onChange={(newValue) => updateMetaValue(newValue, "field1")}
            />
            <TextControl
              label="Text 2"
              help="Enter some text"
              value={metaFieldValue2}
              onChange={(newValue) => updateMetaValue(newValue, "field2")}
            />
          </PanelBody>
        </InspectorControls>
        <p>{metaFieldValue1}</p>
        <p>{metaFieldValue2}</p>
        <InnerBlocks allowedBlocks={allowedBlocks} />
      </div>
    </>
  );
};
