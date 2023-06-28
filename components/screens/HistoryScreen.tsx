import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
    GET_ALL_WALLETS_QUERY,
    GET_TRANSACTIONS_QUERY,
    CREATE_TRANSACTION_MUTATION,
    GET_TRANSACTION_ENUMS_QUERY,
    GET_USER_WALLETS_QUERY,
} from "../../constants/grafql/Transaction/graphql";
import { userId } from "../../constants/grafql/jwt";
import { NeutralColors } from "../../constants/colors";

export function HistoryScreen() {
    const [selectedWalletType, setSelectedWalletType] = useState('');
    const { loading: walletsLoading, error: walletsError, data: walletsData } = useQuery(GET_ALL_WALLETS_QUERY);
    const { loading: transactionsLoading, error: transactionsError, data: transactionsData, refetch } = useQuery(GET_TRANSACTIONS_QUERY, {
        variables: {
            filters: {} // You can add any filters you need here
        },
        notifyOnNetworkStatusChange: true,  // Enables refetching when calling refetch() method
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (walletsLoading || transactionsLoading) {
        return <Text>Loading...</Text>;
    }

    if (walletsError || transactionsError) {
        console.log(walletsError, transactionsError);
        return <Text>Error occurred while fetching data</Text>;
    }

    const wallets = walletsData?.wallets?.data || [];
    const transactions = transactionsData?.transactions?.data || [];
    const filteredTransactions = transactions.filter(transaction =>
        !selectedWalletType || transaction.attributes.wallet?.data?.attributes?.type === selectedWalletType
    ).sort((a, b) => b.id.localeCompare(a.id));

    const handleFilterWalletType = (walletType) => {
        if (selectedWalletType === walletType) {
            setSelectedWalletType('');
        } else {
            setSelectedWalletType(walletType);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <Text style={styles.filterTitle}>Filter:</Text>
                <TouchableOpacity
                    style={[styles.filterButton, selectedWalletType === 'NORMAL' && styles.filterButtonSelected]}
                    onPress={() => handleFilterWalletType('NORMAL')}
                >
                    <Text style={styles.filterButtonText}>Normal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, selectedWalletType === 'INVEST' && styles.filterButtonSelected]}
                    onPress={() => handleFilterWalletType('INVEST')}
                >
                    <Text style={styles.filterButtonText}>Invest</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, selectedWalletType === 'ECONOMY' && styles.filterButtonSelected]}
                    onPress={() => handleFilterWalletType('ECONOMY')}
                >
                    <Text style={styles.filterButtonText}>Economy</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{width:'95%'}}
                data={filteredTransactions}
                renderItem={({ item }) => (
                    <TransactionCard
                        transaction={item.attributes}
                        style={styles.transactionCard}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

interface TransactionCardProps {
    style: { alignSelf: "center", width: string }
}

const TransactionCard = ({ transaction, style }) => {
    let amountColor;
    if (transaction.wallet?.data?.attributes?.type === 'NORMAL') {
        amountColor = transaction.amount >= 0 ? 'green' : 'red';
    }
    if (transaction.wallet?.data?.attributes?.type === 'INVEST || 1') {
        amountColor = 'purple';
    }
    if (transaction.wallet?.data?.attributes?.type === 'ECONOMY') {
        amountColor = transaction.amount < 0 ? 'orange' : 'red';
    }
    amountColor = 'purple';

    return (
        <View style={styles.card}>
            <Text style={[styles.amount, { color: amountColor }]}>
                {transaction.amount}
            </Text>
            <Text style={styles.name}>{"Name: " + transaction.name}</Text>
            <Text style={styles.category}>{"Category: " + transaction.category}</Text>
            {transaction.wallet?.data?.attributes?.type && (
                <Text style={styles.walletType}>{"Wallet: " + transaction.wallet.data.attributes.type}</Text>
            )}
        </View>
    );
};

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
            variables: {
                data: {
                    amount: parseFloat(amount),
                    category,
                    name,
                    wallet: walletID,
                },
            },
        })
            .then(() => {
                console.log('Transaction created successfully');
                setAmount('');
                setCategory('');
                setName('');
                setWalletID(0);
                setType('');
            })
            .catch((error) => {
                console.error('Error creating transaction:', error);
            });
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

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Transaction</Text>
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreateTransaction}
                >
                    <Text style={styles.buttonText}>Create Transaction</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    transactionCard: {
        width: '90%',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Inter_500Medium',
        color: NeutralColors.NC_1200,
    },
    button: {
        backgroundColor: '#4287f5',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    filterContainer: {
        paddingTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    filterTitle: {
        fontSize: 16,
        marginRight: 8,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'gray',
        marginRight: 8,
    },
    filterButtonSelected: {
        backgroundColor: 'gray',
    },
    filterButtonText: {
        fontSize: 14,
        color: 'black',
    },
    listContent: {
        flexGrow: 1,
        width: '100%',
    },
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        width: '100%',
    },


    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    category: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
    },
    walletType: {
        fontSize: 14,
        color: 'blue',
        marginTop: 4,
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
