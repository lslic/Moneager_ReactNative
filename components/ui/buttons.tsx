import React from 'react'
import {Text, TouchableOpacity, StyleSheet, View} from "react-native"
import {PrimaryColors, NeutralColors} from '../../constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';

// @ts-ignore



export const CustomButton = ({unfilled, onPress, title, name}) => {

    const styles = unfilled ? unfilledStyle : filledStyle;

    return <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={name} size={24} color="black" style={{marginRight:4}}/>
            <Text style={styles.text}>{title}</Text>
        </View>
    </TouchableOpacity>
}

const filledStyle = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: NeutralColors.NC_900,
        borderWidth: 1,
        borderRadius: 4,
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
        gap: 8,


    },
    text: {
        color: NeutralColors.NC_WHITE,
        fontFamily: 'Inter_500Medium',
        fontWeight: '500',
        fontSize: 12,
    },
    iconContainer:{
        display: 'flex',
        alignItems:'center',
        flexDirection: 'row',
    }
});

const unfilledStyle = StyleSheet.create({
    container: {
        alignItems: "center",
        borderColor: NeutralColors.NC_GRAY,
        borderWidth: 1,
        borderRadius: 4,
        paddingTop: 12,
        paddingBottom: 12,
        width: '100%',
        fontFamily: 'Inter_500Medium',
        fontWeight: '500',
        fontSize: 14,
        margin:12

    },
    text: {
        color: PrimaryColors.PC_800,
        fontFamily: 'Inter_500Medium',
        fontWeight: '500',
        fontSize: 12,
    },
    iconContainer:{
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'row',
    }
});

