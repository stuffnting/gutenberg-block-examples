/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { DateTimePicker, PanelBody } from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Local dependencies
 */
import metaFieldData from './meta-notices-save-lock.metafield.json';
import { notices } from './notices';

const metaField = metaFieldData.metaField;

export const edit = () => {
  const blockProps = useBlockProps();

  /**
   * Deal with the meta field
   */
  const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

  const [meta, setMeta] = useEntityProp('postType', postType, 'meta');
  const date = meta[metaField] || '';

  function updateMetaValue(newDate) {
    setMeta({ ...meta, [metaField]: newDate });
  }

  /**
   * Deal with the notices
   */
  useEffect(notices(date));

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Pick-a-Date', 'textDomain')} initialOpen={false} icon='calendar-alt'>
          <DateTimePicker currentDate={date} onChange={updateMetaValue} is12Hour={false} />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <p>{date || __('Enter a date...', 'textDomain')}</p>
      </div>
    </>
  );
};
