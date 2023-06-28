import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
    GET_ALL_WALLETS_QUERY,
    GET_TRANSACTIONS_QUERY,
    CREATE_TRANSACTION_MUTATION,
    GET_TRANSACTION_ENUMS_QUERY,
    GET_USER_WALLETS_QUERY, GET_ALL_WALLETS_QUERY_NEW,
} from "../../constants/grafql/Transaction/graphql";
import { userId } from "../../constants/grafql/jwt";
import { NeutralColors } from "../../constants/colors";



export function HistoryScreen() {
    const { loading, error, data } = useQuery(GET_ALL_WALLETS_QUERY_NEW, {
        variables: {
            filters: {
                id: {},
            },
        },
    });

    const { loading: walletsLoading, error: walletsError, data: walletsData } = useQuery(GET_ALL_WALLETS_QUERY_NEW, {
        variables: {
            filters: {
                id: {} // You can add any other filters if needed
            }
        },
    });


    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        console.log(error);
        return <Text>Error occurred while fetching data</Text>;
    }

    const wallets = data?.wallets?.data || [];

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    {/* Render filter buttons */}
                </View>
                {wallets.map((wallet) => (
                    <View key={wallet.attributes.name}>
                        <Text style={styles.walletTitle}>{wallet.attributes.name}</Text>
                        {wallet.attributes.transactions?.data.map((transaction) => (
                            <TransactionCard
                                key={transaction.attributes.updatedAt}
                                transaction={transaction.attributes}
                                style={styles.transactionCard}
                            />
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

// Other components and styles remain the same


const TransactionCard = ({ transaction, style }) => {
    let amountColor;
    if (transaction.wallet?.data?.attributes?.type === 'NORMAL') {
        amountColor = transaction.amount >= 0 ? 'green' : 'red';
    }
    if (transaction.wallet?.data?.attributes?.type === 'INVEST') {
        amountColor = 'purple';
    }
    if (transaction.wallet?.data?.attributes?.type === 'ECONOMY') {
        amountColor = transaction.amount < 0 ? 'orange' : 'red';
    }

    return (
        <View style={[styles.card, style]}>
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
    walletTitle: {  // Add the walletTitle style
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});


