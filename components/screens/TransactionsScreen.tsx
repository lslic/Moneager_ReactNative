import { Text, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useQuery, useMutation } from '@apollo/client';
import {
    CREATE_TRANSACTION_MUTATION,
    GET_TRANSACTION_ENUMS_QUERY,
    GET_USER_WALLETS_QUERY,
    UPDATE_WALLET_AMOUNT_MUTATION,
} from "../../constants/grafql/Transaction/graphql";
import { userId } from "../../constants/grafql/jwt";
import { CustomButton } from "../ui/buttons";
import { NeutralColors } from "../../constants/colors";

export const TransactionsScreen = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [walletID, setWalletID] = useState(0);
    const [type, setType] = useState('');

    const { data, loading, error } = useQuery(GET_TRANSACTION_ENUMS_QUERY);
    const { data: userWallets, loading: userWalletsLoading, error: userWalletsError } = useQuery(GET_USER_WALLETS_QUERY);

    const [createTransaction] = useMutation(CREATE_TRANSACTION_MUTATION);
    const [updateWalletAmount] = useMutation(UPDATE_WALLET_AMOUNT_MUTATION);

    const handleCreateTransaction = async () => {
        try {
            const transactionAmount = parseFloat(amount);
            const wallet = userWallets.wallets.data.find((wallet) => wallet.id === walletID);
            const currentAmount = wallet.attributes.amount;
            let updatedAmount = currentAmount;

            if (type === 'Add') {
                updatedAmount += transactionAmount;
            } else if (type === 'Extract') {
                updatedAmount += transactionAmount;
            } else {
                console.log('Invalid transaction type');
                return;
            }

            if (updatedAmount < 0) {
                // Check if the updated amount is negative
                console.log('Insufficient funds in the wallet');
                return;
            }

            // @ts-ignore
            await createTransaction({
                variables: {
                    data: {
                        amount: transactionAmount,
                        category,
                        name,
                        wallet: walletID,
                    },
                },
            });

            await updateWalletAmount({
                variables: {
                    id: walletID,
                    amount: updatedAmount,
                },
            });

            console.log('Transaction created successfully');
            console.log('Wallet amount updated successfully');

            setAmount('');
            setCategory('');
            setName('');
            setWalletID(0);
            setType('');
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    if (loading || userWalletsLoading) {
        return <Text>Loading...</Text>;
    }

    if (error || userWalletsError) {
        console.log(userWalletsError);
        return <Text>Error: </Text>;
    }

    const categoryEnums = data?.categoryEnums?.enumValues || [];
    const typeEnums = data?.typeEnums?.enumValues || [];
    const wallets = userWallets?.wallets?.data || [];

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Transaction</Text>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
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
                        items={wallets.map((wallet) => ({
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
                    <Text style={styles.label}>Type</Text>
                    <RNPickerSelect
                        items={[
                            { label: 'None', value: 'None' },
                            { label: 'Add', value: 'Add' },
                            { label: 'Extract', value: 'Extract' },
                        ]}
                        onValueChange={(value) => setType(value)}
                        style={pickerSelectStyles}
                        value={type}
                        placeholder={{ label: 'Select a type...', value: null }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <CustomButton
                        title="Create Transaction"
                        onPress={handleCreateTransaction}
                        unfilled={undefined}
                        name={undefined}
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
        color: NeutralColors.NC_900
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
        color: NeutralColors.NC_900,
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


