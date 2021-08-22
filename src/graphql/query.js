import { gql } from "@apollo/client";

export const GetAllUsers = gql`
  query getAllUsers {
    allUsers {
      githubLogin
      name
      avater
    }
    totalUsers
    me {
      githubLogin
      name
      avater
    }
  }
`;
