import {gql, makeVar} from "@apollo/client";

export const jwt = makeVar('');
export const userId = makeVar(0)



export const LOGIN_MUTATION = gql`
    mutation Login($input: UsersPermissionsLoginInput!) {
  login(input: $input) {
    jwt
    user {
      id
      email
      username
    }
  }
}`;

export const SIGNUP_MUTATION = gql`
    mutation Register($input: UsersPermissionsRegisterInput!) {
  register(input: $input) {
    jwt
    user{
      id
    }
  }
}`;



