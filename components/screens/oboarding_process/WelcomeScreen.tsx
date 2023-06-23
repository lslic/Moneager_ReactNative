import * as React from "react";
import { StyleSheet, Text, TextInput, Image, View } from "react-native";
import { NeutralColors } from "../../../constants/colors";
import {CustomButton} from "../../ui/buttons";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";

const imagePath = require("../../../assets/images/logo_nobackground.png");


// @ts-ignore
export function WelcomeScreen ({navigation}) {

    const handleLogIn = () => {
        navigation.navigate('LogIn');
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

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
                    onPress={() => navigation.navigate('Onboarding1')}
                    name={false}
                />
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
        width: "95%",
        height: "80%",
        marginTop: -50,
        marginBottom: 100,
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
        width: "95%",
    },
    footerContainer: {
        alignItems: "center",
    },
    tasText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // Added this line
        marginBottom: 12,
    },
    textHasAccount: {
        fontFamily: "Inter_500Medium",
        color: NeutralColors.NC_1200,
        fontWeight: "500",
    },
    loginText: {
        fontFamily: "Inter_500Medium",
        color: NeutralColors.NC_1200,
        textDecorationLine: "underline",
        marginLeft: 4,
    },
    textTos: {
        fontFamily: "Inter_400Regular",
        color: NeutralColors.NC_700,
        textAlign: "center",
        marginBottom: 12,
    },
});

