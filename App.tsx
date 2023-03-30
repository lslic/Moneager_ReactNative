
import {StyleSheet} from 'react-native';
import {BottomNavigator} from "./navigation/bottomTabNavigator";



export default function App() {
  return BottomNavigator();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
