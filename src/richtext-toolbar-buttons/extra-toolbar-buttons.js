/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarButton, ToolbarDropdownMenu } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

/******************************************************************************
 *
 * Buttons 1 & 2.
 *
 * Added to the 'block' and 'other' toolbar groups.
 *
 *****************************************************************************/

export const ExtraToolbarButtons = (props) => {
  const { attributes, setAttributes } = props;

  return (
    <>
      <BlockControls group='parent'>
        <ToolbarDropdownMenu
          icon='edit-large'
          label={__('Alter content.')}
          controls={[
            {
              title: 'Delete content',
              icon: 'dismiss',
              onClick: () => setAttributes({ content: null }),
            },
            {
              title: 'Heart',
              icon: 'heart',
              onClick: () => setAttributes({ content: 'Heart' }),
            },
          ]}
        />
      </BlockControls>
      <BlockControls group='other'>
        <ToolbarButton
          label={__('Who is it?', 'textDomain')}
          icon='superhero'
          className={null}
          onClick={() => setAttributes({ content: 'Captain Underpants!!!' })}
        />
      </BlockControls>
    </>
  );
};
