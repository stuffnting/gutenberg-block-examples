/**
 * WordPress dependencies
 */
import {
  PanelBody,
  PanelRow,
  __experimentalNumberControl as NumberControl,
} from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

export const TheInspectorControls = ({
  parentProps: {
    attributes: { perPage },
    setAttributes,
  },
}) => {
  return (
    <>
      <InspectorControls>
        <PanelBody title="Post controls" initialOpen={true}>
          <PanelRow>
            <NumberControl
              label="Number of posts"
              value={perPage}
              shiftStep="5"
              step="1"
              min={1}
              max={100}
              onChange={(newVal) =>
                newVal > 0 && newVal < 100
                  ? setAttributes({ perPage: newVal })
                  : setAttributes({ perPage: "1" })
              }
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
    </>
  );
};
