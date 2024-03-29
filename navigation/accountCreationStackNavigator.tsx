import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {WelcomeScreen} from "../components/screens/oboarding_process/WelcomeScreen";
import {Onboarding1} from "../components/screens/oboarding_process/Onboarding/Oboarding1Screen";
import {Onboarding2} from "../components/screens/oboarding_process/Onboarding/Oboarding2Screen";
import {Onboarding3} from "../components/screens/oboarding_process/Onboarding/Oboarding3Screen";
import {Onboarding4} from "../components/screens/oboarding_process/Onboarding/Oboarding4Screen";
import {OnboardingFinal} from "../components/screens/oboarding_process/Onboarding/OboardingFinalScreen";
import {RegisterScreen} from "../components/screens/oboarding_process/RegisterScreen";
import {TopNavigator} from "./skect_bottomTabNavigator";

const startStackNavigator = createNativeStackNavigator();

export function AccountCreationNavigator() {
    return (
            <startStackNavigator.Navigator screenOptions={{headerShown: false}} >
                <startStackNavigator.Screen name="Welcome" component={WelcomeScreen}/>
                {/*<startStackNavigator.Screen name="RegisterPage" component={RegisterScreen} />*/}
                <startStackNavigator.Screen name="Onboarding1" component={Onboarding1} />
                <startStackNavigator.Screen name="Onboarding2" component={Onboarding2} />
                <startStackNavigator.Screen name="Onboarding3" component={Onboarding3} />
                <startStackNavigator.Screen name="Onboarding4" component={Onboarding4} />
                <startStackNavigator.Screen name="OnboardingFinal" component={OnboardingFinal} />
                <startStackNavigator.Screen name="Tab" component={TopNavigator} />
            </startStackNavigator.Navigator>
            );
}
