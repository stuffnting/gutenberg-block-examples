/**
 * WordPress dependencies
 */
import { memo } from '@wordpress/element';
import { useEntityRecords } from '@wordpress/core-data';

function ListPosts({ posts }) {
  const out = (
    <ul>
      {posts.map((post) => (
        <li key={'query-terms-' + post.id}>
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
 * @see {@link https://reactjs.org/docs/react-api.html#reactmemo}
 */
export const GetPosts = memo(({ perPage }) => {
  const {
    isResolving,
    hasResolved,
    records: posts,
  } = useEntityRecords('postType', 'post', {
    per_page: 5,
  });

  if (isResolving) {
    return 'Loading...';
  }

  if (hasResolved && posts.length === 0) {
    return 'No posts';
  }

  if (hasResolved && posts.length > 0) {
    return <ListPosts posts={posts} />;
  }

  return 'Error?';
});
