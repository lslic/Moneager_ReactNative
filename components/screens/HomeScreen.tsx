import * as React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { CustomButton } from "../ui/buttons";
import { colors, NeutralColors } from "../../constants/colors";
import { Image } from "expo-image";
import {Onboarding1} from "./oboarding_process/Onboarding/Oboarding1Screen";

const path = 'assets/images/logo.png';

// @ts-ignore
export function RegisterPage({navigation}) {

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.centerContainer}>
                    <View style={styles.contentContainer}>
                        <View style={headerStyles.container}>
                            <Text style={headerStyles.text}>Step 1 of 4</Text>
                            <Text style={headerStyles.text}  onPress={() => navigation.goBack()}>Exit</Text>
                        </View>

                        <View>
                            <Text style={headerStyles.motoText}>Create an account</Text>
                            <Text style={headerStyles.textS}>Always Improving :)</Text>
                        </View>

                        <View style={bodyStyles.container}>
                            <CustomButton
                                unfilled
                                title={'Sign up with Google'}
                                onPress={() => { navigation.navigate('Onboarding1')
                                }}
                                name={'google'}
                            />
                            <CustomButton
                                unfilled
                                title={'Sign up with Apple'}
                                onPress={() => { navigation.navigate('Onboarding1')
                                }}
                                name={'apple'}
                            />
                        </View>



                        <View style={bodyStyles.container}>
                            <Text style={bodyStyles.textSimple}>─────── or Sign up with Email ───────</Text>
                        </View>

                        <View style={bodyStyles.container}>
                            <TextInput style={bodyStyles.textInput} placeholder={'Your Name'} />
                            <TextInput style={bodyStyles.textInput} placeholder={'YourEmail@mail.com'} />
                            <TextInput style={bodyStyles.textInput} placeholder={'Password'} />
                            <TextInput style={bodyStyles.textInput} placeholder={'Password Confirmation'} />
                            <View style={bodyStyles.container}>
                                <CustomButton
                                    unfilled={false}
                                    title={'Sign Up'}
                                    onPress={() => { navigation.navigate('Onboarding1')
                                    }}
                                    name={false}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={footerStyles.textTos}>
                            By continuing you accept our standard terms and conditions and our privacy policy.
                        </Text>
                        <View style={footerStyles.tasText}>
                            <Text style={footerStyles.textHasAccount}>Already have an account? </Text>
                            <Text style={footerStyles.loginText} onPress={() => console.log("Log in pressed")}>
                                Log in
                            </Text>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
    },
    contentContainer: {
        width: '90%',
        alignSelf: 'center',
    },
    footerContainer: {
        justifyContent: "flex-end",
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
});

const headerStyles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 12,
        gap: 16,
        margin: 12,
    },
    motoText: {
        fontFamily: 'NanumBrushScript_400Regular',
        fontSize: 24,
        textAlign: 'center',
        margin: 2,
    },
    text: {
        fontFamily: 'Inter_400Regular',
        color: colors.BLACK,
        textAlign: 'left',
    },
    textS: {
        fontFamily: 'Inter_400Regular',
        color: colors.BLACK,
        textAlign: 'center',
        marginBottom: 2,
    },
});


const bodyStyles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
        width: '100%',
    },
    textInput: {
        borderColor: NeutralColors.NC_1200,
        borderRadius: 4,
        borderWidth: 2,
        padding: 10,
        margin: 10,
        width: '100%',
    },
    textSimple: {
        fontFamily: 'Inter_500Medium',
        color: NeutralColors.NC_D_GRAY,
        textAlign: 'center',
        marginBottom: 12,
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
    tasText: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        justifyContent: "center",

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
