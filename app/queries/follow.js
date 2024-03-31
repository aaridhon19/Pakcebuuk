import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
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
