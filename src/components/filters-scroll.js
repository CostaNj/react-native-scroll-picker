import React, {Component} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {FilterScrollItem} from './filter-scroll-item'

export class FiltersScroll extends Component {

    componentWillReceiveProps(newProps) {
        this.filtersListRef.scrollToIndex({animated: true, index: newProps.data.indexOf(newProps.activeFilter)});
    }

    getItemLayout = (data, index) => {
        const {scrollWidth} = this.props;
        return ({ length: scrollWidth, offset: scrollWidth * index, index })
    };

    render() {
        let {scrollWidth} = this.props;
        return (
            <FlatList
                style={[styles.scrollContainer, {marginStart: scrollWidth, marginEnd: scrollWidth}]}
                ref={(ref) => { this.filtersListRef = ref; }}
                keyExtractor={(item, index) => `${index}_${item.toString()}`}
                initialScrollIndex={0}
                initialNumToRender={0}
                getItemLayout={this.getItemLayout}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={(itemInfo) =>
                    <FilterScrollItem
                        itemInfo={itemInfo}
                        filterWidth={scrollWidth}
                        isActiveFilter={this.props.activeFilter === itemInfo.item}
                        onFilterChange={this.props.onFilterChange}
                    />
                }
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
