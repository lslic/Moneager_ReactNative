import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

let globalVariable = false;

export function SettingsScreen() {
    const [toggleValue, setToggleValue] = useState(globalVariable);

    const handleToggle = (value: boolean) => {
        setToggleValue(value);
        globalVariable = value;
    };

    return (
        <View style={styles.container}>
            <Switch
                value={toggleValue}
                onValueChange={handleToggle}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={toggleValue ? '#f5dd4b' : '#f4f3f4'}
            />
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
