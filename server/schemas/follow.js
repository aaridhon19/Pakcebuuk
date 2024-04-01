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
    followUser(followingId: ID!): Follow
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
    followUser: async (_, { followingId }, { auth }) => {
      auth();
      const currentUser = auth();

      const FollowerId = new ObjectId(String(currentUser.id));
      const FollowingId = new ObjectId(String(followingId));

      const newFollow = {
        followingId : FollowingId,
        followerId : FollowerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const result = await Follow.createFollow(newFollow);
      console.log(result, "<<< mutation follow");
      // newFollow.followingId = result.insertedId;
      return newFollow;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};