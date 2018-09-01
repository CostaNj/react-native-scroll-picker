import React, {Component} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {FilterScrollItem} from './filter-scroll-item'

export class FiltersScroll extends Component {

    componentWillReceiveProps(newProps) {
        this.filtersListRef.scrollToIndex({animated: true, index: newProps.data.indexOf(newProps.activeFilter)});
    }

    getItemLayout = (data, index) => {
        return ({ length: this.props.scrollWidth/7, offset: this.props.scrollWidth/7 * index, index })
    };

    render() {
        let filterWidth = this.props.scrollWidth/7;
        return (
            <FlatList
                style={[styles.scrollContainer, {marginStart: filterWidth, marginEnd: filterWidth}]}
                ref={(ref) => { this.filtersListRef = ref; }}
                keyExtractor={(item, index) => `${index}_${item.toString()}`}
                initialScrollIndex={0}
                initialNumToRender={0}
                getItemLayout={this.getItemLayout}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={(itemInfo) => <FilterScrollItem itemInfo={itemInfo} filterWidth={filterWidth} activeFilter={this.props.activeFilter}/>}
                data={this.props.data}
            />
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'blue',
    }
});
