/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { registerBlockType } from '@wordpress/blocks';
import { DateTimePicker, PanelBody } from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Local dependencies
 */
import metadata from './meta-block-inspector.block.json';
import metaFieldData from './meta-block-inspector.metafield.json';

const metaField = metaFieldData.metaField;

registerBlockType(metadata.name, {
  edit: () => {
    const blockProps = useBlockProps();

    const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

    const [meta, setMeta] = useEntityProp('postType', postType, 'meta');
    const date = meta[metaField] || '';

    function updateMetaValue(newDate) {
      setMeta({ ...meta, [metaField]: newDate });
    }

    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__('Pick-a-Date', 'textDomain')}
            initialOpen={false}
            icon='calendar-alt'>
            <DateTimePicker currentDate={date} onChange={updateMetaValue} is12Hour={false} />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          <p>{date || __('Enter a date...', 'textDomain')}</p>
        </div>
      </>
    );
  },
  save: () => {
    return null;
  },
});
