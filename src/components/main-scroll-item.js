import React from 'react'
import {StyleSheet, View, Text, Dimensions} from "react-native";


export const MainScrollItem = ({itemInfo}) => (
    <View style={[styles.scrollItem, {width: Dimensions.get('screen').width}]}>
        <Text>{itemInfo.item.value}</Text>
    </View>
);

const styles = StyleSheet.create({
    scrollItem: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
});
