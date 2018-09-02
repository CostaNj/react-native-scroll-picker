import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";


export const FilterScrollItem = ({itemInfo, filterWidth, isActiveFilter, onFilterChange}) => (
    <View style={styles.scrollItem}>
        <TouchableOpacity onPress={() => onFilterChange(itemInfo.item)}>
            <Text style={{fontWeight: isActiveFilter ? 'bold' : 'normal'}}>{itemInfo.item}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    scrollItem: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
});
