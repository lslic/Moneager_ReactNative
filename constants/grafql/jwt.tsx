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

export const CREATE_WALLET = gql`mutation CreateWallet($data: WalletInput!) {
  createWallet(data: $data) {
    data {
      id
      attributes {
        amount
        name
        type
      }
    }
  }
}`

export const  GET_TRANSACTION_ENUMS_QUERY = gql`
  query GetTransactionEnums {
    categoryEnums: __type(name: "ENUM_TRANSACTION_CATEGORY") {
      enumValues {
        name
      }
    }
    typeEnums: __type(name: "ENUM_TRANSACTION_TYPE") {
      enumValues {
        name
      }
    }
  }
`;

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($data: TransactionInput!) {
    createTransaction(data: $data) {
      data {
        attributes {
          amount
          category
          name
          type
        }
        id
      }
    }
  }
`;

const GET_TRANSACTION_ENUMS_QUERY = gql`
  query GetTransactionEnums {
    categoryEnums: __type(name: "ENUM_TRANSACTION_CATEGORY") {
      enumValues {
        name
      }
    }
    typeEnums: __type(name: "ENUM_TRANSACTION_TYPE") {
      enumValues {
        name
      }
    }
  }
`;

const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($data: TransactionInput!) {
    createTransaction(data: $data) {
      data {
        attributes {
          amount
          category
          name
          type
        }
        id
      }
    }
  }
`;
