const { registerBlockCollection } = wp.blocks;
/**
 * 'block collection' is a set of blocks that all have the same namespace
 * (blocks are named namespace/block-name). They allow all the blocks in a
 * namespace to be grouped together in the Inserter, as well as appearing
 * in their designated categories.
 */

// The collection is registered for the "myprefix" namespace.
registerBlockCollection("myprefix", {
  title: "MyPrefix Blocks",
  icon: "lightbulb",
});
