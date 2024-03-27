const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { verifyToken } = require("./helpers/jwt");
const {
  typeDefs: typeDefsUser,
  resolvers: resolversUser,
} = require("./schemas/user");

const {
  typeDefs: typeDefsPost,
  resolvers: resolversPost,
} = require("./schemas/post");

const {
  typeDefs: typeDefsFollow,
  resolvers: resolversFollow,
} = require("./schemas/follow");

const server = new ApolloServer({
  typeDefs: [typeDefsUser, typeDefsPost, typeDefsFollow],
  resolvers: [resolversUser, resolversPost, resolversFollow],
  introspection: true,
});
(async () => {
  //   await server.start();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
    context: ({ req, res }) => {
      return {
        id: "123",
        auth: () => {
          let auth = req.headers.authorization;
          if (!auth) {
            throw new Error("Invalid Token");
          }
          const token = auth.split(" ")[1];
          const decoded = verifyToken(token);
          return decoded;
        },
      };
    },
  });
  console.log(`🚀 Server ready at link: ${url}`);
})();
