
import React, {useCallback} from "react";
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {BottomNavigator} from "./navigation/bottomTabNavigator";
import GlobalStyles from './components/shared/GlobalStyle';
import {Inter_400Regular, Inter_500Medium, useFonts} from "@expo-google-fonts/inter";
import {NanumBrushScript_400Regular} from "@expo-google-fonts/nanum-brush-script";
import * as SplashScreen from 'expo-splash-screen';
import {AccountCreationNavigator} from "./navigation/accountCreationStackNavigator";
import scheme from "react-native-ui-lib/src/style/scheme";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native"
import {client} from "./constants/grafql";
import {
  ApolloClient,
  ApolloProvider, createHttpLink,
  gql,
  InMemoryCache,
  makeVar, NormalizedCacheObject,
  useMutation,
  useQuery,
  useReactiveVar
} from "@apollo/client";



export function Navigation(){
  /// const isLoggedIn = useReactiveVar(jwt);
  const isLoggedIn = true;

  return  <NavigationContainer theme={scheme.getSchemeType() === 'dark' ? DarkTheme : DefaultTheme}>
    {isLoggedIn ? <BottomNavigator/> : <AccountCreationNavigator/>}
  </NavigationContainer>

}

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
    NanumBrushScript_400Regular
  });
  //
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return ( <ApolloProvider client={client}><SafeAreaView style={GlobalStyles.droidSafeArea}>
    <Navigation/>
  </SafeAreaView>
  </ApolloProvider>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
