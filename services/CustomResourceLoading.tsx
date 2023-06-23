import {Inter_400Regular, Inter_500Medium, useFonts} from "@expo-google-fonts/inter";
import {NanumBrushScript_400Regular} from "@expo-google-fonts/nanum-brush-script";
import {Lora_400Regular, Lora_600SemiBold} from "@expo-google-fonts/lora";
import {useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";


export const useCustomResourceLoading = () => {
    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        NanumBrushScript_400Regular,
        Lora_400Regular,
        Lora_600SemiBold,
    });

    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
            } catch (err) {
                console.warn(err);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    useEffect(() => {
        if (fontsLoaded && appIsReady) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, appIsReady]);

    return (!fontsLoaded || !appIsReady);
};
