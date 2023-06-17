import * as React from "react";
import { StyleSheet, Text, TextInput, Image, View } from "react-native";
import {colors, NeutralColors} from "../../../../constants/colors";
import {CustomButton} from "../../../ui/buttons";
import {useNavigation} from "@react-navigation/native";

const imageOnbd4 = require("../../../../assets/images/ilustrations/statistics.png");



// @ts-ignore
export function Onboarding4 ({navigation}) {
    return (
        <View style={styles.container}>
            <View style={headerStyles.container}>
                <Text style={headerStyles.text}>Step 4 of 4</Text>
                <Text style={headerStyles.textS}  onPress={() => navigation.goBack()}>Back</Text>
            </View>

            <Image
                style={styles.image}
                source={imageOnbd4}
                resizeMode="contain"
            />


            <View style={bodyStyles.container}>
                <Text style={bodyStyles.HeaderText}>See your investments</Text>
                <Text style={bodyStyles.Subtext}> Gradually invest </Text>

            </View>

            <View style={bodyStyles.container}>
                <CustomButton
                    unfilled={false}
                    title={'Next'}
                    onPress={() => navigation.navigate('OnboardingFinal')}
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
        alignItems: "center",
    },
    image: {
        width: "85%",
        marginTop: 80,
        marginBottom:125,
    }


});

const headerStyles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 12,
        gap: 16,
        margin: 12,
        width: '85%',
    },
    motoText: {
        fontFamily: 'NanumBrushScript_400Regular',
        fontSize: 24,
        textAlign: 'center',
        margin: 12,
    },
    text: {
        fontFamily: 'Inter_400Regular',
        color: colors.BLACK,
        textAlign: 'left',
    },
    textS: {
        fontFamily: 'Inter_400Regular',
        color: NeutralColors.NC_600,
        textAlign: 'center',
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
        color: NeutralColors.NC_600,
    },
    HeaderText: {
        marginTop: 30,
        textAlign: "center",
        fontFamily: "Lora_600SemiBold",
        fontSize: 28,
        color: NeutralColors.NC_1200,

    }


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
