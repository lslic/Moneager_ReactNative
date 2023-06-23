import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import React, { useState } from 'react';

import RNPickerSelect from 'react-native-picker-select';
import { useQuery, useMutation } from '@apollo/client';
import {
  CREATE_TRANSACTION_MUTATION,
  GET_TRANSACTION_ENUMS_QUERY,
  GET_USER_WALLETS_QUERY, GET_WALLET_BALANCE_QUERY
} from "../../constants/grafql/Transaction/graphql";
import {NeutralColors} from "../../constants/colors";
import object from "react-native-ui-lib/src/style/colorName";
import {userId} from "../../constants/grafql/jwt";




export const TransactionsScreen = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [walletID, setWalletID] = useState(0);
  const [type, setType] = useState('');
  const [name, setName] = useState('');

  const { data, loading, error  } = useQuery(GET_TRANSACTION_ENUMS_QUERY);
  const { data : userWallets, loading : userWalletsLoading,error : userWalletsError  } = useQuery(GET_USER_WALLETS_QUERY,
      {variables: {
        filters :{
          user : {
            id : {
              eq : userId()
            }
          }
        }
        }});
  const [createTransaction] = useMutation(CREATE_TRANSACTION_MUTATION);


  const handleCreateTransaction = () => {
    createTransaction({variables:{
      data: {
          amount: parseFloat(amount),
          category,
          name,
          wallet : walletID
      },
    }})
      .then(() => {
        // Transaction created successfully, perform any necessary actions
        console.log('Transaction created successfully');
      })
      .catch((error) => {
        // Error occurred while creating transaction
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

  return (
    <View style={styles.container}>
      <Text>Transactions!</Text>
      <View style={styles.formContainer}>
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
            placeholder={{
              label: 'Select a category...',
              value: null,
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type</Text>
          <RNPickerSelect
            items={userWallets.wallets.data.map((enumValue) => ({
              label: enumValue.attributes.type,
              value: enumValue.id,
            }))}
            onValueChange={(value) => setWalletID(value)}
            style={pickerSelectStyles}
            value={walletID}
            placeholder={{
              label: 'Select a type...',
              value: null,
            }}        // Transaction created successfully, perform any necessary actions

          />
        </View>
        <Button title={"create"} onPress={handleCreateTransaction}/>
        <View style={styles.inputContainer}>
          <Text

 style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
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

