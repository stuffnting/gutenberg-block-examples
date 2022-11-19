import { registerBlockVariation } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { InspectorControls } from "@wordpress/blockEditor";
import {
  PanelBody,
  PanelRow,
  TextControl,
  __experimentalNumberControl as NumberControl,
} from "@wordpress/components";

import { assign, merge } from "lodash";

/**
 * MYPREFIX_VARIATIONS_QUERY_BLOCK_PER_PAGE and
 * MYPREFIX_VARIATIONS_QUERY_BLOCK_PER_PAGE
 * are set in the PHP file using wp_localize_script.
 */
const PER_PAGE = localizeObject.MYPREFIX_VARIATIONS_QUERY_BLOCK_PER_PAGE;
const NAMESPACE = localizeObject.MYPREFIX_VARIATIONS_QUERY_BLOCK_NAMESPACE;

/**
 *
 * Register a variation of the core/query block.
 * @see hhttps://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/extending-the-query-loop-block/
 *
 * attributes is used to alter the existing default values.
 *
 */
registerBlockVariation("core/query", {
  name: NAMESPACE,
  title: "Post list variation",
  description: "A variation of the core/query block",
  isActive: ({ namespace, query }) => {
    return namespace === NAMESPACE && query.postType === "post";
  },
  icon: "lightbulb",
  attributes: {
    namespace: NAMESPACE,
    query: {
      perPage: PER_PAGE,
      pages: 0,
      offset: 0,
      postType: "post",
      order: "asc",
      orderBy: "title",
      author: "",
      search: "",
      exclude: [],
      sticky: "",
      inherit: false,
    },
  },
  allowedControls: ["inherit", "order"], // Limit controls
  scope: ["inserter"],
  innerBlocks: [
    [
      "core/post-template",
      {},
      [
        ["core/post-title", { isLink: true }],
        ["core/post-excerpt", { moreText: "Read more ..." }],
      ],
    ],
    ["core/query-pagination"],
    ["core/query-no-results"],
  ],
});

/**
 * Add a new control for commentCount.
 *
 * Because the query attribute is an object, we can just add
 * another property to it, without needing to register a new
 * attribute.
 *
 * Note, the extraMessage control is not needed.
 */
const withBookQueryControls = (BlockEdit) => (props) => {
  if (NAMESPACE !== props.attributes.namespace) {
    return <BlockEdit {...props} />;
  }
  console.log(props.attributes.query);
  const {
    attributes: { query, extraMessage },
    setAttributes,
  } = props;

  if (!query.commentCount) {
    query.commentCount = 0;
  }

  return (
    <>
      <BlockEdit {...props} />
      <InspectorControls>
        <PanelBody title={__("Comment Count", "textDomain")} initialOpen={true}>
          <PanelRow>
            <NumberControl
              label="Number of comments"
              value={query.commentCount}
              shiftStep="5"
              step="1"
              min={0}
              max={100}
              onChange={(newVal) =>
                newVal >= 0 && newVal < 100
                  ? setAttributes(
                      merge(query, { commentCount: parseInt(newVal) })
                    )
                  : setAttributes(merge(query, { commentCount: 0 }))
              }
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="Extra Message"
              value={extraMessage}
              onChange={(value) => setAttributes({ extraMessage: value })}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
    </>
  );
};

addFilter("editor.BlockEdit", "core/query", withBookQueryControls);

/**
 * If needed add new attributes.
 *
 * Because the query attribute is an object, we can just add
 * another property to it, without needing to register a new
 * attribute.
 *
 * This adds extraMessage, although, it is not needed, and is
 * only added to demonstrate adding extra attributes.
 */

function myprefixAddAttributes(settings, name) {
  if (name === "core/query") {
    const newAtts = {
      attributes: {
        extraMessage: { type: "string", default: "" },
      },
    };

    const newSettings = merge(settings, newAtts);

    return newSettings;
  }
  return settings;
}

addFilter(
  "blocks.registerBlockType",
  "textDomain/query-block/add-attributes",
  myprefixAddAttributes
);
