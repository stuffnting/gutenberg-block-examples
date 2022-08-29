import { registerBlockType } from "@wordpress/blocks";
import { useSelect } from "@wordpress/data";
import { useBlockProps } from "@wordpress/block-editor";

import metadata from "./dynamic-simple.json";

registerBlockType(metadata, {
  edit: () => {
    // Get the list of posts. Previously done using useSelect.
    const posts = useSelect((select) => {
      return select("core").getEntityRecords("postType", "post");
    }, []);

    const blockProps = useBlockProps();

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
      <div {...blockProps}>
        <h2>Last Posts</h2>
        {!posts && "Loading..."}
        {posts && posts.length === 0 && "No posts."}
        {/* Function component defined above */}
        {posts && posts.length > 0 && <PostList />}
      </div>
    );
  },
  save: () => {
    // For dynamic blocks return null
    return null;
  },
});
