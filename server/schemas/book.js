const { GraphQLError } = require("graphql");
const books = require("../models/dbBook");
// [
//   {
//     id: 1,
//     title: "Harry Potter",
//     author: "JK Rowling",
//   },
//   {
//     id: 2,
//     title: "Lord of the Rings",
//     author: "JRR Tolkien",
//   },
// ];

const typeDefs = `#graphql
    type Book {
        _id: ID
      title: String!
      author: String
    }

    type Query {
      books: [Book]
      bookById(_id: ID): Book
    }

    type Mutation {
      addBook(title: String, author: String): Book
    }
`;

const resolvers = {
  Query: {
    books: (_, __, contextValue) => {
      console.log(contextValue, "<<< CONTEXT VALUE");
      return books;
    },
    bookById: (_, args) => {
      try {
        if (!args.id) {
          throw new GraphQLError("Id is required", {
            extensions: {
              code: "Not_Found",
            },
          });
        }
        const book = books.find((item) => {
          return item.id === args.id;
        });
        return book;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = {
        id: books.length + 1,
        title,
        author,
      };
      books.push(newBook);
      return newBook;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
