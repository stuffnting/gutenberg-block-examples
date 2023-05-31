/**
 * WordPress dependencies.
 */
import { useSelect } from '@wordpress/data';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { BlockControls, RichTextToolbarButton } from '@wordpress/block-editor';

/******************************************************************************
 *
 * Button 3.
 *
 * An button to alter the inline formatting using <small> tags to the
 * selected text. The button appears in the toolbar's 'More' dropdown of the
 * core/heading, core/quote, and core/list blocks.
 *
 *****************************************************************************/

export const MyprefixSmallTextButton = ({ isActive, onChange, value }) => {
  // Only add the button to these blocks
  const allowedBlocks = ['core/paragraph', 'core/heading', 'core/quote', 'core/list'];

  // Check this custom block-type registered
  const isRCTBRegistered = useSelect((select) => {
    return select('core/blocks')
      .getBlockTypes()
      .some((block) => block.name === 'myprefix/richtext-toolbar-buttons');
  }, []);

  // Custom block-type exists? Add to allowedBlocks array.
  if (isRCTBRegistered) {
    allowedBlocks.push('myprefix/richtext-toolbar-buttons');
  }

  // Find out the block-type of the currently selected block.
  const selectedBlock = useSelect((select) => {
    return select('core/block-editor').getSelectedBlock();
  }, []);

  // If wrong block-type, bail out.
  if (selectedBlock && !allowedBlocks.includes(selectedBlock.name)) {
    return null;
  }

  // Correct block-type, add button.
  return (
    <RichTextToolbarButton
      icon='arrow-down'
      title='Small Text'
      onClick={() => {
        onChange(
          toggleFormat(value, {
            type: 'myprefix/small-tag',
          })
        );
      }}
      isActive={isActive}
    />
  );
};

registerFormatType('myprefix/small-tag', {
  title: 'Small Text',
  tagName: 'small',
  className: null,
  edit: MyprefixSmallTextButton,
});

/******************************************************************************
 *
 * Button 4.
 *
 * An button to alter the inline formatting using <big> tags to the
 * selected text. The button appears in the toolbar's 'inline' section, next
 * to the bold and italic buttons. Appears for all blocks.
 *
 *****************************************************************************/

export const MyprefixBigTextButton = ({ isActive, onChange, value }) => {
  return (
    <BlockControls group='inline'>
      <ToolbarGroup>
        <ToolbarButton
          icon='arrow-up'
          title='Big Text'
          onClick={() => {
            onChange(
              toggleFormat(value, {
                type: 'myprefix/big-tag',
              })
            );
          }}
          isActive={isActive}
        />
      </ToolbarGroup>
    </BlockControls>
  );
};

registerFormatType('myprefix/big-tag', {
  title: 'Big Text',
  tagName: 'big',
  className: null,
  edit: MyprefixBigTextButton,
});
