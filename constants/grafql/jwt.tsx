import {gql, makeVar} from "@apollo/client";

export const jwt = makeVar('');

export const LOGIN_MUTATION = gql`mutation Login($input: UsersPermissionsLoginInput!) {
  login(input: $input) {
    jwt
    user {
      email
      username
    }
  }
}`;

export const SIGNUP_MUTATION = gql`mutation Register($input: UsersPermissionsRegisterInput!) {
  register(input: $input) {
    jwt
  }
}`;
