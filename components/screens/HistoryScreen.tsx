import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {
    GET_ALL_WALLETS_QUERY_NEW, GET_TRANSACTIONS_QUERY
} from "../../constants/grafql/Transaction/graphql";

export function HistoryScreen() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [selectedWalletType, setSelectedWalletType] = useState('');
    const { loading: transactionsLoading, error: transactionsError, data: transactionsData, refetch } = useQuery(GET_ALL_WALLETS_QUERY_NEW, {
        variables: {
            filters: {} // You can add any filters you need here
        },
        fetchPolicy: 'network-only', // This will bypass Apollo's cache and ensure a network request is always made
        notifyOnNetworkStatusChange: true,  // Enables refetching when calling refetch() method
    });

    useEffect(() => {
        if (isFocused) {
            refetch();
        }
    }, [isFocused, refetch]);

    if (transactionsLoading) {
        return <Text>Loading...</Text>;
    }

    if (transactionsError) {
        console.log(transactionsError);
        return <Text>Error occurred while fetching data</Text>;
    }

// Flatten wallets and transactions into one list
    let transactions = [];
    transactionsData?.wallets?.data?.forEach(wallet => {
        wallet.attributes.transactions.data.forEach(transaction => {
            transactions.push({ ...transaction.attributes, walletType: wallet.attributes.type });
        });
    });

    const filteredTransactions = selectedWalletType
        ? transactions.filter(transaction => transaction.walletType === selectedWalletType)
        : transactions;

    const handleFilterWalletType = (walletType) => {
        setSelectedWalletType(selectedWalletType === walletType ? '' : walletType);
    };


    return (
        <View style={styles.container}>
            {/* ...rest of the component */}
            <FlatList
                data={filteredTransactions}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const TransactionCard = ({ transaction }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.amount}>{transaction.amount}</Text>
            <Text style={styles.category}>{transaction.category}</Text>
            <Text style={styles.name}>{transaction.name}</Text>
            <Text style={styles.walletType}>{transaction.walletType}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    filterContainer: {
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
    },
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
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
})
