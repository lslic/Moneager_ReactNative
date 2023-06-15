import * as React from "react";
import {ScrollView, StyleSheet, Text, TextInput, View, Image} from "react-native";
import {CustomButton} from "../ui/buttons";
import {colors, NeutralColors} from "../../constants/colors";
import {jwt, LOGIN_MUTATION} from "../../constants/grafql";
import {useState} from "react";
import {useMutation, useReactiveVar} from "@apollo/client";


const path = 'assets/images/logo.png'

const [user, setUser] = useState('');
const [pass, setPassword] = useState('');

const loggedIn = useReactiveVar(jwt);

const [login, {data, loading}] = useMutation(LOGIN_MUTATION);

export function HomeScreen() {
    return (
<ScrollView>
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={headerStyles.container}>
                {/*<View style={bodyStyles.container}>*/}
                {/*    <Image url="https://picsum.photos/seed/696/3000/2000"></Image>*/}
                {/*</View>*/}
                <Text style={headerStyles.text}>Step 1 of 4</Text>
                <Text style={headerStyles.text}>Exit</Text>
            </View>

            <View>
                <Text style={headerStyles.motoText}>Create an account</Text>
                <Text style={headerStyles.textS}>Always Improving :)</Text>
            </View>

            <View style={bodyStyles.container}>
                <CustomButton unfilled title={'Sign up with Google'} onPress={() => {
                    console.log('button1');
                }} name={'google'}/>
                <CustomButton unfilled title={'Sign up with Apple'} onPress={() => {
                    console.log('button2');
                }} name={'apple'}/>
            </View>

            <View style={bodyStyles.container}>
                <CustomButton unfilled={false} title={'Sign Up'} onPress={() => login({
                    variables: {
                        input: {
                            identifier: user,
                            password: pass
                        }
                    }
                }).then(r => {
                    jwt(r.data.login.jwt);
                })} name={false}/>
            </View>

            <View style={bodyStyles.container}>
                <Text style={bodyStyles.textSimple}> ───────  or Sign up with Email  ─────── </Text>
            </View>

            <View style={bodyStyles.container}>
                <TextInput style={bodyStyles.textInput} placeholder={'Your Name'}  onChangeText={e => setUser(e)}/>
                <TextInput style={bodyStyles.textInput} placeholder={'YourEmail@.com'}></TextInput>
                <TextInput style={bodyStyles.textInput} placeholder={'Password'}  onChangeText={e => setPassword(e)}/>
            </View>


            <View>
                <Text style={footerStyles.textTos}>By continuing you accept our standard terms and conditions and our
                    privacy policy.</Text>
                <Text style={footerStyles.textHasAccount}>Already have an account? Log in</Text>
            </View>


        </View>
    </ScrollView>
    );
}

const headerStyles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        width: '90%',
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 12,
        gap: 16,
        margin: 12

    }, motoText: {
        fontFamily: 'NanumBrushScript_400Regular',
        fontSize: 24,
        textAlign: 'left',
        width: '90%',
        margin: 12,
        alignSelf: 'flex-start'
    }, text: {
        textFontFamily: 'Inter_400Regular',
        color: colors.BLACK,
        textAlign: 'left',
    },
    textS: {
        textFontFamily: 'Inter_400Regular',
        color: colors.BLACK,
        textAlign: 'center',
        marginBottom: 12
    }
});
const bodyStyles = StyleSheet.create({
    container: {
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInput: {
        borderColor: NeutralColors.NC_1200,
        borderRadius: 4,
        borderWidth: 2,
        padding: 10,
        margin: 10,
        width: '100%'
    },
    textSimple: {
        textFontFamily: 'Inter_500Medium',
        color: NeutralColors.NC_D_GRAY,
        textAlign: 'center',
        marginBottom: 12
    }
});
const footerStyles = StyleSheet.create({
    textTos: {
        textFontFamily: 'Inter_400Regular',
        color: NeutralColors.NC_700,
        textAlign: 'center',
        marginBottom: 12
    },
    textHasAccount: {
        textFontFamily: 'Inter_500Medium',
        color: NeutralColors.NC_1200,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 12
    }
});

