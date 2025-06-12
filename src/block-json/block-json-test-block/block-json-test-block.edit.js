/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Local dependencies
 */
import metadata from './block-json-test-block.block.json';

export const edit = (props) => {
	const { attributes, setAttributes, onReplace, mergeBlocks } = props;
	const { content } = attributes;

	const blockProps = useBlockProps();

	// A function for when Enter is hit in the middle of the block's text
	const onSplit = (value) => {
		if (!value) {
			return createBlock('core/paragraph');
		}
		return createBlock(metadata.name, {
			...attributes,
			content: value,
		});
	};

	return (
		<RichText
			tagName="p"
			value={content}
			onChange={(value) => setAttributes({ content: value })}
			multiline={false}
			onSplit={onSplit}
			onReplace={onReplace}
			onMerge={mergeBlocks}
			onRemove={onReplace}
			placeholder={__('Enter text...', 'textDomain')}
			{...blockProps}
		/>
	);
};
