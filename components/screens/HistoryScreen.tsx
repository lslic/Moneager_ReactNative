import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { GET_ALL_WALLETS_QUERY, GET_TRANSACTIONS_QUERY } from "../../constants/grafql/Transaction/graphql";

export function HistoryScreen() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [selectedWalletType, setSelectedWalletType] = useState('');
    const { loading: walletsLoading, error: walletsError, data: walletsData } = useQuery(GET_ALL_WALLETS_QUERY);
    const { loading: transactionsLoading, error: transactionsError, data: transactionsData, refetch } = useQuery(GET_TRANSACTIONS_QUERY, {
        variables: {
            filters: {} // You can add any filters you need here
        },
        notifyOnNetworkStatusChange: true,  // Enables refetching when calling refetch() method
    });

    useEffect(() => {
        if (isFocused) {
            refetch();
        }
    }, [isFocused, refetch]);

    if (walletsLoading || transactionsLoading) {
        return <Text>Loading...</Text>;
    }

    if (walletsError || transactionsError) {
        console.log(walletsError, transactionsError);
        return <Text>Error occurred while fetching data</Text>;
    }

    const wallets = walletsData?.wallets?.data || [];
    const transactions = transactionsData?.transactions?.data || [];
    const filteredTransactions = selectedWalletType
        ? transactions.filter(transaction => transaction.attributes.wallet?.data?.attributes?.type === selectedWalletType)
        : transactions;

    const handleFilterWalletType = (walletType) => {
        setSelectedWalletType(selectedWalletType === walletType ? '' : walletType);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Transaction History</Text>
            <View style={styles.filterContainer}>
                <Text style={styles.filterTitle}>Filter :</Text>
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
                {/*{wallets.map(wallet => (*/}
                {/*    <TouchableOpacity*/}
                {/*        key={wallet.id}*/}
                {/*        style={[styles.filterButton, selectedWalletType === wallet.attributes.type && styles.filterButtonSelected]}*/}
                {/*        onPress={() => handleFilterWalletType(wallet.attributes.type)}*/}
                {/*    >*/}
                {/*        <Text style={styles.filterButtonText}>{wallet.attributes.type}</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*))}*/}
            </View>
            <FlatList
                data={filteredTransactions}
                renderItem={({ item }) => <TransactionCard transaction={item.attributes} />}
                keyExtractor={(item) => item.id}
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
            {transaction.wallet?.data?.attributes?.type && (
                <Text style={styles.walletType}>{transaction.wallet.data.attributes.type}</Text>
            )}
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
});
