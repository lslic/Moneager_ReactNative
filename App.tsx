import React, {memo} from "react";
import GlobalStyles from './components/shared/GlobalStyle';
import {AccountCreationNavigator} from "./navigation/accountCreationStackNavigator";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, useReactiveVar} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {NavigationContainer} from "@react-navigation/native";
import {jwt} from "./constants/grafql/jwt";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useCustomResourceLoading} from "./services/CustomResourceLoading";
import {LoginScreen} from "./components/screens/LoginScreen";
import * as SplashScreen from 'expo-splash-screen';
import {RegisterScreen} from "./components/screens/oboarding_process/RegisterScreen";

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


//GraphQL Endpoint
const httpLink = createHttpLink({
    uri: 'http://192.168.1.155:1337/graphql',
});



const Stack = createNativeStackNavigator();

//Remember the client Cache
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


//Prevent unnecessary redraws
export const AppStack = memo(() => {
    return <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
    </Stack.Navigator>;
});

//Navigation checker
export const Navigation = () => {
    const isLoggedIn = useReactiveVar(jwt);
    return <NavigationContainer>
        {!isLoggedIn ? <AppStack/> : <AccountCreationNavigator/>}
    </NavigationContainer>
}

//Main application
export default function App() {
    const isLoading = useCustomResourceLoading();

    return isLoading ? null : (
        <ApolloProvider client={client}>
            <SafeAreaProvider style={GlobalStyles.droidSafeArea}>
                <Navigation/>
            </SafeAreaProvider>
        </ApolloProvider>
    );
}
