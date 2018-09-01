import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import {MainScroll} from './main-scroll';
import {FiltersScroll} from "./filters-scroll";

const dataFromServer = [
        {title: 'Black burger', img: require('../../images/burger.png'), type: 'Burgers'},
        {title: 'Cheese burger', img: require('../../images/burger2.png'), type: 'Burgers'},
        {title: 'French fries', img: require('../../images/french-fries.png'), type: 'French fries'},
        {title: 'Coca cola', img: require('../../images/cola.png'), type: 'Drinks'},
        {title: 'Green burger', img: require('../../images/burger3.png'), type: 'Burgers'},
        {title: 'Sprite', img: require('../../images/sprite.png'), type: 'Drinks'}
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
        scrollWidth: Dimensions.get('screen').width,
    };

    handleChangeFilter = (newFilter) => {
        let newIndex = this.state.data.findIndex((item)=> item.type === newFilter);
        console.log('newIndex ', newIndex);
        this.setState({
            data: this.state.data.length - 1 < newIndex ? this.state.data : [...this.state.data, ...dataFromServer],
            currentIndex: newIndex,
            activeFilter: newFilter
        })
    };

    handleUpdateScrollPosition = (currentIndex) => {
        this.setState((prevState) => ({
            data: prevState.data.length - 1 < currentIndex ? prevState.data : [...prevState.data, ...dataFromServer],
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
        console.log(this.state.data);
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
                        scrollWidth={this.state.scrollWidth/7}
                        activeFilter={this.state.activeFilter}
                        onFilterChange={this.handleChangeFilter}
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
