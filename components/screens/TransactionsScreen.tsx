import {Text, View, TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useQuery, useMutation } from '@apollo/client';
import {
  CREATE_TRANSACTION_MUTATION,
  GET_TRANSACTION_ENUMS_QUERY,
  GET_USER_WALLETS_QUERY,
} from "../../constants/grafql/Transaction/graphql";
import {userId} from "../../constants/grafql/jwt";
import {CustomButton} from "../ui/buttons";
import {NeutralColors} from "../../constants/colors";

export const TransactionsScreen = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [walletID, setWalletID] = useState(0);
  const [type, setType] = useState('');

  const { data, loading, error } = useQuery(GET_TRANSACTION_ENUMS_QUERY);
  const { data: userWallets, loading: userWalletsLoading, error: userWalletsError } = useQuery(GET_USER_WALLETS_QUERY, {
    variables: {
      filters: {
        user: {
          id: {
            eq: userId()
          }
        }
      }
    }
  });

  const [createTransaction] = useMutation(CREATE_TRANSACTION_MUTATION);

  const handleCreateTransaction = () => {
    createTransaction({
      variables:{
        data: {
          amount: parseFloat(amount),
          category,
          name,
          wallet: walletID
        },
      }
    })
        .then(() => {
          console.log('Transaction created successfully');
        })
        .catch((error) => {
          console.error('Error creating transaction:', error);
        });
  };

  if (loading || userWalletsLoading) {
    return <Text>Loading...</Text>;
  }

  if (error || userWalletsError) {
    console.log(userWalletsError)
    return <Text>Error: </Text>;
  }

  const categoryEnums = data?.categoryEnums?.enumValues || [];
  const typeEnums = data?.typeEnums?.enumValues || [];

  return (
      <View style={styles.container}>
        <Text style={styles.headerText}> Transaction</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <RNPickerSelect
                items={categoryEnums.map((enumValue) => ({
                  label: enumValue.name,
                  value: enumValue.name,
                }))}
                onValueChange={(value) => setCategory(value)}
                style={pickerSelectStyles}
                value={category}
                placeholder={{ label: 'Select a category...', value: null }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Wallet</Text>
            <RNPickerSelect
                items={userWallets.wallets.data.map((wallet) => ({
                  label: wallet.attributes.name,
                  value: wallet.id,
                }))}
                onValueChange={(value) => setWalletID(value)}
                style={pickerSelectStyles}
                value={walletID}
                placeholder={{ label: 'Select a wallet...', value: null }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Transaction Type</Text>
            <RNPickerSelect
                items={typeEnums.map((enumValue) => ({
                  label: enumValue.name,
                  value: enumValue.name,
                }))}
                onValueChange={(value) => setType(value)}
                style={pickerSelectStyles}
                value={type}
                placeholder={{ label: 'Select a transaction type...', value: null }}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomButton
                title="Create Transaction"
                onPress={handleCreateTransaction} unfilled={undefined} name={undefined}            />
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 20,
    width: '80%',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: NeutralColors.NC_D_GRAY,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  addButton: {
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Inter_500Medium',
    color: NeutralColors.NC_1200,
  }, buttomContainer: {
    justifyContent: "center",
    width : '90%',
  }

});

const filledStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: NeutralColors.NC_900,
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    gap: 8,
    margin:12

  },
  text: {
    color: NeutralColors.NC_WHITE,
    fontFamily: 'Inter_500Medium',
    fontWeight: '500',
    fontSize: 12,
  },
  iconContainer:{
    display: 'flex',
    alignItems:'center',
    flexDirection: 'row',
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: NeutralColors.NC_D_GRAY,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    height: 40,
    borderColor: NeutralColors.NC_D_GRAY,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

