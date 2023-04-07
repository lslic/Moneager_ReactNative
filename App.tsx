
import React, {useCallback} from "react";
import {SafeAreaView, StyleSheet} from 'react-native';
import {BottomNavigator} from "./navigation/bottomTabNavigator";
import GlobalStyles from './components/shared/GlobalStyle';
import {Inter_400Regular, Inter_500Medium, useFonts} from "@expo-google-fonts/inter";
import {NanumBrushScript_400Regular} from "@expo-google-fonts/nanum-brush-script";
import * as SplashScreen from 'expo-splash-screen';
//
// SplashScreen.preventAutoHideAsync();

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


  return ( <SafeAreaView style={GlobalStyles.droidSafeArea}>
    <BottomNavigator/>
  </SafeAreaView>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
