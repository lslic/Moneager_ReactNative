import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {WelcomeScreen} from "../components/screens/oboarding_process/WelcomeScreen";
import {HomeScreen} from "../components/screens/HomeScreen";

const startStackNavigator = createNativeStackNavigator();

export function AccountCreationNavigator() {
    return (
            <startStackNavigator.Navigator>
                <startStackNavigator.Screen name="Welcome" component={WelcomeScreen} />
                {/*<startStackNavigator.Screen name="Account" component={HomeScreen} />*/}
            </startStackNavigator.Navigator>
            );
}
