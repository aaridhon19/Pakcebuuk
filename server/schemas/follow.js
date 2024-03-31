const { GraphQLError } = require("graphql");
const Follow = require("../models/dbFollow");
const { ObjectId } = require("mongodb");

const typeDefs = `#graphql
  scalar Date

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    follows: [Follow]
  }
  type Mutation {
    followUser(_id: ID!): Follow
  }
`;

const resolvers = {
  Query: {
    follows: async (_, __, {auth}) => {
      auth()
      const follows = await Follow.findAll();
      return follows;
    },
  },
  Mutation: {
    followUser: async (_, { _id }, { auth }) => {
      auth();
      const currentUser = auth();

      const followerId = new ObjectId(String(currentUser.id));
      const followingId = new ObjectId(String(_id));

      const newFollow = {
        followingId,
        followerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const result = await Follow.createFollow(newFollow);
      newFollow._id = result.insertedId;
      return newFollow;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};