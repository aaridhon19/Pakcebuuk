const User = require("../models/dbUser");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
    followerDetail: [UserDetail]
    followingDetail: [UserDetail]
  }

  type UserDetail {
    _id: ID
    name: String
    username: String
    email: String
  }

  type Token {
    accessToken: String
  }

  type Query {
    findById(_id: ID): User
    searchByUsernameOrName(username: String, name: String): [User],
  }

  type Mutation {
    register(name: String!, username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): Token
  }

`;

const resolvers = {
  Query: {
    findById: async (_, args, contextValue) => {
      contextValue.auth();
      const { _id } = args;
      if (!_id) {
        throw new Error("User not found");
      }
      const user = await User.findById(_id);
      if (!user) {
        throw new Error("User not found");
      }

      console.log(user, "<<<< ini di schemas user");
      return user;
    },
    searchByUsernameOrName: async (_, args, contextValue) => {
      contextValue.auth();
      const { username, name } = args;

      if (!username) {
        throw new Error("Username required");
      }

      if (!name) {
        throw new Error("Name required");
      }

      const user = await User.findByUsernameOrName(username, name);
      if (!user) {
        throw new Error("User not found");
      }

      console.log(user, "<<<< ini di schemas user");
      return user;
    },
  },

  Mutation: {
    register: async (_, args) => {
      try {
        const { name, username, email, password } = args;
        if (!name) throw new Error("Name is Required");
        if (!username) throw new Error("Username is Required");

        //validasi email
        if (!email) {
          throw new Error("Email is Required");
        }
        const validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(validRegex)) {
          throw new Error("Email must be formated (example@mail.com)");
        }

        // validasi password
        if (!password) {
          throw new Error("Password is Required");
        }
        if (password.length < 5) {
          throw new Error("Password must be at least 5 characters long");
        }

        //validasi ketika email sudah digunakan
        const findEmail = await User.findByEmail(email);
        if (findEmail) {
          throw new Error("Email already exists");
        }

        //validasi ketika username sudah digunakan
        const findByUsername = await User.findByUsername(username);
        if (findByUsername) {
          throw new Error("Username already exists");
        }

        const user = {
          name,
          username,
          email,
          password: hashPassword(password),
        };
        console.log(user, "<<<< Registered User");
        let result = await User.createOne(user);

        if (!user) {
          throw new Error("Failed to register user");
        }
        user._id = result.insertedId;

        return user;
      } catch (error) {
        throw error;
      }
    },

    login: async (_, args) => {
      try {
        // console.log('masuukkkk');
        const { username, password } = args;
        //validasi username
        if (!username) {
          throw new Error("Username is Required");
        }
        //validasi password
        if (!password) {
          throw new Error("Password is Required");
        }

        const user = await User.findByUsername(username);
        console.log(user, "<<<< ini di schemas user");

        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = comparePassword(password, user.password);

        if (!isMatch) {
          throw new Error("Invalid Username or Password");
        }

        const token = {
          accessToken: signToken({
            id: user._id,
            username: user.username,
          }),
        };
        return token;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
