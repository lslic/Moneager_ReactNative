import * as React from "react";
import {Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { CustomButton } from "../../ui/buttons";
import {colors, NeutralColors, PrimaryColors} from "../../../constants/colors"
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {jwt, LOGIN_MUTATION, SIGNUP_MUTATION} from "../../../constants/grafql/jwt";
import {handleApolloError, useErrorModal} from "../../../services/ErrorHandler/ApolloErrorHandler";



// @ts-ignore
export function RegisterScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const { popupVisible, popupMessage, closeModal, showErrorModal } = useErrorModal();

    const [signup] = useMutation(SIGNUP_MUTATION);
    const [login] = useMutation(LOGIN_MUTATION);
    const handleRegisterSubmit = async () => {

        try{
            const res =
                await signup( {variables: { input: { username: user, email: email, password: password }}})
            jwt(res.data.register.jwt);
            await handleLoginSubmit();
        } catch (error) {
            handleApolloError(error, showErrorModal);

        }
    };

    const handleLoginSubmit = async () => {
        try {
            const res =
                await login({ variables:
                        { input: { identifier: email, password: password }}});
            jwt(res.data.login.jwt);
        } catch (error) {
            handleApolloError(error, showErrorModal);
            console.log(error)
        }
    };





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
                            <TextInput style={bodyStyles.textInput} placeholder={'Your Name'} onChangeText={text => setUser(text)}/>
                            <TextInput style={bodyStyles.textInput} placeholder={'YourEmail@mail.com'} onChangeText={text => setEmail(text)}/>
                            <TextInput style={bodyStyles.textInput} placeholder={'Password'} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
                            <TextInput style={bodyStyles.textInput} placeholder={'Password Confirmation'} secureTextEntry={true} onChangeText={text => setPassword(text)} />
                            <View style={bodyStyles.container}>
                                <CustomButton
                                    unfilled={false}
                                    title={'Sign Up'}
                                    onPress={handleRegisterSubmit} name={undefined}/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={footerStyles.textTos}>
                            By continuing you accept our standard terms and conditions and our privacy policy.
                        </Text>
                        <View style={footerStyles.tasText}>
                            <Text style={footerStyles.textHasAccount}>Already have an account? </Text>
                            <Text style={footerStyles.loginText} onPress={() => navigation.goBack()}>
                                Log in
                            </Text>
                        </View>

                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={popupVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.popupText}>{popupMessage}</Text>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={styles.buttonStyle}
                        >
                            <Text style={{ color: '#fff' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    buttonStyle: {
        backgroundColor: PrimaryColors.PC_600,
        padding: 10,
        marginTop: 8,
        paddingHorizontal: 25,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: NeutralColors.NC_WHITE,
        padding: 16,
        margin: 16,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: PrimaryColors.PC_800
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
    }, popupText: {
        textAlign: "center",
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
