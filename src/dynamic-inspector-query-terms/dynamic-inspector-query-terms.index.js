import { registerBlockType } from "@wordpress/blocks";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { useEntityRecords } from "@wordpress/core-data";
import { memo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  __experimentalNumberControl as NumberControl,
} from "@wordpress/components";

import metadata from "./dynamic-inspector-query-terms.block.json";

function TheInspectorControls({
  parentProps: {
    attributes: { perPage },
    setAttributes,
  },
}) {
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
}

function ListPosts({ posts }) {
  const out = (
    <ul>
      {posts.map((post) => (
        <li key={"query-terms-" + post.id}>
          <a href={post.link}>{post.title.rendered}</a>
        </li>
      ))}
    </ul>
  );

  return out;
}

/**
 * Memo prevents GetPosts from rerendering when perPage has not changed.
 *
 * @see https://reactjs.org/docs/react-api.html#reactmemo
 */
const GetPosts = memo(({ perPage }) => {
  const {
    isResolving,
    hasResolved,
    records: posts,
  } = useEntityRecords("postType", "post", {
    per_page: perPage,
  });

  if (isResolving) {
    return "Loading...";
  }

  if (hasResolved && posts.length === 0) {
    return "No posts";
  }

  if (hasResolved && posts.length > 0) {
    return <ListPosts posts={posts} />;
  }

  return "Error?";
});

registerBlockType(metadata, {
  edit: (props) => {
    const blockProps = useBlockProps();
    return (
      <>
        <TheInspectorControls parentProps={props} />
        <div {...blockProps}>
          <h2 key="1">Query term posts</h2>
          <GetPosts perPage={props.attributes.perPage} />
        </div>
      </>
    );
  },
  save: () => null,
});
