import React from 'react'
import {StyleSheet, View} from 'react-native'
export const ProgressIndicator = ({items, indicatorIndex}) => (
        <View style={styles.progressIndicatorContainer}>
            {items.map((item, index) =>
                <View
                    key={`item_indicator_${item.title}`}
                    style={[styles.circle, {width: isActive(index, indicatorIndex), height: isActive(index, indicatorIndex)}]}
                />)}
        </View>
)

const isActive = (index, indicatorIndex) => index === indicatorIndex ? 10 : 7;

const styles = StyleSheet.create({
    progressIndicatorContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 7,
        height: 7,
        borderRadius: 100/2,
        backgroundColor: 'black',
        margin: 5
    }
});
