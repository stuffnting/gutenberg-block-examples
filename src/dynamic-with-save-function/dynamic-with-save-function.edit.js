import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit() {
  return (
    <p {...useBlockProps()}>{__('Copyright Date Block - hello from the editor!', 'myprefix')}</p>
  );
}
