import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";


export const FilterScrollItem = ({itemInfo, filterWidth, activeFilter}) => (
    <View style={[styles.scrollItem, {width: filterWidth}]}>
        <TouchableOpacity><Text style={{color: activeFilter === itemInfo.item ? 'white' : 'black'}}>{itemInfo.item}</Text></TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    scrollItem: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
});
