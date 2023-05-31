/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Local dependencies
 */
import metadata from './meta-simple.block.json';
import metaFieldData from './meta-simple.metafield.json';

const metaField = metaFieldData.metaField;

registerBlockType(metadata.name, {
  edit() {
    const blockProps = useBlockProps();

    /**
     * Process the post meta
     */
    const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

    const [meta, setMeta] = useEntityProp('postType', postType, 'meta');
    const metaFieldValue = meta[metaField];

    function updateMetaValue(newValue) {
      setMeta({ ...meta, [metaField]: newValue });
    }

    return (
      <div {...blockProps}>
        <TextControl
          label={__('Meta Box Block Field', 'textDomain')}
          placeholder={__('Enter some metadata...', 'textDomain')}
          value={metaFieldValue}
          onChange={updateMetaValue}
        />
      </div>
    );
  },

  save() {
    // No information saved to the block
    // Data is saved to post meta via setMeta
    return null;
  },
});
