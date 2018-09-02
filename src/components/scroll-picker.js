import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import {MainScroll} from './main-scroll';
import {FiltersScroll} from "./filters-scroll";
import {ProgressIndicator} from "./progress-idicator";

const dataFromServer = [
        {title: 'Black burger', img: require('../../images/burger.png'), type: 'Burgers'},
        {title: 'Cheese burger', img: require('../../images/burger2.png'), type: 'Burgers'},
        {title: 'French fries', img: require('../../images/french-fries.png'), type: 'French fries'},
        {title: 'Coca cola', img: require('../../images/cola.png'), type: 'Drinks'},
        {title: 'Green burger', img: require('../../images/burger3.png'), type: 'Burgers'},
        {title: 'Sprite', img: require('../../images/sprite.png'), type: 'Drinks'},
        {title: 'French fries 2', img: require('../../images/french-fries.png'), type: 'French fries 2'},
        {title: 'French fries 3', img: require('../../images/french-fries.png'), type: 'French fries 3'},
        {title: 'French fries 4', img: require('../../images/french-fries.png'), type: 'French fries 4'},
        {title: 'French fries 5', img: require('../../images/french-fries.png'), type: 'French fries 5'},
        {title: 'French fries 6', img: require('../../images/french-fries.png'), type: 'French fries 6'},
    ];

const compareFilters = (item1,item2) => {
    if (item1.type < item2.type)
        return -1;
    if (item1.type > item2.type)
        return 1;
    return 0;
};

export class ScrollPicker extends Component {

    state = {
        currentIndex: 0,
        data: dataFromServer.sort(compareFilters),
        filters: [...new Set(dataFromServer.map((item)=>item.type))].sort(),
        activeFilter: dataFromServer.sort(compareFilters)[0].type,
        scrollWidth: Dimensions.get('screen').width,
        indicatorIndex: 0
    };

    handleChangeFilter = (newFilter) => {
        let newIndex = this.state.data.findIndex((item)=> item.type === newFilter);
        this.setState({
            data: this.state.data.length - 1 > newIndex ? this.state.data : [...this.state.data, ...dataFromServer],
            currentIndex: newIndex,
            activeFilter: newFilter,
            indicatorIndex: 0
        })
    };

    handleUpdateScrollPosition = (newIndex) => {
        this.setState({
            data: this.state.data.length - 1 > newIndex ? this.state.data : [...this.state.data, ...dataFromServer],
            currentIndex: newIndex,
            activeFilter: this.state.data[newIndex].type,
            indicatorIndex: this.calcNewIndicatorIndex(newIndex)
        })
    };

    calcNewIndicatorIndex = (newIndex) => {
        const {currentIndex, indicatorIndex, data, activeFilter} = this.state;
        if(newIndex > currentIndex) {
            return this.getFilterByIndex(newIndex) === activeFilter ?  indicatorIndex + 1 : 0;
        }
        if(newIndex < currentIndex) {
            return this.getFilterByIndex(newIndex) === activeFilter ?  indicatorIndex - 1 : this.getFilteredElements(data[newIndex].type).length - 1;
        }

        return indicatorIndex;
    };

    getFilterByIndex = (newIndex) => this.state.data[newIndex].type;

    getFilteredElements = (filter) => dataFromServer.filter((item) => item.type === filter);


    handleChangeOrientation = () => {
        this.setState({
            scrollWidth: Dimensions.get('screen').width
        })
    };

    render() {
        return (
            <View onLayout={this.handleChangeOrientation} style={styles.container}>
                <View style={styles.header}/>
                <View style={styles.filters}>
                    <FiltersScroll
                        data={this.state.filters}
                        scrollWidth={this.state.scrollWidth/7}
                        activeFilter={this.state.activeFilter}
                        onFilterChange={this.handleChangeFilter}
                    />
                </View>
                <View style={styles.main}>
                    <MainScroll
                        data={this.state.data}
                        currentIndex={this.state.currentIndex}
                        scrollWidth={this.state.scrollWidth}
                        updateScrollPosition = {this.handleUpdateScrollPosition}
                    />
                </View>
                <View style={styles.progress}>
                    <ProgressIndicator
                        items={this.getFilteredElements(this.state.activeFilter)}
                        indicatorIndex={this.state.indicatorIndex}
                    />
                </View>
                <View style={styles.footer}/>
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
    filters: {
        flex: 1,
    },
    main: {
        flex: 3
    },
    progress: {
        flex: 1
    },
    footer: {
        flex: 4
    }
});
