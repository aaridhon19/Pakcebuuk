import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query Query($id: ID) {
    findById(_id: $id) {
      _id
      name
      username
      email
      password
      followerDetail {
        _id
        name
        username
        email
      }
      followingDetail {
        _id
        name
        username
        email
      }
    }
  }
`;
