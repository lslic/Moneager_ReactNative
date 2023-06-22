import * as React from "react";
import {Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";

import {useState} from "react";
import {useMutation} from "@apollo/client";

import {jwt, LOGIN_MUTATION} from "../../constants/grafql/jwt";
import {CustomButton} from "../ui/buttons";
import {colors, NeutralColors} from "../../constants/colors";


const imagePath = require('./../../assets/images/logo_nobackground.png');

// @ts-ignore
export function LoginPage({navigation}) {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [login] = useMutation(LOGIN_MUTATION);

    const handleLoginSubmit = () => {
        login({ variables: { input: { identifier: email, password: password }}}).then((res) => {
            jwt(res.data.login.jwt);
        })
    };


    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={imagePath}
                resizeMode="contain"
            />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.centerContainer}>
                    <View style={styles.contentContainer}>
                        <View>
                            <Text style={headerStyles.textS}>Always Improving :)</Text>
                        </View>

                        <View style={bodyStyles.container}>
                            <CustomButton
                                unfilled
                                title={'Log In with Google'}
                                onPress={() => { navigation.navigate('Onboarding1')
                                }}
                                name={'google'}
                            />
                            <CustomButton
                                unfilled
                                title={'Log In with Apple'}
                                onPress={() => { navigation.navigate('Onboarding1')
                                }}
                                name={'apple'}
                            />
                        </View>



                        <View style={bodyStyles.container}>
                            <Text style={bodyStyles.textSimple}>─────── or Log in with Email ───────</Text>
                        </View>

                        <View style={bodyStyles.container}>
                            <TextInput autoCapitalize='none' autoCorrect={false} style={bodyStyles.textInput} placeholder={'Your Name'} onChangeText={text => setEmail(text)}/>
                            <TextInput autoCapitalize='none' autoCorrect={false} style={bodyStyles.textInput} placeholder={'Password'} secureTextEntry={true} onChangeText={text => setPassword(text)}/>

                            <View style={bodyStyles.container}>
                                <CustomButton
                                    unfilled={false}
                                    title={'Log In'}
                                    onPress={handleLoginSubmit} name={undefined}/>
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
                                Sign Up
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
    image: {
        alignSelf: "center",
        width: "55%",
        height: "30%",
        marginTop: 5,
        margin: -80,
        marginBottom: 0,
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
