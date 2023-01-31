import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState} from "react";

export default function App() {

  const [count, setCounter] = useState(0)

  const incrementCounter = () => {
    setCounter(count + 1)
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to {count}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
