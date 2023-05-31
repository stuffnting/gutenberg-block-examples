/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const variations = [
  {
    name: 'myprefix-default-heading',
    title: __('Variations Register Block Default', 'textDomain'),
    description: __('Variations Register Block with default settings.', 'textDomain'),
    icon: 'lightbulb',
    attributes: {
      placeholder: __('Add some text...', 'textDomain'),
      textAlign: 'left',
      className: '',
      textColor: '',
      backgroundColor: '',
    },
    scope: ['inserter', 'transform'],
    isDefault: true,
    isActive: (blockAttributes, variationAttributes) =>
      blockAttributes.textAlign === variationAttributes.textAlign,
  },
  {
    name: 'myprefix-centred-b-w-heading',
    title: __('Centred B/W block', 'textDomain'),
    description: __('Variations Register Block with centred B/W text.', 'textDomain'),
    icon: 'lightbulb',
    attributes: {
      isActiveName: 'myprefix-centred-b-w-heading',
      placeholder: __('Add some centred B/W text...', 'textDomain'),
      textAlign: 'center',
      textColor: 'white',
      backgroundColor: 'black',
    },
    scope: ['transform'],
    isDefault: false,
    isActive: (blockAttributes, variationAttributes) =>
      blockAttributes.isActiveName === variationAttributes.isActiveName,
  },
];
