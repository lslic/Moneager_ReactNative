import * as React from "react";
import {StyleSheet, Text, TextInput ,Image, View} from "react-native"


const patha = 'assets/images/logo.png'


export function WelcomeScreen() {
    return(
        <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/images/logo.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '50%',
        height : '60%',
    },
});


const headerStyles = StyleSheet.create({})
const bodyStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0553',
    },
})
const footerStyles = StyleSheet.create({})



