import React, {useEffect, useState} from "react";
import {StyleSheet, View} from 'react-native';
import GlobalStyles from './components/shared/GlobalStyle';
import {AccountCreationNavigator} from "./navigation/accountCreationStackNavigator";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, useReactiveVar} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {NavigationContainer} from "@react-navigation/native";
import {jwt} from "./constants/grafql/jwt";
import {TopNavigator,} from "./navigation/skect_bottomTabNavigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {fontLoader, useCustomResourceLoading} from "./services/fontLoader";
import {LoginPage} from "./components/screens/LoginScreen";
import {Inter_400Regular, Inter_500Medium, useFonts} from "@expo-google-fonts/inter";
import {NanumBrushScript_400Regular} from "@expo-google-fonts/nanum-brush-script";
import {Lora_400Regular, Lora_600SemiBold} from "@expo-google-fonts/lora";
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from "expo-app-loading";
import {wait} from "@apollo/client/testing";

SplashScreen.preventAutoHideAsync();

//Backend Link
const authLink = setContext((_, {headers}) => {
    const token = jwt();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const httpLink = createHttpLink({
    uri: 'http://192.168.1.155:1337/graphql',
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


const Stack = createNativeStackNavigator();




export function CreateOrJoin2({navigation}) {
    return <View></View>
}

export function CreateOrJoin3({navigation}) {
    return <View></View>
}

export const AppStack = () => {
    return <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginPage} options={{headerShown: false}}/>
        <Stack.Screen name="CreateOrJoin2" component={CreateOrJoin2} options={{headerShown: false}}/>
        <Stack.Screen name="CreateOrJoin3" component={CreateOrJoin3} options={{headerShown: false}}/>
    </Stack.Navigator>
}


export const Navigation = () => {
    const isLoggedIn = useReactiveVar(jwt);
    return <NavigationContainer>
        {!isLoggedIn ? <AppStack/> : <AccountCreationNavigator/>}
    </NavigationContainer>

}


export default function App() {
    const isLoading = useCustomResourceLoading();

    if (isLoading) {
        return null;
    }


    return (
        <ApolloProvider client={client}>
            <SafeAreaProvider style={GlobalStyles.droidSafeArea}>
                <Navigation />
            </SafeAreaProvider>
        </ApolloProvider>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
