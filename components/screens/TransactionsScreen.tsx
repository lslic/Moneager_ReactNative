import { Text, View, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { FAB } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useQuery, gql, useMutation } from '@apollo/client';

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

export const TransactionsScreen = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');

  const { data, loading, error } = useQuery(GET_TRANSACTION_ENUMS_QUERY);
  const [createTransaction] = useMutation(CREATE_TRANSACTION_MUTATION);

  const handleCreateTransaction = () => {
    createTransaction({
      variables: {
        data: {
          amount: parseFloat(amount),
          category,
          name,
          type,
        },
      },
    })
      .then(() => {
        // Transaction created successfully, perform any necessary actions
        console.log('Transaction created successfully');
      })
      .catch((error) => {
        // Error occurred while creating transaction
        console.error('Error creating transaction:', error);
      });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const categoryEnums = data?.categoryEnums?.enumValues || [];
  const typeEnums = data?.typeEnums?.enumValues || [];

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
            items={typeEnums.map((enumValue) => ({
              label: enumValue.name,
              value: enumValue.name,
            }))}
            onValueChange={(value) => setType(value)}
            style={pickerSelectStyles}
            value={type}
            placeholder={{
              label: 'Select a type...',
              value: null,
            }}
          />
        </View>
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
    borderColor: 'gray',
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
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default TransactionsScreen;
