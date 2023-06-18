import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { NeutralColors, PrimaryColors } from '../../constants/colors';

const data1 = [
    { id: '1', title: 'Achievement 1' },
    { id: '2', title: 'Achievement 2' },
    { id: '3', title: 'Achievement 3' },
    { id: '4', title: 'Achievement 4' },
    { id: '5', title: 'Achievement 5' },
    { id: '6', title: 'Achievement 6' },
];

const data2 = [
    { id: '1', title: 'Goal 1' },
    { id: '2', title: 'Goal 2' },
    { id: '3', title: 'Goal 3' },
    { id: '4', title: 'Goal 4' },
    { id: '5', title: 'Goal 5' },
    { id: '6', title: 'Goal 6' },
];

export function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profileTextContainer}>
                    <Text style={styles.profileText}>John Doe</Text>
                </View>
                <View style={styles.profileImageContainer}>
                    <View style={styles.profileImage} />
                </View>
            </View>

            <Text style={styles.description}>
                A generic user interested in money saving. This is a longer description that provides more details about the user's interests and goals.
            </Text>

            <View style={styles.achievementContainer}>
                <Text style={styles.achievementHeaderText}>Achievements</Text>
                <FlatList
                    data={data1}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={styles.achievementItemContainer}>
                            <Text style={styles.achievementItemText}>{item.title}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.goalContainer}>
                <Text style={styles.goalHeaderText}>Goals</Text>
                <FlatList
                    data={data2}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>{item.title}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: NeutralColors.NC_WHITE,
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    profileTextContainer: {
        flex: 1,
    },
    profileText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Inter_500Medium',
        color: NeutralColors.NC_1200,
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: NeutralColors.NC_600,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: NeutralColors.NC_WHITE,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: NeutralColors.NC_1200,
        marginBottom: 16,
    },
    achievementContainer: {
        marginBottom: 16,
    },
    achievementHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Inter_500Medium',
        color: NeutralColors.NC_1200,
        marginBottom: 8,
    },
    achievementItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: NeutralColors.NC_300,
        borderRadius: 8,
        padding: 16, // Increase the padding value to make the items wider
        margin: 4,
        backgroundColor: NeutralColors.NC_WHITE,
        width: '75%',
    },
    achievementItemText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: NeutralColors.NC_1200,
        textAlign: 'left',
    },
    goalContainer: {
        marginBottom: 16,
    },
    goalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Inter_500Medium',
        color: NeutralColors.NC_1200,
        marginBottom: 8,
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: NeutralColors.NC_300,
        borderRadius: 8,
        padding: 8,
        margin: 4,
        backgroundColor: NeutralColors.NC_WHITE,
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: NeutralColors.NC_1200,
    },
});

