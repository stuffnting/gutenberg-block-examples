/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { TextControl } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

/**
 * Local dependencies
 */
import metadata from './meta-with-select-doc-settings.metafield.json';

const metaField = metadata.metaField;

/**
 * Set up the component that will use the meta field.
 */
let DocPanelMetaFields = (props) => {
  return (
    <>
      <TextControl
        value={props.doc_set_text_metafield}
        label={__('Some Text', 'textDomain')}
        onChange={(value) => props.onPanelTextMetaFieldChange(value)}
      />
    </>
  );
};

/**
 * Turn the component into a Higher Order Function, so that it can fetch and dispatch meta data.
 */
DocPanelMetaFields = withSelect((select) => {
  return {
    doc_set_text_metafield: select('core/editor').getEditedPostAttribute('meta')[metaField],
  };
})(DocPanelMetaFields);

DocPanelMetaFields = withDispatch((dispatch) => {
  return {
    onPanelTextMetaFieldChange: (value) => {
      dispatch('core/editor').editPost({
        meta: { [metaField]: value },
      });
    },
  };
})(DocPanelMetaFields);

/**
 * Register the plugin, and render a panel to the Post Settings sidebar.
 */
registerPlugin('myprefix-with-select', {
  icon: 'lightbulb',
  render: () => {
    return (
      <>
        <PluginDocumentSettingPanel
          name='myprefix-with-select-panel'
          title='withSelect Panel'
          icon='lightbulb'>
          <DocPanelMetaFields />
        </PluginDocumentSettingPanel>
      </>
    );
  },
});
