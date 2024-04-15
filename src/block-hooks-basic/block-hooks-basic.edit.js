/**
 * Retrieves the translation of text.
 *
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/}
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops}
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see {@link https://www.npmjs.com/package/@wordpress/scripts#using-css}
 */
import './block-hooks-basic.editor.scss';

import { ReactComponent as EmptyHeart } from './empty-heart.svg';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit}
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ __unstableLayoutClassNames: layoutClassNames }) {
  const blockProps = useBlockProps({ className: layoutClassNames });
  return (
    <div {...blockProps}>
      <div className='like-button'>
        <EmptyHeart />
        <span>Like</span>
      </div>
    </div>
  );
}
