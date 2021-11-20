const { registerBlockType } = wp.blocks;
// Note that InspectorControls are part of the editor, not a component.
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { useSelect } = wp.data;
const {
  PanelBody,
  PanelRow,
  TextControl,
  ToggleControl,
  SelectControl,
  CheckboxControl,
} = wp.components;
const { __ } = wp.i18n;

import metadata from "./dynamic-inspector-controls.json";

registerBlockType(metadata, {
  edit: ({ attributes, setAttributes }) => {
    // Get the list of posts. Previously done using withSelect.
    const posts = useSelect((select) => {
      return select("core").getEntityRecords("postType", "post");
    }, []);

    const blockProps = useBlockProps();

    /* Process attributes from block inspector */
    const titleStyles = {
      textDecoration: attributes.underline ? "underline" : "none",
      fontFamily: attributes.font ? attributes.font : "inherit",
    };

    // Function component with implicit return heading element
    const PostListTitle = () => <h2 style={titleStyles}>{attributes.title}</h2>;

    // Function component with implicit return of post list
    const PostList = () => (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={post.link}>{post.title.rendered}</a>
          </li>
        ))}
      </ul>
    );

    return (
      <>
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
        <div {...blockProps}>
          <PostListTitle />
          {!posts && "Loading..."}
          {posts && posts.length === 0 && "No posts."}
          {/* Function component defined above */}
          {posts && posts.length > 0 && <PostList />}
        </div>
      </>
    );
  },
  save: () => {
    // For dynamic blocks return null
    return null;
  },
});
