import * as React from "react";
import { StyleSheet, Text, TextInput, Image, View } from "react-native";
import { colors, NeutralColors } from "../../../../constants/colors";
import { CustomButton } from "../../../ui/buttons";
import { useNavigation } from "@react-navigation/native";

const imageOnbdFinal = require("../../../../assets/images/ilustrations/img.png");

// @ts-ignore
export function OnboardingFinal({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={imageOnbdFinal}
                resizeMode="cover"
            />
            <View style={headerStyles.container}>
                <Text style={bodyStyles.HeaderText}>Good Job </Text>
                <Text style={bodyStyles.Subtext}>Welcome to your financial adventure</Text>
            </View>

            <View style={bodyStyles.container}>

            </View>

            <View style={bodyStyles.container}>
                <CustomButton
                    unfilled={false}
                    title={"Next"}
                    onPress={() => navigation.navigate("RegisterPage")}
                    name={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-end", // Updated to flex-end


    },
    backgroundImage: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        transform: [{ translateX: -200 }, { translateY: -500 }],
    },
});

const headerStyles = StyleSheet.create({
    container: {
        marginBottom: 200,
        justifyContent: "space-between",
        flexDirection: "column",
        paddingTop: 12,
        paddingBottom: 12,
        gap: 16,
        margin: 12,
        width: "85%",
    },
    motoText: {
        fontFamily: "NanumBrushScript_400Regular",
        fontSize: 24,
        textAlign: "center",
        margin: 12,
    },
    text: {
        fontFamily: "Inter_400Regular",
        color: colors.BLACK,
        textAlign: "left",
    },
    textS: {
        fontFamily: "Inter_400Regular",
        color: NeutralColors.NC_600,
        textAlign: "center",
        marginBottom: 2,
    },
});

const bodyStyles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        marginBottom: 30,
    },
    Subtext: {
        marginTop: 10,
        fontFamily: "Inter_400Regular",
        textAlign: "center",
        fontSize: 16,
        color: NeutralColors.NC_650,
    },
    HeaderText: {
        marginTop: 30,
        textAlign: "center",
        fontFamily: "Lora_600SemiBold",
        fontSize: 28,
        color: NeutralColors.NC_1200,
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
