import { registerBlockType } from "@wordpress/blocks";
// import { useSelect } from "@wordpress/data"; // Old method
import { useEntityRecords } from "@wordpress/core-data";
import { useBlockProps } from "@wordpress/block-editor";

import metadata from "./dynamic-simple.block.json";

registerBlockType(metadata, {
  edit: () => {
    // Get the list of posts. Previously done using useSelect.
    /*const posts = useSelect((select) => {
      return select("core").getEntityRecords("postType", "post");
    }, []); */

    /**
     * New way WP 6.1+
     *
     * @see https://developer.wordpress.org/rest-api/reference/posts/#arguments
     */
    const posts = useEntityRecords("postType", "post", {
      per_page: 5,
      categories: [1],
      order: "asc",
    });

    const blockProps = useBlockProps();

    if (posts.status === "ERROR") {
      return <p>ERROR!!!!</p>;
    }

    // Function component with implicit return of post list
    const PostList = () => (
      <ul>
        {posts.records.map((post) => (
          <li key={post.id}>
            <a href={post.link}>{post.title.rendered}</a>
          </li>
        ))}
      </ul>
    );

    return (
      <div {...blockProps}>
        <h2>Last Posts</h2>
        {posts.isResolving && "Loading..."}
        {posts.hasResolved && posts.records.length === 0 && "No posts."}
        {/* PostList defined above */}
        {posts.hasResolved && posts.records.length > 0 && <PostList />}
      </div>
    );
  },
  save: () => {
    // For dynamic blocks return null
    return null;
  },
});
