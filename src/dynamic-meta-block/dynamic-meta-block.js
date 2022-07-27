const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { useSelect } = wp.data;
const { useEntityProp } = wp.coreData;

import metadata from "./dynamic-meta-block.json";

const ALLOWED_BLOCKS = ["core/paragraph", "core/heading", "core/list"];
const STYLE = {
  color: "white",
  padding: "20px",
  background: "midnightblue",
  border: "5px solid yellow",
};

registerBlockType(metadata, {
  edit: () => {
    const blockProps = useBlockProps({ style: STYLE });

    const postType = useSelect(
      (select) => select("core/editor").getCurrentPostType(),
      []
    );

    const [meta, setMeta] = useEntityProp("postType", postType, "meta");

    // MYPREFIX_DYNAMIC_META_BLOCK_OBJECT is defined in the PHP file using wp_add_inline_script()
    const metaFieldValue1 =
      meta[MYPREFIX_DYNAMIC_META_BLOCK_OBJECT].field1 || "";
    const metaFieldValue2 =
      meta[MYPREFIX_DYNAMIC_META_BLOCK_OBJECT].field2 || "";

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
          <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
        </div>
      </>
    );
  },
  save: (props) => {
    const blockProps = useBlockProps.save({ style: STYLE });

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
