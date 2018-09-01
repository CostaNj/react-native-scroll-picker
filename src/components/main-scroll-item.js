import React from 'react'
import {StyleSheet, View, Text, Dimensions,Image} from "react-native";


export const MainScrollItem = ({itemInfo}) => (
    <View style={[styles.scrollItem, {width: Dimensions.get('screen').width}]}>
        <Image style ={styles.imgStyle} source={itemInfo.item.img} resizeMode="contain"/>
        <Text>{itemInfo.item.title}</Text>
    </View>
);

const styles = StyleSheet.create({
    scrollItem: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    imgStyle: {
        height: '85%'
    }
});
