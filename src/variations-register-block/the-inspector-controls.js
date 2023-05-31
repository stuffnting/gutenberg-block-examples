/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';
import { useBlockDisplayInformation, InspectorControls } from '@wordpress/block-editor';

export const TheInspectorControls = () => {
  // Get the block info for the Block Details panel
  const selectedBlock =
    useSelect((select) => select('core/block-editor').getSelectedBlock(), []) || {};

  const selectedBlockInfo = useBlockDisplayInformation(selectedBlock.clientId) || {};
  return (
    <InspectorControls>
      <PanelBody title={__('Block Details', 'textDomain')} initialOpen={false} icon='info-outline'>
        <p>
          <b>
            {__('These details are obtained using the', 'textDomain')}{' '}
            <code>useBlockDisplayInformation()</code> {__('hook', 'textDomain')}.
          </b>
        </p>
        <p>
          <b>Variation:</b> {selectedBlockInfo.title || __('No block selected', 'textDomain')}
        </p>
        <p>
          <b>Icon </b>: {selectedBlockInfo.icon || 'none'}
        </p>
        <p>
          <b>Description:</b> {selectedBlockInfo.description || ''}
        </p>
        <p>
          <b>Anchor:</b> {selectedBlockInfo.anchor || 'none'}
        </p>
      </PanelBody>
    </InspectorControls>
  );
};
