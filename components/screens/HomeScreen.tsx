import {Text, View} from "react-native";
import * as React from "react";
import {ThemeProvider} from 'styled-components';
import scheme from "react-native-ui-lib/src/style/scheme";


const darkTheme = {
    background: "rgb(255, 0, 0)",
    foreground: "#fff",
}

const lightTheme = {
        background: "#fff",
        foreground: "#000",
    }


;
export function HomeScreen() {

    return (
        <ThemeProvider theme={scheme.getSchemeType() === "dark" ? darkTheme : lightTheme}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}/>
            <Text>{scheme.getSchemeType()}</Text>
        </ThemeProvider>
    );
}
