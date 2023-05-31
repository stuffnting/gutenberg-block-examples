/**
 * Wordpress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

export const edit = () => {
  const blockProps = useBlockProps();

  /**
   * Deal with the metadata
   */

  // MYPREFIX_META_CB_OBJECT is defined in the PHP file using wp_localize_script()
  const MYPREFIX_META_CB_OBJECT = localizeObject.MYPREFIX_META_CB_OBJECT;

  const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

  const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

  const metaFieldValue1 = meta[MYPREFIX_META_CB_OBJECT].field1 || '';
  const metaFieldValue2 = meta[MYPREFIX_META_CB_OBJECT].field2 || '';

  // The update function for the meta fields
  function updateMetaValue(newValue, fieldName) {
    const newMetaObj = Object.assign({}, meta[MYPREFIX_META_CB_OBJECT], {
      [fieldName]: newValue,
    });

    setMeta({ ...meta, [MYPREFIX_META_CB_OBJECT]: newMetaObj });
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title='Meta Values' initialOpen={false}>
          <TextControl
            label='Text 1'
            help='Enter some text'
            value={metaFieldValue1}
            onChange={(newValue) => updateMetaValue(newValue, 'field1')}
          />
          <TextControl
            label='Text 2'
            help='Enter some text'
            value={metaFieldValue2}
            onChange={(newValue) => updateMetaValue(newValue, 'field2')}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <p>{metaFieldValue1}</p>
        <p>{metaFieldValue2}</p>
      </div>
    </>
  );
};
