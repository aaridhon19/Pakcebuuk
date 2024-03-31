import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query Query($name: String, $username: String) {
    searchByUsernameOrName(name: $name, username: $username) {
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
