
import {Text, View, StyleSheet} from "react-native";
import React, {useState} from "react";
import {FAB} from 'react-native-paper';
// @ts-ignore
import {FloatingMenu, FloatingButton} from 'react-native-floating-action-menu';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {
    CircleMenu,
    CircleMenuItem,
    TooltipPlacement,
} from "react-circular-menu";;


export const TransactionsScreen = () => {


    const [state, setState] = React.useState({ open: false });

    // @ts-ignore
    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;


    return (
        <View style={styles.container}>
            <Text>Transactions!</Text>
            <FAB.Group
                open={open}
                icon={open ? 'menu' : 'plus'}
                actions={[
                    { icon: 'plus', onPress: () => console.log('Pressed add') },
                    { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star')},
                    { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
                    { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
                visible
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
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 5,
    },
});

export default TransactionsScreen;
