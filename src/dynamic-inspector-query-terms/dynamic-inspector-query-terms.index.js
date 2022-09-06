const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { withSelect, useSelect } = wp.data;
const { __ } = wp.i18n;
const {
  PanelBody,
  PanelRow,
  __experimentalNumberControl: NumberControl,
} = wp.components;

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

const GetPosts = ({ perPage }) => {
  const posts = useSelect(
    (select) => {
      return select("core").getEntityRecords("postType", "post", {
        per_page: perPage,
      });
    },
    [perPage]
  );
  return processPosts(posts);
};

function processPosts(posts) {
  if (!posts) {
    return "Loading...";
  }

  if (posts && posts.length === 0) {
    return "No posts";
  }

  return <ListPosts posts={posts} />;
}

registerBlockType(metadata, {
  edit: (props) => {
    return (
      <>
        <h2 key="1">Query term posts</h2>
        <TheInspectorControls parentProps={props} />
        <GetPosts perPage={props.attributes.perPage} />
      </>
    );
  },
  save: () => null,
});
