import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Query {
    posts {
      _id
      content
      tags
      imgUrl
      createdAt
      updatedAt
      authorId
      author {
        _id
        name
        username
        email
      }
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
    }
  }
`;
