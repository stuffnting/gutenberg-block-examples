/**
 * Wordpress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps, useBlockEditingMode } from '@wordpress/block-editor';

/**
 * Local dependencies
 */
import metadata from './block-lock-editor-mode.block.json';

registerBlockType(metadata.name, {
  edit: () => {
    const allowedBlocks = ['core/heading', 'core/paragraph'];
    const template = [['core/heading', { content: 'Some content here...' }]];
    const blockProps = useBlockProps();

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
      allowedBlocks,
      template,
    });

    /**
     * Use `default`, `contentOnly`, or `disabled`
     */
    useBlockEditingMode('disabled');

    return <div {...innerBlocksProps} />;
  },
  save: () => {
    const blockProps = useBlockProps.save();
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <div {...innerBlocksProps} />;
  },
});
