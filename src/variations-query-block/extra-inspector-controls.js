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

import { createHigherOrderComponent } from '@wordpress/compose';

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

export const withExtraQueryControls = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		// Is this our variation of core/query?
		if ( namespaceMeta !== props.attributes.namespace ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;
		const { query } = attributes;
		const { commentCount: cC } = query;

		if ( ! cC.value ) {
			cC.value = 0;
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
								value={ cC.value }
								shiftStep="5"
								step="1"
								min={ 0 }
								max={ 100 }
								onChange={ ( newVal ) =>
									newVal >= 0 && newVal < 100
										? setAttributes(
												merge( attributes, {
													query: merge( query, {
														commentCount: {
															value: parseInt(
																newVal
															),
															compare: cC.compare,
														},
													} ),
												} )
										  )
										: setAttributes(
												merge( attributes, {
													query: merge( query, {
														commentCount: {
															value: 0,
															compare: cC.compare,
														},
													} ),
												} )
										  )
								}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	'withExtraQueryControls'
);

addFilter( 'editor.BlockEdit', 'core/query', withExtraQueryControls );
