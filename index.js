const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: typeDefsBook,
  resolvers: resolversBook,
} = require("./schemas/book");
const server = new ApolloServer({
  typeDefs: [typeDefsBook],
  resolvers: [resolversBook],
  introspection: true,
});
(async () => {
//   await server.start();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
    context: () => {
      return {
        id: "123",
      };
    },
  });
  console.log(`🚀 Server ready at link: ${url}`);
})();
