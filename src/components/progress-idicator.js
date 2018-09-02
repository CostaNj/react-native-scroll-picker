import React, {Component} from 'react'
import {StyleSheet, View, Animated } from 'react-native'
export class ProgressIndicator extends Component {

    state = {
        opacity: new Animated.Value(this.props.isNewFilter ? 0 : 1)
    };

    componentDidMount() {
        if(this.props.isNewFilter) {
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }

    render() {
        const {items, indicatorIndex} = this.props;
        return (
            <Animated.View
                style={[styles.progressIndicatorContainer, {opacity: this.state.opacity}]}
                onLoad={this.onLoad}
            >
                {items.map((item, index) =>
                    <View
                        key={`item_indicator_${item.title}`}
                        style={[styles.circle, {
                            width: isActive(index, indicatorIndex),
                            height: isActive(index, indicatorIndex)
                        }]}
                    />)}
            </Animated.View>
        )
    }
}


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
