import { gql } from "@apollo/client";

export const GET_FOLLOW = gql`
  query Query {
    follows {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;
