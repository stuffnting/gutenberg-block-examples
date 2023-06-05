/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
  PanelBody,
  PanelRow,
  __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

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

export const myprefixExtraQueryControls = createHigherOrderComponent(
  (BlockEdit) => (props) => {
    // Is this our variation of core/query?
    if (namespaceMeta !== props.attributes.namespace) {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes } = props;
    const { query } = attributes;
    const { commentCount } = query;

    return (
      <>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody title={__('Comment Count', 'textDomain')} initialOpen={true}>
            <PanelRow>
              <NumberControl
                label='Number of comments'
                value={commentCount.value}
                shiftStep='5'
                step='1'
                min={0}
                max={100}
                onChange={(newVal) => {
                  setAttributes({
                    ...attributes,
                    query: {
                      ...query,
                      commentCount: {
                        value: parseInt(newVal),
                        compare: commentCount.compare,
                      },
                    },
                  });
                }}
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
      </>
    );
  },
  'withExtraQueryControls'
);

addFilter('editor.BlockEdit', 'myprefix/core/query', myprefixExtraQueryControls);
