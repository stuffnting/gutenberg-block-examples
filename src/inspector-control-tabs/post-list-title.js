// Function component with implicit return heading element
export const PostListTitle = ({ parentProps: { attributes } }) => {
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
