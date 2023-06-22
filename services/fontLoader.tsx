import {Inter_400Regular, Inter_500Medium, useFonts} from "@expo-google-fonts/inter";
import {NanumBrushScript_400Regular} from "@expo-google-fonts/nanum-brush-script";
import {Lora_400Regular, Lora_600SemiBold} from "@expo-google-fonts/lora";

export function fontLoader() {
    let [fontsLoaded] = useFonts({
        NanumBrushScript_400Regular,
        Inter_500Medium,
        Inter_400Regular,
        Lora_400Regular,
        Lora_600SemiBold
    });
    return fontsLoaded;
}
