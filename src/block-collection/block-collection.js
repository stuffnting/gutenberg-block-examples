const { registerBlockCollection } = wp.blocks;

// The collection is registered for the "snt" namespace
registerBlockCollection("myprefix", {
  title: "MyPrefix Blocks",
  icon: "lightbulb",
});
