import * as React from "react";
import { StyleSheet, Text, TextInput, Image, View } from "react-native";
import { NeutralColors } from "../../../constants/colors";
import {CustomButton} from "../../ui/buttons";
import {useNavigation} from "@react-navigation/native";

const imagePath = require("../../../assets/images/logo_nobackground.png");


// @ts-ignore
export function WelcomeScreen ({navigation}) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={imagePath}
                resizeMode="contain"
            />

            <View style={bodyStyles.container}>
                <CustomButton
                    unfilled={false}
                    title={'Let\'s get started'}
                    onPress={() => navigation.navigate('RegisterPage')}
                    name={false}
                />
            </View>
            <View style={footerStyles.container}>
                <Text style={footerStyles.textHasAccount}>
                    Already have an account? Log in
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin :1,
        marginColor: NeutralColors.NC_1200,
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center", // Updated to use space-between
    },
    image: {
        width: "80%",
        height: "80%",
        marginTop: -50,
        marginBottom: 50,
    }


});

const headerStyles = StyleSheet.create({});
const bodyStyles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
    },
    image: {
        flex: 1,
        width: "100%",
        backgroundColor: "#0553",
    },
});
const footerStyles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        alignSelf: "stretch",
        marginBottom: 24, // Adjust the marginBottom value as desired
    },
    textTos: {
        textFontFamily: "Inter_400Regular",
        color: NeutralColors.NC_700,
        textAlign: "center",
    },
    textHasAccount: {
        textFontFamily: "Inter_500Medium",
        color: NeutralColors.NC_1200,
        fontWeight: "500",
        textAlign: "center",
        marginBottom: 12, // Adjust the marginBottom value as desired
    },
});
