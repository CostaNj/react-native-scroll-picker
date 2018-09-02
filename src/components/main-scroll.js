import React, {Component} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {MainScrollItem} from './main-scroll-item'

export class MainScroll extends Component {

    state = {
        beginDragOffset: 0,
    };

    componentWillReceiveProps(newProps) {
        this.flatListRef.scrollToIndex({animated: true, index: newProps.currentIndex});
    }

    getItemLayout = (data, index) => {
        return ({ length: this.props.scrollWidth, offset: this.props.scrollWidth * index, index })
    };

    handleScrollBeginDrag = (event) => {
        this.setState({
            beginDragOffset: event.nativeEvent.contentOffset.x
        })
    };

    handleScrollEndDrag = (event) => {
        const {beginDragOffset} = this.state;
        let newIndex = this.props.currentIndex;
        let offsetDiff = event.nativeEvent.contentOffset.x - beginDragOffset;
        if(Math.abs(offsetDiff) > this.props.scrollWidth/4) {
            offsetDiff < 0 ? newIndex-- : newIndex++;
        }
        this.props.updateScrollPosition(newIndex)
    };

    render() {
        return (
            <FlatList
                style={styles.scrollContainer}
                ref={(ref) => { this.flatListRef = ref; }}
                keyExtractor={(item, index) => `${index}_${item.title.toString()}`}
                getItemLayout={this.getItemLayout}
                initialScrollIndex={0}
                initialNumToRender={0}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScrollBeginDrag={this.handleScrollBeginDrag}
                onScrollEndDrag={this.handleScrollEndDrag}
                renderItem={(itemInfo) => <MainScrollItem itemInfo={itemInfo}/>}
                data={this.props.data}
            />
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1
    }
});
