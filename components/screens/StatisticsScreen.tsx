import React from 'react';
import { View, StyleSheet, Dimensions, Text as RNText } from 'react-native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import { Text as SVGText } from 'react-native-svg';
import { useQuery } from '@apollo/client';
import { GET_ALL_WALLETS_QUERY_sta } from "../../constants/grafql/Transaction/graphql";
import {NeutralColors} from "../../constants/colors";

export function StatisticScreen() {
    const { data, error, loading } = useQuery(GET_ALL_WALLETS_QUERY_sta, {
        variables: {
            filters: {} // You can add any filters you need here
        },
        fetchPolicy: 'network-only', // This will bypass Apollo's cache and ensure a network request is always made
        notifyOnNetworkStatusChange: true, // Enables refetching when calling refetch() method
    });

    if (loading) {
        return <RNText>Loading...</RNText>;
    }

    if (error) {
        console.log(error);
        return <RNText>Error occurred while fetching data</RNText>;
    }

    // Extract amounts and wallet IDs from the data
    const walletsData = data?.wallets?.data || [];
    const amounts = walletsData.map(wallet => wallet.attributes.amount);
    const walletNames = walletsData.map(wallet => wallet.attributes.name);

    // Generate labels for each bar (wallet)
    const Labels = ({ x, y, bandwidth, data }) =>
        data.map((value, index) => (
            <SVGText
                key={index}
                x={x(index) + bandwidth / 2}
                y={y(value) + 10}
                fontSize={12}
                fill={'white'}
                alignmentBaseline={'middle'}
                textAnchor={'middle'}
            >
                {walletNames[index]}
            </SVGText>
        ));

    return (
        <View style={styles.container}>
            <RNText style={styles.title}>Wallet Statistics</RNText>
            <View style={styles.chartContainer}>
                <YAxis
                    style={styles.yAxis}
                    data={amounts}
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ fill: 'rgba(24, 23, 51, 1)', fontSize: 10 }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value.toFixed(2)}`}
                />
                <BarChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={amounts}
                    svg={{ fill: 'rgba(65, 53, 111, 0.8)' }}
                    contentInset={{ top: 10, bottom: 10 }}
                    gridMin={0}
                >
                    <Grid />
                    <Labels x={undefined} y={undefined} bandwidth={undefined} data={undefined} />
                </BarChart>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color : NeutralColors.NC_900
    },
    chartContainer: {
        flexDirection: 'row',
        height: 180,
        width: Dimensions.get('window').width - 50,
        paddingVertical: 16
    },
    yAxis: {
        marginRight: 10,
        color : NeutralColors.NC_WHITE
    }
});
