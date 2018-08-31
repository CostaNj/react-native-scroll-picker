import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions, StyleSheet } from 'react-native';
import {MainScrollItem} from './main-scroll-item'

const dataFromProps = [{value: 'burger', type: 'fast'}, {value: 'nuggets', type: 'fast'}, {value: 'meat', type: 'restaurant'}];

export class ScrollPicker extends Component {

    state = {
        currentIndex: 0,
        data: dataFromProps,
        beginDragOffset: 0,
        scrollWidth: Dimensions.get('screen').width,
    };

    getItemLayout = (data, index) => {
        return ({ length: this.state.scrollWidth, offset: this.state.scrollWidth * index, index })
    };

    handleScrollBeginDrag = (event) => {
        this.setState({
            beginDragOffset: event.nativeEvent.contentOffset.x
        })
    };

    handleScrollEndDrag = (event) => {
        const {beginDragOffset, currentIndex, data} = this.state;
        let newIndex = currentIndex;
        let offsetDiff = event.nativeEvent.contentOffset.x - beginDragOffset;
        if(Math.abs(offsetDiff) > this.state.scrollWidth/4) {
            newIndex = offsetDiff < 0 ? currentIndex - 1 : currentIndex + 1
        }

        this.setState({
            currentIndex: newIndex,
            data: data.length - 2 !== currentIndex ? data : [...data, ...dataFromProps]
        }, ()=> this.flatListRef.scrollToIndex({animated: true, index: this.state.currentIndex}));
    };

    handleChangeOrientation = () => {
        const dim = Dimensions.get('screen');
        this.setState({
            scrollWidth: dim.width
        })
    };

    render() {
        console.log('data: ', this.state.data);
        return (
            <View onLayout={this.handleChangeOrientation} style={styles.container}>
                <View style={styles.header}>
                    <Text>Header</Text>
                </View>
                <FlatList
                    style={styles.scrollContainer}
                    ref={(ref) => { this.flatListRef = ref; }}
                    keyExtractor={(item, index) => `${index}_${item.value.toString()}`}
                    getItemLayout={this.getItemLayout}
                    initialScrollIndex={0}
                    initialNumToRender={0}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    //onScroll={(event) => console.log(event.nativeEvent.contentOffset)}
                    onScrollBeginDrag={this.handleScrollBeginDrag}
                    onScrollEndDrag={this.handleScrollEndDrag}
                    renderItem={(itemInfo) => <MainScrollItem itemInfo={itemInfo}/>}
                    data={this.state.data}
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
    scrollContainer: {
        flex: 1,
        backgroundColor: 'red'
    },
    footer: {
        flex: 6
    }
});
