import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {WelcomeScreen} from "../components/screens/oboarding_process/WelcomeScreen";
import {RegisterPage} from "../components/screens/HomeScreen";
import {Onboarding1} from "../components/screens/oboarding_process/Onboarding/Oboarding1Screen";

const startStackNavigator = createNativeStackNavigator();

export function AccountCreationNavigator() {
    return (
        <NavigationContainer >
            <startStackNavigator.Navigator screenOptions={{headerShown: false}} >
                <startStackNavigator.Screen name="Welcome" component={WelcomeScreen}/>
                <startStackNavigator.Screen name="RegisterPage" component={RegisterPage} />
                <startStackNavigator.Screen name="Onboarding1" component={Onboarding1} />
            </startStackNavigator.Navigator>
        </NavigationContainer>
            );
}
