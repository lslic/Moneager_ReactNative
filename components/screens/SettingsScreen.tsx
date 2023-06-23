import React, { useState } from 'react';
import { View, Switch, StyleSheet, Button } from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import { jwt } from "../../constants/grafql/jwt";

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
    }
    return (
        <View style={styles.container}>
            <Switch
                value={toggleValue}
                onValueChange={handleToggle}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={toggleValue ? '#f5dd4b' : '#f4f3f4'}
            />
            <Button title="Log Out" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
