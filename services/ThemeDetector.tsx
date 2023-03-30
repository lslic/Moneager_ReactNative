import { useColorScheme } from 'react-native';
import { Appearance } from 'react-native-appearance';


export function ThemeDetector() {
    const colorScheme = Appearance.getColorScheme();
    const isDarkMode = colorScheme === 'dark';

    console.log('Device color scheme:', colorScheme);

}
