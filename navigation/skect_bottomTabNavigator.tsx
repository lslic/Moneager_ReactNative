import * as React from 'react';
import {SafeAreaView, StyleSheet, View, useColorScheme} from 'react-native';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ProfileScreen} from '../components/screens/ProfileScreen';
import {MainScreen} from '../components/screens/MainScreen';
import {TransactionsScreen} from '../components/screens/TransactionsScreen';
import {SettingsScreen} from '../components/screens/SettingsScreen';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { PrimaryColors } from "../constants/colors";

const Tab = createMaterialTopTabNavigator();

interface IconProps {
    color: string;
    size: number;
}

const StatisticsIcon: React.FC<IconProps> = ({ color, size }) => (
    <MaterialCommunityIcons name="chart-bar" size={size} color={color} />
);

const ProfileIcon: React.FC<IconProps> = ({ color, size }) => (
    <MaterialCommunityIcons name="account" size={size} color={color} />
);

const TransactionsIcon: React.FC<IconProps> = ({ color, size }) => (
    <MaterialCommunityIcons name="format-list-bulleted" size={size} color={color} />
);

const HistoryIcon: React.FC<IconProps> = ({ color, size }) => (
    <MaterialCommunityIcons name="history" size={size} color={color} />
);

const SettingsIcon: React.FC<IconProps> = ({ color, size }) => (
    <MaterialCommunityIcons name="cog" size={size} color={color} />
);

export function TopNavigator() {
    const isDarkMode = useColorScheme() === 'dark';
    const theme = isDarkMode ? DarkTheme : DefaultTheme;

    return (
        <View style={styles.container}>
            <Tab.Navigator screenOptions={{ tabBarActiveTintColor: PrimaryColors.PC_800, tabBarLabelStyle: styles.tabBarLabel} }>
                <Tab.Screen
                    name="Statistics"
                    component={MainScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <StatisticsIcon color={color} size={20}  />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color}) => (
                            <ProfileIcon color={color} size={20}  />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Transactions"
                    component={TransactionsScreen}
                    options={{
                        tabBarIcon: ({ color}) => (
                            <TransactionsIcon color={color} size={20}  />
                        ),
                    }}
                />
                <Tab.Screen
                    name="History"
                    component={MainScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <HistoryIcon color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color}) => (
                            <SettingsIcon color={color} size={20}  />
                        )                    }}
                />
            </Tab.Navigator>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        position:"relative",
        flex: 1,
        justifyContent: 'flex-start',
    },
    tabBarLabel: {
        fontFamily: 'Inter_400Regular', // Replace with the desired font family
        fontSize: 9.5,
        marginHorizontal: -20,
    },
});
