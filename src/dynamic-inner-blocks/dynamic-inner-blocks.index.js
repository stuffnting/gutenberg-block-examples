import { registerBlockType } from "@wordpress/blocks";
import { useEntityRecords } from "@wordpress/core-data";
import { memo } from "@wordpress/element";
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import metadata from "./dynamic-inner-blocks.block.json";

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
  edit: () => {
    const blockProps = useBlockProps();
    const innerBlockProps = useInnerBlocksProps();

    return (
      <div {...blockProps}>
        <h2>Last Posts</h2>
        <GetPosts />
        <InnerBlocks {...innerBlockProps} />
      </div>
    );
  },
  save: () => {
    // Save inner blocks only
    return <InnerBlocks.Content />;
  },
});
