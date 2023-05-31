/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('myprefix/meta-attribute', {
  title: 'Meta Box Attribute',
  description: __(
    "A simple met abox in a block that uses an 'attribute' with 'source: meta', rather than useEntityProp. This is the old way of doing things, hence no block.json file",
    'textDomain'
  ),
  icon: 'lightbulb',
  category: 'widgets',
  attributes: {
    content: {
      type: 'string',
      source: 'meta',
      // The meta field name, as registered in the PHP file
      meta: MYPREFIX_META_ATTRIBUTE_FIELD,
    },
  },
  edit: ({ attributes, setAttributes }) => {
    // Destructure props object to attributes, className, isSelected, setAttributes

    return (
      <div>
        <TextControl
          label='Text'
          help={__('Enter some text', 'textDomain')}
          value={attributes.content}
          onChange={(value) => setAttributes({ content: value })}
        />
      </div>
    );
  },
  save: () => {
    // Value saved as meta data, so, return null
    return null;
  },
});
