import React, { useState } from 'react';
import { View, Switch, StyleSheet, Button, Image, TouchableOpacity, Text } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { jwt } from "../../constants/grafql/jwt";
import {NeutralColors} from "../../constants/colors";
import {CustomButton} from "../ui/buttons";

let globalVariable = false;

export function SettingsScreen() {
    const navigation = useNavigation();
    const [toggleValue, setToggleValue] = useState(globalVariable);

    const handleToggle = (value: boolean) => {
        setToggleValue(value);
        globalVariable = value;
    };

    const handleLogout = () => {
        // Perform logout logic here
        // ...

        // Clear JWT token
        jwt(null);
        //This is not necessary somehow
        // Navigate to the first screen of AuthStack
        // navigation.dispatch(
        //     CommonActions.reset({
        //         index: 1,
        //         routes: [{name: 'LoginScreen'}],
        //     })
        // );
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/logo_nobackground.png')} style={styles.logo} />
                <Text style={styles.appName}>Moneager Settings</Text>
            </View>

            <View style={styles.settingsContainer}>
                <TouchableOpacity style={styles.settingsOption}>
                    <Text style={styles.settingsOptionText}>Future Setting Option</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsOption}>
                    <Text style={styles.settingsOptionText}>Future Setting Option</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Future Toggle Option:</Text>
                <Switch value={toggleValue} onValueChange={handleToggle} />
            </View>

            <CustomButton title="Log Out" onPress={handleLogout} unfilled={false} name={undefined} />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: NeutralColors.NC_900,
    },
    settingsContainer: {
        marginBottom: 20,
    },
    settingsOption: {
        paddingVertical: 10,
    },
    settingsOptionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: NeutralColors.NC_900,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    toggleLabel: {
        fontSize: 18,
        marginRight: 10,
        color: NeutralColors.NC_900,
    },
});

