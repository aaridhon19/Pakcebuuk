const User = require("../models/dbUser");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const typeDefs = `#graphql
    type User {
        _id: ID
      name: String!
      username: String
      email: String!
      password: String!
      phone: String
      address: Address
      followerDetail: [UserDetail]
      followingDetail: [UserDetail]
    }
    
    type UserDetail {
        _id: ID
        name: String
        email: String
        phone: String
        address: String
    }

    type Address {
        street: String
        city: String
        province: String
    }

    type Token {
        accessToken: String
    }
    
    type Query {
        getDetail(id: ID): User
    }

    type Mutation {
        addUser(name: String!, username:String, email: String, password: String): User
        login(email: String!, password: String!): Token
    }    
`;

const resolvers = {
  Query: {
    getDetail: async (_, args, contextValue) => {
      contextValue.auth();
      const { id } = args;

      const user = await User.getDetail(id);
      console.log(user, "<<<< ini di schemas user");

      return user;
    },
  },

  Mutation: {
    login : async (_, args) => {
        try {
            const { email, password } = args;
            const user = await User.findByEmail(email);

            if(!user) {
                throw new Error("User not found");
            }

            const isMatch = comparePassword(password, user.password);

            if(!isMatch) {
                throw new Error("Invalid Email or Password");
            }

            const token = {
                accessToken : signToken({
                    id: user._id,
                    email: user.email
                })
            }

            return token

        } catch (error) {
            throw error
        }
    }
    // addUser: async (_, args) => {
    //   return await users.addUser({
    //     name: args.name,
    //     email: args.email,
    //   });
    // },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
