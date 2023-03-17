import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from "../components/screens/HomeScreen";
import {SettingsScreen} from "../components/screens/SettingsScreen";
import { ProfileScreen } from "../components/screens/ProfileScreen";
import { MainScreen } from "../components/screens/MainScreen";
import { TransactionsScreen } from "../components/screens/TransactionsScreen";

const bottomTabNavigator = createBottomTabNavigator();


export function BottomNavigator() {
    return (
        <NavigationContainer>
            <bottomTabNavigator.Navigator>
                <bottomTabNavigator.Screen name="Home" component={HomeScreen} />
                <bottomTabNavigator.Screen name="Profile" component={ProfileScreen} />
                <bottomTabNavigator.Screen name="Main" component={MainScreen} />
                <bottomTabNavigator.Screen name="Transactions" component={TransactionsScreen} />
                <bottomTabNavigator.Screen name="Settings" component={SettingsScreen} />
            </bottomTabNavigator.Navigator>
    </NavigationContainer>
);
}