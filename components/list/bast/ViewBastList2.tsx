import { Dimensions, FlatList, RefreshControl } from "react-native";
import React from "react";
import { View } from "react-native";
import FilterBar from "../filter/FilterBar";
import ListCard from './ListCard';
import TopBarLayout from "@/components/layout/TopBarLayout";
import FilterBast from "../filter/FilterBast";
import { EmptyList } from "../EmptyList";
import { router } from "expo-router";

const { height } = Dimensions.get('window');

const BastListUi = ({
  listState,
  // filterState,
  // setFilterState,

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
    isRenderFilter,
    setIsRenderFilter,
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
                // moduleName="BAST"
                data={data}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                setIsRenderFilter={setIsRenderFilter}
              />
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <ListCard
                    key={item.id}
                    data={item}
                    listData={data}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                    handleCheck={handleCheck}
                  />
                )}
                keyExtractor={item => item.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<EmptyList />}
                style={{ paddingHorizontal: 10 }}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => {
                      router.replace('/bast')
                    }}
                  />
                }
              />
            </>
          )
        }
      </View>
    </TopBarLayout>

  );
};

export default BastListUi;