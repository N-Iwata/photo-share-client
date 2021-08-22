import { gql } from "@apollo/client";

export const AddFakeUsers = gql`
  mutation addFakeUsers($count: Int) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avater
    }
  }
`;

export const GitHubAuth = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`;
