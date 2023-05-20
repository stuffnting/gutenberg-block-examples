/**
 * External dependencies
 */
import { assign, merge } from 'lodash';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	TextControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Local dependencies
 */
import metadata from './variations-query-block.data.json';

const namespaceMeta = metadata.namespace;

/******************************************************************************
 * Add a new controls for commentCount and extraMessage.
 *
 * Because the query attribute is an object, we can just add
 * another property to it, without needing to register a new
 * attribute.
 *
 * Note, the extraMessage control is not needed.
 *****************************************************************************/

export const withExtraQueryControls = ( BlockEdit ) => ( props ) => {
	if ( namespaceMeta !== props.attributes.namespace ) {
		return <BlockEdit { ...props } />;
	}

	const {
		attributes: { query, extraMessage },
		setAttributes,
	} = props;

	if ( ! query.commentCount ) {
		query.commentCount = 0;
	}

	return (
		<>
			<BlockEdit { ...props } />
			<InspectorControls>
				<PanelBody
					title={ __( 'Comment Count', 'textDomain' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<NumberControl
							label="Number of comments"
							value={ query.commentCount }
							shiftStep="5"
							step="1"
							min={ 0 }
							max={ 100 }
							onChange={ ( newVal ) =>
								newVal >= 0 && newVal < 100
									? setAttributes(
											merge( query, {
												commentCount:
													parseInt( newVal ),
											} )
									  )
									: setAttributes(
											merge( query, { commentCount: 0 } )
									  )
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

addFilter( 'editor.BlockEdit', 'core/query', withExtraQueryControls );
