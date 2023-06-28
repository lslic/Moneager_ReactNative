import React, { useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {GET_TRANSACTIONS_QUERY} from "../../constants/grafql/Transaction/graphql";

export function HistoryScreen() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const { loading, error, data, refetch } = useQuery(GET_TRANSACTIONS_QUERY, {
        notifyOnNetworkStatusChange: true,  // Enables refetching when calling refetch() method
    });

    useEffect(() => {
        if (isFocused) {
            refetch();
        }
    }, [isFocused, refetch]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        console.log(error);
        return <Text>Error occurred while fetching transactions</Text>;
    }

    const transactions = data?.transactions?.data || [];
    const sortedTransactions = [...transactions].sort((a, b) => b.id.localeCompare(a.id));



    return (
        <View style={styles.container}>
            <Text style={styles.header}>Transaction History</Text>
            <FlatList
                data={sortedTransactions}
                renderItem={({ item }) => <TransactionCard transaction={item.attributes} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
const TransactionCard = ({ transaction }) => {
    const intensity = Math.max(0, Math.min(255, Math.abs(transaction.amount) * 2));
    const red = transaction.amount < 0 ? 255 : 0;
    const green = transaction.amount >= 0 ? intensity : 0;
    const amountColor = `rgba(${red}, ${green}, 0, 1)`;

    const renderWalletType = () => {
        if (transaction.wallet && transaction.wallet.data) {
            return (
                <Text style={styles.wallet}>{`Wallet: ${transaction.wallet.data.attributes.type}`}</Text>
            );
        }
        return null;
    };

    return (
        <View style={[styles.card, { borderColor: amountColor }]}>
            <Text style={[styles.amount, { color: amountColor }]}>{transaction.amount}</Text>
            <Text style={styles.category}>{transaction.category}</Text>
            <Text style={styles.name}>{transaction.name}</Text>
            {renderWalletType()}
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
});

