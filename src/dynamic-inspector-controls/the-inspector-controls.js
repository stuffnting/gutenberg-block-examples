/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
  PanelBody,
  PanelRow,
  TextControl,
  ToggleControl,
  SelectControl,
  CheckboxControl,
} from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

export const TheInspectorControls = ({ parentProps: { attributes, setAttributes } }) => {
  return (
    <InspectorControls>
      <PanelBody title='Tile controls' initialOpen={true}>
        <PanelRow>
          <ToggleControl
            label={__('Show title?', 'textDomain')}
            checked={attributes.showTitle}
            onChange={(newVal) => setAttributes({ showTitle: newVal })}
          />
        </PanelRow>
        {attributes.showTitle === true && (
          <>
            <PanelRow>
              <TextControl
                label={__('Title text.', 'textDomain')}
                value={attributes.title}
                onChange={(newVal) => setAttributes({ title: newVal })}
              />
            </PanelRow>
            <PanelRow>
              <SelectControl
                label={__('Title font family.', 'textDomain')}
                value={attributes.font}
                options={[
                  { label: 'Sans-serif', value: 'sans-serif' },
                  { label: 'Serif', value: 'serif' },
                  { label: 'Mono spaced', value: 'monospace' },
                ]}
                onChange={(newVal) => setAttributes({ font: newVal })}
              />
            </PanelRow>
            <PanelRow>
              <CheckboxControl
                label={__('Title underline.', 'textDomain')}
                checked={attributes.underline}
                onChange={(newVal) => setAttributes({ underline: newVal })}
              />
            </PanelRow>
          </>
        )}
      </PanelBody>
    </InspectorControls>
  );
};
