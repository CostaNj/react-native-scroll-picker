import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions, StyleSheet } from 'react-native';
import {MainScroll} from './main-scroll';

const dataFromProps = [{value: 'burger', type: 'fast'}, {value: 'nuggets', type: 'fast'}, {value: 'meat', type: 'restaurant'}];

export class ScrollPicker extends Component {

    state = {
        currentIndex: 0,
        data: dataFromProps,
        beginDragOffset: 0,
        scrollWidth: Dimensions.get('screen').width,
    };

    handleUpdateScrollPosition = (currentIndex) => {
        this.setState((prevState) => ({
            data: prevState.data.length - 2 !== currentIndex ? prevState.data : [...prevState.data, ...dataFromProps],
            currentIndex
        }))
    }

    handleChangeOrientation = () => {
        this.setState({
            scrollWidth: Dimensions.get('screen').width
        })
    };


    render() {
        console.log('data: ', this.state.data);
        return (
            <View onLayout={this.handleChangeOrientation} style={styles.container}>
                <View style={styles.header}>
                    <Text>Header</Text>
                </View>
                <MainScroll
                    data={this.state.data}
                    currentIndex={this.state.currentIndex}
                    scrollWidth={this.state.scrollWidth}
                    updateScrollPosition = {this.handleUpdateScrollPosition}
                />
                <View style={styles.footer}>
                    <Text>Footer</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
    },
    footer: {
        flex: 6
    }
});
