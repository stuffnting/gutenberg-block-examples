/**
 * This code is for a dynamic block that contains a list of recent posts.
 */

/**
 * If installing @wordpress packages and using `import`
 * put the `import` statements here at the top before the
 * `export default` statement below
 */

const { registerBlockType } = wp.blocks;
// Note that InspectorControls are part of the editor, not a component.
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { withSelect } = wp.data;
const {
  PanelBody,
  PanelRow,
  TextControl,
  ToggleControl,
  SelectControl,
  CheckboxControl,
} = wp.components;
const { __ } = wp.i18n;

registerBlockType("myprefix/dynamic-block-inspector-controls", {
  apiVersion: 2,
  title: __("Dynamic Block Inspector Controls", "texDomain"),
  icon: "lightbulb",
  category: "widgets",
  // All these are for the InspectorControls. The block's contents are Dynamic, and not stored.
  attributes: {
    showTitle: {
      type: "boolean", // Toggle - button
      default: true,
    },
    title: {
      type: "string", // TextControl
      default: "A list of posts",
    },
    font: {
      type: "string", // SelectControl - dropdown
      default: "sans-serif",
    },
    underline: {
      type: "boolean", // CheckboxControl
      default: false,
    },
  },

  edit: withSelect((select) => {
    // Note, a withSelect wrapper is used to process the dynamic content.
    return {
      posts: select("core").getEntityRecords("postType", "post", {
        per_page: 3,
      }),
    };
  })(({ attributes, posts, setAttributes }) => {
    // The normal edit function starts here with props destructuring

    const blockProps = useBlockProps();

    /* Process attributes from block inspector */
    const titleStyles = {
      textDecoration: attributes.underline ? "underline" : "none",
      fontFamily: attributes.font ? attributes.font : "inherit",
    };

    // Function component with implicit return heading element
    const PostListTitle = () =>
      attributes.showTitle ? (
        <h2 style={titleStyles}>{attributes.title}</h2>
      ) : (
        ""
      );

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
                label="Show title?"
                checked={attributes.showTitle}
                onChange={(newVal) => setAttributes({ showTitle: newVal })}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Title text"
                value={attributes.title}
                onChange={(newVal) => setAttributes({ title: newVal })}
              />
            </PanelRow>
            <PanelRow>
              <SelectControl
                label="Font family?"
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
                label="Underline??"
                checked={attributes.underline}
                onChange={(newVal) => setAttributes({ underline: newVal })}
              />
            </PanelRow>
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
  }),
  save: () => {
    // For dynamic blocks return null
    return null;
  },
});
