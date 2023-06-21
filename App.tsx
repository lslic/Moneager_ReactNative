
import React, {useCallback} from "react";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import GlobalStyles from './components/shared/GlobalStyle';
import {Inter_400Regular, Inter_500Medium,useFonts} from "@expo-google-fonts/inter";
import {NanumBrushScript_400Regular} from "@expo-google-fonts/nanum-brush-script";
import {Lora_400Regular, Lora_600SemiBold } from "@expo-google-fonts/lora";
import {AccountCreationNavigator} from "./navigation/accountCreationStackNavigator";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, makeVar, useReactiveVar} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {NavigationContainer} from "@react-navigation/native";
import {jwt} from "./constants/grafql/jwt";


//Backend Link
const authLink = setContext((_, { headers }) => {
  const token = jwt();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:1337/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const AuthStack = () => {
  return <Stack.Navigator>
    {/*<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>*/}
    {/*<Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }}/>*/}
    {/*<Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>*/}
  </Stack.Navigator>
}

export const AppStack = () => {
  return <Stack.Navigator>
    {/*<Stack.Screen name="CreateOrJoin" component={CreateOrJoin} options={{ headerShown: false }} />*/}
    {/*<Stack.Screen name="Create" component={Create} options={{ headerShown: false }} />*/}
    {/*<Stack.Screen name="JoinG" component={JoinG} options={{ headerShown: false }} />*/}
  </Stack.Navigator>
}

export const Navigation = () => {
  const isLoggedIn = useReactiveVar(jwt);
  return <NavigationContainer>
    {isLoggedIn ? <AppStack /> : <AuthStack />}
  </NavigationContainer>
}


// export default function App() {
//   let [fontsLoaded] = useFonts({
//     NanumBrushScript_400Regular,
//     Inter_500Medium,
//     Inter_400Regular,
//     Lora_400Regular,
//     Lora_600SemiBold
//   });
//
//   if (!fontsLoaded) {
//     return null;
//   }
//
//
//
//
//   return (
//       <SafeAreaView style={GlobalStyles.droidSafeArea}>
//     <AccountCreationNavigator/>
//
//     {/*<BottomNavigator/>*/}
//   </SafeAreaView>)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
