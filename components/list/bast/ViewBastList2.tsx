import { Dimensions, FlatList } from "react-native";
import React from "react";
import { View } from "react-native";
import FilterBar from "../filter/FilterBar";
import ListCard from './ListCard';
import TopBarLayout from "@/components/layout/TopBarLayout";
import FilterBast from "../filter/FilterBast";

const { height } = Dimensions.get('window');

const BastListUi = ({
  listState,
  filterState,
  setFilterState,
  isRenderFilter,
  setIsRenderFilter,
}: any) => {
  const {
    data,
    isLoading,
    handleLoadMore,
    rowSelection,
    setRowSelection,
    handleCheck,
    columnFilters,
    setColumnFilters,
    setApplyFilter,
  } = listState;
  return (
    <TopBarLayout>
      <View style={{
        flex: 1,
        // backgroundColor: 'yellow',
        height: height
      }}>
        {
          isRenderFilter ? (
            <>
              <FilterBast
                listState={listState}
                setIsRenderFilter={setIsRenderFilter}
                setApplyFilter={setApplyFilter}
              />
            </>
          ) : (
            <>
              <FilterBar
                moduleName="BAST"
                data={data}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                filterState={filterState}
                setFilterState={setFilterState}
                setIsRenderFilter={setIsRenderFilter}
              />
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <ListCard
                    key={item.id}
                    data={item}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                    handleCheck={handleCheck}
                  />
                )}
                keyExtractor={item => item.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
              />
            </>
          )
        }
      </View>
    </TopBarLayout>

  );
};

export default BastListUi;