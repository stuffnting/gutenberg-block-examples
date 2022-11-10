import { registerBlockType } from "@wordpress/blocks";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { memo } from "@wordpress/element";
import { useEntityRecords } from "@wordpress/core-data";
import {
  PanelBody,
  PanelRow,
  TextControl,
  ToggleControl,
  SelectControl,
  CheckboxControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import metadata from "./dynamic-inspector-controls.block.json";

function TheInspectorControls({ parentProps: { attributes, setAttributes } }) {
  return (
    <InspectorControls>
      <PanelBody title="Tile controls" initialOpen={true}>
        <PanelRow>
          <ToggleControl
            label={__("Show title?", "textDomain")}
            checked={attributes.showTitle}
            onChange={(newVal) => setAttributes({ showTitle: newVal })}
          />
        </PanelRow>
        {attributes.showTitle === true && (
          <>
            <PanelRow>
              <TextControl
                label={__("Title text.", "textDomain")}
                value={attributes.title}
                onChange={(newVal) => setAttributes({ title: newVal })}
              />
            </PanelRow>
            <PanelRow>
              <SelectControl
                label={__("Title font family.", "textDomain")}
                value={attributes.font}
                options={[
                  { label: "Sans-serif", value: "sans-serif" },
                  { label: "Serif", value: "serif" },
                  { label: "Mono spaced", value: "monospace" },
                ]}
                onChange={(newVal) => setAttributes({ font: newVal })}
              />
            </PanelRow>
            <PanelRow>
              <CheckboxControl
                label={__("Title underline.", "textDomain")}
                checked={attributes.underline}
                onChange={(newVal) => setAttributes({ underline: newVal })}
              />
            </PanelRow>
          </>
        )}
      </PanelBody>
    </InspectorControls>
  );
}

// Function component with implicit return heading element
const PostListTitle = ({ parentProps: { attributes } }) => {
  /* Process attributes from block inspector */
  const titleStyles = {
    textDecoration: attributes.underline ? "underline" : "none",
    fontFamily: attributes.font ? attributes.font : "inherit",
  };

  return attributes.showTitle ? (
    <h2 style={titleStyles}>{attributes.title}</h2>
  ) : (
    ""
  );
};

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
const GetPosts = memo(() => {
  const {
    isResolving,
    hasResolved,
    records: posts,
  } = useEntityRecords("postType", "post", {
    per_page: 5,
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

registerBlockType(metadata.name, {
  edit: (props) => {
    const blockProps = useBlockProps();

    return (
      <>
        <TheInspectorControls parentProps={props} />
        <div {...blockProps}>
          <PostListTitle parentProps={props} />
          <GetPosts />
        </div>
      </>
    );
  },
  save: () => {
    // For dynamic blocks return null
    return null;
  },
});
