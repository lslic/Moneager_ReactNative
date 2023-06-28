 import {gql, useMutation} from "@apollo/client";

export const CREATE_WALLET_MUTATION = gql`
    mutation CreateWallet($data: WalletInput!) {
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
                    wallet{
                        data{
                            id
                        }
                    }
                }
                id
            }
        }
    }
`;




export const UPDATE_WALLET_AMOUNT_MUTATION = gql`
    mutation UpdateWallet($id: ID!, $amount: Float!) {
        updateWallet(id: $id, data: {amount: $amount}) {
            data {
                id
                attributes {
                    amount
                    name
                    type
                }
            }
        }
    }
`;

export const GET_WALLET_BALANCE_QUERY = gql`
    query GetWalletBalanceQUERY($walletId: ID) {
        wallet(id: $walletId) {
            data {
                attributes {
                    amount
                }
            }
        }
    }`


export const GET_USER_WALLETS_QUERY = gql`
    query GetUserWallets($filters: WalletFiltersInput) {
        wallets(filters: $filters) {
            data {
                id
                attributes {
                    type
                    name
                }
            }
        }
    }`

 export const GET_TRANSACTIONS_QUERY= gql`query($filters: TransactionFiltersInput) {
     transactions(filters: $filters) {
         data {
             id
             attributes {
                 createdAt
                 amount
                 category
                 name
                 wallet {
                     data {
                         attributes {
                             type
                         }
                     }
                 }
             }
         }
     }
 }
`

 export const GET_WALLET_BALANCES = gql`query GetWalletBalanceQUERY($walletId: ID) {
     wallet(id: $walletId) {
         data {
             attributes {
                 amount
             }
         }
     }
 }
     `

 export const GET_ALL_WALLETS_QUERY = gql`query GetAllWallets {
  wallets {
   data {
    id
    attributes {
     amount
        
    }
   }
  }
 }
`
