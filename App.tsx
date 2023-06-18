
import React, {useCallback} from "react";
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {BottomNavigator} from "./navigation/skect_bottomTabNavigator";
import GlobalStyles from './components/shared/GlobalStyle';
import {Inter_400Regular, Inter_500Medium,useFonts} from "@expo-google-fonts/inter";
import {NanumBrushScript_400Regular} from "@expo-google-fonts/nanum-brush-script";
import {Lora_400Regular, Lora_600SemiBold } from "@expo-google-fonts/lora";
import * as SplashScreen from 'expo-splash-screen';
import {AccountCreationNavigator} from "./navigation/accountCreationStackNavigator";




export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
    NanumBrushScript_400Regular,
    Lora_400Regular,
    Lora_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }


  return ( <SafeAreaView style={GlobalStyles.droidSafeArea}>
    <AccountCreationNavigator/>
    {/*<BottomNavigator/>*/}
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
