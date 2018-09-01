import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import {MainScroll} from './main-scroll';
import {FiltersScroll} from "./filters-scroll";

const dataFromServer = [
        {value: '1', type: 'fast1'},
        {value: '2', type: 'fast2'},
        {value: '3', type: 'restaurant'},
        {value: '4', type: 'fast'},
        {value: '5', type: 'fast'},
        {value: '6', type: 'restaurant'},
        {value: '7', type: 'fast'},
        {value: '8', type: 'fast3'},
        {value: '9', type: 'restaurant'},
        {value: '10', type: 'restaurant'},
        {value: '11', type: 'fast4'},
        {value: '12', type: 'fast45'},
        {value: '13', type: 'restaurant'},
        {value: '14', type: 'restaurant'}
    ];

const compareItems = (item1,item2) => {
    if (item1.type < item2.type)
        return -1;
    if (item1.type > item2.type)
        return 1;
    return 0;
};


export class ScrollPicker extends Component {

    state = {
        currentIndex: 0,
        data: dataFromServer.sort(compareItems),
        filters: [...new Set(dataFromServer.map((item)=>item.type))].sort(),
        activeFilter: dataFromServer.sort(compareItems)[0].type,
        beginDragOffset: 0,
        scrollWidth: Dimensions.get('screen').width,
    };


    handleUpdateScrollPosition = (currentIndex) => {
        this.setState((prevState) => ({
            data: prevState.data.length - 2 !== currentIndex ? prevState.data : [...prevState.data, ...dataFromServer],
            currentIndex,
            activeFilter: prevState.data[currentIndex].type
        }))
    };

    handleChangeOrientation = () => {
        this.setState({
            scrollWidth: Dimensions.get('screen').width
        })
    };


    render() {
        return (
            <View onLayout={this.handleChangeOrientation} style={styles.container}>
                <View style={{flex: 1}}>
                    <Text>Header</Text>
                    <Text>Active filter:</Text>
                    <Text>{this.state.activeFilter}</Text>
                </View>
                <View style={{flex: 1}}>
                    <FiltersScroll
                        data={this.state.filters}
                        scrollWidth={this.state.scrollWidth}
                        activeFilter={this.state.activeFilter}
                    />
                </View>
                <View style={{flex: 3}}>
                    <MainScroll
                        data={this.state.data}
                        currentIndex={this.state.currentIndex}
                        scrollWidth={this.state.scrollWidth}
                        updateScrollPosition = {this.handleUpdateScrollPosition}
                    />
                </View>
                <View style={{flex: 5}}>
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
