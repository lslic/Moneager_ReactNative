import { Text, View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_WALLETS_QUERY } from "../../constants/grafql/Transaction/graphql";
import { PrimaryColors } from "../../constants/colors";
import { useIsFocused } from '@react-navigation/native';

const WalletCard = ({ wallet }) => {
    const intensity = Math.max(0, Math.min(255, Math.abs(wallet.amount) * 2));
    const red = wallet.amount < 0 ? 255 : 0;
    const green = wallet.amount >= 0 ? intensity : 0;
    const amountColor = `rgba(${red}, ${green}, 0, 1)`;

    return (
        <View style={[styles.card, { borderColor: PrimaryColors.PC_800 }]}>
            <Text style={styles.name}>{wallet.name}</Text>
            <Text style={[styles.amount, { color: PrimaryColors.PC_600 }]}>
                Wallet {wallet.id} {wallet.name}: ${wallet.amount}
            </Text>
        </View>
    );
};

export function WalletScreen() {
    const { loading, error, data, refetch } = useQuery(GET_ALL_WALLETS_QUERY);
    const isFocused = useIsFocused();

    const handleFocusEffect = useCallback(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        handleFocusEffect();
    }, [handleFocusEffect, isFocused]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        console.log(error);
        return (
            <View style={styles.container}>
                <Text>Error occurred while fetching wallet balances</Text>
            </View>
        );
    }

    const wallets = data?.wallets?.data || [];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Wallet Balances</Text>
            <FlatList
                data={wallets}
                renderItem={({ item }) => <WalletCard wallet={item.attributes} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

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
        borderWidth: 2,
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 16,
        marginBottom: 4,
    },
});
