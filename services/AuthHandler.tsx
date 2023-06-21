import React, { useState } from 'react';
import {View, Text, TextInput,  StyleSheet, Pressable} from 'react-native';



export const AuthHandler = ({ title, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = () => {
        onSubmit(email, password);

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />

            <Pressable style={styles.buttonThings} onPress={handleFormSubmit}>
                <Text style={styles.bText}>Submit</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000000',
        marginBottom: 50,
    },
    title: {
        fontSize: 24,
        marginBottom: 60,
    },
    bText: {
        fontFamily: 'Cochin',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonThings: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        paddingBottom:12,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#C7ECF4'},
    input: {
        width: '80%',
        height: 40,
        borderColor: 'white',
        borderWidth: 3,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
        fontSize: 18,
        fontFamily: 'Cochin',
        backgroundColor: 'white',
        placeholderTextColor: 'black',
    },
});

