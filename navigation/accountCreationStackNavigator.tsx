import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {WelcomeScreen} from "../components/screens/oboarding_process/WelcomeScreen";
import {RegisterPage} from "../components/screens/HomeScreen";

const startStackNavigator = createNativeStackNavigator();

export function AccountCreationNavigator() {
    return (
        <NavigationContainer >
            <startStackNavigator.Navigator screenOptions={{headerShown: false}} >
                <startStackNavigator.Screen name="Welcome" component={WelcomeScreen}/>
                <startStackNavigator.Screen name="RegisterPage" component={RegisterPage} />
            </startStackNavigator.Navigator>
        </NavigationContainer>
            );
}
