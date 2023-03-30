import * as React from 'react';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SettingsScreen} from "../components/screens/SettingsScreen";
import {ProfileScreen} from "../components/screens/ProfileScreen";
import {MainScreen} from "../components/screens/MainScreen";
import {HomeScreen} from "../components/screens/HomeScreen";
import {TransactionsScreen} from "../components/screens/TransactionsScreen";
import {useColorScheme} from 'react-native';
import scheme from "react-native-ui-lib/src/style/scheme";
// theme components and the navigation container


const bottomTabNavigator = createBottomTabNavigator();


export function BottomNavigator() {
    return (
        <NavigationContainer theme={scheme.getSchemeType() === 'dark' ? DarkTheme : DefaultTheme}>
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
