/**
 * This code is for a dynamic block that contains a list of recent posts.
 */

/**
 * If installing @wordpress packages and using `import`
 * put the `import` statements here at the top before the
 * `export default` statement below
 */

const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

registerBlockType("myprefix/dynamic-block-inner-blocks", {
  apiVersion: 2,
  title: "Dynamic Block Inner Blocks",
  icon: "lightbulb",
  category: "widgets",

  edit: withSelect((select) => {
    // Note, a withSelect wrapper is used to process the dynamic content.
    return {
      posts: select("core").getEntityRecords("postType", "post", {
        per_page: 3,
      }),
    };
  })(({ posts, className }) => {
    // The normal edit function starts here with props destructuring

    const blockProps = useBlockProps();

    // Function component with implicit return of post list
    const PostList = () => (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a className={className} href={post.link}>
              {post.title.rendered}
            </a>
          </li>
        ))}
      </ul>
    );

    return (
      <div {...blockProps}>
        <h2>Last Posts</h2>
        {!posts && "Loading..."}
        {posts && posts.length === 0 && "No posts."}
        {/* Function component defined above */}
        {posts && posts.length > 0 && <PostList />}
        <InnerBlocks />
      </div>
    );
  }),
  save: () => {
    // Save inner blocks only
    return <InnerBlocks.Content />;
  },
});
